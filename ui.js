/*!
 * ui.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */

(function(global, document) {

  // shortcut for typeof operators
  var FN = 'function',

   // css clasName used for error styles
   ERROR_CLASS = 'error',

   // css clasName used for `js enabled` styles
   JS_CLASS = 'js',

   // css className used to display error-info
   SHOW_CLASS = 'show',

   // css className used to reset result styles
   RESULTS_CLASS = 'results',

   // the iframe id of the Browserscope results
   BROWSERSCOPE_ID = 'browserscope',

   // seconds to wait for each stage of the Browserscope posting process (3 stages)
   BROWSERSCOPE_TIMEOUT = 2.5,

   // Google Analytics
   GA_ACCOUNT_ID = 'UA-6065217-40',

   // results element id prefix (e.g. `results-1`)
   RESULTS_PREFIX = 'results-',

   // inner text for the various run button states
   RUN_TEXT = {
     'RUNNING' : 'Stop tests',
     'RUN_AGAIN' : 'Run tests again',
     'STOPPED' : 'Run tests'
   },

   // common status values
   STATUS_TEXT = {
     'READY' : 'Ready to run tests.',
     'READY_AGAIN' : 'Done. Ready to run tests again.'
   },

   cache = {
     'counter' : 0,
     'errors' : [],
     'trash' : createElement('div')
   };

  /*--------------------------------------------------------------------------*/

  // dom utility methods
  function $(id) {
    return typeof id == 'string' ? document.getElementById(id) : id;
  }

  function addClass(element, className) {
    if (!hasClass(element = $(element), className)) {
      element.className += (element.className ? ' ' : '') + className;
    }
  }

  function appendHTML(element, html) {
    html != null && ($(element).innerHTML += html);
  }

  function createElement(tag) {
    return document.createElement(tag);
  }

  function hasClass(element, className) {
    return (' ' + $(element).className + ' ').indexOf(' ' + className + ' ') > -1;
  }

  function setHTML(element, html) {
    $(element).innerHTML = html == null ? '' : html;
  }

  // pretty print numbers
  function formatNumber(number) {
    var comma = ',',
        string = String(Math.max(0, Math.abs(number).toFixed(0))),
        length = string.length,
        end = /^\d{4,}$/.test(string) ? length % 3 : 0;

    return (end ? string.slice(0, end) + comma : '') +
      string.slice(end).replace(/(\d{3})(?=\d)/g, '$1' + comma);
  }

  // grabs the test from the ui object that matches the id
  function getTestById(id) {
    var test,
        i = 0,
        result = null,
        tests = ui.tests;

    while (test = tests[i++]) {
      if (test.id == id) {
        result = test;
        break;
      }
    }
    return result;
  }

  // a cross-browser Array#indexOf solution
  function indexOf(array, value) {
    var i = -1,
        length = this.length,
        result = i;

    if (typeof array.indexOf == FN) {
      return array.indexOf(value);
    }
    while (++i < length) {
      if (i in array && array[i] === value) {
        result = i;
        break;
      }
    }
    return result;
  }

  // like Array#join but for key-value pairs of an object
  function join(object, delimit1, delimit2) {
    var key,
        pairs = [];

    for (key in object) {
      pairs.push(key + delimit1 + object[key]);
    }
    return pairs.join(delimit2);
  }

  // appends or clears error log
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
      cache.errors = [];
    }
    else {
      if (indexOf(cache.errors, text) < 0) {
        cache.errors.push(text);
        addClass(elDiv, SHOW_CLASS);
        appendHTML(elDiv, text);
      }
    }
  }

  // sets the status text
  function logStatus(text) {
    setHTML('status', text);
  }

  /*--------------------------------------------------------------------------*/

  function onClick() {
    ui.runTest(getTestById(this.id.split('-')[1]));
  }

  function onCycle(test) {
    onStart(test);
    ui.renderTest(test);
  }

  function onHashChange() {
    ui.parseHash();
    if (typeof global.init == FN) {
      init();
    }
  }

  function onKeyUp(e) {
    // treat hitting ENTER while focused on a test title as if it were clicked
    e || (e = global.event);
    if (13 == e.keyCode) {
      onClick.call(this);
    }
  }

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
    if ('run' == location.hash.slice(1, 3)) {
      onRun();
    }
    if (typeof global.init == FN) {
      init();
    }
  }

  function onRun(e) {
    ui[$('run').innerHTML == RUN_TEXT.RUNNING ? 'stop' : 'runAll'](e);
  }

  function onStart(test) {
    logStatus(test.name + ' &times; ' + formatNumber(test.count));
  }

  function onStop() {
    logStatus(STATUS_TEXT.READY_AGAIN);
    ui.currentTest = null;
    nextTest(ui);
  }

  /*--------------------------------------------------------------------------*/

  function addTest(name, id, fn) {
    var me = this,
        elTitle = $('title-' + id),
        test = new Benchmark(fn);

    elTitle.tabIndex = 0;
    elTitle.title = 'Click to run this test again.';
    elTitle.onclick = onClick;
    elTitle.onkeyup = onKeyUp;

    test.id = id;
    test.name = name;
    test.onCycle = onCycle;
    test.onStart = onStart;
    test.onStop = onStop;

    me.tests.push(test);
    me.elResults.push($(RESULTS_PREFIX + id));
    me.renderTest(test);
  }

  function parseHash() {
    var pair,
        hashes = location.hash.slice(1).split('&'),
        length = hashes.length,
        params = this.params = { };

    if (hashes[0]) {
      while (length--) {
        pair = hashes[length].split('=');
        params[pair[0]] = pair[1];
      }
    }
  }

  function renderTest(test) {
    var hz = test.hz,
        cell = $(RESULTS_PREFIX + test.id);

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
      else if (indexOf(this.queue, test) > -1) {
        setHTML(cell, 'pending&hellip;');
      }
      else if (test.count) {
        if (hz == Infinity) {
          setHTML(cell, '&infin;');
          cell.title = 'Test is too fast to be recorded.';
        } else {
          setHTML(cell, formatNumber(hz));
          cell.title = 'Looped ' + formatNumber(test.count) + ' times in ' + test.time + ' seconds.';
        }
      }
      else {
        setHTML(cell, 'ready');
      }
    }
  }

  function runAll(e) {
    e || (e = global.event);
    var i = -1,
        me = this,
        reversed = e && e.shiftKey,
        length = me.tests.length;

    setHTML('run', RUN_TEXT.RUNNING);
    Benchmark.CALIBRATION.reset();
    while (++i < length) {
      me.runTest(me.tests[reversed ? (length - i - 1) : i]);
    }
  }

  function runTest(test) {
    var elResult,
        i = 0,
        me = this,
        elResults = me.elResults;

    if (indexOf(me.queue, test) < 0) {
      // clear error log
      logError(false);

      // reset result classNames
      while (elResult = elResults[i++]) {
        if (!hasClass(elResult, ERROR_CLASS)) {
          elResult.className = RESULTS_CLASS;
        }
      }
      // reset test before (re)running in case testing is aborted
      // so previous results are not recorded
      if (!test.error) {
        test.reset();
      }
      me.queue.push(test);
      me.renderTest(test);
      nextTest(me);
    }
  }

  function stop() {
    var me = this;
    setHTML('run', RUN_TEXT.STOPPED);

    while (me.queue.length) {
      me.renderTest(me.queue.shift());
    }
  }

  function trash(element) {
    cache.trash.appendChild(element);
    setHTML(cache.trash, '');
  }

  function nextTest(me) {
    var elResult,
        elSpan,
        first,
        last,
        length,
        percent,
        test,
        text,
        i = 0,
        result = [];

    if (me.currentTest) {
      // do nothing when running another test
    }
    else if (test = me.queue.shift()) {
      // run the next test from the queue
      me.currentTest = test;
      test.run();
    }
    else {
      // populate result array (skipping unrun and errored tests)
      while (test = me.tests[i++]) {
        if (test.count) {
          result.push({ 'id': test.id, 'hz': test.hz });
        }
      }
      // print results
      length = result.length;
      if (length > 1) {
        // sort descending by hz (highest hz / fastest first)
        result.sort(function(a, b) { return b.hz - a.hz; });

        i = 0;
        first = result[0];
        last = result[length - 1];

        while (test = result[i++]) {
          elResult = $(RESULTS_PREFIX + test.id);
          elSpan = elResult.getElementsByTagName('span')[0];

          if (test.hz == first.hz) {
            // mark fastest
            text = 'fastest';
            addClass(elResult, 'fastest');
          }
          else {
            percent = Math.floor((1 - test.hz / first.hz) * 100);
            text = first.hz != Infinity && percent && (percent + '% slower') || '';

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
        }
        // post results to Browserscope
        me.browserscope.post(me.tests);

        // all tests are finished
        setHTML('run', RUN_TEXT.RUN_AGAIN);
      }
    }
  }

  /*--------------------------------------------------------------------------*/

  function post(tests) {
    var idoc,
        key,
        test,
        i = 0,
        id = BROWSERSCOPE_ID + '_' + cache.counter++,
        body = document.body,
        result = { };

    // populate result object (skipping unrun and errored tests)
    while (test = tests[i++]) {
      if (test.count) {
        key = (test.name.match(/[a-z0-9]+/ig) || [test.id]).join(' ');
        result[key] = test.hz == Infinity ? Number.MAX_VALUE : test.hz;
      }
    }
    // create new beacon
    try {
      elIframe = createElement('<iframe name="' + id + '">');
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
    idoc.write('<html><body><script>with(parent.ui){' +
               'var _bTestResults=_bR,' +
               '_bD=1e3*' + BROWSERSCOPE_TIMEOUT + ',' +
               '_bT=function(){parent.setTimeout(browserscope.refresh,_bD);trash(frameElement)},' +
               '_bK=setTimeout(_bT,_bD),' +
               '_bP=setInterval(function(){if(frames[0]){' +
               'clearInterval(_bP);clearTimeout(_bK);setTimeout(_bT,_bD)}},10)' +
               '}<\/script>' +
               (key ? '<script src=//www.browserscope.org/user/beacon/' + key + '><\/script>' : '') +
               '<\/body><\/html>');
    idoc.close();
    delete ui._bR;
  }

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
    'elResults' : [],

    // parsed query parameters of the current page URL
    'params' : {},

    // queue of tests that need to run
    'queue' : [],

    // list of all tests that have been registered with benchmark.test
    'tests' : [],

    // create a new test
    'addTest' : addTest,

    // parse query params into ui.params[] hash
    'parseHash' : parseHash,

    // (re)render the results for a specific test
    'renderTest' : renderTest,

    // add all tests to the run queue
    'runAll' : runAll,

    // add a test to the run queue
    'runTest' : runTest,

    // remove and render all tests from the run queue
    'stop' : stop,

    // remove elements from the document and avoid pseuddo memory leaks
    // http://dl.dropbox.com/u/513327/removechild_ie_leak.html
    'trash' : trash
  };

  ui.browserscope = {
    // handles Browserscope reporting
    'post' : post,

    // refreshes Browserscope results iframe
    'refresh' : refresh
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
  (function(cal) {
    cal.name = 'Calibrating loop';
    cal.onCycle = cal.onStart = onStart;
  }(Benchmark.CALIBRATION));

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