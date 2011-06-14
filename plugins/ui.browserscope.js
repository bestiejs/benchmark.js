(function(window, document) {

  /** Cache used by various methods */
  var cache = {
    'counter': 0,
    'lastAction': 'load',
    'timers': { 'cleanup': null, 'load': null, 'post': null },
    'trash': createElement('div')
  };

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
    } else if (element.attachEvent != 'undefined') {
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

    while (result[++i] = nodes[i]);
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

    // remove injected scripts and old iframes
    if (timers.cleanup) {
      // if expired, destroy the element to prevent pseudo memory leaks.
      // http://dl.dropbox.com/u/513327/removechild_ie_leak.html
      Benchmark.each(query('script').concat(query('iframe')), function(element) {
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
   * Creates a Browserscope results object.
   * @private
   * @returns {Object|Null} Browserscope results object or null.
   */
  function createSnapshot() {
    // clone benchmarks using the upper limit of the confidence interval to compute hz
    var benches = Benchmark.map(ui.benchmarks, function(bench, i) {
      var clone = bench.clone(),
          stats = bench.stats;

      clone.cycles = bench.cycles;
      clone.hz = Math.round(1 / (stats.mean + stats.moe));
      clone.id || (clone.id = i + 1);
      return clone;
    });

    // remove unrun, errored, or Infinity hz
    benches = Benchmark.filter(benches, function(bench) {
      return bench.cycles && isFinite(bench.hz);
    });

    // duplicate and non alphanumeric benchmark names have their ids appended
    return Benchmark.reduce(benches, function(result, bench, key) {
      key = (bench.name.match(/[a-z0-9]+/ig) || []).join(' ');
      result || (result = { });
      result[key && !result[key] ? key : key + bench.id ] = bench.hz;
      return result;
    }, null);
  }

  /**
   * Modify a string by replacing named tokens with matching object property values.
   * @private
   * @param {String} string The string to modify.
   * @param {Object} object The template object.
   * @returns {String} The modified string.
   */
  function interpolate(string, object) {
    return Benchmark.reduce(object || { }, function(string, value, key) {
      return string.replace(RegExp('#\\{' + key + '\\}', 'g'), value);
    }, string);
  }

  /**
   * Returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
   * @private
   * @returns {Number} Number of milliseconds.
   */
  function now() {
    return +new Date;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Loads Browserscope's cumulative results table.
   * @static
   * @member ui.browserscope
   */
  function load() {
    var me = ui.browserscope,
        cont = me.container,
        timers = cache.timers;

    function onComplete(response) {
      clearTimeout(timers.load);
      me.render(response);
    }

    cache.lastAction = 'load';
    clearTimeout(timers.load);
    timers.load = setTimeout(onComplete, me.timings.timeout * 1e3);

    // request data
    if (cont) {
      setMessage(me.texts.loading);
      (new google.visualization.Query(
        '//www.browserscope.org/gviz_table_data?' +
        'category=usertest_' + me.key + '&' +
        'ua=&' +
        'v=3&' +
        'o=gviz_data&' +
        'highlight=&' +
        'score=&' +
        'tqx=reqId:0&' +
        'rid=' + now(),
        {'sendMethod': 'scriptInjection'}))
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

    cache.lastAction = 'post';
    clearTimeout(cache.timers.post);

    if (key && snapshot && !/Simulator/i.test(Benchmark.platform)) {
      // create new beacon
      iframe = createElement('iframe', name);
      body.insertBefore(iframe, body.firstChild);
      idoc = frames[name].document;
      iframe.style.display = 'none';

      // expose results snapshot
      me.snapshot = snapshot;
      setMessage(me.texts.post);

      // perform inception :3
      idoc.write(interpolate(
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

      idoc.close();
    }
  }

  /**
   * Renders the cumulative results table.
   * @static
   * @member ui.browserscope
   * @param {Object} response The data object.
   */
  function render(response) {
    var me = this,
        action = cache.lastAction,
        cont = me.container,
        delay = me.timings.retry * 1e3,
        timers = cache.timers;

    function retry() {
      if (ui.running) {
        timers[action] = setTimeout(retry, delay);
      } else if (action == 'render') {
        me[action](response);
      } else {
        me[action]();
      }
    }

    // visualization table options
    // http://code.google.com/apis/visualization/documentation/gallery/table.html
    if (cont) {
      if (response && !response.isError()) {
        if (ui.running) {
          action = cache.lastAction = 'render';
          timers[action] = setTimeout(retry, delay);
        }
        else {
          cont.className = '';
          (new google.visualization.Table(cont)).draw(response.getDataTable(), {
            'width': 'auto',
            'height': 'auto',
            'alternatingRowStyle': false
          });
        }
      }
      else {
        setMessage(me.texts.error);
        timers[action] = setTimeout(retry, delay);
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
        placeholder = query(me.selector)[0];

    // create results table
    // http://code.google.com/apis/loader/autoloader-wizard.html
    if (placeholder) {
      setHTML(placeholder,
        '<h1 id=bs-logo><a href=//www.browserscope.org/user/tests/table/#{key}>' +
        '<span>Browserscope</span></a></h1>' +
        '<div class=bs-rt><div id=bs-rt-usertest_#{key}></div></div>',
        { 'key': key });
      me.container = query('#bs-rt-usertest_' + key)[0];
      loadScript('//www.browserscope.org/ua?o=js', me.container).id = 'bs-ua-script';
      loadScript('//www.google.com/jsapi?autoload=%7B%22modules%22%3A%5B%7B%22name%22%3A%22visualization%22%2C%22version%22%3A%221%22%2C%22packages%22%3A%5B%22table%22%5D%2C%22callback%22%3Aui.browserscope.load%7D%5D%7D');
    }
    // init garbage collector
    cleanup();
  });

}(this, document));