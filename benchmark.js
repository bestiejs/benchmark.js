/*!
 * benchmark.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */

(function(global) {

  function Benchmark(fn, options) {
    options = extend({ }, options);
    extend(this, options);
    this.fn = fn;
    this.options = options;
  }

  function Calibration(fn, options) {
    Benchmark.call(this, fn, options);
  }

  function Klass() { }

  Klass.prototype = Benchmark.prototype;

  (function(proto) {
    // bypass calibrating the Calibration tests when they are run
    function run(count, synchronous) {
      var me = this;
      me.reset();
      me.running = true;
      me.count = count || me.INIT_COUNT;
      me.onStart(me);
      _run(me, synchronous);
    }
    proto.constructor = Calibration;
    proto.run = run;
  }(Calibration.prototype = new Klass));

  /*--------------------------------------------------------------------------*/

  // one time calibration test
  // returns true if not calibrated, in which case the deferred test is called after calibration
  function calibrate(deferredTest) {
    var cal = Benchmark.CALIBRATION;
    if (!cal.count) {
      cal.onStop = deferredTest;
      cal.bestOf(3);
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
    return destination;
  }

  // clock the time it takes to execute a test N times (milliseconds)
  var clock;
  (function() {

    var co = typeof global.chromium != 'undefined' ? chromium :
      typeof global.chrome != 'undefined' ? chrome : null;

    clock = function(me) {
      var i = me.count,
          fn = me.fn,
          start = (new Date).getTime();
      while (i--) {
        fn();
      }
      me.time = (new Date).getTime() - start;
    };

    // enable benchmarking via the --enable-benchmarking flag
    // in at least Chrome 7 to use chrome.Interval
    if (co && typeof co.Interval == 'function') {
      clock = function(me) {
        var i = me.count,
            fn = me.fn,
            timer = new co.Interval;
        timer.start();
        while (i--) {
          fn();
        }
        timer.stop();
        me.time = timer.microseconds() / 1000;
      };
    }
    else if (typeof Date.now == 'function') {
      clock = function(me) {
        var i = me.count,
            fn = me.fn,
            start = Date.now();
        while (i--) {
          fn();
        }
        me.time = Date.now() - start;
      };
    }
  }());

  /*--------------------------------------------------------------------------*/

  function getPlatform() {
    var result,
        description = [],
        ua = navigator.userAgent,
        os = (ua.match(/(?:Windows 98;|Windows |iP[ao]d|iPhone|Mac OS X|Linux)(?:[^);]| )*/) || [])[0],
        name = (ua.match(/Chrome|MSIE|Safari|Opera|Firefox|Minefield/) || [])[0],
        version = {}.toString.call(global.opera) == '[object Opera]' && opera.version(),
        mses = { '6.1': '7', '6.0': 'Vista', '5.2': 'Server 2003 / XP x64', '5.1': 'XP', '5.0': '2000', '4.0': 'NT', '4.9': 'ME' };

    // IE platform tokens
    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    mses = os && os.indexOf('Windows') > -1 && mses[(os.match(/[456]\.\d/) || [])[0]];
    if (mses) {
      os = 'Windows ' + mses;
    }
    else if (/iP[ao]d|iPhone/.test(os)) {
      os = (ua.match(/\bOS ([\d_]+)/) || [])[1];
      os = 'iOS' + (os ? ' ' + os : '');
    }
    if (name && !version) {
      version = typeof document.documentMode == 'number'
        ? document.documentMode
        : (ua.match(RegExp('(?:version|' + name + ')[ /]([^ ;]*)', 'i')) || [])[1];
    }
    return {
      'name':        name ? description.push(name) && name : null,
      'version':     version ? description.push(version) && version : null,
      'os':          os ? description.push('on ' + (os = os.replace(/_/g, '.'))) && os : null,
      'description': description.length ? description.join(' ') : 'unknown platform',
      'toString':    function() { return this.description; }
    };
  }

  function noop() { }

  /*--------------------------------------------------------------------------*/

  function bestOf(times, count, synchronous) {
    var best,
        finished = 0,
        i = times,
        me = this;

    me.reset();
    me.running = true;
    me.onStart(me);

    while (i--) {
      (function() {
        var clone = me.clone(),
            onStart = me.onStart,
            onStop = me.onStop;

        clone.onCycle =
        clone.onStart = me.onCycle || noop;
        clone.onStop = function() {
          if (!best || clone.period < best.period) {
            best = clone;
          }
          if (++finished == times) {
            extend(me, best);
            me.onStart = onStart;
            me.onStop = onStop;
            me.onStop(me);
          }
        };
        clone.run(count, synchronous);
      }());
    }
  }

  function clone() {
    var key,
        me = this,
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
    var me = this,
        proto = this.constructor.prototype;

    me.count = proto.count;
    me.cycles = proto.cycles;
    me.error = proto.error;
    me.hz = proto.hz;
    me.period = proto.period;
    me.running = proto.running;
    me.time = proto.time;
  }

  function run(count, synchronous) {
    var me = this;
    me.reset();
    me.running = true;

    // ensure calibration test has run
    if (!calibrate(function() {
          function rerun() {
            // if not stopped during calibration, continue testing
            if (me.running) {
              me.run(count, synchronous);
            } else {
              me.onStart(me);
              me.onStop(me);
            }
          }
          if (synchronous) {
            rerun();
          } else {
            setTimeout(function() {
              rerun();
            }, me.CYCLE_DELAY * 1e3);
          }
        })) {
      me.count = count || me.INIT_COUNT;
      me.onStart(me);
      _run(me, synchronous);
    }
  }

  function _run(me, synchronous) {
    var period,
        time,
        cal = Benchmark.CALIBRATION,
        calCount = cal.time && cal.count,
        calPeriod = cal.period,
        count = me.count,
        cycles = me.cycles,
        max = me.MAX_COUNT,
        min = me.MIN_TIME;

    if (cycles) {
      cycles = ++me.cycles;
    } else {
      cycles = me.cycles = 1;
    }

    try {
      // clock executions of me.fn
      clock(me);

      time = me.time =
        // ensure positive numbers
        Math.max(0,
        // convert time from milliseconds to seconds
        (me.time / 1e3) -
        // calibrate by subtracting the base loop time
        (calPeriod ? calPeriod * count : 0));

      // per-operation time
      period = me.period = time / count;

      // ops per second
      me.hz = period ? Math.round(1 / period) : Number.MAX_VALUE;

      // do we need to do another cycle?
      me.running = time < min;

      // if so, compute the iteration count needed
      if (me.running) {
        // tests may return an initial time of 0 when INIT_COUNT is a small number,
        // to avoid that we set its count to something a bit higher
        if (!time && cycles == 1) {
          // try the smaller of the calibration count or 1/4 the max count
          max = Math.floor(max / 4);
          count = Math.min(calCount || max, max);
        }
        else if (!time && cycles == 2) {
          // try the smaller of the calibration count, if not previously used, or the full max count
          count = Math.min(count != calCount ? calCount || max : max, max);
        }
        else if (!time && cycles == 3 && count != max) {
          // if not already, take it to the max
          count = max;
        }
        else {
          // calculate how many more iterations it will take to achive the min testing time
          count += Math.ceil((min - time) / period);

          // to avoid freezing the browser stop running if the
          // next cycle would exceed the max count allowed
          if (count > max) {
            me.running = false;
          }
        }
      }
      me.count = count;
    }
    catch(e) {
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
        setTimeout(function() {
          _run(me);
        }, me.CYCLE_DELAY * 1e3);
      }
    }
    else {
      me.onStop(me);
    }
  }

  /*--------------------------------------------------------------------------*/

  // test to establish iteration loop overhead
  Benchmark.CALIBRATION = new Calibration(noop, { 'INIT_COUNT': 2e4 });

  Benchmark.getPlatform = getPlatform;

  Benchmark.noop = noop;

  extend(Benchmark.prototype, {
    // delay between test cycles (secs)
    'CYCLE_DELAY' : 0.2,

    // initial number of iterations
    'INIT_COUNT' : 10,

    // max iterations allowed per cycle (used avoid locking up the browser)
    'MAX_COUNT' : 1e6, // 1 million

    // minimum time a test should take to get valid results (secs)
    'MIN_TIME' : 0.2,

    // number of times a test was executed
    'count' : null,

    // number of cycles performed during testing
    'cycles' : null,

    // an error object if the test failed
    'error' : null,

    // number of test executions per second
    'hz' : null,

    // time a test takes to do one execution (secs)
    'period' : null,

    // flag to indicate if the test is running
    'running' : false,

    // time a test takes to do the `count` number of executions (secs)
    'time' : null,

    // callback invoked when one test cycle ends
    'onCycle' : noop,

    // callback invoked when test is started
    'onStart' : noop,

    // callback invoked when test is finished
    'onStop' : noop,

    // runs the test accepting the best of `n` attempts
    'bestOf' : bestOf,

    // create new benchmark with the same test function and options
    'clone' : clone,

    // reset test state
    'reset' : reset,

    // run the test
    'run' : run
  });

  // expose
  global.Benchmark = Benchmark;

}(this));