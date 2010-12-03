/*!
 * benchmark.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */

(function(window) {

  /** MAX_RUN_COUNT divisors used to avoid hz of Infinity */
  var CYCLE_DIVISORS = {
    '1': 512,
    '2': 128,
    '3': 32,
    '4': 8,
    '5': 2,
    '6': 0
  },

  /**
   * T-Distribution critical values for 95% confidence
   * http://www.itl.nist.gov/div898/handbook/eda/section3/eda3672.htm
   */
  T_DISTRIBUTION = {
    '1':  12.706,'2':  4.303, '3':  3.182, '4':  2.776, '5':  2.571, '6':  2.447,
    '7':  2.365, '8':  2.306, '9':  2.262, '10': 2.228, '11': 2.201, '12': 2.179,
    '13': 2.160, '14': 2.145, '15': 2.131, '16': 2.120, '17': 2.110, '18': 2.101,
    '19': 2.093, '20': 2.086, '21': 2.080, '22': 2.074, '23': 2.069, '24': 2.064,
    '25': 2.060, '26': 2.056, '27': 2.052, '28': 2.048, '29': 2.045, '30': 2.042,
    '31': 2.040, '32': 2.037, '33': 2.035, '34': 2.032, '35': 2.030, '36': 2.028,
    '37': 2.026, '38': 2.024, '39': 2.023, '40': 2.021, '41': 2.020, '42': 2.018,
    '43': 2.017, '44': 2.015, '45': 2.014, '46': 2.013, '47': 2.012, '48': 2.011,
    '49': 2.010, '50': 2.009, '51': 2.008, '52': 2.007, '53': 2.006, '54': 2.005,
    '55': 2.004, '56': 2.003, '57': 2.002, '58': 2.002, '59': 2.001, '60': 2.000,
    '61': 2.000, '62': 1.999, '63': 1.998, '64': 1.998, '65': 1.997, '66': 1.997,
    '67': 1.996, '68': 1.995, '69': 1.995, '70': 1.994, '71': 1.994, '72': 1.993,
    '73': 1.993, '74': 1.993, '75': 1.992, '76': 1.992, '77': 1.991, '78': 1.991,
    '79': 1.990, '80': 1.990, '81': 1.990, '82': 1.989, '83': 1.989, '84': 1.989,
    '85': 1.988, '86': 1.988, '87': 1.988, '88': 1.987, '89': 1.987, '90': 1.987,
    '91': 1.986, '92': 1.986, '93': 1.986, '94': 1.986, '95': 1.985, '96': 1.985,
    '97': 1.985, '98': 1.984, '99': 1.984, '100': 1.984,'Infinity': 1.960
  },

  /** Internal cached used by various methods */
  cache = {
    'compiled': { },
    'counter': 0
  },

  /** Helps to resolve an object's internal [[Class]] property */
  toString = cache.toString;

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
   * @param {Object} me The benchmark instance waiting for calibrations to complete.
   * @param {Function} callback Function executed after calibration.
   * @param {Boolean} [async=false] Flag to run asynchronously.
   * @returns {Boolean} Returns true if calibrated, false if not.
   */
  function isCalibrated(me, callback, async) {
    var cals = Benchmark.CALIBRATIONS,
        onCycle = function(cal) { return !(cal.aborted || me.aborted); },
        result = !filter(cals, function(cal) { return !cal.cycles; }).length;

    // calibrate all if one has not ran
    if (!result) {
      invoke(cals, {
        'async': async,
        'methodName': 'run',
        'onCycle': onCycle,
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
    if (async && isHostType(window, 'setTimeout')) {
      me.timerId = setTimeout(function() {
        delete me.timerId;
        fn(me, async);
      }, me.CYCLE_DELAY * 1e3);
    }
    else {
      fn(me);
    }
  }

  /**
   * Clears cached compiled code for a given test function.
   * @private
   * @param {Object} me The benchmark instance used to resolve the cache entry.
   */
  function clearCompiled(me) {
    var uid = me.fn.uid,
        compiled = cache.compiled;

    if (compiled[uid]) {
      delete compiled[uid];
      if (isHostType(window, 'CollectGarbage')) {
        CollectGarbage();
      }
    }
  }

  /**
   * Performs statistical calculations on benchmark results.
   * @private
   * @param {Object} me The benchmark instance.
   * @param {Boolean} [async=false] Flag to run asynchronously.
   */
  function compute(me, async) {
    var elapsed,
        lastClone,
        mean,
        now,
        moe,
        rme,
        sd,
        sem,
        count = 5,
        clones = [],
        queue = [],
        times = me.times,
        uncompilable = me.fn.uncompilable;

    function cbSum(sum, clone) {
      return sum + clone.times.period;
    }

    function cbVariance(sum, clone) {
      return sum + Math.pow(clone.times.period - mean, 2);
    }

    function createClone() {
      return me.clone({
        'computing': queue,
        'onAbort': noop,
        'onReset': noop,
        'onComplete': onComplete,
        'onCycle': onCycle,
        'onStart': onStart
      });
    }

    function init() {
      var i = count;
      me.cycles = clones.length = queue.length = 0;
      while (i--) {
        lastClone = createClone();
        clones.push(lastClone);
        queue.push(lastClone);
      }
    }

    function onComplete(clone) {
      me.INIT_RUN_COUNT = clone.INIT_RUN_COUNT;
    }

    function onCycle(clone) {
      if (me.aborted) {
        queue.length = clones.length = 0;
        clone.abort();
      }
      else if (me.running && clone.cycles) {
        me.count = clone.count;
        me.cycles += clone.cycles;
        me.error = clone.error;
        me.hz = clone.hz;
        me.times.period = clone.times.period;
        me.onCycle(me);
      }
    }

    function onStart(clone) {
      clone.count = clone.INIT_RUN_COUNT = me.INIT_RUN_COUNT;
      onCycle(clone);
    }

    function onInvokeCycle(clone) {
      var aborted = me.aborted,
          curr = me.fn.uncompilable;

      // exit early if aborted
      if (aborted) {
        queue.length = clones.length = 0;
        me.onComplete(me);
      }
      // start over if switching from compilable to uncompilable
      else if (curr != uncompilable) {
        uncompilable = curr;
        clearCompiled(me);
        init();
      }
      // simulate onComplete to add more to queue if needed
      else if (clone == lastClone) {
        now = +new Date;
        elapsed = (now - times.start) / 1e3;

        // compute values
        mean = reduce(clones, cbSum, 0) / clones.length;
        // standard deviation
        sd = Math.sqrt(reduce(clones, cbVariance, 0) / (clones.length - 1));
        // standard error of the mean
        sem =  sd / Math.sqrt(clones.length);
        // margin of error
        moe = sem * (T_DISTRIBUTION[clones.length - 1] || T_DISTRIBUTION.Infinity);
        // relative margin of error
        rme = (moe / mean) * 100 || 0;

        // Firefox may return extremely high margins of error for compiled methods
        if (!curr && rme > 30) {
          me.fn.uncompilable = uncompilable = true;
          me.INIT_RUN_COUNT = Benchmark.prototype.INIT_RUN_COUNT;
          clearCompiled(me);
          init();
        }
        else {
          // increase sample size to reduce the margin of error
          if (rme > 1 && (elapsed < me.MAX_TIME_ELAPSED || me.constructor == Calibration)) {
            lastClone = createClone();
            clones.push(lastClone);
            queue.push(lastClone);
          }
          // finish up
          else {
            // set host statistical data
            me.MoE = moe;
            me.RME = rme;
            me.SD  = sd;
            me.SEM = sem;

            // set host results
            me.count = lastClone.count;
            me.hz = Math.round(1 / mean);
            me.running = false;

            times.period = mean;
            times.cycle = mean * me.count;
            times.stop = now;
            times.elapsed = elapsed;

            clearCompiled(me);
            me.onComplete(me);
          }
        }
      }
      return !aborted;
    }

    // create clones
    init();

    // run them
    invoke(queue, {
      'async': async == null ? me.DEFAULT_ASYNC : async,
      'methodName': 'run',
      'queued': true,
      'onCycle': onInvokeCycle
    });
  }

  /**
   * Repeat a string a given number of times using the `Exponentiation by squaring` algorithm.
   * http://www.merlyn.demon.co.uk/js-misc0.htm#MLS
   * @private
   * @param {String} string The string to repeat.
   * @param {Number} count The number of times to repeat the string.
   * @returns {String} The repeated string.
   */
  function repeat(string, count) {
    if (count < 1) return '';
    if (count % 2) return repeat(string, count - 1) + string;
    var half = repeat(string, count / 2);
    return half + half;
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
        chunk = 'while(i$--){f$()}',
        code = ['var r$,i$=m$.count,f$=m$.fn,t$=#{0};\n', '#{1};m$.times.cycle=r$;return"$"'],
        co = typeof window.chrome != 'undefined' ? chrome : typeof window.chromium != 'undefined' ? chromium : { };

    function embed(benchmark) {
      var into,
          pre = '',
          fn = benchmark.fn,
          count = benchmark.count,
          uid = fn.uid || (fn.uid = ++cache.counter),
          lastCycle = cache.compiled[uid] || { },
          lastCount = lastCycle.count,
          body = lastCycle.body || '',
          remainder = count;

      if (lastCount != count) {
        // extract test body
        body = (String(fn).match(/^[^{]+{([\s\S]*)}\s*$/) || 0)[1];
        // cleanup test body
        body = body.replace(/^\s+/, '').replace(/\s+$/, '').replace(/([^\n;])$/, '$1\n');
        // create unrolled test cycle
        if (body && count > 1) {
          if (lastCount) {
            into = Math.floor(remainder / lastCount);
            remainder -= lastCount * into;
            pre = repeat(lastCycle.body, into);
          }
          body = pre + (remainder ? repeat(body, remainder) : '');
          cache.compiled[uid] = { 'count': count, 'body': body };
        }
      }
      return Function(args, code[0] + body + code[1]);
    }

    function clock(me) {
      var index = me.CALIBRATION_INDEX,
          cals = me.constructor.CALIBRATIONS || [],
          cal = cals[index];
          count = me.count,
          fn = me.fn,
          times = me.times,
          uncompilable = !supported || fn.uncompilable;

      if (!fn.unclockable) {
        if (!uncompilable) {
          try {
            me.count = 1;
            uncompilable = embed(me)(me, co) != uid;
            me.count = count;

            if (!uncompilable) {
              embed(me)(me, co);
            }
          } catch(e) {
            me.count = count;
            uncompilable = true;
          }
        }
        if (uncompilable) {
          // use fallback calibration
          if (index < 1) {
            cal = cals[0];
          }
          fn.uncompilable = true;
          fallback(me, co);
        }
      } else {
        // unclockable benchmarks (e.g. empty tests)
        times.cycle = 0;
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
    code = code.join('|');
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
    chunk = chunk.replace(/\$/g, uid);
    code = code.replace(/\$/g, uid).split('|');

    // non embedding fallback
    fallback = Function(args, code[0] + chunk + code[1]);

    // is embedding supported?
    (function() {
      var x = new Benchmark(function() { return true; }, { 'count': 1 });
      try { supported = embed(x)(x, co); } catch(e) { }
    }());

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
   * Copies source properties to the destination object.
   * @static
   * @member Benchmark
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
   * @static
   * @member Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {Array} A new array of values that passed callback filter.
   */
  function filter(array, callback) {
    return reduce(array, function(result, value, index) {
      return callback(value, index, array) ? result.push(value) && result : result;
    }, []);
  }

  /**
   * Converts a number to a more readable comma separated string representation.
   * @static
   * @member Benchmark
   * @param {Number} number The number to convert.
   * @returns {String} The more readable string representation.
   */
  function formatNumber(number) {
    var comma = ',',
        string = String(Math.max(0, Math.abs(number).toFixed(0))),
        length = string.length,
        end = /^\d{4,}$/.test(string) ? length % 3 : 0;

    return (end ? string.slice(0, end) + comma : '') +
      string.slice(end).replace(/(\d{3})(?=\d)/g, '$1' + comma);
  }

  /**
   * A generic bare-bones Array#indexOf solution.
   * @static
   * @member Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Mixed} value The value to search for.
   * @returns {Number} The index of the matched value or -1.
   */
  function indexOf(array, value) {
    var result = -1;
    each(array, function(v, i) {
      if (v === value) {
        result = i;
        return false;
      }
    });
    return result;
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
    var async,
        backup,
        queued,
        i = 0,
        first = benchmarks[0],
        length = benchmarks.length,
        options = { 'onComplete': noop, 'onCycle': noop };

    function onInvoke(me) {
      if (async) {
        backup = me.onComplete;
        me.onComplete = onComplete;
      }
      // execute method
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
      // choose next benchmark if not exiting early
      if (options.onCycle(me) !== false) {
        if (queued) {
          next = benchmarks.shift();
        } else if (++i < length) {
          next = benchmarks[i];
        }
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
        if (!isArray(args)) {
          args = [args];
        }
        // allow asyncronous invoking of the run() method
        if ('MIN_TIME' in first && first instanceof Benchmark && methodName == 'run') {
          if ('async' in options) {
            async = options.async;
          } else if (toString.call(args[0]) == '[object Boolean]') {
            async = args[0];
          }
        }
      }
      onInvoke(queued ? benchmarks.shift() : first);
    }
  }

  /**
   * Determines if the given value is an array.
   * @static
   * @member Benchmark
   * @param {Mixed} value The value to check.
   * @returns {Boolean} If the value is an array return true, else false.
   */
  function isArray(value) {
    return toString.call(value) == '[object Array]';
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of object, function, or unknown.
   * @static
   * @member Benchmark
   * @param {Mixed} object The owner of the property.
   * @param {String} property The property name to check.
   * @returns {Boolean} If the property value is a non-primitive return true, else false.
   */
  function isHostType(object, property) {
    return !/^(boolean|number|string|undefined)$/.test(typeof object[property]) && !!object[property];
  }

  /**
   * Creates a string of joined array values or object key-value pairs.
   * @static
   * @member Benchmark
   * @param {Array|Object} object The object to operate on.
   * @param {String} [separator1=','] The separator used between key-value pairs.
   * @param {String} [separator2=': '] The separator used between keys and values.
   * @returns {String} The joined result.
   */
  function join(object, separator1, separator2) {
    var key,
        pairs = [];

    if (!isArray(object)) {
      separator2 || (separator2 = ': ');
      for (key in object) {
        pairs.push(key + separator2 + object[key]);
      }
    } else {
      pairs = object;
    }
    return pairs.join(separator1 || ',');
  }

  /**
   * A no operation function.
   * @static
   * @member Benchmark
   */
  function noop() {
    // no operation performed
  }

  /**
   * A generic bare-bones Array#reduce solution.
   * @static
   * @member Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} accumulator Initial value of the accumulator.
   * @returns {Mixed} The accumulator.
   */
  function reduce(array, callback, accumulator) {
    each(array, function(value, index) {
      accumulator = callback(accumulator, value, index, array);
    });
    return accumulator;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Aborts the benchmark as well as in progress calibrations without recording times.
   * @member Benchmark
   */
  function abort() {
    var me = this;
    if (me.running) {
      if (me.constructor != Calibration) {
        invoke(Benchmark.CALIBRATIONS, 'abort');
      }
      if (me.timerId && isHostType(window, 'clearTimeout')) {
        clearTimeout(me.timerId);
        delete me.timerId;
      }
      // set running as NaN so reset() will detect it as falsey and *not* call abort(),
      // but *will* detect it as a change and fire the onReset() callback
      me.running = NaN;
      me.reset();
      me.aborted = true;
      me.onAbort(me);
    }
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
        keys = 'MoE RME SD SEM aborted count cycles error hz running'.split(' '),
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
   * @param {Boolean} [async=false] Flag to run asynchronously.
   */
  function run(async) {
    var me = this,
        uncompilable = me.fn.uncompilable;

    function onCalibrate(cal) {
      if (cal.aborted) {
        me.abort();
        me.onComplete(me);
      } else if (me.running) {
        me.INIT_RUN_COUNT = Benchmark.prototype.INIT_RUN_COUNT;
        call(me, rerun, async);
      }
    }

    function rerun() {
      me.run(async);
    }

    async = async == null ? me.DEFAULT_ASYNC : async;
    me.running = true;

    if (!uncompilable || (uncompilable && isCalibrated(me, onCalibrate, async))) {
      // set running to false so reset() won't call abort()
      me.running = false;
      me.reset();
      me.running = true;

      me.count = me.INIT_RUN_COUNT;
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
        count = me.count,
        cycles = me.cycles,
        delay = me.CYCLE_DELAY,
        fn = me.fn,
        maxCount = me.MAX_RUN_COUNT,
        minTime = me.MIN_TIME;

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
        period = me.times.period = clocked / count;

        // ops per second
        me.hz = Math.round(1 / period);

        // do we need to do another cycle?
        me.running = !fn.unclockable && clocked < minTime;

        // avoid working our way up to this next time
        me.INIT_RUN_COUNT = count;

        if (me.running) {
          // tests may clock at 0 when INIT_RUN_COUNT is a small number,
          // to avoid that we set its count to something a bit higher
          if (!clocked && (divisor = CYCLE_DIVISORS[cycles]) != null) {
            count = Math.floor(maxCount / divisor);
            // give up and declare the test unclockable
            if (!(me.running = count <= maxCount)) {
              fn.unclockable = true;
              me.INIT_RUN_COUNT = Benchmark.prototype.INIT_RUN_COUNT;
              clearCompiled(me);
            }
          }
          // calculate how many more iterations it will take to achive the MIN_TIME
          if (count <= me.count) {
            count += Math.ceil((minTime - clocked) / period);
            // to avoid freezing the browser avoid compiling if the
            // next cycle would exceed the max count allowed
            if (count > maxCount) {
              fn.uncompilable = true;
              me.running = false;
            }
          }
        }
        // update count for next cycle
        if (me.running) {
          me.count = count;
        }
      }
      catch(e) {
        me.abort();
        me.error = e;
        me.onError(me);
      }
      // should we exit early?
      if (me.onCycle(me) === false) {
        me.abort();
      }
    }

    // figure out what to do next
    if (me.running) {
      call(me, _run, async);
    }
    else if (me.computing || me.aborted || fn.unclockable) {
      me.onComplete(me);
    }
    else {
      me.running = true;
      compute(me, async);
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Platform object containing browser name, version, and operating system.
   * @static
   * @member Benchmark
   */
  Benchmark.platform = (function() {
    var description = [],
        doc = typeof window.document != 'undefined' && document || {},
        ua = typeof window.navigator != 'undefined' && (navigator || {}).userAgent,
        name = 'Avant Browser,Camino,Fennec,Flock,GreenBrowser,iCab,Iron,K-Meleon,Konqueror,Lunascape,Maxthon,Minefield,RockMelt,SeaMonkey,Sleipnir,SlimBrowser,Opera,Chrome,Firefox,IE,Safari',
        os = 'webOS[ /]\\d,Linux,Mac OS(?: X)?,Macintosh,Windows 98;,Windows ',
        product = 'Android,BlackBerry\\s?\\d+,iP[ao]d,iPhone',
        layout = /Gecko|Trident|WebKit/.exec(ua),
        version = toString.call(window.opera) == '[object Opera]' && opera.version(),
        data = { '6.1': '7', '6.0': 'Vista', '5.2': 'Server 2003 / XP x64', '5.1': 'XP', '5.0': '2000', '4.0': 'NT', '4.9': 'ME' };

    name = reduce(name.split(','), function(name, guess) {
      return name || (name = RegExp(guess + '\\b', 'i').exec(ua) && guess);
    });

    product = reduce(product.split(','), function(product, guess) {
      return product || (product = RegExp(guess + '[^);/]*').exec(ua));
    });

    os = reduce(os.split(','), function(os, guess) {
      if (!os && (os = RegExp(guess + '[^);/-]*').exec(ua))) {
        // platform tokens defined at
        // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
        if (/Windows/.test(os) && (data = data[0/*opera fix*/,/[456]\.\d/.exec(os)])) {
          os = 'Windows ' + data;
        }
        // normalize iOS
        else if (/^iP/.test(product)) {
          name || (name = 'Safari');
          os = 'iOS' + ((data = /\bOS ([\d_]+)/.exec(ua)) ? ' ' + data[1] : '');
        }
        // avoid detecting an OS for products
        else if (product) {
          return null;
        }
        // linux <3s underscores
        if (!/Linux/.test(os)) {
          os = String(os).replace(/_/g, '.');
        }
        // cleanup
        if (/Mac/.test(os)) {
          os = String(os).replace(/ Mach$/, '').replace('Macintosh', 'Mac OS');
        }
        os = String(os).replace(/\/(\d)/, ' $1').split(' on ')[0];
      }
      return os;
    });

    // detect non Opera versions
    version = reduce(/webOS/.test(os) ? [name] : ['version', name, product], function(version, guess, i) {
      return version || (version = (RegExp(guess + (i == 1 ? '[ /-]' : '/') + '([^ ();-]*)', 'i').exec(ua) || 0)[1]);
    }, version);

    // cleanup product
    product = product && String(product).replace(/([a-z])(\d)/i, '$1 $2').split('-')[0];

    // detect non Safari WebKit based browsers
    if (product && (!name || name == 'Safari' && !/^iP/.test(product))) {
      name = /[a-z]+/i.exec(product) + ' Browser';
    }
    // detect unspecified Safari versions
    else if (name == 'Safari' && (!version || parseInt(version) > 45)) {
      data = (/AppleWebKit\/(\d+)/.exec(ua) || 0)[1] || Infinity;
      version = data < 400 ? '1.x' : data < 500 ? '2.x' : data < 526 ? '3.x' : data < 534 ? '4+' : version;
    }
    // detect IE compatibility mode
    else if (typeof doc.documentMode == 'number' && (data = /Trident\/(\d+)/.exec(ua))) {
      version = [version, doc.documentMode];
      version[1] = (data = +data[1] + 4) != version[1] ? (layout = null, description.push('running in IE ' + version[1] + ' mode'), data) : version[1];
      version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
    }
    // detect release phases
    if (version && (data = /(?:[ab]|dp|pre|[ab]\dpre)\d?\+?$/i.exec(version) || /(?:alpha|beta) ?\d?/i.exec(ua + ';' + navigator.appMinorVersion))) {
      version = version.replace(RegExp(data + '\\+?$'), '') + (/^b/i.test(data) ? '\u03b2' : '\u03b1') + (/\d+\+?/.exec(data) || '');
    }
    // detect Maxthon's unreliable version info
    if (name == 'Maxthon') {
      version = version && version.replace(/\..*/, '.x');
    }
    // detect Firefox nightly
    else if (name == 'Minefield') {
      name = 'Firefox';
      version = /\u03b1|\u03b2|null/.test(version) ? version : version + '\u03b1';
    }
    // detect mobile
    else if (name && !product && /Mobi/.test(ua)) {
      name += ' Mobile';
    }
    // detect platform preview
    if (/\u03b1|\u03b2/.test(version) && typeof window.external == 'object' && !external) {
      description.unshift('platform preview');
    }
    // detect layout engines
    if (layout && RegExp(/[a-z]+/i.exec(product) + '|Lunascape|Maxthon|Sleipnir').test(name)) {
      description.push((/preview/.test(description) ? 'rendered by ' : '') + layout);
    }
    // add contextual information
    if (description.length) {
      description = ['(' + description.join(' ') + ')'];
    }
    return {
      'version': name && version && description.unshift(version) && version,
      'name': name && description.unshift(name) && name,
      'product': product && description.push('on ' + product) && product,
      'os': os && description.push((product ? '' : 'on ') + os) && os,
      'description': description.length ? description.join(' ') : 'unknown platform',
      'toString': function() { return this.description; }
    };
  }());

  /*--------------------------------------------------------------------------*/

  extend(Benchmark, {

    /**
     * Benchmarks to establish iteration overhead.
     * @static
     * @member Benchmark
     */
    'CALIBRATIONS': [new Calibration(function() { return; })],

    // generic Array#forEach
    'each': each,

    // copy properties to another object
    'extend': extend,

    // generic Array#filter
    'filter': filter,

    // converts a number to a comma separated string
    'formatNumber': formatNumber,

    // generic Array#indexOf
    'indexOf': indexOf,

    // invokes a method of each benchmark in a collection
    'invoke': invoke,

    // xbrowser Array.isArray
    'isArray': isArray,

    // checks if an object's property is a non-primitive value
    'isHostType': isHostType,

    // generic Array#join for arrays and objects
    'join': join,

    // no operation
    'noop': noop,

    // generic Array#reduce
    'reduce': reduce
  });

  /*--------------------------------------------------------------------------*/

  extend(Benchmark.prototype, {

    /**
     * The index of the calibration benchmark to use when computing results.
     * @member Benchmark
     */
    'CALIBRATION_INDEX': -1,

    /**
     * The delay between test cycles (secs).
     * @member Benchmark
     */
    'CYCLE_DELAY': 0.2,

    /**
     * A flag to indicate methods will run asynchronously by default.
     * @member Benchmark
     */
    'DEFAULT_ASYNC': false,

    /**
     * The default number of times to execute a test on a benchmark's first cycle.
     * @member Benchmark
     */
    'INIT_RUN_COUNT': 10,

    /**
     * The maximum test executions allowed per cycle (used to avoid freezing the browser).
     * @member Benchmark
     */
    'MAX_RUN_COUNT': 4e6, // 4 million

    /**
     * The maximum time a benchmark is allowed to run before finishing (secs).
     * @member Benchmark
     */
    'MAX_TIME_ELAPSED': 8,

    /**
     * The time a benchmark should take to get a relative uncertainty of 1% (secs).
     * @member Benchmark
     */
    'MIN_TIME': (function() {
      var unit, start = +new Date;
      while(!(unit = +new Date - start));
      return unit / 20; // (unit / 2) / 0.01 / 1e3
    }()),

    /**
     * The margin of error.
     * @member Benchmark
     */
    'MoE': NaN,

    /**
     * The relative margin of error (expressed as a percentage of the mean).
     * @member Benchmark
     */
    'RME': NaN,

    /**
     * The sample standard deviation.
     * @member Benchmark
     */
    'SD': NaN,

    /**
     * The standard error of the mean.
     * @member Benchmark
     */
    'SEM': NaN,

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

    // create new benchmark with the same test function and options
    'clone': clone,

    // reset benchmark properties
    'reset': reset,

    // run the benchmark
    'run': run
  });

  // expose
  window.Benchmark = Benchmark;

}(this));