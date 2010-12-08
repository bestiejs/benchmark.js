/*!
 * benchmark.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */

(function(window) {

  /** Divisors used to avoid hz of Infinity */
  var CYCLE_DIVISORS = {
    '1': 4096,
    '2': 512,
    '3': 64,
    '4': 8,
    '5': 0
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
    var me = this;
    options = extend({ }, options);
    extend(me, options);
    me.fn = fn;
    me.options = options;
    me.times = extend({ }, me.times);
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

  // Calibration inherits from Benchmark
  (function() {
    function Klass() { }
    Klass.prototype = Benchmark.prototype;
    (Calibration.prototype = new Klass).constructor = Calibration;
  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Runs calibration benchmarks, if needed, and fires a callback when completed.
   * @private
   * @param {Object} me The benchmark instance waiting for calibrations to complete.
   * @param {Function} callback Function executed after calibration.
   * @param {Boolean} [async=false] Flag to run asynchronously.
   * @returns {Boolean} Returns true if calibrated, false if not.
   */
  function calibrate(me, callback, async) {
    var result = isCalibrated(),
        onCycle = function(cal) { return !(cal.aborted || me.aborted); };

    // calibrate all if one has not ran
    if (!result) {
      invoke(Benchmark.CALIBRATIONS, {
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
      // run garbage collection in IE
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
    var calibrating = me.constructor == Calibration,
        fn = me.fn,
        initRunCount = me.INIT_RUN_COUNT,
        initSampleSize = 5,
        queue = [],
        sample = [],
        state = { 'calibrated': isCalibrated(), 'compilable': fn.compilable };

    function initialize() {
      me.cycles = 0;
      me.INIT_RUN_COUNT = initRunCount;
      clearQueue();
      clearCompiled(me);
      enqueue(initSampleSize);
    }

    function clearQueue() {
      queue.length = sample.length = 0;
    }

    function enqueue(count) {
      while (count--) {
        sample.push(queue[queue.push(me.clone({
          'computing': queue,
          'onAbort': noop,
          'onReset': noop,
          'onComplete': onComplete,
          'onCycle': onCycle,
          'onStart': onStart
        })) - 1]);
      }
    }

    function onComplete(clone) {
      // update host run count and init compilable state
      me.INIT_RUN_COUNT = clone.INIT_RUN_COUNT;
      if (state.compilable == null) {
        state.compilable = fn.compilable;
      }
    }

    function onCycle(clone) {
      // map changes from clone to host
      if (me.running) {
        if (clone.cycles) {
          me.count = clone.count;
          me.cycles += clone.cycles;
          me.hz = clone.hz;
          me.times.period = clone.times.period;
          me.onCycle(me);
        }
        else if (clone.error) {
          me.abort();
          me.error = clone.error;
          me.onError(me);
        }
      }
      else if (me.aborted) {
        clone.abort();
      }
    }

    function onStart(clone) {
      // reset timer if interrupted by calibrations
      if (!calibrating && !state.calibrated && isCalibrated()) {
        state.calibrated = true;
        me.times.start = +new Date;
      }
      // update run count
      clone.count = clone.INIT_RUN_COUNT = me.INIT_RUN_COUNT;
      onCycle(clone);
    }

    function onInvokeCycle(clone) {
      var complete,
          mean,
          moe,
          rme,
          sd,
          sem,
          compilable = fn.compilable,
          now = +new Date,
          times = me.times,
          aborted = me.aborted,
          elapsed = (now - times.start) / 1e3,
          sampleSize = sample.length,
          sumOf = function(sum, clone) { return sum + clone.hz; },
          varianceOf = function(sum, clone) { return sum + Math.pow(clone.hz - mean, 2); };

      // avoid computing unclockable tests
      if (fn.unclockable) {
        clearQueue();
      }
      // exit early if aborted
      if (aborted) {
        complete = true;
      }
      // start over if switching compilable state
      else if (state.compilable != compilable) {
        state.compilable = compilable;
        times.start = +new Date;
        initialize();
      }
      // simulate onComplete and enqueue additional runs if needed
      else if (!queue.length || sampleSize > initSampleSize) {
        // compute values
        mean = reduce(sample, sumOf, 0) / sampleSize || 0;
        // standard deviation
        sd = Math.sqrt(reduce(sample, varianceOf, 0) / (sampleSize - 1)) || 0;
        // standard error of the mean
        sem =  sd / Math.sqrt(sampleSize) || 0;
        // margin of error
        moe = sem * (T_DISTRIBUTION[sampleSize - 1] || T_DISTRIBUTION.Infinity);
        // relative margin of error
        rme = (moe / mean) * 100 || 0;

        // if time permits, or calibrating, increase sample size to reduce the margin of error
        if (rme > 1 && (elapsed < me.MAX_TIME_ELAPSED || rme > 50 || calibrating || queue.length)) {
          if (!queue.length) {
            // quadruple sample size to cut the margin of error in half
            enqueue(rme > 50 ? sampleSize * 3 : 1);
          }
        }
        // finish up
        else {
          complete = true;

          // set statistical data
          me.MoE = moe;
          me.RME = rme;
          me.SD  = sd;
          me.SEM = sem;

          // set host results
          me.count = clone.count;
          me.running = false;
          times.stop = now;
          times.elapsed = elapsed;

          if (clone.hz != Infinity) {
            me.hz = mean;
            times.period = 1 / mean;
            times.cycle = times.period * me.count;
          }
        }
      }
      // cleanup
      if (complete) {
        clearQueue();
        clearCompiled(me);
        delete fn.unclockable;
        delete fn.compilable;
        me.INIT_RUN_COUNT = initRunCount;
        me.onComplete(me);
      }
      return !aborted;
    }

    // init queue and sample
    initialize();

    // run them
    invoke(queue, {
      'async': async == null ? me.DEFAULT_ASYNC : async,
      'methodName': 'run',
      'queued': true,
      'onCycle': onInvokeCycle
    });
  }

  /**
   * Checks if calibration benchmarks have completed.
   * @private
   * @returns {Boolean} Returns true if calibrated, false if not.
   */
  function isCalibrated() {
    return !filter(Benchmark.CALIBRATIONS, function(cal) { return !cal.cycles; }).length;
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
   * @returns {Object} An object containing the clocked time and loops taken.
   */
  var clock = (function() {
    var fallback,
        supported,
        uid = +new Date,
        args = 'm' + uid + ',c' + uid,
        chunk = 'while(i$--){',
        code = ['var r$,i$=m$.count,l$=i$,f$=m$.fn,t$=#{0};\n', '#{1};return{looped:i$<0?l$:0,time:r$,uid:"$"}'],
        co = typeof window.chrome != 'undefined' ? chrome : typeof window.chromium != 'undefined' ? chromium : { };

    function embed(me) {
      var into,
          shift,
          count = me.count,
          head = code[0],
          fn = me.fn,
          prefix = '',
          uid = fn.uid || (fn.uid = ++cache.counter),
          lastCycle = cache.compiled[uid] || { },
          lastCount = lastCycle.count,
          lastBody = lastCycle.body,
          body = lastBody || '',
          remainder = count;

      if (lastCount != count) {
        // extract test body
        body = (String(fn).match(/^[^{]+{([\s\S]*)}\s*$/) || 0)[1];
        // cleanup test body
        body = body.replace(/^\s+/, '').replace(/\s+$/, '').replace(/([^\n;])$/, '$1\n');

        // create unrolled test cycle
        if (body && count > 1) {

          // compile faster by using the last cycles body as much as possible
          if (lastCount) {
            // number of times to repeat the last cycles unrolled body
            into = Math.floor(remainder / lastCount);
            // how much is left to unroll
            remainder -= lastCount * into;

            // for large strings (~50mb+) switch to hybrid compiling (unroll + while loop)
            if (body.length * count > 51e3) {
              fn.compilable = 0;
              // reduce remainder as much as possible and shift unrolled to the while loop
              if (shift = remainder ? Math.floor(remainder / into) : 0) {
                lastBody = lastCycle.body += repeat(body, shift);
                lastCycle.count += shift;
                remainder -= shift;
              }
              // compile while loop
              head = head.replace(/(i\d+=)[^,]+/, '$1' + into);
              prefix = chunk + lastBody + '}';
            }
            else {
              prefix = repeat(lastBody, into);
            }
          }
          // compile unrolled body
          body = prefix + (remainder ? repeat(body, remainder) : '');

          // cache if not hybrid compiling
          if (head == code[0]) {
            cache.compiled[uid] = { 'count': count, 'body': body };
          }
        }
      }
      return Function(args, head + body + code[1]);
    }

    function clock(me) {
      var count = me.count,
          fn = me.fn,
          compilable = !supported ? -1 : fn.compilable,
          times = me.times,
          result = { 'looped': 0, 'time': 0 };

      if (!fn.unclockable) {
        if (compilable == null || compilable > -1) {
          try {
            if (compilable == null) {
              me.count = 1;
              compilable = fn.compilable = embed(me)(me, co).uid == uid ? 1 : -1;
              me.count = count;
            }
            if (compilable > -1) {
              result = embed(me)(me, co);
            }
          } catch(e) {
            me.count = count;
            compilable = fn.compilable = -1;
          }
        }
        if (compilable < 0) {
          result = fallback(me, co);
        }
      }
      delete result.uid;
      return result;
    }

    // enable benchmarking via the --enable-benchmarking flag
    // in at least Chrome 7 to use chrome.Interval
    code = code.join('|');
    if (typeof co.Interval == 'function') {
      code = code.replace('#{0}', 'new c$.Interval;t$.start()')
        .replace('#{1}', 't$.stop();r$=t$.microseconds()/1e6');
    }
    else if (typeof Date.now == 'function') {
      code = code.replace('#{0}', 'Date.now()')
        .replace('#{1}', 'r$=(Date.now()-t$)/1e3');
    }
    else {
      code = code.replace('#{0}', '(new Date).getTime()')
        .replace('#{1}', 'r$=((new Date).getTime()-t$)/1e3');
    }

    // inject uid into variable names to avoid collisions with embedded tests
    code = code.replace(/\$/g, uid).split('|');
    chunk = chunk.replace(/\$/g, uid);

    // non embedding fallback
    fallback = Function(args, code[0] + chunk + 'f' + uid + '()}' + code[1]);

    // is embedding supported?
    (function() {
      var x = new Benchmark(function() { return 1; }, { 'count': 1 });
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
   * @param {Array} benches Array of benchmarks to iterate over.
   * @param {String|Object} methodName Name of method to invoke or options object.
   * @param {Array} args Arguments to invoke the method with.
   */
  function invoke(benches, methodName, args) {
    var async,
        backup,
        queued,
        i = 0,
        first = benches[0],
        length = benches.length,
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
          next = benches.shift();
        } else if (++i < length) {
          next = benches[i];
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
      onInvoke(queued ? benches.shift() : first);
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
   * Determines if the benchmark's hertz is higher than another.
   * @static
   * @member Benchmark
   * @param {Object} other The benchmark to compare.
   * @returns {Number} Returns 1 if higher, -1 if lower, and 0 if indeterminate.
   */
  function compare(other) {
    var me = this,
        a = { 'lower': me.hz - me.MoE,       'upper': me.hz + me.MoE },
        b = { 'lower': other.hz - other.MoE, 'upper': other.hz + other.MoE };
    return a.lower <= b.upper && a.upper >= b.lower ? 0 : a.lower > b.lower ? 1 : -1;
  }

  /**
   * Reset properties and abort if running.
   * @member Benchmark
   */
  function reset() {
    var changed,
        me = this,
        keys = 'MoE RME SD SEM aborted count cycles error hz running'.split(' '),
        timeKeys = 'cycle elapsed period start stop'.split(' '),
        times = me.times,
        proto = me.constructor.prototype;

    if (me.running) {
      // no worries, reset() is called within abort()
      me.abort();
      me.error = proto.error;
      me.aborted = proto.aborted;
    }
    else {
      // check if properties have changed and reset them
      each(keys, function(key) {
        if (me[key] != proto[key]) {
          changed = true;
          me[key] = proto[key];
        }
      });
      each(timeKeys, function(key) {
        if (times[key] != proto.times[key]) {
          changed = true;
          me[key] = proto.times[key];
        }
      });

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
    var me = this;
    async = async == null ? me.DEFAULT_ASYNC : async;

    // set running to false so reset() won't call abort()
    me.running = false;
    me.reset();
    me.running = true;
    me.count = me.INIT_RUN_COUNT;
    me.times.start = +new Date;
    me.onStart(me);

    if (me.computing) {
      _run(me, async);
    } else {
      compute(me, async);
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
        compilable;

    function onCalibrate(cal) {
      if (cal.aborted) {
        me.abort();
        me.onComplete(me);
      } else if (me.running) {
        call(me, finish, async);
      }
    }

    function finish() {
      var divisor,
          period,
          fn = me.fn,
          index = me.CALIBRATION_INDEX,
          times = me.times,
          cals = me.constructor.CALIBRATIONS || [],
          cal = cals[(index > 0 || fn.compilable < 1) && index],
          count = me.count,
          minTime = me.MIN_TIME;

      if (me.running) {
        // calibrate by subtracting iteration overhead
        clocked = times.cycle = Math.max(0,
          clocked.time - (cal && cal.times.period || 0) * clocked.looped);

        // seconds per operation
        period = times.period = clocked / count;

        // ops per second
        me.hz = 1 / period;

        // do we need to do another cycle?
        me.running = !fn.unclockable && clocked < minTime;

        // avoid working our way up to this next time
        me.INIT_RUN_COUNT = count;

        if (me.running) {
          // tests may clock at 0 when INIT_RUN_COUNT is a small number,
          // to avoid that we set its count to something a bit higher
          if (!clocked && (divisor = CYCLE_DIVISORS[me.cycles]) != null) {
            count = Math.floor(4e6 / divisor);
          }
          // calculate how many more iterations it will take to achive the MIN_TIME
          if (count <= me.count) {
            count += Math.ceil((minTime - clocked) / period);
          }
          // give up and declare the test unclockable
          if (!(me.running = count != Infinity)) {
            fn.unclockable = true;
            clearCompiled(me);
          }
        }
      }
      // figure out what to do next
      if (me.running) {
        me.count = count;
        call(me, _run, async);
      } else {
        me.onComplete(me);
      }
    }

    // continue, if not aborted between cycles
    if (me.running) {
      me.cycles++;
      try {
        clocked = clock(me);
      }
      catch(e) {
        me.abort();
        me.error = e;
        me.onError(me);
      }
      // used for calibration later
      looped = me.looped || 0;
      delete me.looped;

      // should we exit early?
      if (me.onCycle(me) === false) {
        me.abort();
      }
    }
    // check if calibration is needed
    if (me.running) {
      compilable = me.fn.compilable;
      if (compilable == null || compilable > 0 || me.constructor == Calibration ||
          (compilable < 1 && calibrate(me, onCalibrate, async))) {
        finish();
      }
    } else {
      finish();
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
        name = 'Avant Browser,Camino,Epiphany,Fennec,Flock,Galeon,GreenBrowser,iCab,Iron,K-Meleon,Konqueror,Lunascape,Maxthon,Minefield,RockMelt,SeaMonkey,Sleipnir,SlimBrowser,Sunrise,Opera,Chrome,Firefox,IE,Safari',
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
      return version || (version = (RegExp(guess + (i == 1 ? '[ /-]' : '/') + '([^ ();/-]*)', 'i').exec(ua) || 0)[1]);
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
      'description': description.length ? description.join(' ') : ua,
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
    'CALIBRATIONS': (function() {
      var cal = new Calibration(noop);
      cal.fn.compilable = -1;
      return [cal];
    }()),

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
    'CALIBRATION_INDEX': 0,

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
    'INIT_RUN_COUNT': 5,

    /**
     * The maximum time a benchmark is allowed to run before finishing (secs).
     * @member Benchmark
     */
    'MAX_TIME_ELAPSED': 8,

    /**
     * The minimum time needed to reduce the percent uncetainty of measurement to 1% (secs).
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
    'MoE': 0,

    /**
     * The relative margin of error (expressed as a percentage of the mean).
     * @member Benchmark
     */
    'RME': 0,

    /**
     * The sample standard deviation.
     * @member Benchmark
     */
    'SD': 0,

    /**
     * The standard error of the mean.
     * @member Benchmark
     */
    'SEM': 0,

    /**
     * The number of times a test was executed.
     * @member Benchmark
     */
    'count': 0,

    /**
     * The number of cycles performed while benchmarking.
     * @member Benchmark
     */
    'cycles': 0,

    /**
     * The error object if the test failed.
     * @member Benchmark
     */
    'error': null,

    /**
     * The number of executions per second.
     * @member Benchmark
     */
    'hz': 0,

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
     * An object of timing data including cycle, elapsed, period, start, and stop.
     * @member Benchmark
     */
    'times': {
      // time taken to complete the last cycle (secs).
      'cycle': 0,

      // time taken to complete the benchmark (secs).
      'elapsed': 0,

      // time taken to execute the test once (secs).
      'period': 0,

      // timestamp of when the benchmark started (ms).
      'start': 0,

      // timestamp of when the benchmark finished (ms).
      'stop': 0
    },

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

    // compares benchmark's hertz with another
    'compare': compare,

    // reset benchmark properties
    'reset': reset,

    // run the benchmark
    'run': run
  });

  // expose
  window.Benchmark = Benchmark;

}(this));