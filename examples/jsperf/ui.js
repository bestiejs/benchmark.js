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

   /** Namespace */
   ui = new Benchmark.Suite,

   each = Benchmark.each,

   filter = Benchmark.filter,

   formatNumber = Benchmark.formatNumber,

   indexOf = Benchmark.indexOf;

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
   * Set an element's innerHTML property.
   * @private
   * @param {Object} element The element.
   * @param {String} html The HTML to set.
   */
  function setHTML(element, html) {
    $(element).innerHTML = html == null ? '' : html;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Appends to or clears the error log.
   * @private
   * @param {String|Boolean} text The the text to append or false to clear.
   */
  function logError(text) {
    var table,
        div = $('error-info');

    if (!div) {
      table = $('test-table');
      div = createElement('div');
      div.id = 'error-info';
      table.parentNode.insertBefore(div, table.nextSibling);
    }
    if (text === false) {
      div.className = div.innerHTML = '';
      cache.errors.length = 0;
    }
    else {
      if (indexOf(cache.errors, text) < 0) {
        cache.errors.push(text);
        addClass(div, SHOW_CLASS);
        appendHTML(div, text);
      }
    }
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
   * @param {Object} e The event object.
   */
  function onClick(e) {
    e || (e = window.event);
    var target = e.target || e.srcElement,
        index = --(target.id || target.parentNode.id).split('-')[1];

    ui.push(ui.benchmarks[index]);
    if (!ui.running) {
      ui.run(true, true);
    }
  }

  /**
   * The onCycle callback, used for onStart as well, assigned to new benchmarks.
   * @private
   */
  function onCycle() {
    var bench = this,
        cycles = bench.cycles;
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
    var params = ui.params;
    ui.parseHash();

    // call user provided init() function
    if (typeof window.init == 'function') {
      init();
    }
    // auto-run
    if ('run' in params) {
      onRun();
    }
    // clear stored results
    if ('clear' in params) {
      Benchmark.clearStorage();
    }
  }

  /**
   * The title cell keyup event handler used to simulate a mouse click when hitting the ENTER key.
   * @private
   * @param {Object} e The event object.
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
    addClass('controls', 'show');
    addClass('calgroup', 'show');

    addListener('calibrate', 'click', onSetCalibrationState);
    addListener('run', 'click', onRun);

    setHTML('run', RUN_TEXT.READY);
    setHTML('user-agent', Benchmark.platform);
    setStatus(STATUS_TEXT.READY);

    // enable calibrations by default
    $('calibrate').checked = true;

    // answer spammer question
    $('question').value = 'no';

    // show warning and disable calibrations when Firebug is enabled
    if (typeof window.console != 'undefined' && typeof console.firebug == 'string') {
      $('calibrate').checked = false;
      onSetCalibrationState();
      addClass('controls', 'reduce');
      addClass('firebug', 'show');
    }
    // evaluate hash values
    onHashChange();
  }

  /**
   * The "run" button click event handler used to run or abort the benchmarks.
   * @private
   * @param {Object} e The event object.
   */
  function onRun(e) {
    var run = $('run').innerHTML != RUN_TEXT.RUNNING;
    ui.abort();
    if (run) {
      logError(false);
      ui.length = 0;
      ui.push.apply(ui, filter(ui.benchmarks, function(bench) { return !bench.error; }));
      ui.run(true, true);
    }
  }

  /**
   * The "calibrate" checkbox click event handler used to enable/disable calibrations.
   * @private
   */
  function onSetCalibrationState() {
    var length = Benchmark.CALIBRATIONS.length;
    if ($('calibrate').checked) {
      if (!length) {
        Benchmark.CALIBRATIONS = cache.CALIBRATIONS;
      }
    } else if (length) {
      cache.CALIBRATIONS = [Benchmark.CALIBRATIONS, Benchmark.CALIBRATIONS = []][0];
    }
  }

  /*--------------------------------------------------------------------------*/

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
   * @returns {Object} The suite instance.
   */
  function render() {
    each(ui.benchmarks, function(bench, index) {
      var cell = $(RESULTS_PREFIX + (index + 1)),
          error = bench.error,
          hz = bench.hz;

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
            bench.times.cycle.toFixed(3) + ' seconds.';

          setHTML(cell, hz == Infinity ? hz :
            formatNumber(hz) + ' <small>&plusmn;' + bench.stats.RME.toFixed(2) + '%<\/small>');
        }
        else {
          // reset class
          if (!hasClass(cell, ERROR_CLASS)) {
            cell.className = RESULTS_CLASS;
          }
          // status: pending
          if (ui.running && ui.indexOf(bench) > -1) {
            setHTML(cell, 'pending&hellip;');
          }
          // status: ready
          else {
            setHTML(cell, 'ready');
          }
        }
      }
    });
    return ui;
  }

  /*--------------------------------------------------------------------------*/

  ui.on('add', function(bench) {
    var id = ui.benchmarks.length + 1,
        title = $('title-' + id);

    title.tabIndex = 0;
    title.title = 'Click to run this test again.';

    addListener(title, 'click', onClick);
    addListener(title, 'keyup', onKeyUp);
    bench.on('start cycle', onCycle);

    delete ui[--ui.length];
    ui.benchmarks.push(bench);
    ui.render();
  })
  .on('start', function() {
    ui.render();
    setHTML('run', RUN_TEXT.RUNNING);
  })
  .on('cycle', function() {
    ui.render();
  })
  .on('complete', function() {
    var benches = filter(ui.benchmarks, 'successful'),
        fastest = filter(benches, 'fastest'),
        slowest = filter(benches, 'slowest');

    each(benches, function(bench) {
      var percent,
          text = 'fastest',
          cell = $(RESULTS_PREFIX + (indexOf(ui.benchmarks, bench) + 1)),
          span = cell.getElementsByTagName('span')[0];

      if (fastest.indexOf(bench) > -1) {
        // mark fastest
        addClass(cell, text);
      }
      else {
        percent = Math.floor((1 - bench.hz / fastest[0].hz) * 100);
        text = percent + '% slower';

        // mark slowest
        if (slowest.indexOf(bench) > -1) {
          addClass(cell, 'slowest');
        }
      }
      // write ranking
      if (span) {
        setHTML(span, text);
      } else {
        appendHTML(cell, '<span>' + text + '<\/span>');
      }
    });

    ui.render();
    setHTML('run', RUN_TEXT.READY_AGAIN);
    setStatus(STATUS_TEXT.READY_AGAIN);

    if ($('calibrate').checked) {
      ui.browserscope.post();
    }
  });

  /*--------------------------------------------------------------------------*/

  // expose
  window.ui = ui;

  Benchmark.extend(ui, {

    /**
     * An array of benchmarks created from test cases.
     * @member ui
     */
    'benchmarks': [],

    /**
     * The parsed query parameters of the pages url hash.
     * @member ui
     */
    'params': {},

    // parse query params into ui.params[] hash
    'parseHash': parseHash,

    // (re)render the results of one or more benchmarks
    'render': render
  });

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

  // customize calibration benchmarks
  Benchmark.CALIBRATIONS.each(function(cal) {
    cal.name = 'Calibrating';
    cal.on('cycle start', onCycle);
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