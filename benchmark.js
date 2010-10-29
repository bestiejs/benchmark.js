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

  function Calibration(fn) {
    Benchmark.call(this, fn);
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
      cal.bestOf(3, 7e3); // 7000 * 3
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
            setTimeout(function() {
              me.run(count);
            }, me.CYCLE_DELAY * 1e3);
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
    var start,
        calPeriod = Benchmark.CALIBRATION.period;

    try {
      // clock executions of me.fn
      clock(me);

      // convert time from milliseconds to seconds and calibrate
      me.time = Math.max(0,
        (me.time / 1e3) -
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
  Benchmark.CALIBRATION = new Calibration(noop);

  Benchmark.getPlatform = getPlatform;

  Benchmark.noop = noop;

  extend(Benchmark.prototype, {
    // delay between test cycles (secs)
    'CYCLE_DELAY' : 0.2,

    // initial number of iterations
    'INIT_COUNT' : 1e3,

    // max iterations allowed per cycle (used avoid locking up the browser)
    'MAX_COUNT' : 1e6, // 1 million

    // minimum time a test should take to get valid results (secs)
    'MIN_TIME' : 0.96,

    // callback invoked when one test cycle ends
    'onCycle' : noop,

    // callback invoked when test is started
    'onStart' : noop,

    // callback invoked when test is finished
    'onStop' : noop,

    // runs the test accepting the best of `n` attempts
    'bestOf' : bestOf,

    // create new benchmark with the same test and options
    'clone' : clone,

    // reset test state
    'reset' : reset,

    // run the test
    'run' : run
  });

  // expose
  global.Benchmark = Benchmark;

}(this));