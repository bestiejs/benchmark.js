/*!
 * ui.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */

/*jslint browser: true, forin: true, es5: false, onevar: true, eqeqeq: true, immed: true*/
/*global window, ui, init, _bTestResults, _bTestKey*/

(function(global, document) {

  var RUN_TEXT = {
    "RUNNING" :   "Stop tests",
    "RUN_AGAIN" : "Run tests again",
    "STOPPED" :   "Run tests"
  };

  /*--------------------------------------------------------------------------*/

  // private cache
  var cache = {
    "elements" : {},
    "errors" : []
  };

  // GEBID shortcut
  function $(id) {
    return cache.elements[id] || (cache.elements[id] = document.getElementById(id));
  }

  // adds external JavaScript files to the page
  function addScript(src) {
    var script = document.createElement("script"),
     s = document.getElementsByTagName("script")[0];

    script.async = 1;
    script.src = src;
    s.parentNode.insertBefore(script, s);
  }

  // pretty print for numbers
  function formatNumber(number) {
    var comma = ",",
     string = String(Math.max(0, Math.abs(number).toFixed(0))),
     length = string.length,
     end = /^\d{4,}$/.test(string) ? length % 3 : 0;

    return (end ? string.slice(0, end) + comma : "") +
      string.slice(end).replace(/(\d{3})(?=\d)/g, "$1" + comma);
  }

  // grabs the test from the ui object that matches the id
  function getTestById(id) {
    var test, result = null, tests = ui.tests, i = 0;
    while (test = tests[i++]) {
      if (test.id == id) {
        result = test; break;
      }
    }
    return result;
  }

  // element className utility
  function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  }

  // a cross-browser Array#indexOf solution
  function indexOf(array, value) {
    if (typeof array.indexOf == "function") {
      return array.indexOf(value);
    }
    var i = -1, length = this.length, result = -1;
    while (++i < length) {
      if (i in array && array[i] === value) {
        result = i; break
      }
    }
    return result;
  }

  // like Array#join but for key-value pairs of an object
  function join(object, delimit1, delimit2) {
    var key, pairs = [];
    for (key in object) {
      pairs.push(key + delimit1 + object[key]);
    }
    return pairs.join(delimit2);
  }

  // appends or clears error log
  function logError(text) {
    var table, el = $("error-info");

    if (!el) {
      table = $("test-table");
      el = document.createElement("div");
      el.id = "error-info";
      table.parentNode.insertBefore(el, table.nextSibling);
    }
    if (text === false) {
      el.className = el.innerHTML = "";
      cache.errors = [];
    }
    else{
      text || (text = "");
      if (indexOf(cache.errors, text) < 0) {
        cache.errors.push(text);
        el.className = "show";
        el.innerHTML += text;
      }
    }
  }

  // sets the status text
  function logStatus(text) {
    var el = $("status");
    if (el) {
      el.innerHTML = text || "";
    }
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
    if (typeof global.init == "function") {
      init();
    }
  }

  function onKeyUp(e) {
    e || (e = global.event);
    if (13 == e.keyCode) {
      if (typeof e.preventDefault == "function") {
        e.preventDefault();
      } else if ("returnValue" in e) {
        e.returnValue = false;
      }
      onClick.call(this);
    }
  }

  function onLoad() {
    $("run").onclick = onRun;
    $("user-agent").innerHTML = Benchmark.getPlatform();
    ($("question") || { }).value = "no";

    // auto-run tests when the URL has #run
    if ("run" == location.hash.slice(1, 3)) {
      onRun();
    }
    if (typeof global.init == "function") {
      init();
    }
  }

  function onRun() {
    ui[$("run").innerHTML == RUN_TEXT.RUNNING ? "stop" : "runAll"]();
  }

  function onStart(test) {
    logStatus(test.name + " &times; " + formatNumber(test.count));
  }

  function onStop() {
    logStatus("Done. Ready to run tests again.");
    ui.currentTest = null;
    nextTest(ui);
  }

  /*--------------------------------------------------------------------------*/

  function addTest(name, id, fn) {
    var me = this,
     elTitle = $("title-" + id),
     test = new Benchmark(fn);

    elTitle.tabIndex = 0;
    elTitle.title = "Click to run this test again";
    elTitle.onclick = onClick;
    elTitle.onkeyup = onKeyUp;

    test.id = id;
    test.name = name;
    test.onCycle = onCycle;
    test.onStart = onStart;
    test.onStop = onStop;

    me.tests.push(test);
    me.elResults.push($("results-" + id));
    me.renderTest(test);
  }

  function parseHash() {
    var pair,
     hashes = location.hash.slice(1).split("&"),
     length = hashes.length,
     params = this.params = { };

    if (hashes[0]) {
      while (length--) {
        pair = hashes[i].split("=");
        params[pair[0]] = pair[1];
      }
    }
  }

  function renderTest(test) {
    var hz, cell = $("results-" + test.id);

    if (test.error) {
      cell.innerHTML = "Error";
      if (!hasClass(cell, "error")) {
        cell.className += " error";
      }
      logError("<p>" + test.error + ".<\/p><ul><li>" + join(test.error, ": ", "<\/li><li>") + "<\/li><\/ul>");
    }
    else {
      if (test.running) {
        cell.innerHTML = "running&hellip;";
      }
      else if (indexOf(this.queue, test) > -1) {
        cell.innerHTML = "pending&hellip;";
      }
      else if (test.count) {
        hz = Math.round(1 / test.period);
        cell.innerHTML = hz != Infinity ? formatNumber(hz) : "&#8734;";
        cell.title = "Looped " + formatNumber(test.count) + " times in " + test.time + " seconds";
      }
      else {
        cell.innerHTML = "ready";
      }
    }
  }

  function runAll(e) {
    e || (e = global.event);
    var i = -1, me = this, reversed = e && e.shiftKey,
     length = me.tests.length;

    $('run').innerHTML = RUN_TEXT.RUNNING;
    while (++i < length) {
      me.runTest(me.tests[reversed ? (length - i - 1) : i]);
    }
  }

  function runTest(test) {
    var elResult, i = 0, me = this,
     elResults = me.elResults;

    if (indexOf(me.queue, test) < 0) {
      // clear error log
      logError(false);

      // reset result classNames
      while (elResult = elResults[i++]) {
        if (!hasClass(elResult, "error")) {
          elResult.className = "results";
        }
      }
      me.queue.push(test);
      me.renderTest(test);
      nextTest(me);
    }
  }

  function stop() {
    var me = this;
    $("run").innerHTML = RUN_TEXT.STOPPED;

    while (me.queue.length) {
      me.renderTest(me.queue.shift());
    }
  }

  function nextTest(me) {
    var elResult, elSpan, first, hz, id, item, last, length, percent, test, text,
     i = 0, results = [];

    if (me.currentTest) {
      // do nothing when running another test
    }
    else if (test = me.queue.shift()) {
      // run the next test from the queue
      me.currentTest = test;
      test.run();
    }
    else {
      // populate Browserscope's result object
      _bTestResults = { };
      while (item = me.tests[i++]) {
        if (item.count) {
          id = item.id;
          hz = item.hz;
          results.push({ "id": id, "hz": hz });
          _bTestResults[(item.name.match(/[a-z0-9]+/ig) || [id]).join(" ")] = hz;
        }
      }

      // print results
      length = results.length;
      if (length > 1) {
        // sort descending by hz (highest hz / fastest first)
        results.sort(function(a, b) { return b.hz - a.hz; });

        i = 0;
        first = results[0];
        last = results[length - 1];

        while (item = results[i++]) {
          elResult = $("results-" + item.id);
          elSpan = elResult.getElementsByTagName("span")[0];

          percent = (1 - item.hz / first.hz) * 100;
          text = item == first ? "fastest" : Math.floor(percent) + "% slower";

          if (elSpan) {
            elSpan.innerHTML = text;
          } else {
            elResult.innerHTML += " <span>" + text + "<\/span>";
          }
        }
        // all tests are finished
        $("run").innerHTML = RUN_TEXT.RUN_AGAIN;

        // mark fastest
        $("results-" + first.id).className += " fastest";

        // mark slowest
        $("results-" + last.id).className += " slowest";

        // beacon results to Browserscope (_bTestKey is defined elsewhere)
        if (global._bTestKey) {
          addScript("http://www.browserscope.org/user/beacon/" + _bTestKey);
        }
      }
    }
  }

  /*--------------------------------------------------------------------------*/

  // expose
  global.ui = {
    // HTML elements that will hold the results
    "elResults" : [],

    // parsed query parameters of the current page URL
    "params" : {},

    // queue of tests that need to run
    "queue" : [],

    // list of all tests that have been registered with benchmark.test
    "tests" : [],

    // create a new test
    "addTest" : addTest,

    // parse query params into ui.params[] hash
    "parseHash" : parseHash,

    // (re)render the results for a specific test
    "renderTest" : renderTest,

    // add all tests to the run queue
    "runAll" : runAll,

    // add a test to the run queue
    "runTest" : runTest,

    // remove and render all tests from the run queue
    "stop" : stop
  };

  /*--------------------------------------------------------------------------*/

  // signal JavaScript detected
  document.documentElement.className = "js";

  // don't let users alert / confirm / prompt / open new windows
  global.alert = global.confirm = global.prompt = global.open = Benchmark.noop;

  // re-parse query params when hash changes
  global.onhashchange = onHashChange;

  // bootstrap onload
  global.onload = onLoad;

  // for Browserscope, don't rename!
  global._bTestResults = {};

  // parse location hash string
  ui.parseHash();

  // customize calibration test
  (function(cal) {
    cal.name = "Calibrating loop";
    cal.onCycle = cal.onStart = onStart;
  })(Benchmark.CALIBRATION);

  // optimized asynchronous Google Analytics snippet based on
  // http://mathiasbynens.be/notes/async-analytics-snippet
  global._gaq = [["_setAccount", "UA-6065217-40"], ["_trackPageview"]];
  addScript("//www.google-analytics.com/ga.js");

})(this, document);
