/*!
 * benchmark.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */

(function(global) {

  // MAX_RUN_COUNT divisors used to avoid hz of Infinity
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
      me.count = count || me.INIT_RUN_COUNT;
      me.onStart(me);
      _run(me, synchronous);
    }
    proto.constructor = Calibration;
    proto.run = run;
  }(Calibration.prototype = new Klass));

  /*--------------------------------------------------------------------------*/

  // fires callback after calibration or returns false
  function calibrate(callback) {
    var cal = Benchmark.CALIBRATION;
    if (!cal.cycles) {
      cal.onComplete = callback;
      cal.average();
      return true;
    }
    return false;
  }

  // call method sync or async (to allow UI redraws)
  function call(me, callback, synchronous) {
    synchronous
      ? callback(me, synchronous)
      : setTimeout(function() { callback(me); }, me.CYCLE_DELAY * 1e3);
  }

  // merge source results with destinations
  function merge(destination, source) {
    destination.count = source.count;
    destination.cycles += source.cycles;
    destination.error = source.error;
    destination.hz = source.hz;
    destination.period = source.period;
    return destination;
  }

  // copies source properties to destination object
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

  /*--------------------------------------------------------------------------*/

  // clock the time it takes to execute a function N times (milliseconds)
  var clock = (function() {
    var fallback,
        supported,
        uid = +new Date,
        args = 'm' + uid + ',c' + uid,
        code = 'var r$,i$=m$.count,f$=m$.fn,#{0};while(i$--){f$()}#{1};m$.time=r$;return"$"',
        co = typeof global.chrome != 'undefined' ? chrome : typeof global.chromium != 'undefined' ? chromium : { };

    function clock(me) {
      var errored,
          result;
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
        fallback(me, co);
      }
    }

    function embed(fn) {
      var body = String(fn).match(/^[^{]+{([\s\S]*)}\s*$/);
      return Function(args, code.replace('f' + uid + '()', body && body[1]));
    }

    // enable benchmarking via the --enable-benchmarking flag
    // in at least Chrome 7 to use chrome.Interval
    if (typeof co.Interval == 'function') {
      code = code.replace('#{0}', 't$=new c$.Interval;t$.start()')
        .replace('#{1}', 't$.stop();r$=t$.microseconds()/1e3');
    }
    else if (typeof Date.now == 'function') {
      code = code.replace('#{0}', 't$=Date.now()')
        .replace('#{1}', 'r$=Date.now()-t$');
    }
    else {
      code = code.replace('#{0}', 't$=(new Date).getTime()')
        .replace('#{1}', 'r$=(new Date).getTime()-t$');
    }

    // inject uid into variable names to avoid collisions with embedded tests
    code = code.replace(/\$/g, uid);

    // non embeding fallback
    fallback = Function(args, code);

    // is embedding supported?
    try {
      supported = embed(function() { return 1; })({ 'count': 1 }, co);
    } catch(e) { }

    return clock;
  }());

  /*--------------------------------------------------------------------------*/

  function getPlatform() {
    var build,
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
    // detect non Opera versions
    if (!version) {
      version = typeof document.documentMode == 'number'
        ? document.documentMode
        : (ua.match(RegExp('(?:version|' + name + ')[ /]([^ ;]*)', 'i')) || [])[1];
    }
    // detect early Safari versions
    if (parseInt(version) > 45) {
      build = (ua.match(/AppleWebKit\/(\d+)/) || [])[1] || Infinity;
      version = build < 400 ? '1.x' : build < 500 ? '2.x' : version;
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

  function average(count, runCount, synchronous) {
    var deviation,
        mean,
        stopped,
        me = this,
        clones = [],
        i = count || (count = me.INIT_AVERAGE_COUNT);

    function cbSum(sum, clone) {
      return sum + clone.period;
    }

    function cbVariance(sum, clone) {
      return sum + Math.pow(clone.period - mean, 2);
    }

    function cbOutlier(clone) {
      return clone.period < (mean + deviation) && clone.period > (mean - deviation);
    }

    function onCycle(clone) {
      // stop clone and raise flag if host has stopped running
      if (stopped = !me.running) {
        clone.stop();
      } else {
        // update host and fire its onCycle callback
        me.onCycle(merge(me, clone));
      }
    }

    function onComplete(clone) {
      // if host has stopped or this is the last clone to finish
      if (stopped || !--count) {
        if (!stopped && !me.error) {
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
          me.period = mean;
          me.time = mean * me.count;
        }
        me.running = false;
        me.onCycle(me);
        me.onComplete(me);
      }
      else if (!synchronous) {
        // run next clone in the sample
        clone = clones[count];
        call(clone, function() { clone.run(); });
      }
    }

    me.reset();
    me.running = true;
    me.onStart(me);

    while (i--) {
      // create clone and add to sample
      clones.push(me.clone({
        'averaging': true,
        'onStart': onCycle,
        'onCycle': onCycle,
        'onComplete': onComplete
      }));
      // run instantly if synchronous or initiate asynchronous averaging
      if (synchronous || !i) {
        clones[clones.length - 1].run(runCount, synchronous);
      }
    }
  }

  /*--------------------------------------------------------------------------*/

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

  function noop() {
    // no operation performed
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
      me.count = count || me.INIT_RUN_COUNT;
      me.onStart(me);
      _run(me, synchronous);
    }
  }

  function _run(me, synchronous) {
    var divisor,
        period,
        time,
        cal = me.constructor.CALIBRATION,
        count = me.count,
        cycles = me.cycles,
        avgCount = me.INIT_AVERAGE_COUNT,
        maxCount = me.MAX_RUN_COUNT,
        minTime = me.MIN_TIME;

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
          (cal && cal.period || 0) * count);

        // per-operation time
        period = me.period = time / count;

        // ops per second
        me.hz = period ? Math.round(1 / period) : Number.MAX_VALUE;

        // do we need to do another cycle?
        me.running = time < minTime;

        // if so, compute the iteration count needed
        if (me.running) {
          // tests may return a time of 0 when INIT_RUN_COUNT is a small number,
          // to avoid that we set its count to something a bit higher
          if (!time && (divisor = CYCLE_DIVISORS[cycles])) {
            // try a fraction of the MAX_RUN_COUNT
            count = Math.floor(maxCount / divisor);
          }
          else {
            // calculate how many more iterations it will take to achive the min testing time
            count += Math.ceil((minTime - time) / period)

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
    else if (me.averaging || me.error || (me.time * avgCount) > 1) {
      me.onComplete(me);
    }
    else {
      // fast tests get their results averaged
      me.average(Math.max(avgCount, Math.floor(1 / me.time)), null, synchronous);
    }
  }

  /*--------------------------------------------------------------------------*/

  // test to establish iteration loop overhead
  Benchmark.CALIBRATION = new Calibration(noop, { 'INIT_RUN_COUNT': 3e3 });

  Benchmark.getPlatform = getPlatform;

  Benchmark.noop = noop;

  extend(Benchmark.prototype, {
    // delay between test cycles (secs)
    'CYCLE_DELAY': 0.01,

    // number of runs to average
    'INIT_AVERAGE_COUNT': 20,

    // initial number of iterations
    'INIT_RUN_COUNT': 10,

    // max iterations allowed per cycle (used avoid locking up the browser)
    'MAX_RUN_COUNT': 1e6, // 1 million

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