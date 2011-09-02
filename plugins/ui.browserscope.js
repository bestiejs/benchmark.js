(function(window, document) {

  /** Cache used by various methods */
  var cache = {
    'counter': 0,
    'lastAction': 'load',
    'lastFilterBy': 'popular',
    'lastResponse': null,
    'lastType': 'bar',
    'timers': { 'cleanup': null, 'load': null, 'post': null, 'render': null },
    'trash': createElement('div')
  },

  /** Used to separate charts from other render types */
  chartMap = {
    'Bar': 1,
    'Column': 1,
    'Line': 1,
    'Pie': 1
  },

  /**
   * Used to filter Browserscope results by browser category.
   * @see http://www.browserscope.org/user/tests/howto#urlparams
   */
  filterMap = {
    'all': 3,
    'desktop': 'top-d',
    'major': 1,
    'minor': 2,
    'mobile': 'top-m',
    'niche': 'top-d-e',
    'popular': 'top'
  },

  /** Used to resolve a value's internal [[Class]] */
  toString = {}.toString,

  /** Utility shortcuts */
  each = Benchmark.each,
  filter = Benchmark.filter,
  forIn = Benchmark.forIn,
  hasKey = Benchmark.hasKey,
  map = Benchmark.map,
  reduce = Benchmark.reduce;

  /*--------------------------------------------------------------------------*/

  /**
   * Registers an event listener.
   * @private
   * @param {Object} element The element.
   * @param {String} eventName The name of the event to listen to.
   * @param {Function} handler The event handler.
   */
  function addListener(element, eventName, handler) {
    if (typeof element.addEventListener != 'undefined') {
      element.addEventListener(eventName, handler, false);
    } else if (typeof element.attachEvent != 'undefined') {
      element.attachEvent('on' + eventName, handler);
    }
  }

  /**
   * Shortcut for `document.createElement()`.
   * @private
   * @param {String} tagName The tag name of the element to create.
   * @param {String} name A name to assign to the element.
   * @returns {Object} Returns a new element.
   */
  function createElement(tagName, name) {
    var result;
    name || (name = '');
    try {
      // set name attribute for IE6/7
      result = document.createElement('<' + tagName + ' name="' + name + '">');
    } catch(e) {
      (result = document.createElement(tagName)).name = name;
    }
    return result;
  }

  /**
   * Injects a script into the document.
   * @private
   * @param {String} src The external script source.
   * @param {Object} sibling The element to inject the script after.
   * @returns {Object} The new script element.
   */
  function loadScript(src, sibling) {
    var script = createElement('script'),
        nextSibling = sibling ? sibling.nextSibling : query('script').pop();

    script.src = src;
    return (sibling || nextSibling).parentNode.insertBefore(script,  nextSibling);
  }

  /**
   * Queries the document for elements by id or tagName.
   * @private
   * @param {String} selector The css selector to match.
   * @returns {Array} The array of results.
   */
  function query(selector) {
    var i = -1,
        result = [],
        nodes = /^#/.test(selector)
          ? [document.getElementById(selector.slice(1))]
          : document.getElementsByTagName(selector);

    while ((result[++i] = nodes[i])) { }
    return result.length-- && result;
  }

  /**
   * Set an element's innerHTML property.
   * @private
   * @param {Object} element The element.
   * @param {String} html The HTML to set.
   * @param {Object} object The template object used to modify the html.
   */
  function setHTML(element, html, object) {
    element.innerHTML = interpolate(html, object);
  }

  /**
   * Displays a message in the "results" element.
   * @private
   * @param {String} text The text to display.
   */
  function setMessage(text) {
    var me = ui.browserscope,
        cont = me.container;

    if (cont) {
      cont.className = 'bs-rt-message';
      cont.innerHTML = text;
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Periodically executed callback that removes injected script and iframe elements.
   * @private
   */
  function cleanup() {
    var me = ui.browserscope,
        timings = me.timings,
        timers = cache.timers,
        trash = cache.trash,
        delay = timings.cleanup * 1e3;

    // remove injected scripts and old iframes when benchmarks aren't running
    if (!ui.running && timers.cleanup) {
      // if expired, destroy the element to prevent pseudo memory leaks.
      // http://dl.dropbox.com/u/513327/removechild_ie_leak.html
      each(query('script').concat(query('iframe')), function(element) {
        var expire = +(/^browserscope-\d+-(\d+)$/.exec(element.name) || 0)[1] + Math.max(delay, timings.timeout * 1e3);
        if (now() > expire || /browserscope\.org/.test(element.src)) {
          trash.appendChild(element);
          trash.innerHTML = '';
        }
      });
    }
    // schedule another round
    timers.cleanup = setTimeout(cleanup, delay);
  }

 /**
   * A simple object clone utility function.
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} A new cloned object.
   */
  function clone(object) {
    var ctor = object.constructor,
        result = ctor ? (noop.prototype = ctor.prototype, new noop) : {};

    forIn(object, function(value, key) {
      if (isArray(value)) {
        result[key] = [];
        each(value, function(value, index) {
          result[key][index] = clone(value);
        });
      }
      else if (value && typeof value == 'object') {
        result[key] = clone(value);
      }
      else {
        result[key] = value;
      }
    });
    return result;
  }

  /**
   * Creates a Browserscope results object.
   * @private
   * @returns {Object|Null} Browserscope results object or null.
   */
  function createSnapshot() {
    // clone benchmarks using the upper limit of the confidence interval to compute hz
    var benches = map(ui.benchmarks, function(bench) {
      var clone = bench.clone(),
          stats = bench.stats;

      clone.cycles = bench.cycles;
      clone.hz = Math.round(1 / (stats.mean + stats.moe));
      return clone;
    });

    // remove unrun, errored, or Infinity hz
    benches = filter(benches, function(bench) {
      return bench.cycles && isFinite(bench.hz);
    });

    // duplicate and non alphanumeric benchmark names have their ids appended
    return reduce(benches, function(result, bench, key) {
      key = (bench.name.match(/[a-z0-9]+/ig) || []).join(' ');
      result || (result = {});
      result[key && !hasKey(result, 'key') ? key : key + bench.id ] = bench.hz;
      return result;
    }, null);
  }

  /**
   * Retrieves the "cells" array from a given Google visualization data row object.
   * @private
   * @param {Object} object The data row object.
   * @returns {Array} An array of cell objects.
   */
  function getDataCells(object) {
    // resolve cells by duck typing because of munged property names
    var result = [];
    forIn(object, function(value) {
      return !(isArray(value) && (result = value));
    });
    return result;
  }

  /**
   * Retrieves the "rows" array from a given Google visualization data table object.
   * @private
   * @param {Object} object The data table object.
   * @returns {Array} An array of row objects.
   */
  function getDataRows(object) {
    var name,
        result = [];
    // resolve rows by duck typing because of munged property names
    forIn(object, function(value, key) {
      return !(isArray(value) && 0 in value && !('type' in value[0]) && (name = key, result = value));
    });
    // remove empty rows
    if (result.length) {
      result = object[name] = filter(result, function(value) {
        var cell = getDataCells(value)[1];
        return cell && (cell.f || cell.v);
      });
    }
    return result;
  }

  /**
   * Retrieves the "labels" array from a given Google visualization data table object.
   * @private
   * @param {Object} object The data table object.
   * @returns {Array} An array of label objects.
   */
  function getDataLabels(object) {
    // resolve titles by duck typing because of munged property names
    var result = [];
    forIn(object, function(value) {
      return !(isArray(value) && 0 in value && 'type' in value[0] && (result = value));
    });
    return result;
  }

  /**
   * Checks if a value has an internal [[Class]] of Array.
   * @private
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the value has an internal [[Class]] of Array, else `false`.
   */
  function isArray(value) {
    return toString.call(value) == '[object Array]';
  }

  /**
   * Modify a string by replacing named tokens with matching object property values.
   * @private
   * @param {String} string The string to modify.
   * @param {Object} object The template object.
   * @returns {String} The modified string.
   */
  function interpolate(string, object) {
    return reduce(object || {}, function(string, value, key) {
      return string.replace(RegExp('#\\{' + key + '\\}', 'g'), value);
    }, string);
  }

  /**
   * A no-operation function.
   * @private
   */
  function noop() {
    // no operation performed
  }

  /**
   * Returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
   * @private
   * @returns {Number} Number of milliseconds.
   */
  function now() {
    return +new Date;
  }

  /**
   * Cleans up the last action and sets the current action.
   * @private
   * @param {String} action The current action.
   */
  function setAction(action) {
    clearTimeout(cache.timers[cache.lastAction]);
    cache.lastAction = action;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Loads Browserscope's cumulative results table.
   * @static
   * @member ui.browserscope
   * @param {Object} options The options object.
   */
  function load(options) {
    options || (options = {});

    var retried,
        me = ui.browserscope,
        filterBy = cache.lastFilterBy = 'filterBy' in options ? options.filterBy : cache.lastFilterBy;

    function onComplete(response) {
      // set a flag to avoid Google's own timeout
      retried || (retried = true, me.render({ 'response': response }));
    }

    if (me.container) {
      // set last action in case Browserscope fails to return data and a retry is needed
      setAction('load');

      // set our own load timeout to display an error message and retry loading
      cache.timers.load = setTimeout(onComplete, me.timings.timeout * 1e3);

      // set "loading" message and attempt to load Browserscope data
      setMessage(me.texts.loading);

      (new google.visualization.Query(
        '//www.browserscope.org/gviz_table_data?' +
        'category=usertest_' + me.key + '&' +
        'highlight=&' +
        'o=gviz_data&' +
        'rid=' + now() + '&' +
        'score=&' +
        'tqx=reqId:0&' +
        'ua=&' +
        'v=' + filterMap[filterBy],
        { 'sendMethod': 'scriptInjection' }
      ))
      .send(onComplete);
    }
  }

  /**
   * Creates a Browserscope beacon and posts the benchmark results.
   * @static
   * @member ui.browserscope
   */
  function post() {
    var idoc,
        iframe,
        body = document.body,
        me = ui.browserscope,
        key = me.key,
        timings = me.timings,
        name = 'browserscope-' + (cache.counter++) + '-' + now(),
        snapshot = createSnapshot();

    if (key && snapshot && !/Simulator/i.test(Benchmark.platform)) {
      // set last action in case the Browserscope post fails and a retry is needed
      setAction('post');

      // create new beacon
      iframe = createElement('iframe', name);
      body.insertBefore(iframe, body.firstChild);
      idoc = frames[name].document;
      iframe.style.display = 'none';

      // expose results snapshot
      me.snapshot = snapshot;

      // set "posting" message and attempt to post the results snapshot
      setMessage(me.texts.post);

      idoc.write(interpolate(
        // the doctype is required so Browserscope detects the correct IE compat mode
        '#{doctype}<html><body><script>' +
        'with(parent.ui.browserscope){' +
        'var _bTestResults=snapshot,' +
        '_bC=function(){clearTimeout(_bT);parent.setTimeout(load,#{refresh}*1e3)},' +
        '_bT=setTimeout(function(){_bC=function(){};render()},#{timeout}*1e3)' +
        '}<\/script>' +
        '<script src=//www.browserscope.org/user/beacon/#{key}?callback=_bC><\/script>' +
        '</body></html>',
        {
          'doctype': /css/i.test(document.compatMode) ? '<!doctype html>' : '',
          'key': key,
          'refresh': timings.refresh,
          'timeout': timings.timeout
        }
      ));
      // avoid the IE spinner of doom
      // http://www.google.com/search?q=IE+throbber+of+doom
      idoc.close();
    }
  }

  /**
   * Renders the cumulative results table.
   * (tweak the dimensions and styles to best fit your environment)
   * @static
   * @member ui.browserscope
   * @param {Object} options The options object.
   */
  function render(options) {
    options || (options = {});

    var data,
        labels,
        rows,
        me = this,
        areaHeight = '68%',
        areaWidth = '100%',
        cont = me.container,
        left = 130,
        top = 50,
        height = 'auto',
        width = height,
        hTitle = 'operations per second (higher is better)',
        vTitle = '',
        legend = 'top',
        minHeight = 480,
        minWidth = cont.offsetWidth || 948,
        response = cache.lastResponse = 'response' in options ? (response = options.response) && !response.isError() && response : cache.lastResponse,
        type = cache.lastType = 'type' in options ? options.type : cache.lastType,
        title = '';

    function retry(force) {
      var action = cache.lastAction;
      if (force || ui.running) {
        cache.timers[action] = setTimeout(retry, me.timings.retry * 1e3);
      } else {
        me[action].apply(me, action == 'render' ? [options] : []);
      }
    }

    // set action to clear any timeouts and prep for retries
    setAction(response ? 'render' : cache.lastAction);

    // retry if response data is empty/errored or benchmarks are running
    if (cont && (!response || ui.running)) {
      // set error message for empty/errored response
      !response && setMessage(me.texts.error);
      retry(true);
    }
    // exit early if there is no container element or the data filter has changed
    else if (!cont || 'filterBy' in options) {
      cont && load(options);
    }
    // visualization chart gallary
    // http://code.google.com/apis/chart/interactive/docs/gallery.html
    else {
      cont.className = '';
      data = clone(response.getDataTable());
      labels = getDataLabels(data);
      rows = getDataRows(data);
      type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

      // adjust data for non-tabular displays
      if (chartMap[type]) {
        // remove "test run count" label (without the label the row will be ignored)
        labels.pop();
        // adjust captions and chart dimensions
        if (type == 'Bar') {
          // compute `areaHeight` on a slide between 68 and 90 percent
          areaHeight = 68 + Math.min(22, Math.floor(0.22 * (rows.length * 6))) + '%';
          height = Math.max(minHeight, rows.length * 50 + 70);
          left = 150;
        }
        else {
          // swap captions (the browser list caption is blank to conserve space)
          vTitle = [hTitle, hTitle = vTitle][0];
          height = minHeight;
          if (type == 'Pie') {
            legend = 'right';
            title = 'Total Operations Per Second By Browser';
          } else {
            width = Math.max(minWidth, rows.length * 50 + 100);
            // adjust when there is no horizontal scroll
            if (width == minWidth && labels.length < 8) {
              areaHeight = '80%';
            }
          }
        }
        // modify row data
        each(rows, function(row) {
          each(getDataCells(row), function(cell, index, cells) {
            var lastIndex = cells.length - 1;
            // assign ops/sec
            if (/^[\d.,]+$/.test(cell.f)) {
              cell.v = +cell.f.replace(/,/g, '');
              cell.f += ' ops/sec';
            }
            // add test run count to browser name
            else if (cell.f) {
              cell.f += type == 'Pie' ? '' : ' (' + (cells[lastIndex].v || 1) + ')';
            }
            // compute sum of all ops/sec for pie charts
            if (type == 'Pie') {
              if (index == lastIndex) {
                cells[1].f = Benchmark.formatNumber(cells[1].v) + ' total ops/sec';
              } else if (index > 1 && typeof cell.v == 'number') {
                cells[1].v += cell.v;
              }
            }
          });
        });
        // make type recognizable
        type += 'Chart';
      }

      if (rows.length) {
        new google.visualization[type](cont).draw(data, {
          'fontSize': 13,
          'is3D': true,
          'legend': legend,
          'height': height,
          'title': title,
          'width': width,
          'chartArea': { 'height': areaHeight, 'left': left, 'top': top, 'width': areaWidth },
          'hAxis': { 'title': hTitle },
          'vAxis': { 'title': vTitle }
        });
      } else {
        setMessage(me.texts.empty);
      }
    }
  }

  /*--------------------------------------------------------------------------*/

  // expose
  ui.browserscope = {

    /** Your Browserscope API key */
    'key': '',

    /** Selector of the element used for displaying the cumulative results table */
    'selector': '',

    /** Object containing various timings settings */
    'timings': {

      /** The delay between removing abandoned script and iframe elements (secs) */
      'cleanup': 10,

      /** The delay before refreshing the cumulative results after posting (secs) */
      'refresh': 3,

      /** The delay between load attempts (secs) */
      'retry': 5,

      /** The time to wait for a request to finish (secs) */
      'timeout': 10
    },

    /** Object containing various text messages */
    'texts': {

      /** Text shown when their is no recorded data available to report */
      'empty': 'No data available',

      /** Text shown when the cumulative results data cannot be retrieved */
      'error': 'The get/post request has failed :(',

      /** Text shown while waiting for the cumulative results data to load */
      'loading': 'Loading cumulative results data&hellip;',

      /** Text shown while posting the results snapshot to Browserscope */
      'post': 'Posting results snapshot&hellip;'
    },

    // loads cumulative results table
    'load': load,

    // posts benchmark snapshot to Browserscope
    'post': post,

    // renders cumulative results table
    'render': render
  };

  /*--------------------------------------------------------------------------*/

  addListener(window, 'load', function() {
    var me = ui.browserscope,
        key = me.key,
        placeholder = key && query(me.selector)[0];

    // create results html
    // http://code.google.com/apis/loader/autoloader-wizard.html
    if (placeholder) {
      setHTML(placeholder,
        '<h1 id=bs-logo><a href=//www.browserscope.org/user/tests/table/#{key}>' +
        '<span>Browserscope</span></a></h1>' +
        '<div class=bs-rt><div id=bs-rt-usertest_#{key}></div></div>',
        { 'key': key });

      me.container = query('#bs-rt-usertest_' + key)[0];
      loadScript('//www.browserscope.org/ua?o=js', me.container).id = 'bs-ua-script';
      loadScript('//www.google.com/jsapi?autoload=%7B%22modules%22%3A%5B%7B%22name%22%3A%22visualization%22%2C%22version%22%3A%221%22%2C%22packages%22%3A%5B%22corechart%22%2C%22table%22%5D%2C%22callback%22%3Aui.browserscope.load%7D%5D%7D');

      // init garbage collector
      cleanup();
    }
  });

}(this, document));