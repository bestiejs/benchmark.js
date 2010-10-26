/*!
 * benchmark.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */

/*jslint browser: true, forin: true, es5: false, onevar: true, eqeqeq: true, immed: true*/
/*global window*/

(function(global) {

  function Klass() { }

  function Benchmark(fn, options) {
    options = extend({ }, options);
    extend(this, options);

    this.fn = fn;
    this.options = options;
    this.constructor = Benchmark;
  }

  function Calibration(fn) {
    Benchmark.call(this, fn);
    this.constructor = Calibration;
  }

  Klass.prototype = Benchmark.prototype;
  Calibration.prototype = new Klass;

  (function() {
    function run(count, synchronous) {
      var me = this;
      me.running = true;
      me.count = count || me.INIT_COUNT;
      me.onStart(me);
      _run(me, synchronous);
    }
    Calibration.prototype.run = run;
  })();

  /*--------------------------------------------------------------------------*/

  // one time calibration test
  // returns true if not calibrated, in which case the deferred test is called after calibration
  function calibrate(deferredTest) {
    var cal = Benchmark.CALIBRATION;
    if (!cal.count) {
      cal.onStop = deferredTest;
      cal.bestOf(3, 7e3); // 7 thousand * 3
      return true;
    }
    return false;
  }

  // copy properties
  function extend(destination, source) {
    source || (source = { });
    for (var key in source) {
      destination[key] = source[key];
    }
  }


  /*--------------------------------------------------------------------------*/

  function getPlatform() {
    var result,
     description = [],
     ua = navigator.userAgent,
     oses = "(?:Windows|iPhone OS|(?:Intel |PPC )?Mac OS X|Linux)",
     os = (ua.match(RegExp(oses + " [^ );]*")) || [])[0],
     name = (ua.match(/Chrome|MSIE|Safari|Opera|Firefox|Minefield/) || [])[0],
     version = window.opera && typeof opera.version == "function" && opera.version();

    if (!os) {
      os = (ua.match(RegExp(oses + "[^ );]*")) || [])[0];
    }
    if (!version) {
      version = name && (ua.match(RegExp("(?:Version|" + name + ")[ /]([^ ;]*)")) || [])[1];
    }
    result = {
      "name":        name ? description.push(name) && name : null,
      "version":     version ? description.push(version) && version : null,
      "os":          os ? description.push("on " + (os = os.replace(/_/g, "."))) && os : null,
      "description": description.length ? description.join(" ") : "unknown platform",
      "toString":    function() { return this.description }
    };

    // lazy defined
    function getPlatform() { return result }
    this.getPlatform = getPlatform;
    return result;
  }

  function noop() { }

  /*--------------------------------------------------------------------------*/

  function bestOf(times, count, synchronous) {
    var best, finished = 0, i = times, me = this;
    me.reset();
    me.running = true;
    me.onStart(me);

    while (i--) {
      (function() {
        var clone = me.clone();
        clone.onCycle =
        clone.onStart = me.onCycle || noop;
        clone.onStop = function() {
          if (!best || clone.period < best.period) {
            best = clone;
          }
          if (++finished == times) {
            if (best.error) {
              me.error = best.error;
            }
            me.count = best.count;
            me.hz = best.hz;
            me.period = best.period;
            me.running = false;
            me.time = best.time;
            me.onStop(me);
          }
        };
        clone.run(count, synchronous);
      })();
    }
  }

  function clone() {
    var key, me = this,
     result = new me.constructor(me.fn, me.options);

    for (key in me) {
      if (!result[key]) {
        result[key] = me[key];
      }
    }
    result.reset();
    return result;
  }

  function reset() {
    var me = this;
    delete me.count;
    delete me.error;
    delete me.hz;
    delete me.period;
    delete me.running;
    delete me.time;
  }

  function run(count, synchronous) {
    var me = this;
    // ensure calibration test has run
    if (!calibrate(function() {
          if (synchronous) {
            me.run(count, synchronous);
          } else {
            setTimeout(function() { me.run(count) }, me.CYCLE_DELAY * 1e3);
          }
        })) {
      me.reset();
      me.running = true;
      me.count = count || me.INIT_COUNT;
      me.onStart(me);
      _run(me, synchronous);
    }
  }

  function _run(me, synchronous) {
    var start, fn = me.fn, i = me.count,
     calPeriod = Benchmark.CALIBRATION.period;

    try {
      // test execution loop
      start = new Date;
      while (i--) { fn(); }

      // get time test took (in secs)
      me.time = Math.max(0,
        // avoid Infinity values if there is 0ms between start
        // and end times by forcing at least 1ms
        (Math.max(1, new Date - start) / 1e3) -
        // subtract the base loop time
        (calPeriod ? calPeriod * me.count : 0));

      // per-operation time taken
      me.period = me.time / me.count;

      // ops per second
      me.hz = Math.round(1 / me.period);

      // do we need to do another run?
      me.running = me.time < me.MIN_TIME;

      // if so, compute how many times we should iterate
      if (me.running) {
        me.count += Math.ceil((me.MIN_TIME - me.time) / me.period);
        // stop running if the next cycle would exceed the max count allowed
        if (me.count > me.MAX_COUNT) {
          me.running = false;
        }
      }
    }
    catch (e) {
      me.reset();
      me.error = e;
    }

    me.onCycle(me);

    // figure out what to do next
    if (me.running) {
      // use a timeout to make sure the browser has a chance to finish rendering
      // any UI changes made, like updating the status message
      if (synchronous) {
        _run(me, synchronous);
      } else {
        setTimeout(function() { _run(me) }, me.CYCLE_DELAY * 1e3);
      }
    }
    else {
      me.onStop(me);
    }
  }

  /*--------------------------------------------------------------------------*/

  // test to establish iteration loop overhead
  Benchmark.CALIBRATION = new Calibration(noop);

  Benchmark.getPlatform = getPlatform;

  Benchmark.noop = noop;

  extend(Benchmark.prototype, {
    // delay between test cycles (secs)
    "CYCLE_DELAY" : 0.2,

    // initial number of iterations
    "INIT_COUNT" : 10,

    // max iterations allowed per cycle (used avoid locking up the browser)
    "MAX_COUNT" : 2e7, // 20 million

    // minimum time a test should take to get valid results (secs)
    "MIN_TIME" : 0.96,

    // callback invoked when one test cycle ends
    "onCycle" : noop,

    // callback invoked when test is started
    "onStart" : noop,

    // callback invoked when test is finished
    "onStop" : noop,

    // runs the test accepting the best of `n` attempts
    "bestOf" : bestOf,

    // create new benchmark with the same test and options
    "clone" : clone,

    // reset test state
    "reset" : reset,

    // run the test
    "run" : run
  });

  // expose
  global.Benchmark = Benchmark;

})(this);
