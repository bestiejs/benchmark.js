
(function(window, document) {

  /** Cache used by various methods */
  var cache = {
    'counter': 0,
    'lastAction': 'load',
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
   * Shortcut for document.createElement().
   * @private
   * @param {String} tag The tag name of the element to create.
   * @returns {Object} A new of the given tag name element.
   */
  function createElement(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Creates a Browserscope results object (skipping unrun and errored benchmarks).
   * @private
   * @param {Array|Object} [benches=ui.benchmarks] One or an array of benchmarks.
   * @returns {Object|Null} Browserscope results object or null.
   */
  function createSnapshot(benches) {
    if (!Benchmark.isArray(benches)) {
      benches = benches ? [benches] : ui.benchmarks;
    }
    return Benchmark.reduce(benches, function(result, bench, key) {
      if (bench.cycles) {
        // duplicate and non alphanumeric benchmark names have their ids appended
        key = (bench.name.match(/[a-z0-9]+/ig) || []).join(' ');
        result || (result = { });
        result[key && !result[key] ? key : key + bench.id ] = bench.hz;
      }
      return result;
    }, null);
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
   * Returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
   * @private
   * @returns {Number} Number of milliseconds.
   */
  function now() {
    return +new Date;
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

    while (result[++i] = nodes[i]) { }
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
    element.innerHTML = template(html, object);
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

  /**
   * Modify a string by replacing named tokens with matching object property values.
   * @private
   * @param {String} string The string to modify.
   * @param {Object} object The template object.
   * @returns {String} The modified string.
   */
  function template(string, object) {
    string = string == null ? '' : string;
    object || (object = { });
    for (var key in object) {
      string = string.replace(RegExp('#\\{' + key + '\\}', 'g'), object[key]);
    }
    return string;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Periodically executed callback that removes injected script and iframe elements.
   * @private
   */
  function onCleanup() {
    var expire,
        name,
        me = ui.browserscope,
        delay = me.CLEANUP_INTERVAL * 1e3,
        trash = cache.trash;

    // remove injected scripts and old iframes
    if (onCleanup.id) {
      Benchmark.each(query('script').concat(query('iframe')), function(element) {
        // check if element is expired
        name = element.name;
        expire = +(/^browserscope-\d+-(\d+)$/.exec(name) || 0)[1] +
                 Math.max(delay, me.REQUEST_TIMEOUT * 1e3);

        // destroy the element to prevent pseudo memory leaks.
        // http://dl.dropbox.com/u/513327/removechild_ie_leak.html
        if (now() > expire || /browserscope\.org/.test(element.src)) {
          trash.appendChild(element);
          trash.innerHTML = '';
        }
      });
    }
    // schedule another round
    onCleanup.id = setTimeout(onCleanup, delay);
  }

  /**
   * The window load event handler used to initialize the results table.
   * @private
   */
  function onLoad() {
    var cont,
        me = ui.browserscope,
        key = me.KEY,
        placeholder = query(me.PLACEHOLDER_SELECTOR)[0];

    if (placeholder) {
      // set html of placeholder using a template
      setHTML(placeholder,
        '<h1 id=bs-logo><a href=//www.browserscope.org/user/tests/table/#{key}>' +
        '<span>Browserscope<\/span><\/a><\/h1>' +
        '<div class=bs-rt><div id=bs-rt-usertest_#{key}><\/div><\/div>',
        {
          'key': key
        }
      );

      // resolve container
      cont = me.container = query('#bs-rt-usertest_' + key)[0];

      // load ua script
      loadScript('//www.browserscope.org/ua?o=js', cont).id = 'bs-ua-script';

      // load google visualization script
      // http://code.google.com/apis/loader/autoloader-wizard.html
      loadScript('//www.google.com/jsapi?autoload=%7B%22modules%22%3A%5B%7B%22name%22%3A%22visualization%22%2C%22version%22%3A%221%22%2C%22packages%22%3A%5B%22table%22%5D%2C%22callback%22%3Aui.browserscope.load%7D%5D%7D');
    }

    // init garbage collector
    onCleanup();
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
        timer = setTimeout(onComplete, me.REQUEST_TIMEOUT * 1e3);

    function onComplete(response) {
      clearTimeout(timer);
      me.render(response);
    }

    // request data
    if (cont) {
      setMessage(me.LOADING_TEXT);
      cache.lastAction = 'load';
      (new google.visualization.Query(
        '//www.browserscope.org/gviz_table_data?' +
        'category=usertest_' + me.KEY + '&' +
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
   * @param {Array|Object} [benches=ui.benchmarks] One or an array of benchmarks.
   */
  function post(benches) {
    var idoc,
        iframe,
        body = document.body,
        me = ui.browserscope,
        key = me.KEY,
        name = 'browserscope-' + (cache.counter++) + '-' + now(),
        snapshot = createSnapshot(benches);

    if (key && snapshot) {
      // create new beacon
      try {
        iframe = createElement('<iframe name=' + name + '>');
      } catch(e) {
        (iframe = createElement('iframe')).name = name;
      }
      // inject beacon
      body.insertBefore(iframe, body.firstChild);
      idoc = frames[name].document;
      iframe.style.display = 'none';

      // expose results snapshot
      me.snapshot = snapshot;

      setMessage(me.POST_TEXT);
      cache.lastAction = 'post';

      // perform inception :3
      idoc.write(template(
        '<html><body><script>' +
        'with(parent.ui.browserscope){' +
        'var _bTestResults=snapshot,' +
        '_bC=function(){clearTimeout(_bT);parent.setTimeout(load,#{refresh}*1e3)},' +
        '_bT=setTimeout(function(){document.body.innerHTML=render()},#{timeout}*1e3)' +
        '}<\/script>' +
        '<script src=//www.browserscope.org/user/beacon/#{key}?callback=_bC><\/script>' +
        '<\/body><\/html>',
        {
          'key': key,
          'refresh': me.REFRESH_DELAY,
          'timeout': me.REQUEST_TIMEOUT
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
        cont = me.container;

    // visualization table options
    // http://code.google.com/apis/visualization/documentation/gallery/table.html
    if (cont) {
      if (response && !response.isError()) {
        cont.className = '';
        (new google.visualization.Table(cont)).draw(response.getDataTable(), {
          'width': 'auto',
          'height': 'auto',
          'alternatingRowStyle': false
        });
      }
      else {
        setMessage(me.ERROR_TEXT);
        setTimeout(me[cache.lastAction], me.RETRY_INTERVAL * 1e3);
      }
    }
  }

  /*--------------------------------------------------------------------------*/

  // expose
  ui.browserscope = {

    /** Your Browserscope API key */
    'KEY': '',

    /** Selector of the element used for displaying the cumulative results table */
    'PLACEHOLDER_SELECTOR': '',

    /** The delay between removing abandoned script and iframe elements (secs) */
    'CLEANUP_INTERVAL': 10,

    /** The delay before refreshing the cumulative results after posting (secs) */
    'REFRESH_DELAY': 3,

    /** The time to wait for a request to finish (secs) */
    'REQUEST_TIMEOUT': 10,

    /** The delay between load attempts (secs) */
    'RETRY_INTERVAL': 5,

    /** Text shown when the cumulative results data cannot be retrieved */
    'ERROR_TEXT': 'The get/post request has failed :(',

    /** Text shown while waiting for the cumulative results data to load */
    'LOADING_TEXT': 'Loading cumulative results data&hellip;',

    /** Text shown while posting the results snapshot to Browserscope */
    'POST_TEXT': 'Posting results snapshot&hellip;',

    // loads cumulative results table
    'load': load,

    // posts benchmark snapshot to Browserscope
    'post': post,

    // renders cumulative results table
    'render': render
  };

  // create results table chrome
  addListener(window, 'load', onLoad);

}(this, document));