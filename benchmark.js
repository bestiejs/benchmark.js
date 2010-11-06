/*!
 * benchmark.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */

(function(global) {

  /** MAX_RUN_COUNT divisors used to avoid hz of Infinity  */
  var CYCLE_DIVISORS = { '1': 8, '2': 6, '3': 4, '4': 2, '5': 1 };

  /*--------------------------------------------------------------------------*/

 /**
  * Benchmark constructor.
  * @constructor
  * @param {Function} fn Test to benchmark.
  * @param {Object} [options={}] Options object.
  */
  function Benchmark(fn, options) {
    options = extend({ }, options);
    extend(this, options);
    this.fn = fn;
    this.options = options;
    this.times = { };
  }

 /**
  * Subclass of Benchmark used specifically for calibration.
  * @private
  * @constructor
  * @base Benchmark
  * @param {Function} fn Test to benchmark.
  * @param {Object} [options={}] Options object.
  */
  function Calibration(fn, options) {
    Benchmark.call(this, fn, options);
  }

  (function() {

   /**
    * Runs calibration benchmarks without calibrating itself.
    * @member Calibration
    * @param {Number} [count=Benchmark#INIT_RUN_COUNT] Iterations to clock on first cycle.
    * @param {Boolean} [synchronous=false] Flag to run synchronously.
    */
    function run(count, synchronous) {
      var me = this;
      me.reset();
      me.count = count || me.INIT_RUN_COUNT;
      me.running = true;
      me.times.start = +new Date;
      me.onStart(me);
      _run(me, synchronous);
    }

    // Calibration inherits from Benchmark
    function Klass() { }
    Klass.prototype = Benchmark.prototype;
    var proto = Calibration.prototype = new Klass;

    // point to the correct constructor
    proto.constructor = Calibration;
    // custom run method to avoid calibrating itself
    proto.run = run;
  }());

  /*--------------------------------------------------------------------------*/

 /**
  * Checks if calibration(s) have completed and fires a callback when completed.
  * @private
  * @param {Function} callback Function executed after calibration.
  * @param {Boolean} [synchronous=false] Flag to run synchronously.
  * @returns {Boolean} Returns true if calibration is needed else false.
  */
  function calibrate(callback, synchronous) {
    var result,
        cals = Benchmark.CALIBRATIONS;

    function onInvoke(cal) {
      cal.average(null, null, synchronous);
    }

    function onComplete(cal, index) {
      index == cals.length - 1 && callback();
    }
    // rerun all calibrations if one is unrun
    if (result = !!filter(cals, function(cal) { return !cal.cycles; }).length) {
      eachTest(cals, {
        'onInvoke': onInvoke,
        'onComplete': onComplete
      }, synchronous);
    }
    return result;
  }

 /**
  * Executes a function asynchronously or synchronously.
  * @private
  * @param {Object} me The benchmark instance.passed to the function.
  * @param {Function} fn Function to be executed.
  * @param {Boolean} [synchronous=false] Flag to run synchronously.
  */
  function call(me, fn, synchronous) {
    synchronous
      ? fn(me, synchronous)
      : setTimeout(function() { fn(me); }, me.CYCLE_DELAY * 1e3);
  }

 /**
  * Iterates over an array of benchmarks executing an initial onInvoke callback.
  * @private
  * @param {Array} benchmarks Array of benchmarks to iterate over.
  * @param {Object} options Object for benchmark options.
  * @param {Boolean} [synchronous=false] Flag to run synchronously.
  */
  function eachTest(benchmarks, options, synchronous) {
    var i = 0,
        backups = [],
        length = benchmarks.length;

    function onInvoke(me) {
      var key,
          backup = { };
      for (key in options) {
        backup[key] = me[key];
        me[key] = options[key];
      }
      backups.push(backup);
      me.onComplete = onComplete;
      me.onInvoke(me);
    }

    function onComplete(me) {
      var key,
          backup = backups[i];
      for (key in backup) {
        me[key] = backup[key];
      }
      if (options.onComplete.call(me, me, i, benchmarks) !== false &&
          !me.aborted && ++i < length) {
        call(benchmarks[i], onInvoke, options.synchronous);
      }
    }

    options = extend({ }, options);
    benchmarks[0] && onInvoke(benchmarks[0]);
  }

 /**
  * Copies source properties to the destination object.
  * @private
  * @param {Object} destination The destination object.
  * @param {Object} [source={}] The source object.
  * @returns {Object} The destination object.
  */
  function extend(destination, source) {
    source || (source = { });
    for (var key in source) {
      destination[key] = source[key];
    }
    return destination;
  }

  /**
  * A generic bare-bones Array#filter solution.
  * @private
  * @param {Array} array The array to iterate over.
  * @param {Function} callback The function called per iteration.
  * @returns {Array} A new array of values that passed callback filter.
  */
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

 /**
  * Merges the source benchmark results with the destination's results.
  * @private
  * @param {Object} destination The destination object.
  * @param {Object} source The source object.
  * @returns {Object} The destination object.
  */
  function merge(destination, source) {
    destination.count = source.count;
    destination.cycles += source.cycles;
    destination.error = source.error;
    destination.hz = source.hz;
    extend(destination.times, source.times);
    return destination;
  }

  /**
  * A generic bare-bones Array#reduce solution.
  * @private
  * @param {Array} array The array to iterate over.
  * @param {Function} callback The function called per iteration.
  * @param {Mixed} accumulator Initial value of the accumulator.
  * @returns {Mixed} The accumulator.
  */
  function reduce(array, callback, accumulator) {
    var length = array.length;
    while (length--) {
      if (length in array) {
        accumulator = callback(accumulator, array[length], length, array);
      }
    }
    return accumulator;
  }

 /**
  * Clocks the time taken to execute a test per cycle (seconds).
  * @private
  * @param {Object} me The benchmark instance.
  * @returns {Number} The cycle time of the instance.
  */
  var clock = (function() {
    var fallback,
        supported,
        uid = +new Date,
        args = 'm' + uid + ',c' + uid,
        code = 'var r$,i$=m$.count,f$=m$.fn,t$=#{0};while(i$--){f$()}#{1};m$.times.cycle=r$;return"$"',
        co = typeof global.chrome != 'undefined' ? chrome : typeof global.chromium != 'undefined' ? chromium : { };

    function embed(fn) {
      var body = String(fn).match(/^[^{]+{([\s\S]*)}\s*$/);
      return Function(args, code.replace('f' + uid + '()', body && body[1]));
    }

    function clock(me) {
      var errored,
          result,
          times = me.times,
          cal = me.constructor.CALIBRATIONS || [];

      if (supported) {
        try {
          result = embed(me.fn)(me, co);
        } catch(e) {
          errored = 1;
        }
        // did test exit early?
        if (result != uid) {
          errored = 1;
        }
      }
      if (errored || !supported) {
        cal = cal[1];
        fallback(me, co);
      } else {
        cal = cal[0];
      }
      return (times.cycle =
        // ensure positive numbers
        Math.max(0,
        // convert time from milliseconds to seconds
        (times.cycle / 1e3) -
        // calibrate by subtracting the base loop time
        (cal && cal.times.period || 0) * me.count));
    }

    // enable benchmarking via the --enable-benchmarking flag
    // in at least Chrome 7 to use chrome.Interval
    if (typeof co.Interval == 'function') {
      code = code.replace('#{0}', 'new c$.Interval;t$.start()')
        .replace('#{1}', 't$.stop();r$=t$.microseconds()/1e3');
    }
    else if (typeof Date.now == 'function') {
      code = code.replace('#{0}', 'Date.now()')
        .replace('#{1}', 'r$=Date.now()-t$');
    }
    else {
      code = code.replace('#{0}', '(new Date).getTime()')
        .replace('#{1}', 'r$=(new Date).getTime()-t$');
    }

    // inject uid into variable names to avoid collisions with embedded tests
    code = code.replace(/\$/g, uid);

    // non embedding fallback
    fallback = Function(args, code);

    // is embedding supported?
    try {
      supported = embed(function() { return 1; })({ 'count': 1 }, co);
    } catch(e) { }

    return clock;
  }());

  /*--------------------------------------------------------------------------*/

 /**
  * A generic no operation function.
  * @static
  * @member Benchmark
  */
  function noop() {
    // no operation performed
  }

 /**
  * A generic bare-bones Array#forEach solution.
  * Callbacks may terminate the loop by explicitly returning false.
  * @static
  * @member Benchmark
  * @param {Array} array The array to iterate over.
  * @param {Function} callback The function called per iteration.
  */
  function each(array, callback) {
    var i = -1,
        length = array.length;

    while (++i < length) {
      if (i in array && callback(array[i], i, array) === false) {
        break;
      }
    }
  }

 /**
  * Retrieves the platform information of the current environment.
  * @static
  * @member Benchmark
  * @returns {Object} Properties include browser name, version, and operating system.
  */
  function getPlatform() {
    var description = [],
        ua = navigator.userAgent,
        os = (ua.match(/(?:Windows 98;|Windows |iP[ao]d|iPhone|Mac OS X|Linux)(?:[^);]| )*/) || [])[0],
        name = (ua.match(/Chrome|MSIE|Safari|Opera|Firefox|Minefield/) || [])[0],
        version = {}.toString.call(global.opera) == '[object Opera]' && opera.version(),
        data = { '6.1': '7', '6.0': 'Vista', '5.2': 'Server 2003 / XP x64', '5.1': 'XP', '5.0': '2000', '4.0': 'NT', '4.9': 'ME' };

    // IE platform tokens
    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    if (/Windows/.test(os) && (data = data[os.match(/[456]\.\d/)])) {
      os = 'Windows ' + data;
    }
    else if (/iP[ao]d|iPhone/.test(os)) {
      os = 'iOS' + ((data = ua.match(/\bOS ([\d_]+)/)) ? ' ' + data[1] : '');
    }
    if (!version) {
      version = typeof document.documentMode == 'number' ? document.documentMode :
        (ua.match(RegExp('(?:version|' + name + ')[ /]([^ ;]*)', 'i')) || [])[1];
    }
    if (parseInt(version) > 45) {
      data = (ua.match(/AppleWebKit\/(\d+)/) || [])[1] || Infinity;
      version = data < 400 ? '1.x' : data < 500 ? '2.x' : version;
    }
    return {
      'name':        name ? description.push(name) && name : null,
      'version':     name && version ? description.push(version) && version : null,
      'os':          os ? description.push('on ' + (os = os.replace(/_/g, '.'))) && os : null,
      'description': description.length ? description.join(' ') : 'unknown platform',
      'toString':    function() { return this.description; }
    };
  }

  /*--------------------------------------------------------------------------*/

 /**
  * Aborts the benchmark as well as in progress calibrations without recording times.
  * @member Benchmark
  */
  function abort() {
    var me = this,
        error = me.error;

    if (me.running) {
      if (me.constructor != Calibration) {
        each(Benchmark.CALIBRATIONS, function(cal) {
          cal.abort();
        });
      }
      // set running as NaN so reset() will detect it as falsey and *not* call abort(),
      // but *will* detect it as a change and fire the onReset() callback
      me.running = NaN;
      me.reset();

      me.error = error;
      me.aborted = true;
      me.onAbort(me);
    }
  }

 /**
  * Computes the average benchmark results based on the specified number of runs.
  * @member Benchmark
  * @param {Number} [count=Benchmark#INIT_AVERAGE_COUNT] Number of runs to average.
  * @param {Number} [runCount=Benchmark#INIT_RUN_COUNT] Iterations to clock on first cycle.
  * @param {Boolean} [synchronous=false] Flag to run synchronously.
  */
  function average(count, runCount, synchronous) {
    var deviation,
        mean,
        me = this,
        clones = [],
        last = (count || (count = me.INIT_AVERAGE_COUNT)) - 1,
        times = me.times;

    function cbSum(sum, clone) {
      return sum + clone.times.period;
    }

    function cbVariance(sum, clone) {
      return sum + Math.pow(clone.times.period - mean, 2);
    }

    function cbOutlier(clone) {
      var period = clone.times.period;
      return period < (mean + deviation) && period > (mean - deviation);
    }

    function onInvoke(clone) {
      clone.run(runCount, synchronous);
    }

    function onCycle(clone) {
      if (me.aborted) {
        clone.abort();
      } else {
        me.onCycle(merge(me, clone));
      }
    }

    function onComplete(clone, index) {
      if (clone.aborted || index == last) {
        if (!clone.aborted && !clone.error) {
          // compute average period and sample standard deviation
          mean = reduce(clones, cbSum, 0) / clones.length;
          deviation = Math.sqrt(reduce(clones, cbVariance, 0) / (clones.length - 1));

          if (deviation) {
            // remove outliers and compute average period on filtered results
            clones = filter(clones, cbOutlier);
            mean = reduce(clones, cbSum, 0) / clones.length;
          }
          // set host results
          me.count = clones[0].count;
          me.hz = mean ? Math.round(1 / mean) : Number.MAX_VALUE;
          times.period = mean;
          times.cycle = mean * me.count;
        }
        me.running = false;
        times.stop = +new Date;
        times.elapsed = (times.stop - times.start) / 1e3;

        me.onCycle(me);
        me.onComplete(me);
      }
    }

    me.reset();
    me.running = true;
    times.start = +new Date;
    me.onStart(me);

    while (count--) {
      clones.push(me.clone({ 'averaging': true }));
    }
    eachTest(clones, {
      'onInvoke': onInvoke,
      'onStart': onCycle,
      'onCycle': onCycle,
      'onComplete': onComplete
    }, synchronous);
  }

 /**
  * Creates a cloned benchmark with the same test function and options.
  * @member Benchmark
  * @param {Object} options Overwrite cloned options.
  * @returns {Object} Cloned instance.
  */
  function clone(options) {
    var key,
        me = this,
        result = new me.constructor(me.fn, extend(extend({ }, me.options), options));

    // copy manually added properties
    for (key in me) {
      if (!result[key]) {
        result[key] = me[key];
      }
    }
    result.reset();
    return result;
  }

 /**
  * Reset properties and abort if running.
  * @member Benchmark
  */
  function reset() {
    var changed,
        keys = 'count cycles error hz running aborted'.split(' '),
        me = this,
        proto = me.constructor.prototype;

    if (me.running) {
      // no worries, reset() is called within abort()
      me.abort();
    }
    else {
      delete me.times;
      each(keys, function(key) {
        if (me[key] != proto[key]) {
          changed = true;
          me[key] = proto[key];
        }
      });
      me.times = { };
      if (changed) {
        me.onReset(me);
      }
    }
  }

 /**
  * Start running the benchmark.
  * @member Benchmark
  * @param {Number} [count=Benchmark#INIT_RUN_COUNT] Iterations to clock on first cycle.
  * @param {Boolean} [synchronous=false] Flag to run synchronously.
  */
  function run(count, synchronous) {
    var me = this;
    me.reset();
    me.running = true;

    // ensure calibration benchmarks have run
    if (!calibrate(function() {
          function rerun() {
            // continue, if not aborted during calibration
            if (me.running) {
              me.run(count, synchronous);
            } else {
              me.onStart(me);
              me.onAbort(me);
              me.onComplete(me);
            }
          }
          call(me, rerun, synchronous);
        }, synchronous)) {
      // continue, if already calibrated
      me.count = count || me.INIT_RUN_COUNT;
      me.times.start = +new Date;
      me.onStart(me);
      _run(me, synchronous);
    }
  }

 /**
  * Executes each run cycle and computes results.
  * @private
  * @param {Object} me The benchmark instance.
  * @param {Boolean} [synchronous=false] Flag to run synchronously.
  */
  function _run(me, synchronous) {
    var clocked,
        divisor,
        period,
        avgInit = me.INIT_AVERAGE_COUNT,
        count = me.count,
        cycles = me.cycles,
        delay = me.CYCLE_DELAY,
        maxCount = me.MAX_RUN_COUNT,
        minTime = me.MIN_TIME,
        times = me.times;

    // continue, if not aborted between cycles
    if (me.running) {

      if (cycles) {
        cycles = ++me.cycles;
      } else {
        cycles = me.cycles = 1;
      }
      try {
        // clock executions of me.fn
        clocked = clock(me);

        // seconds per operation
        period = times.period = clocked / count;

        // ops per second
        me.hz = period ? Math.round(1 / period) : Number.MAX_VALUE;

        // do we need to do another cycle?
        me.running = clocked < minTime;

        // if so, compute the iteration count needed
        if (me.running) {
          // tests may clock at 0 when INIT_RUN_COUNT is a small number,
          // to avoid that we set its count to something a bit higher
          if (!clocked && (divisor = CYCLE_DIVISORS[cycles])) {
            // try a fraction of the MAX_RUN_COUNT
            count = Math.floor(maxCount / divisor);
          }
          else {
            // calculate how many more iterations it will take to achive the MIN_TIME
            count += Math.ceil((minTime - clocked) / period)

            // to avoid freezing the browser stop running if the
            // next cycle would exceed the max count allowed
            if (count > maxCount) {
              me.running = false;
            }
          }
          // update count for next cycle
          if (me.running) {
            me.count = count;
          }
        }
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
    }
    else {
      times.stop = +new Date;
      times.elapsed = (times.stop - times.start) / 1e3;

      if (me.averaging || me.aborted || me.error || (times.elapsed * avgInit)  > 1) {
        me.onComplete(me);
      }
      else {
        // fast tests get their results averaged
        me.average(Math.max(avgInit, Math.floor(1 / times.elapsed)), null, synchronous);
      }
    }
  }

  /*--------------------------------------------------------------------------*/

  // benchmarks to establish iteration overhead
  each(Benchmark.CALIBRATIONS = [1, 2], function(value, index, cals) {
    cals[index] = new Calibration(noop, { 'INIT_RUN_COUNT': 3e3 });
  });

  extend(Benchmark, {
    // iteration utility used by Benchmark and UI
    'each': each,

    // gets browser name, version, and OS
    'getPlatform': getPlatform,

    // no operation utility used by Benchmark and UI
    'noop': noop
  });

  extend(Benchmark.prototype, {
    // delay between test cycles (secs)
    'CYCLE_DELAY': 0.01,

    // default sample of runs averaged
    'INIT_AVERAGE_COUNT': 3,

    // default number of runs
    'INIT_RUN_COUNT': 10,

    // max runs allowed per cycle (used to avoid freezing the browser)
    'MAX_RUN_COUNT': 1e6, // 1 million

    // minimum time a test should take to get results (secs)
    'MIN_TIME': 0.2,

    // number of times a test was executed
    'count': null,

    // number of cycles performed while benchmarking
    'cycles': null,

    // an error object if the test failed
    'error': null,

    // number of runs per second
    'hz': null,

    // flag to indicate if the benchmark is running
    'running': false,

    // flag to indicate if the benchmark is aborted
    'aborted': false,

    // object of timing data including cycle, elapsed, period, start, and stop (secs)
    'times': null,

    // callback invoked when a benchmark is aborted
    'onAbort': noop,

    // callback invoked when the benchmark is complete
    'onComplete': noop,

    // callback invoked when a test cycle ends
    'onCycle': noop,

    // callback invoked when a benchmark is reset
    'onReset': noop,

    // callback invoked when a benchmark is started
    'onStart': noop,

    // aborts benchmark (does not record times)
    'abort': abort,

    // runs the test `n` times and computes the averaged test results
    'average': average,

    // create new benchmark with the same test function and options
    'clone': clone,

    // reset benchmark properties
    'reset': reset,

    // run the benchmark
    'run': run
  });

  // expose
  global.Benchmark = Benchmark;

}(this));