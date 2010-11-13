
(function(window, document) {

 /** Cache used by various methods */
  var cache = {
    'counter': 0,
    'trash': createElement('div')
  };

  /*--------------------------------------------------------------------------*/

 /**
  * Shortcut for document.createElement().
  * @private
  * @param {String} tag The tag name of the element to create.
  * @returns {Object} A new of the given tag name element.
  */
  function createElement(tagName) {
    return document.createElement(tagName);
  }

  /*--------------------------------------------------------------------------*/

 /**
  * Moves the given element to a detached div and destroys it.
  * @static
  * @member ui.browserscope
  * @param {Object} element The element to destroy.
  */
  function destroyElement(element) {
    cache.trash.appendChild(element);
    cache.trash.innerHTML = '';
  }

 /**
  * Creates Browserscope results object (skipping unrun and errored benchmarks).
  * @static
  * @member ui.browserscope
  * @returns {Object} Browserscope results object.
  */
  function getResults() {
    return Benchmark.reduce(ui.benchmarks, function(result, benchmark, key) {
      if (benchmark.cycles) {
        // duplicate and non alphanumeric benchmark names have their ids appended
        key = (benchmark.name.match(/[a-z0-9]+/ig) || []).join(' ');
        result[key && !result[key] ? key : key + benchmark.id ] = benchmark.hz;
      }
      return result;
    }, { });
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
        name = 'browserscope-' + cache.counter++;

    if (key) {
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

      // perform inception :3
      idoc.write('<html><body><script>' +
                 'with(parent.ui.browserscope){' +
                 'var _bTestResults=getResults(),' +
                 '_bD=1e3*' + me.TIMEOUT + ',' +
                 '_bT=function(){parent.setTimeout(refresh,_bD);destroyElement(frameElement)},' +
                 '_bK=setTimeout(_bT,_bD),' +
                 '_bP=function(){clearTimeout(_bK);setTimeout(_bT,_bD)}' +
                 '}<\/script>' +
                 '<script src=//www.browserscope.org/user/beacon/' + key + '?callback=_bP><\/script>' +
                 '<\/body><\/html>');
      idoc.close();
    }
  }

 /**
  * Refreshes the Browserscope cumulative results table.
  * Requires ui.browserscope.refresh to be assigned as the table script's callback.
  * <script src="//browserscope.org/user/tests/table/<YOUR_API_KEY>?callback=ui.browserscope.refresh"></script>
  * @static
  * @member ui.browserscope
  */
  function refresh(api) {
    var me = this;
    api || (api = { 'load': Benchmark.noop });

    function refresh() {
      api.load();
    }

    if (!me.KEY) {
      // auto detect api key
      Benchmark.each(document.getElementsByTagName('script'), function(script) {
        var src = script.src;
        if ((src.match(/browserscope\.(?:org|refresh)/g) || []).length == 2) {
          me.KEY = (/[^?/]+(?=\?)/.exec(src) || 0)[0];
          return false;
        }
      });
    }
    // lazy defined by Browserscope script callback
    ui.browserscope.refresh = refresh;
  }

  /*--------------------------------------------------------------------------*/

  // expose
  ui.browserscope = {

    /** Your Browserscope API key */
    'KEY': '',

    /** Seconds to wait for each stage of the Browserscope posting process (3 stages) */
    'TIMEOUT': 3,

    // remove elements from the document and avoid pseudo memory leaks
    // http://dl.dropbox.com/u/513327/removechild_ie_leak.html
    'destroyElement': destroyElement,

    // creates results object
    'getResults': getResults,

    // posts results to Browserscope
    'post': post,

    // refreshes Browserscope results
    'refresh': refresh
  };

}(this, document));