
(function(window, document) {

 /** Cache used by various methods */
  var cache = {
    'counter': 0,
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
  * Creates Browserscope results object (skipping unrun and errored benchmarks).
  * @private
  * @returns {Object|Null} Browserscope results object or null.
  */
  function createSnapshot() {
    return Benchmark.reduce(ui.benchmarks, function(result, benchmark, key) {
      if (benchmark.cycles) {
        // duplicate and non alphanumeric benchmark names have their ids appended
        key = (benchmark.name.match(/[a-z0-9]+/ig) || []).join(' ');
        result || (result = { });
        result[key && !result[key] ? key : key + benchmark.id ] = benchmark.hz;
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
  * @param {Object} template The template object used to modify the html
  */
  function setHTML(element, html, template) {
    html = html == null ? '' : html;
    template || (template = { });
    for (var key in template) {
      html = html.replace(RegExp('#\\{' + key + '\\}', 'g'), template[key]);
    }
    element.innerHTML = html;
  }

 /**
  * Displays a loading message in the results element.
  * @private
  */
  function standBy() {
    var me = ui.browserscope,
        cont = me.container;
    if (cont) {
      cont.className = 'bs-rt-loading';
      cont.innerHTML = me.STAND_BY_TEXT;
    }
  }

  /*--------------------------------------------------------------------------*/

 /**
  * Periodically executed callback that removes injected script elements and old iframes.
  * @private
  */
  function onCleanup() {
    var expire, name
        me = ui.browserscope,
        delay = me.CLEANUP_INTERVAL * 1e3,
        trash = cache.trash;

    // remove injected scripts and old iframes
    if (onCleanup.id) {
      Benchmark.each(query('script').concat(query('iframe')), function(element) {

        // check if element is expired
        name = element.name;
        expire = +(/^browserscope-\d+-(\d+)$/.exec(name) || 0)[1] + delay;

        // destroy the element to prevent pseudo memory leaks.
        // http://dl.dropbox.com/u/513327/removechild_ie_leak.html
        if (+new Date > expire || /browserscope\.org/.test(element.src)) {
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
        cont = me.container;

    function onComplete(response) {
      me.render(response);
    }

    // display "stand by" message
    standBy();

    // request data
    if (cont) {
      (new google.visualization.Query(
        '//www.browserscope.org/gviz_table_data?' +
        'category=usertest_' + me.KEY + '&' +
        'ua=&' +
        'v=3&' +
        'o=gviz_data&' +
        'highlight=&' +
        'score=&' +
        'tqx=reqId:0',
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
        me = this,
        key = me.KEY,
        name = 'browserscope-' + (cache.counter++) + '-' + (+new Date),
        snapshot = createSnapshot();

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

      // display "stand by" message
      standBy();

      // expose snapshot of benchmark results
      me.snapshot = snapshot;

      // perform inception :3
      idoc.write('<html><body><script>' +
                 'with(parent.ui.browserscope){' +
                 'var _bTestResults=snapshot,' +
                 '_bC=function(){parent.setTimeout(load,' + me.REFRESH_DELAY + '*1e3)}' +
                 '}<\/script>' +
                 '<script src=//www.browserscope.org/user/beacon/' + key + '?callback=_bC><\/script>' +
                 '<\/body><\/html>');
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
      if (!response.isError()) {
        cont.className = '';
        (new google.visualization.Table(cont)).draw(response.getDataTable(), {
          'width': 'auto',
          'height': 'auto',
          'alternatingRowStyle': false
        });
      }
      else {
        setHTML(cont, me.ERROR_TEXT);
        setTimeout(load, me.RETRY_INTERVAL * 1e3);
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

    /** The delay between removing abandoned script elements and iframes (secs) */
    'CLEANUP_INTERVAL': 10,

    /** The delay before refreshing the cumulative results after posting (secs) */
    'REFRESH_DELAY': 3,

    /** The delay beteen load attempts (secs) */
    'RETRY_INTERVAL': 10,

    /** Text shown when the cumulative results data cannot be retrieved */
    'ERROR_TEXT': 'An error occurred while retrieving the Browserscope data :(',

    /** Text shown while waiting for the cumulative results data */
    'STAND_BY_TEXT': 'Loading Browserscope data&hellip;',

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