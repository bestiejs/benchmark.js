/*!
 * ui.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */

(function(global, document) {

  /** CSS class name used for error styles */
  var ERROR_CLASS = 'error',

   /** CSS clasName used for `js enabled` styles */
   JS_CLASS = 'js',

   /** CSS class name used to display error-info */
   SHOW_CLASS = 'show',

   /** CSS class name used to reset result styles */
   RESULTS_CLASS = 'results',

   /** The id of the iframe containing the Browserscope results */
   BROWSERSCOPE_ID = 'browserscope',

   /** Seconds to wait for each stage of the Browserscope posting process (3 stages) */
   BROWSERSCOPE_TIMEOUT = 2.5,

   /** Google Analytics account id */
   GA_ACCOUNT_ID = 'UA-6065217-40',

   /** Benchmark results element id prefix (e.g. `results-1`) */
   RESULTS_PREFIX = 'results-',

   /**  Inner text for the various run button states */
   RUN_TEXT = {
     'RUNNING': 'Stop tests',
     'RUN_AGAIN': 'Run tests again',
     'STOPPED': 'Run tests'
   },

   /** Common status values */
   STATUS_TEXT = {
     'READY': 'Ready to run tests.',
     'READY_AGAIN': 'Done. Ready to run tests again.'
   },

   cache = {
     'counter': 0,
     'errors': [],
     'trash': createElement('div')
   },

   each = Benchmark.each;

  /*--------------------------------------------------------------------------*/

 /**
  * Shortcut for document.getElementById().
  * @private
  * @param {String|Object} id The id of the element to retrieve.
  * @returns {Object} The element, if found, or null.
  */
  function $(id) {
    return typeof id == 'string' ? document.getElementById(id) : id;
  }

 /**
  * Adds a css class name to an element's className property.
  * @private
  * @param {Object} element The element.
  * @param {String} className The class name.
  */
  function addClass(element, className) {
    if (!hasClass(element = $(element), className)) {
      element.className += (element.className ? ' ' : '') + className;
    }
  }

 /**
  * Appends to an element's innerHTML property.
  * @private
  * @param {Object} element The element.
  * @param {String} html The HTML to append.
  */
  function appendHTML(element, html) {
    html != null && ($(element).innerHTML += html);
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
  * Checks if an element is assigned the given class name.
  * @private
  * @param {Object} element The element.
  * @param {String} className The class name.
  * @returns {Boolean} If assigned the class name return true, else false.
  */
  function hasClass(element, className) {
    return (' ' + $(element).className + ' ').indexOf(' ' + className + ' ') > -1;
  }

 /**
  * Set an element's innerHTML property.
  * @private
  * @param {Object} element The element.
  * @param {String} html The HTML to set.
  */
  function setHTML(element, html) {
    $(element).innerHTML = html == null ? '' : html;
  }

 /**
  * A generic bare-bones Array#indexOf solution.
  * @private
  * @param {Array} array The array to iterate over.
  * @param {Mixed} value The value to search for.
  * @returns {Number} The index of the matched value or -1.
  */
  function indexOf(array, value) {
    var result = -1;
    each(array, function(v, i) {
      if (v === value) {
        result = i;
        return false;
      }
    });
    return result;
  }

 /**
  * Converts a number to a more readable string representation.
  * @private
  * @param {Number} number The number to convert.
  * @returns {String} The more readable string representation.
  */
  function formatNumber(number) {
    var comma = ',',
        string = String(Math.max(0, Math.abs(number).toFixed(0))),
        length = string.length,
        end = /^\d{4,}$/.test(string) ? length % 3 : 0;

    return (end ? string.slice(0, end) + comma : '') +
      string.slice(end).replace(/(\d{3})(?=\d)/g, '$1' + comma);
  }

 /**
  * Retrieves the test from the `ui` object that matches the given id.
  * @private
  * @param {String} id The id of the test to retrieve.
  * @returns {Object} The test, if found, else null.
  */
  function getTestById(id) {
    var result = null;
    each(ui.tests, function(test) {
      if (test.id == id) {
        result = test;
        return false;
      }
    });
    return result;
  }

 /**
  * Creates a string of joined object key-value pairs.
  * @private
  * @param {Object} object The object to operate on.
  * @param {String} delimit1 The delimiter used between keys and values.
  * @param {String} delimit2 The delimiter used between key-value pairs.
  * @returns {String} The joined result.
  */
  function join(object, delimit1, delimit2) {
    var key,
        pairs = [];

    for (key in object) {
      pairs.push(key + delimit1 + object[key]);
    }
    return pairs.join(delimit2);
  }

 /**
  * Appends to or clears the error log.
  * @private
  * @param {String|Boolean} text The the text to append or false to clear.
  */
  function logError(text) {
    var elTable,
        elDiv = $('error-info');

    if (!elDiv) {
      elTable = $('test-table');
      elDiv = createElement('div');
      elDiv.id = 'error-info';
      elTable.parentNode.insertBefore(elDiv, elTable.nextSibling);
    }
    if (text === false) {
      elDiv.className = elDiv.innerHTML = '';
      cache.errors.length = 0;
    }
    else {
      if (indexOf(cache.errors, text) < 0) {
        cache.errors.push(text);
        addClass(elDiv, SHOW_CLASS);
        appendHTML(elDiv, text);
      }
    }
  }

 /**
  * Sets the status text.
  * @private
  * @param {String} text The text write to the status.
  */
  function logStatus(text) {
    setHTML('status', text);
  }

 /**
  * Renders the results table cell of the corresponding benchmark.
  * @private
  * @param {Object} test The benchmark instance.
  */
  function renderTest(test) {
    var cell = $(RESULTS_PREFIX + test.id);
    cell.title = '';

    if (test.error) {
      setHTML(cell, 'Error');
      if (!hasClass(cell, ERROR_CLASS)) {
        addClass(cell, ERROR_CLASS);
      }
      logError('<p>' + test.error + '.<\/p><ul><li>' + join(test.error, ': ', '<\/li><li>') + '<\/li><\/ul>');
    }
    else {
      if (test.running) {
        setHTML(cell, 'running&hellip;');
      }
      else if (test.cycles) {
        setHTML(cell, formatNumber(test.hz));
        cell.title = 'Looped ' + formatNumber(test.count) + ' times in ' + test.times.cycle + ' seconds.';
      }
      else if (indexOf(this.queue, test) > -1) {
        setHTML(cell, 'pending&hellip;');
      }
      else {
        setHTML(cell, 'ready');
      }
    }
  }

  /*--------------------------------------------------------------------------*/

 /**
  * The title table cell click event handler used to run the corresponding benchmark.
  * @private
  */
  function onClick() {
    ui.runTest(getTestById(this.id.split('-')[1]));
  }

 /**
  * The onComplete callback assigned to new benchmarks.
  * @private
  * @param {Object} test The benchmark instance.
  */
  function onComplete(test) {
    logStatus(STATUS_TEXT.READY_AGAIN);
    ui.renderTest(test);
  }

 /**
  * The onCycle callback, used for onStart as well, assigned to new benchmarks.
  * @private
  * @param {Object} test The benchmark instance.
  */
  function onCycle(test) {
    if (!test.aborted) {
      logStatus(test.name + ' &times; ' + formatNumber(test.count));
    }
  }

 /**
  * The window hashchange event handler supported by Chrome 5+, Firefox 3.6+, and IE8+.
  * @private
  */
  function onHashChange() {
    ui.parseHash();
    if (typeof global.init == 'function') {
      init();
    }
  }

 /**
  * The title cell keyup event handler used to simulate a mouse click when hitting the ENTER key.
  * @private
  */
  function onKeyUp(e) {
    if (13 == (e || global.event).keyCode) {
      onClick.call(this);
    }
  }

 /**
  * The window load event handler used to initialize the UI.
  * @private
  */
  function onLoad() {
    $('run').onclick = onRun;
    $('question').value = 'no';

    setHTML('user-agent', Benchmark.getPlatform());
    logStatus(STATUS_TEXT.READY);

    // show warning when Firebug is enabled
    if (typeof global.console != 'undefined' && typeof console.firebug == 'string') {
      addClass('firebug', 'show');
    }
    // auto-run tests when the URL has #run
    if ('run' == location.hash.slice(1, 4)) {
      onRun();
    }
    if (typeof global.init == 'function') {
      init();
    }
  }

 /**
  * The callback fired when the run queue is complete.
  * @private
  */
  function onQueueComplete() {
    var first,
        last,
        result = [];

    // populate result array (skipping unrun and errored tests)
    each(ui.tests, function(test) {
      if (test.cycles) {
        result.push({ 'id': test.id, 'hz': test.hz });
      }
    });

    if (result.length > 1) {
      // sort descending by hz (highest hz / fastest first)
      result.sort(function(a, b) { return b.hz - a.hz; });
      first = result[0];
      last  = result[result.length - 1];

      // print contextual information
      each(result, function(test) {
        var percent,
            text,
            elResult = $(RESULTS_PREFIX + test.id),
            elSpan = elResult.getElementsByTagName('span')[0];

        if (test.hz == first.hz) {
          // mark fastest
          text = 'fastest';
          addClass(elResult, 'fastest');
        }
        else {
          percent = Math.floor((1 - test.hz / first.hz) * 100);
          text = percent + '% slower';

          // mark slowest
          if (test.hz == last.hz) {
            addClass(elResult, 'slowest');
          }
        }
        if (elSpan) {
          setHTML(elSpan, text);
        } else {
          appendHTML(elResult, '<span>' + text + '<\/span>');
        }
      });

      // post results to Browserscope
      ui.browserscope.post(ui.tests);
    }
    // all tests are finished
    setHTML('run', RUN_TEXT.RUN_AGAIN);
  }

 /**
  * The "run" button click event handler used to run or abort the benchmarks.
  * @private
  */
  function onRun(e) {
    ui[$('run').innerHTML == RUN_TEXT.RUNNING ? 'abort' : 'runAll'](e);
  }

  /*--------------------------------------------------------------------------*/

 /**
  * Aborts any running benchmarks and clears the run queue.
  * @static
  * @member Benchmark
  */
  function abort() {
    var me = this;
    me.queue.length = 0;
    each(me.tests, function(test) {
      test.abort();
      me.renderTest(test);
    });
    setHTML('run', RUN_TEXT.STOPPED);
  }

 /**
  * Adds a benchmark the the collection.
  * @static
  * @member Benchmark
  * @param {String} name The name assigned to the benchmark.
  * @param {String} id The id assigned to the benchmark.
  * @param {Function} fn The function to benchmark.
  */
  function addTest(name, id, fn) {
    var me = this,
        elTitle = $('title-' + id),
        test = new Benchmark(fn, {
          'id': id,
          'name': name,
          'onStart': onCycle,
          'onCycle': onCycle,
          'onComplete': onComplete
        });

    elTitle.tabIndex = 0;
    elTitle.title = 'Click to run this test again.';
    elTitle.onclick = onClick;
    elTitle.onkeyup = onKeyUp;

    me.tests.push(test);
    me.elResults.push($(RESULTS_PREFIX + id));
    me.renderTest(test);
  }

 /**
  * Moves the given element to a detached div and destroys it.
  * @static
  * @member Benchmark
  * @param {Object} element The element to destroy.
  */
  function destroyElement(element) {
    cache.trash.appendChild(element);
    setHTML(cache.trash, '');
  }

 /**
  * Parses the window.location.hash value into an object assigned to `ui.params`.
  * @static
  * @member Benchmark
  */
  function parseHash() {
    var hashes = location.hash.slice(1).split('&'),
        params = this.params = { };

    each(hashes[0] && hashes, function(hash) {
      var pair = hashes[length].split('=');
      params[pair[0]] = pair[1];
    });
  }

 /**
  * Queues all benchmarks in the collection and runs them.
  * @static
  * @member Benchmark
  * @param {Object} e The event object.
  */
  function runAll(e) {
    var me = this;
    e || (e = global.event || { });

    me.abort();
    logError(false);

    each(Benchmark.CALIBRATIONS, function(cal) {
      cal.reset();
    });

    each(e.shiftKey ? me.tests.slice(0).reverse() : me.tests, function(test) {
      me.runTest(test);
    });
  }

 /**
  * Adds given benchmark to the queue and runs it.
  * @static
  * @member Benchmark
  * @param {Object} test The benchmark instance.
  */
  function runTest(test) {
    var me = this,
        queue = me.queue;

    if (indexOf(queue, test) < 0) {
      // reset result classNames
      each(me.elResults, function(elResult) {
        if (!hasClass(elResult, ERROR_CLASS)) {
          elResult.className = RESULTS_CLASS;
        }
      });

      if (!test.error) {
        // reset before (re)running in case testing is aborted
        // so previous results are not recorded
        test.reset();
        queue.push(test);
        me.renderTest(test);

        if (queue.length == 1) {
          setHTML('run', RUN_TEXT.RUNNING);
          Benchmark.invoke(queue, {
            'methodName': 'run',
            'queued': true,
            'onComplete': onQueueComplete
          });
        }
      }
    }
  }

  /*--------------------------------------------------------------------------*/

 /**
  * Creates a Browserscope beacon and posts the benchmark results.
  * @static
  * @member Benchmark.browserscope
  * @param {Array} tests A collection of completed benchmarks.
  */
  function post(tests) {
    var idoc,
        key,
        id = BROWSERSCOPE_ID + '-' + cache.counter++,
        body = document.body,
        result = { };

    // populate result object (skipping unrun and errored tests)
    each(tests, function(test) {
      if (test.cycles) {
        // duplicate and non alphanumeric test names get their ids appended
        key = (test.name.match(/[a-z0-9]+/ig) || []).join(' ');
        result[key && !result[key] ? key : key + test.id ] = test.hz;
      }
    });

    // create new beacon
    try {
      elIframe = createElement('<iframe name=' + id + '>');
    } catch(e) {
      (elIframe = createElement('iframe')).name = id;
    }
    // inject beacon
    elIframe.id = id;
    elIframe.style.display = 'none';
    body.insertBefore(elIframe, body.firstChild);

    // perform inception :3
    ui._bR = result;
    key = ui._bTestKey;
    idoc = global.frames[id].document;
    idoc.write('<html><body><script>' +
               'with(parent.ui){' +
               'var _bTestResults=_bR,' +
               '_bD=1e3*' + BROWSERSCOPE_TIMEOUT + ',' +
               '_bT=function(){parent.setTimeout(browserscope.refresh,_bD);destroyElement(frameElement)},' +
               '_bK=setTimeout(_bT,_bD),' +
               '_bP=function(){clearTimeout(_bK);setTimeout(_bT,_bD)}' +
               '}<\/script>' +
               (key ? '<script src=//www.browserscope.org/user/beacon/' + key + '?callback=_bP><\/script>' : '') +
               '<\/body><\/html>');
    idoc.close();
    delete ui._bR;
  }

 /**
  * Refreshes the Browserscope results iframe.
  * @static
  * @member Benchmark.browserscope
  */
  function refresh() {
    var parentNode,
        elIframe = $(BROWSERSCOPE_ID);

    if (elIframe) {
      parentNode = elIframe.parentNode;
      parentNode.insertBefore(elIframe.cloneNode(false), elIframe);
      ui.trash(elIframe);
    }
  }

  /*--------------------------------------------------------------------------*/

  // expose
  global.ui = {
    // HTML elements that will hold the results
    'elResults': [],

    // parsed query parameters of the current page URL
    'params': {},

    // queue of tests that need to run
    'queue': [],

    // list of all tests that have been registered with benchmark.test
    'tests': [],

    // abort, dequeue, and render all tests
    'abort': abort,

    // create a new test
    'addTest': addTest,

    // remove elements from the document and avoid pseuddo memory leaks
    // http://dl.dropbox.com/u/513327/removechild_ie_leak.html
    'destroyElement': destroyElement,

    // parse query params into ui.params[] hash
    'parseHash': parseHash,

    // (re)render the results for a specific test
    'renderTest': renderTest,

    // add all tests to the run queue
    'runAll': runAll,

    // add a test to the run queue
    'runTest': runTest
  };

  ui.browserscope = {
    // handles Browserscope reporting
    'post': post,

    // refreshes Browserscope results iframe
    'refresh': refresh
  };

  /*--------------------------------------------------------------------------*/

  // signal JavaScript detected
  addClass(document.documentElement, JS_CLASS);

  // don't let users alert / confirm / prompt / open new windows
  global.alert = global.confirm = global.prompt = global.open = Benchmark.noop;

  // re-parse query params when hash changes
  global.onhashchange = onHashChange;

  // bootstrap onload
  global.onload = onLoad;

  // parse location hash string
  ui.parseHash();

  // customize calibration test
  each(Benchmark.CALIBRATIONS, function(cal) {
    cal.name = 'Calibrating loop';
    cal.onCycle = cal.onStart = onCycle;
  });

  // optimized asynchronous Google Analytics snippet based on
  // http://mathiasbynens.be/notes/async-analytics-snippet
  (function(tag) {
    var script = createElement(tag),
        sibling = document.getElementsByTagName(tag)[0];

    global._gaq = [['_setAccount', GA_ACCOUNT_ID], ['_trackPageview']];
    script.async = 1;
    script.src = '//www.google-analytics.com/ga.js';
    sibling.parentNode.insertBefore(script, sibling);
  }('script'));

}(this, document));