/*!
 * ui.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */
(function(window, document) {

  /** Java applet archive path */
  var archive = '../../nano.jar',

  /** Google Analytics account id */
  gaId = '',

  /** Benchmark results element id prefix (e.g. `results-1`) */
  prefix = 'results-',

  /** Object containing various css class names */
  classNames = {

    /** CSS class name used for error styles */
    'error': 'error',

    /** CSS clasName used for `js enabled` styles */
    'js': 'js',

    /** CSS class name used to make content visible */
    'show': 'show',

    /** CSS class name used to reset result styles */
    'results': 'results'
  },

  /** Object containing various text messages */
  texts = {

    /** Inner text for the various run button states */
    'run': {
      'ready': 'Run tests',
      'again': 'Run again',
      'running': 'Stop running'
    },

    /** Common status values */
    'status': {
      'ready': 'Ready to run.',
      'again': 'Done. Ready to run again.'
    }
  },

  /** Used to flag environments/features */
  has = {
    'localStorage': !!function() {
      try {
        return !localStorage.getItem(+new Date);
      } catch(e) { }
    }()
  },

  /** Cache of error messages */
  errors = [],

  /** Cache of event handlers */
  handlers = { },

  /** Namespace */
  ui = new Benchmark.Suite,

  /** API Shortcuts */
  each = Benchmark.each,

  filter = Benchmark.filter,

  formatNumber = Benchmark.formatNumber,

  indexOf = Benchmark.indexOf;

  /*--------------------------------------------------------------------------*/

  handlers.benchmark = {

    /**
     * The onCycle callback, used for onStart as well, assigned to new benchmarks.
     * @private
     */
    'cycle': function() {
      var bench = this,
          size = bench.stats.size;
      if (!bench.aborted) {
        setStatus(bench.name + ' &times; ' + formatNumber(bench.count) + ' (' +
          size + ' sample' + (size == 1 ? '' : 's') + ')');
      }
    }
  };

  handlers.button = {

    /**
     * The "run" button click event handler used to run or abort the benchmarks.
     * @private
     */
    'run': function() {
      var run = $('run').innerHTML != texts.run.running;
      ui.abort();
      ui.length = 0;

      if (run) {
        logError(false);
        ui.push.apply(ui, filter(ui.benchmarks, function(bench) { return !bench.error; }));
        ui.run(true, true);
      }
    }
  };

  handlers.title = {

    /**
     * The title table cell click event handler used to run the corresponding benchmark.
     * @private
     * @param {Object} event The event object.
     */
    'click': function(event) {
      event || (event = window.event);
      var id,
          index,
          target = event.target || event.srcElement;

      while (target && !(id = target.id)) {
        target = target.parentNode;
      }
      index = id && --id.split('-')[1] || 0;
      ui.push(ui.benchmarks[index].reset());
      ui.running ? ui.render(index) : ui.run(true, true);
    },

    /**
     * The title cell keyup event handler used to simulate a mouse click when hitting the ENTER key.
     * @private
     * @param {Object} event The event object.
     */
    'keyup': function(event) {
      if (13 == (event || window.event).keyCode) {
        handlers.title.click(event);
      }
    }
  };

  handlers.window = {

    /**
     * The window hashchange event handler supported by Chrome 5+, Firefox 3.6+, and IE8+.
     * @private
     */
    'hashchange': function() {
      ui.parseHash();
      // call user provided init() function
      (typeof window.init == 'function') && init();
      // auto-run
      ('run' in ui.params) && handlers.button.run();
    },

    /**
     * The window load event handler used to initialize the UI.
     * @private
     */
    'load': function() {
      addClass('controls', classNames.show);
      addListener('run', 'click', handlers.button.run);

      setHTML('run', texts.run.ready);
      setHTML('user-agent', Benchmark.platform);
      setStatus(texts.status.ready);

      // answer spammer question
      $('question').value = 'no';

      // prefill author details
      if (has.localStorage) {
        each([$('author'), $('author-email'), $('author-url')], function(element) {
          element.value = localStorage[element.id] || '';
          element.oninput = element.onkeydown = function(event) {
            event && event.type < 'k' && (element.onkeydown = null);
            localStorage[element.id] = element.value;
          };
        });
      }
      // show warning when Firebug is enabled
      if (typeof window.console != 'undefined' && typeof console.firebug == 'string') {
        addClass('firebug', classNames.show);
      }
      // evaluate hash values
      handlers.window.hashchange();
    }
  };

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
   * @param {String} eventName The name of the event.
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
   * @param {String|Boolean} text The text to append or `false` to clear.
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
      errors.length = 0;
    }
    else {
      if (indexOf(errors, text) < 0) {
        errors.push(text);
        addClass(div, classNames.show);
        appendHTML(div, text);
      }
    }
  }

  /**
   * Sets the status text.
   * @private
   * @param {String} text The text to write to the status.
   */
  function setStatus(text) {
    setHTML('status', text);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Parses the window.location.hash value into an object assigned to `ui.params`.
   * @static
   * @member ui
   * @returns {Object} The suite instance.
   */
  function parseHash() {
    var me = this,
        hashes = location.hash.slice(1).split('&'),
        params = me.params = { };

    each(hashes[0] && hashes, function(hash) {
      hash = hash.split('=');
      params[hash[0]] = hash[1];
    });
    return me;
  }

  /**
   * Renders the results table cell of the corresponding benchmark(s).
   * @static
   * @member ui
   * @param {Number} [index] The index of the benchmark to render.
   * @returns {Object} The suite instance.
   */
  function render(index) {
    each(index == null ? (index = 0, ui.benchmarks) : [ui.benchmarks[index]], function(bench) {
      var parsed,
          cell = $(prefix + (++index)),
          error = bench.error,
          hz = bench.hz;

      // reset title and class
      cell.title = '';
      cell.className = classNames.results;

      // status: error
      if (error) {
        setHTML(cell, 'Error');
        addClass(cell, classNames.error);
        parsed = Benchmark.join(error, '</li><li>');
        logError('<p>' + error + '.</p>' + (parsed ? '<ul><li>' + parsed + '</li></ul>' : ''));
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
          setHTML(cell, formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) +
            ' <small>&plusmn;' + bench.stats.rme.toFixed(2) + '%</small>');
        }
        else {
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

  ui.on('add', function(event, bench) {
    var id = ui.benchmarks.length + 1,
        title = $('title-' + id);

    title.tabIndex = 0;
    title.title = 'Click to run this test again.';

    addListener(title, 'click', handlers.title.click);
    addListener(title, 'keyup', handlers.title.keyup);
    bench.on('start cycle', handlers.benchmark.cycle);

    delete ui[--ui.length];
    ui.benchmarks.push(bench);
    ui.render();
  })
  .on('start cycle', function() {
    ui.render();
    setHTML('run', texts.run.running);
  })
  .on('complete', function() {
    var benches = filter(ui.benchmarks, 'successful'),
        fastest = filter(benches, 'fastest'),
        slowest = filter(benches, 'slowest');

    ui.render();
    setHTML('run', texts.run.again);
    setStatus(texts.status.again);

    each(benches, function(bench) {
      var percent,
          text = 'fastest',
          cell = $(prefix + (indexOf(ui.benchmarks, bench) + 1)),
          span = cell.getElementsByTagName('span')[0];

      if (indexOf(fastest, bench) > -1) {
        // mark fastest
        addClass(cell, text);
      }
      else {
        percent = Math.round((1 - bench.hz / fastest[0].hz) * 100);
        text = percent + '% slower';

        // mark slowest
        if (indexOf(slowest, bench) > -1) {
          addClass(cell, 'slowest');
        }
      }
      // write ranking
      if (span) {
        setHTML(span, text);
      } else {
        appendHTML(cell, '<span>' + text + '</span>');
      }
    });

    ui.browserscope.post();
  });

  /*--------------------------------------------------------------------------*/

  /**
   * An array of benchmarks created from test cases.
   * @member ui
   */
  ui.benchmarks = [];

  /**
   * The parsed query parameters of the pages url hash.
   * @member ui
   */
  ui.params = {};

  // parse query params into ui.params hash
  ui.parseHash = parseHash;

  // (re)render the results of one or more benchmarks
  ui.render = render;

  /*--------------------------------------------------------------------------*/

  // expose
  window.ui = ui;

  // don't let users alert, confirm, prompt, or open new windows
  window.alert = window.confirm = window.prompt = window.open = function() { };

  // signal JavaScript detected
  addClass(document.documentElement, classNames.js);

  // parse hash query params when it changes
  addListener(window, 'hashchange', handlers.window.hashchange);

  // bootstrap onload
  addListener(window, 'load', handlers.window.load);

  // parse location hash string
  ui.parseHash();

  // inject nano applet
  (function() {
    function attempt() {
      var applet,
          body = document.body;

      try {
        if ('nojava' in ui.params) {
          addClass('java', classNames.show);
        } else {
          applet = createElement('applet');
          applet.code = 'nano';
          applet.archive = archive;
          body.insertBefore(applet, body.firstElementChild || body.firstChild);
        }
      } catch(e) {
        setTimeout(attempt, 15);
      }
    }
    attempt();
  }());

  // optimized asynchronous Google Analytics snippet based on
  // http://mathiasbynens.be/notes/async-analytics-snippet
  if (gaId) {
    (function() {
      var script = createElement('script'),
          sibling = document.getElementsByTagName('script')[0];

      window._gaq = [['_setAccount', gaId], ['_trackPageview']];
      script.src = '//www.google-analytics.com/ga.js';
      sibling.parentNode.insertBefore(script, sibling);
    }());
  }
}(this, document));