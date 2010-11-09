/*!
 * benchmark.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */

(function(global) {

  /** MAX_RUN_COUNT divisors used to avoid hz of Infinity */
  var CYCLE_DIVISORS = { '1': 32, '2': 16, '3': 8, '4': 4, '5': 2, '6': 1 };

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
    * @param {Boolean} [async=false] Flag to run asynchronously.
    */
    function run(count, async) {
      var me = this;
      me.reset();
      me.count = count || me.INIT_RUN_COUNT;
      me.running = true;
      me.times.start = +new Date;
      me.onStart(me);
      _run(me, async == null ? me.DEFAULT_ASYNC : async);
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
  * Checks if calibrations have completed and, if not, fires a callback when completed.
  * @private
  * @param {Function} callback Function executed after calibration.
  * @param {Boolean} [async=false] Flag to run asynchronously.
  * @returns {Boolean} Returns true if calibrated, false if not.
  */
  function isCalibrated(callback, async) {
    var cals = Benchmark.CALIBRATIONS,
        result = !filter(cals, function(cal) { return !cal.cycles; }).length;
    // calibrate all if one has not ran
    if (!result) {
      invoke(cals, {
        'async': async,
        'methodName': 'run',
        'onComplete': callback
      });
    }
    return result;
  }

 /**
  * Executes a function asynchronously or synchronously.
  * @private
  * @param {Object} me The benchmark instance passed to `fn`.
  * @param {Function} fn Function to be executed.
  * @param {Boolean} [async=false] Flag to run asynchronously.
  */
  function call(me, fn, async) {
    async && !/^(boolean|number|string|undefined)$/.test(typeof global.setTimeout)
      ? setTimeout(function() { fn(me, async); }, me.CYCLE_DELAY * 1e3)
      : fn(me);
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
          index = me.CALIBRATION_INDEX,
          cals = me.constructor.CALIBRATIONS || [],
          cal = cals[index];

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
        // use fallback calibration
        if (!index) {
          cal = cals[1];
        }
        fallback(me, co);
      }
      return (times.cycle =
        // ensure positive numbers
        Math.max(0,
        // convert time from milliseconds to seconds
        (times.cycle / 1e3) -
        // calibrate by subtracting iteration overhead
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
        name = (ua.match(/Chrome|Firefox|Minefield|MSIE|Opera|RockMelt|Safari/) || [])[0],
        version = {}.toString.call(global.opera) == '[object Opera]' && opera.version(),
        data = { '6.1': '7', '6.0': 'Vista', '5.2': 'Server 2003 / XP x64', '5.1': 'XP', '5.0': '2000', '4.0': 'NT', '4.9': 'ME' };

    if (/Windows/.test(os) && (data = data[os.match(/[456]\.\d/)])) {
      // platform tokens defined at
      // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
      os = 'Windows ' + data;
    }
    else if (/iP[ao]d|iPhone/.test(os)) {
      // normalize iOS
      os = 'iOS' + ((data = ua.match(/\bOS ([\d_]+)/)) ? ' ' + data[1] : '');
    }
    if (!version) {
      // detect non Opera versions
      version = (ua.match(RegExp('(?:version|' + name + ')[ /]([^ ;]*)', 'i')) || [])[1];
    }
    if (typeof document.documentMode == 'number' && (data = ua.match(/Trident\/(\d+)/))) {
      // detect IE compatibility modes
      version = document.documentMode;
      version = (data = +data[1] + 4) != version ? data + ' (' + version + ' Compatibility Mode)' : version;
    }
    if (parseInt(version) > 45) {
      // detect older Safari versions
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

 /**
  * Invokes a given method, with arguments, on all benchmarks in an array.
  * @static
  * @member Benchmark
  * @param {Array} benchmarks Array of benchmarks to iterate over.
  * @param {String|Object} methodName Name of method to invoke or options object.
  * @param {Array} args Arguments to invoke the method with.
  */
  function invoke(benchmarks, methodName, args) {
    var backup,
        queued,
        i = 0,
        async = false,
        first = benchmarks[0],
        length = benchmarks.length,
        options = { 'onComplete': noop },
        toString = {}.toString;

    function onInvoke(me) {
      if (async) {
        backup = me.onComplete;
        me.onComplete = onComplete;
      }
      me[methodName].apply(me, args || []);
      if (!async) {
        onComplete(me);
      }
    }

    function onComplete(me) {
      var next;
      if (async) {
        me.onComplete = backup;
        me.onComplete(me);
      }
      if (queued) {
        next = benchmarks.shift();
      } else if (++i < length) {
        next = benchmarks[i];
      }
      if (next) {
        call(next, onInvoke, async);
      } else {
        options.onComplete(me);
      }
    }

    if (length) {

      // juggle arguments
      if (arguments.length == 2 && typeof methodName == 'object') {
        options = extend(options, methodName);
        methodName = options.methodName;
        queued = options.queued;

        args = options.args || [];
        if (toString.call(args) != '[object Array]') {
          args = [args];
        }
        // allow asyncronous invoking of benchmark `average` and `run` methods
        if ('MAX_RUN_COUNT' in first && first instanceof Benchmark &&
            /^(average|run)$/.test(methodName)) {
          if ('async' in options) {
            async = options.async;
          } else if (toString.call(args[args.length - 1]) == '[object Boolean]') {
            async = args[args.length - 1];
          }
        }
      }
      onInvoke(first);
    }
  }

 /**
  * A generic no operation function.
  * @static
  * @member Benchmark
  */
  function noop() {
    // no operation performed
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
        invoke(Benchmark.CALIBRATIONS, 'abort');
      }
      // set running as NaN so reset() will detect it as falsey and *not* call abort(),
      // but *will* detect it as a change and fire the onReset() callback
      me.running = NaN;
      me.reset();

      me.error = error;
      me.aborted = true;
      me.onAbort(me);
      me.onComplete(me);
    }
  }

 /**
  * Computes the average benchmark results based on the specified number of runs.
  * @member Benchmark
  * @param {Number} [count=Benchmark#INIT_AVERAGE_COUNT] Number of runs to average.
  * @param {Number} [runCount=Benchmark#INIT_RUN_COUNT] Iterations to clock on first cycle.
  * @param {Boolean} [async=false] Flag to run asynchronously.
  */
  function average(count, runCount, async) {
    var deviation,
        mean,
        me = this,
        clones = [],
        times = me.times;

    async = async == null ? me.DEFAULT_ASYNC : async;
    count || (count = me.INIT_AVERAGE_COUNT);

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

    function onCycle(clone) {
      if (me.aborted) {
        clone.abort();
      } else {
        me.onCycle(merge(me, clone));
      }
    }

    function onComplete(clone) {
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

    me.reset();
    me.running = true;
    times.start = +new Date;
    me.onStart(me);

    // create clones
    while (count--) {
      clones.push(me.clone({
        'averaging': true,
        'onComplete': noop,
        'onAbort': noop,
        'onReset': noop,
        'onCycle': onCycle,
        'onStart': onCycle
      }));
    }
    // run them
    invoke(clones, {
      'async': async,
      'methodName': 'run',
      'args': runCount,
      'onComplete': onComplete
    });
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
        me = this,
        keys = 'aborted count cycles error hz running'.split(' '),
        proto = me.constructor.prototype;

    if (me.running) {
      // no worries, reset() is called within abort()
      me.abort();
      me.error = proto.error;
      me.aborted = proto.aborted;
    }
    else {
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
  * Starts running the benchmark.
  * @member Benchmark
  * @param {Number} [count=Benchmark#INIT_RUN_COUNT] Iterations to clock on first cycle.
  * @param {Boolean} [async=false] Flag to run asynchronously.
  */
  function run(count, async) {
    var me = this;
    async = async == null ? me.DEFAULT_ASYNC : async;
    me.running = true;

    function onCalibrate(cal) {
      if (cal.aborted) {
        me.abort();
      } else if (me.running) {
        call(me, rerun, async);
      }
    }

    function rerun() {
      me.run(count, async);
    }

    if (isCalibrated(onCalibrate, async)) {
      // set running to false so reset() won't call abort()
      me.running = false;
      me.reset();
      me.running = true;

      me.count = count || me.INIT_RUN_COUNT;
      me.times.start = +new Date;
      me.onStart(me);
      _run(me, async);
    }
  }

 /**
  * Executes each run cycle and computes results.
  * @private
  * @param {Object} me The benchmark instance.
  * @param {Boolean} [async=false] Flag to run asynchronously.
  */
  function _run(me, async) {
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
        me.onError(me);
      }
      me.onCycle(me);
    }

    // figure out what to do next
    if (me.running) {
      call(me, _run, async);
    }
    else {
      times.stop = +new Date;
      times.elapsed = (times.stop - times.start) / 1e3;

      if (me.averaging || me.aborted || me.error || (times.elapsed * avgInit)  > 1) {
        me.onComplete(me);
      }
      else {
        // fast tests get their results averaged
        me.average(Math.max(avgInit, Math.floor(1 / times.elapsed)), null, async);
      }
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Benchmarks to establish iteration overhead.
   * @static
   * @member Benchmark
   */
  (function(options) {
    Benchmark.CALIBRATIONS = [
      // embedded calibration
      new Calibration(noop, options),
      // fallback calibration
      new Calibration(function() { return; }, options)
    ];
  }({ 'INIT_RUN_COUNT': 3e3 }));

  extend(Benchmark, {
    // iteration utility used by Benchmark and UI
    'each': each,

    // gets browser name, version, and OS
    'getPlatform': getPlatform,

    // invokes a method of each benchmark in a collection
    'invoke': invoke,

    // no operation utility used by Benchmark and UI
    'noop': noop
  });

  extend(Benchmark.prototype, {

    /**
     * The index of the Benchmark.CALIBRATIONS benchmark used for result calibration.
     * @member Benchmark
     */
    'CALIBRATION_INDEX': 0,

    /**
     * The delay between test cycles (secs).
     * @member Benchmark
     */
    'CYCLE_DELAY': 0.01,

    /**
     * Choose to run asynchronous by default.
     * @member Benchmark
     */
    'DEFAULT_ASYNC': false,

    /**
     * The default sample of runs averaged.
     * @member Benchmark
     */
    'INIT_AVERAGE_COUNT': 18,

    /**
     * The default number of times to execute a test on a benchmark's first cycle.
     * @member Benchmark
     */
    'INIT_RUN_COUNT': 10,

    /**
     * The maximum test executions allowed per cycle (used to avoid freezing the browser).
     * @member Benchmark
     */
    'MAX_RUN_COUNT': 1e6, // 1 million

    /**
     * The minimum time a benchmark should take to get results (secs).
     * @member Benchmark
     */
    'MIN_TIME': 0.2,

    /**
     * The number of times a test was executed.
     * @member Benchmark
     */
    'count': null,

    /**
     * The number of cycles performed while benchmarking.
     * @member Benchmark
     */
    'cycles': null,

    /**
     * The error object if the test failed.
     * @member Benchmark
     */
    'error': null,

    /**
     * The number of executions per second.
     * @member Benchmark
     */
    'hz': null,

    /**
     * A flag to indicate if the benchmark is running.
     * @member Benchmark
     */
    'running': false,

    /**
     * A flag to indicate if the benchmark is aborted.
     * @member Benchmark
     */
    'aborted': false,

    /**
     * An object of timing data including cycle, elapsed, period, start, and stop (secs).
     * @member Benchmark
     */
    'times': null,

    // callback fired when a benchmark is aborted
    'onAbort': noop,

    // callback fired when the benchmark is complete
    'onComplete': noop,

    // callback fired when a test cycle ends
    'onCycle': noop,

    // callback fired when a benchmark errors
    'onError': noop,

    // callback fired when a benchmark is reset
    'onReset': noop,

    // callback fired when a benchmark is started
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