/*!
 * ui.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */

(function(window, document) {

  /** CSS class name used for error styles */
  var ERROR_CLASS = 'error',

   /** CSS clasName used for `js enabled` styles */
   JS_CLASS = 'js',

   /** CSS class name used to display error-info */
   SHOW_CLASS = 'show',

   /** CSS class name used to reset result styles */
   RESULTS_CLASS = 'results',

   /** Google Analytics account id */
   GA_ACCOUNT_ID = '',

   /** Benchmark results element id prefix (e.g. `results-1`) */
   RESULTS_PREFIX = 'results-',

   /** Inner text for the various run button states */
   RUN_TEXT = {
     'READY': 'Run tests',
     'READY_AGAIN': 'Run again',
     'RUNNING': 'Stop running'
   },

   /** Common status values */
   STATUS_TEXT = {
     'READY': 'Ready to run.',
     'READY_AGAIN': 'Done. Ready to run again.'
   },

   /** Cache of error messages */
   cache = {
     'errors': []
   },

   each = Benchmark.each,

   formatNumber = Benchmark.formatNumber,

   indexOf = Benchmark.indexOf,

   invoke = Benchmark.invoke,

   isArray = Benchmark.isArray;

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
   * Registers an event listener on an element.
   * @private
   * @param {Object} element The element.
   * @param {String} eventName The name of the event to listen to.
   * @param {Function} handler The event handler.
   */
  function addListener(element, eventName, handler) {
    element = $(element);
    if (typeof element.addEventListener != 'undefined') {
      element.addEventListener(eventName, handler, false);
    } else if (element.attachEvent != 'undefined') {
      element.attachEvent('on' + eventName, handler);
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
   * Set an element's innerHTML property.
   * @private
   * @param {Object} element The element.
   * @param {String} html The HTML to set.
   */
  function setHTML(element, html) {
    $(element).innerHTML = html == null ? '' : html;
  }

  /**
   * Sets the status text.
   * @private
   * @param {String} text The text write to the status.
   */
  function setStatus(text) {
    setHTML('status', text);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The title table cell click event handler used to run the corresponding benchmark.
   * @private
   */
  function onClick(e) {
    e || (e = window.event);
    var id = (e.target || e.srcElement).id.split('-')[1];

    each(ui.benchmarks, function(bench) {
      if (bench.id == id) {
        ui.run(bench);
        return false;
      }
    });
  }

  /**
   * The onComplete callback assigned to new benchmarks.
   * @private
   * @param {Object} bench The benchmark.
   */
  function onComplete(bench) {
    setStatus(STATUS_TEXT.READY_AGAIN);
    ui.render(bench);
  }

  /**
   * The onCycle callback, used for onStart as well, assigned to new benchmarks.
   * @private
   * @param {Object} bench The benchmark.
   */
  function onCycle(bench) {
    var cycles = bench.cycles;
    if (!bench.aborted) {
      setStatus(bench.name + ' &times; ' + formatNumber(bench.count) + ' (' +
        cycles + ' cycle' + (cycles == 1 ? '' : 's') + ')');
    }
  }

  /**
   * The window hashchange event handler supported by Chrome 5+, Firefox 3.6+, and IE8+.
   * @private
   */
  function onHashChange() {
    ui.parseHash();
    if (typeof window.init == 'function') {
      init();
    }
  }

  /**
   * The title cell keyup event handler used to simulate a mouse click when hitting the ENTER key.
   * @private
   */
  function onKeyUp(e) {
    if (13 == (e || window.event).keyCode) {
      onClick.call(this);
    }
  }

  /**
   * The window load event handler used to initialize the UI.
   * @private
   */
  function onLoad() {
    addClass('run', 'show');
    addListener('run', 'click', onRun);
    setHTML('run', RUN_TEXT.READY);
    setHTML('user-agent', Benchmark.platform);
    setStatus(STATUS_TEXT.READY);

    // answer spammer question
    $('question').value = 'no';

    // show warning when Firebug is enabled
    if (typeof window.console != 'undefined' && typeof console.firebug == 'string') {
      addClass('firebug', 'show');
    }
    // call user provided init() function
    if (typeof window.init == 'function') {
      init();
    }
    // auto-run benchmarks when the URL has #run
    if ('run' == location.hash.slice(1, 4)) {
      onRun();
    }
  }

  /**
   * The callback fired when the run queue is complete.
   * @private
   */
  function onQueueComplete() {
    // populate result array (skipping unrun and errored benchmarks)
    var first,
        last,
        result = Benchmark.filter(ui.benchmarks, function(bench) { return bench.cycles; });

    if (result.length > 1) {
      // sort descending by hz (highest hz / fastest first)
      result.sort(function(a, b) { return b.hz - a.hz; });
      first = result[0];
      last  = result[result.length - 1];

      // print contextual information
      each(result, function(bench) {
        var percent,
            text = 'fastest',
            elResult = $(RESULTS_PREFIX + bench.id),
            elSpan = elResult.getElementsByTagName('span')[0];

        if (!bench.compare(first)) {
          // mark fastest
          addClass(elResult, text);
        }
        else {
          percent = Math.floor((1 - bench.hz / first.hz) * 100);
          text = percent + '% slower';

          // mark slowest
          if (!bench.compare(last)) {
            addClass(elResult, 'slowest');
          }
        }
        // write ranking
        if (elSpan) {
          setHTML(elSpan, text);
        } else {
          appendHTML(elResult, '<span>' + text + '<\/span>');
        }
      });

      // post results to Browserscope
      ui.browserscope.post();
    }

    // all benchmarks are finished
    ui.running = false;
    setHTML('run', RUN_TEXT.READY_AGAIN);
  }

  /**
   * The "run" button click event handler used to run or abort the benchmarks.
   * @private
   */
  function onRun(e) {
    var benches = ui.benchmarks,
        run = $('run').innerHTML != RUN_TEXT.RUNNING;

    ui.abort();
    if (run) {
      logError(false);
      ui.run((e || window.event).shiftKey ? benches.slice(0).reverse() : benches);
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Aborts any running benchmarks, clears the run queue, and renders results.
   * @static
   * @member ui
   */
  function abort() {
    var me = this,
        benches = me.benchmarks;

    me.queue.length = 0;
    invoke(benches.concat(Benchmark.CALIBRATIONS), 'abort');
    me.render(benches);
    setHTML('run', RUN_TEXT.READY);
  }

  /**
   * Adds a benchmark the the collection.
   * @static
   * @member ui
   * @param {String} name The name assigned to the benchmark.
   * @param {String} id The id assigned to the benchmark.
   * @param {Function} fn The function to benchmark.
   */
  function addTest(name, id, fn) {
    var me = this,
        elTitle = $('title-' + id),
        bench = new Benchmark(fn, {
          'id': id,
          'name': name,
          'onStart': onCycle,
          'onCycle': onCycle,
          'onComplete': onComplete
        });

    elTitle.tabIndex = 0;
    elTitle.title = 'Click to run this test again.';

    addListener(elTitle, 'click', onClick);
    addListener(elTitle, 'keyup', onKeyUp);

    me.benchmarks.push(bench);
    me.elResults.push($(RESULTS_PREFIX + id));
    me.render(bench);
  }

  /**
   * Parses the window.location.hash value into an object assigned to `ui.params`.
   * @static
   * @member ui
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
   * Renders the results table cell of the corresponding benchmark(s).
   * @static
   * @member ui
   * @param {Array|Object} [benches=ui.benchmarks] One or an array of benchmarks.
   */
  function render(benches) {
    var me = this;
    if (!isArray(benches)) {
      benches = benches ? [benches] : me.benchmarks;
    }
    each(benches, function(bench) {
      var cell = $(RESULTS_PREFIX + bench.id),
          error = bench.error,
          hz = bench.hz;

      if (cell) {
        cell.title = '';

        // status: error
        if (error) {
          setHTML(cell, 'Error');
          if (!hasClass(cell, ERROR_CLASS)) {
            addClass(cell, ERROR_CLASS);
          }
          logError('<p>' + error + '.<\/p><ul><li>' +
            Benchmark.join(error, '<\/li><li>') + '<\/li><\/ul>');
        }
        else {
          // status: running
          if (bench.running) {
            setHTML(cell, 'running&hellip;');
          }
          // status: finished
          else if (bench.cycles) {
            cell.title = 'Ran ' + formatNumber(bench.count) + ' times in ' +
              bench.times.cycle.toFixed(2) + ' seconds.';

            setHTML(cell, hz == Infinity ? hz :
              formatNumber(hz) + ' <small>&plusmn;' + bench.RME.toFixed(2) + '%<\/small>');
          }
          // status: pending
          else if (indexOf(me.queue, bench) > -1) {
            setHTML(cell, 'pending&hellip;');
          }
          // status: ready
          else {
            setHTML(cell, 'ready');
          }
        }
      }
    });
  }

  /**
   * Adds given benchmark(s) to the queue and runs.
   * @static
   * @member ui
   * @param {Array|Object} [benches=ui.benchmarks] One or an array of benchmarks.
   */
  function run(benches) {
    var added,
        me = this,
        queue = me.queue;

    if (!isArray(benches)) {
      benches = benches ? [benches] : me.benchmarks;
    }
    each(benches, function(bench) {
      if (!bench.error && indexOf(queue, bench) < 0) {
        // reset before (re)running so the previous run's results are
        // not re-recorded if the operation is aborted mid queue
        bench.reset();
        queue.push(bench);
        me.render(bench);
        added = true;

        if (!me.running) {
          me.running = true;
          setHTML('run', RUN_TEXT.RUNNING);
          invoke(queue, {
            'async': true,
            'methodName': 'run',
            'queued': true,
            'onComplete': onQueueComplete
          });
        }
      }
    });

    // reset result classNames
    if (added) {
      each(me.elResults, function(elResult) {
        if (!hasClass(elResult, ERROR_CLASS)) {
          elResult.className = RESULTS_CLASS;
        }
      });
    }
  }

  /*--------------------------------------------------------------------------*/

  // expose
  window.ui = {

    /**
     * An array of table cells used to display benchmark results.
     * @member ui
     */
    'elResults': [],

    /**
     * The parsed query parameters of the pages url hash.
     * @member ui
     */
    'params': {},

    /**
     * The queue of benchmarks to run.
     * @member ui
     */
    'queue': [],

    /**
     * A flag to indicate if the benchmarks are running.
     * @member ui
     */
    'running': false,

    /**
     * An array of benchmarks created from test cases.
     * @member ui
     */
    'benchmarks': [],

    // abort, dequeue, and render results
    'abort': abort,

    // create a new benchmark from a test case
    'addTest': addTest,

    // parse query params into ui.params[] hash
    'parseHash': parseHash,

    // (re)render the results of one or more benchmarks
    'render': render,

    // add one or more benchmarks to the queue and run
    'run': run
  };

  /*--------------------------------------------------------------------------*/

  // signal JavaScript detected
  addClass(document.documentElement, JS_CLASS);

  // don't let users alert, confirm, prompt, or open new windows
  window.alert = window.confirm = window.prompt = window.open = Benchmark.noop;

  // re-parse hash query params when it changes
  addListener(window, 'hashchange', onHashChange);

  // bootstrap onload
  addListener(window, 'load', onLoad);

  // parse location hash string
  ui.parseHash();

  // force benchmark methods to run asynchronously for a more responsive UI
  Benchmark.prototype.DEFAULT_ASYNC = true;

  // customize calibration benchmarks
  each(Benchmark.CALIBRATIONS, function(cal) {
    cal.name = 'Calibrating';
    cal.on('complete', onComplete)
       .on('cycle', onCycle)
       .on('start', onCycle);
  });

  // optimized asynchronous Google Analytics snippet based on
  // http://mathiasbynens.be/notes/async-analytics-snippet
  if (GA_ACCOUNT_ID) {
    (function() {
      var tag = 'script',
          script = createElement(tag),
          sibling = document.getElementsByTagName(tag)[0];

      window._gaq = [['_setAccount', GA_ACCOUNT_ID], ['_trackPageview']];
      script.async = 1;
      script.src = '//www.google-analytics.com/ga.js';
      sibling.parentNode.insertBefore(script, sibling);
    }());
  }
}(this, document));