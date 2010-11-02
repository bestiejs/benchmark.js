/*!
 * benchmark.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */

(function(global) {

  // MAX_COUNT divisors used to avoid hz of Infinity
  var CYCLE_DIVISORS = { '1': 8, '2': 6, '3': 4, '4': 2, '5': 1 };

  /*--------------------------------------------------------------------------*/

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
    // bypass calibrating the Calibration tests
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

  // when uncalibrated it returns true and fires the callback after calibration
  function calibrate(callback) {
    var cal = Benchmark.CALIBRATION;
    if (!cal.cycles) {
      cal.onComplete = callback;
      cal.average(30);
      return true;
    }
    return false;
  }

  // call a method either sync or async (to allow UI redraws)
  function call(me, callback, synchronous) {
    synchronous
      ? callback(me, synchronous)
      : setTimeout(function() { callback(me); }, me.CYCLE_DELAY * 1e3);
  }

  // copies results from the source to the destination test
  function copyResults(destination, source) {
    destination.count = source.count;
    destination.cycles = source.cycles;
    destination.error = source.error;
    destination.hz = source.hz;
    destination.period = source.period;
    return destination;
  }

  // copies properties from the source to the destination object
  function extend(destination, source) {
    source || (source = { });
    for (var key in source) {
      destination[key] = source[key];
    }
    return destination;
  }

  // generic Array#filter
  function filter(array, callback) {
    var length = array.length,
        result = [];

    while (length--) {
      if (length in array && callback(array[length], length, array)) {
        result.unshift(array[length]);
      }
    }
    return result;
  }

  // generic Array#reduce
  function reduce(array, callback, accumulator) {
    var length = array.length;
    while (length--) {
      if (length in array) {
        accumulator = callback(accumulator, array[length], length, array);
      }
    }
    return accumulator;
  }

  // clock the time it takes to execute a test N times (milliseconds)
  var clock
  (function() {
    // enable benchmarking via the --enable-benchmarking flag
    // in at least Chrome 7 to use chrome.Interval
    var __c = typeof global.chromium != 'undefined' ? chromium :
      typeof global.chrome != 'undefined' ? chrome : null;

    if (__c && typeof __c.Interval == 'function') {
      clock = function(__m) {
        var __i = __m.count,
            __f = __m.fn,
            __t = new __c.Interval;
        __t.start();
        while (__i--) { __f() }
        __t.stop();
        __m.time = __t.microseconds() / 1000;
      };
    }
    else if (typeof Date.now == 'function') {
      clock = function(__m) {
        var __i = __m.count,
            __f = __m.fn,
            __t = Date.now();
        while (__i--){ __f() }
        __m.time = Date.now() - __t;
      };
    }
    else {
      clock = function(__m) {
        var __i = __m.count,
            __f = __m.fn,
            __t = (new Date).getTime();
        while (__i--) { __f() }
        __m.time = (new Date).getTime() - __t;
      };
    }
    // if supported, compile tests to avoid extra function calls
    try {
      var __clock = clock,
          uid     = (new Date).getTime(),
          fnToken = '__f' + uid + '()',
          fnArg   = '__m' + uid + ',__c'  + uid,
          fnBody  = ('('  + String(clock) + ')(__m);return __m').replace(/(__[a-z])/g, '$1' + uid);

      if (Function(fnArg, fnBody)({ }, __c).time === 0) {

        clock = function(me) {
          // TODO: Test function body regexp matching in Safari 2.0.0
          var errored,
              embed = String(me.fn).match(/^[^{]+{((?:.|\n)*)}\s*$/) || '';
          try {
            Function(fnArg, fnBody.replace(fnToken, embed && embed[1]))(me, __c);
          } catch(e) {
            errored = 1;
          }
          if (errored) {
            __clock(me);
          }
        };
      }
    } catch(e) { }
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
    } else if (/iP[ao]d|iPhone/.test(os)) {
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

  function average(times, count, synchronous) {
    var deviation,
        mean,
        stopped,
        i = times,
        me = this,
        tests = [];
        cbSum = function(sum, test) { return sum + test.period; },
        cbVariance = function(sum, test) { return sum + Math.pow(test.period - mean, 2); },
        cbOutlier = function(test) { return test.period < (mean + deviation) && test.period > (mean - deviation); };

    function loop() {
      var test = me.clone();
      tests.push(test);
      test.onCycle =
      test.onStart = function() {
        if (stopped = !me.running) {
          test.stop();
        } else {
          me.onCycle(copyResults(me, test));
        }
      };
      test.onComplete = function() {
        if (stopped || !--times) {
          if (!stopped) {
            copyResults(me, test);
            if (!me.error) {
              // compute average period and sample standard deviation
              mean = reduce(tests, cbSum, 0) / tests.length;
              deviation = Math.sqrt(reduce(tests, cbVariance, 0) / (tests.length - 1));

              if (deviation) {
                // remove outliers and compute average period on filtered results
                tests = filter(tests, cbOutlier, 0);
                mean = me.period = reduce(tests, cbSum, 0) / tests.length;
              }
              // compute other results
              me.time = mean * me.count;
              me.hz = mean ? Math.round(1 / mean) : Number.MAX_VALUE;
            }
          }
          me.running = false;
          me.onCycle(me);
          me.onComplete(me);
        }
        else if (!synchronous) {
          call(test = tests[times], function() { test.run(); });
        }
      };
      if (synchronous || !i) {
        test.run(count, synchronous);
      }
    }

    me.reset();
    me.running = true;
    me.onStart(me);

    while (i--) {
      loop();
    }
  }

  function clone() {
    var key,
        me = this,
        result = new me.constructor(me.fn, me.options);

    // copy manually added properties
    for (key in me) {
      if (!result[key]) {
        result[key] = me[key];
      }
    }
    result.reset();
    return result;
  }

  function stop() {
    var me = this,
        cal = Benchmark.CALIBRATION,
        error = me.error;

    if (me.running) {
      if (me != cal && cal.running) {
        cal.stop();
      }
      me.reset();
      me.error = error;
      me.onStop(me);
    }
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
    me.onReset(me);
  }

  function run(count, synchronous) {
    var me = this;
    me.reset();
    me.running = true;

    // ensure calibration test has run
    if (!calibrate(function() {
          function rerun() {
            // continue, if not stopped during calibration
            if (me.running) {
              me.run(count, synchronous);
            } else {
              me.onStart(me);
              me.onStop(me);
              me.onComplete(me);
            }
          }
          call(me, rerun, synchronous);
        })) {
      me.count = count || me.INIT_COUNT;
      me.onStart(me);
      _run(me, synchronous);
    }
  }

  function _run(me, synchronous) {
    var divisor,
        period,
        time,
        count = me.count,
        cycles = me.cycles,
        max = me.MAX_COUNT,
        min = me.MIN_TIME;

    // continue, if not stopped between cycles
    if (me.running) {

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
          (Benchmark.CALIBRATION.period || 0) * count);

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
          if (!time && (divisor = CYCLE_DIVISORS[cycles])) {
            // try a fraction of the MAX_COUNT
            count = Math.floor(max / divisor);
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
    }

    // figure out what to do next
    if (me.running) {
      call(me, _run, synchronous);
    } else {
      me.onComplete(me);
    }
  }

  /*--------------------------------------------------------------------------*/

  // test to establish iteration loop overhead
  Benchmark.CALIBRATION = new Calibration(noop, { 'INIT_COUNT': 3e3 });

  Benchmark.getPlatform = getPlatform;

  Benchmark.noop = noop;

  extend(Benchmark.prototype, {
    // delay between test cycles (secs)
    'CYCLE_DELAY': 0.01,

    // initial number of iterations
    'INIT_COUNT': 10,

    // max iterations allowed per cycle (used avoid locking up the browser)
    'MAX_COUNT': 1e6, // 1 million

    // minimum time a test should take to get valid results (secs)
    'MIN_TIME': 0.2,

    // number of times a test was executed
    'count': null,

    // number of cycles performed during testing
    'cycles': null,

    // an error object if the test failed
    'error': null,

    // number of test executions per second
    'hz': null,

    // time a test takes to do one execution (secs)
    'period': null,

    // flag to indicate if the test is running
    'running': false,

    // time a test takes to do the `count` number of executions (secs)
    'time': null,

    // callback invoked when testing is complete
    'onComplete': noop,

    // callback invoked when one test cycle ends
    'onCycle': noop,

    // callback invoked when test is reset
    'onReset': noop,

    // callback invoked when testing is started
    'onStart': noop,

    // callback invoked when testing is stopped
    'onStop': noop,

    // runs the test `n` times and returns the averaged test results
    'average': average,

    // create new benchmark with the same test function and options
    'clone': clone,

    // reset test state
    'reset': reset,

    // run the test
    'run': run,

    // stop testing (does not record times)
    'stop': stop
  });

  // expose
  global.Benchmark = Benchmark;

}(this));