;(function() {

  /** Used as a safe reference for `undefined` in pre ES5 environments */
  var undefined;

  /** Used as a reference to the global object */
  var root = (typeof global == 'object' && global) || this;

  /** Method and object shortcuts */
  var phantom = root.phantom,
      amd = root.define && define.amd,
      document = !phantom && root.document,
      noop = function() {},
      slice = Array.prototype.slice;

  /** Detect if running in Java */
  var isJava = !document && !!root.java;

  /** Use a single "load" function */
  var load = (typeof require == 'function' && !amd)
    ? require
    : (isJava && root.load) || noop;

  /** The unit testing framework */
  var QUnit = (function() {
    return  root.QUnit || (
      root.addEventListener || (root.addEventListener = noop),
      root.setTimeout || (root.setTimeout = noop),
      root.QUnit = load('../vendor/qunit/qunit/qunit.js') || root.QUnit,
      addEventListener === noop && delete root.addEventListener,
      root.QUnit
    );
  }());

  /** Load and install QUnit Extras */
  var qa = load('../vendor/qunit-extras/qunit-extras.js');
  if (qa) {
    qa.runInContext(root);
  }

  /** The `lodash` utility function */
  var _ = root._ || (root._ = (
    _ = load('../vendor/lodash/dist/lodash.compat.js') || root._,
    _ = _._ || _,
    _.runInContext(root)
  ));

  /** The `Benchmark` constructor to test */
  var Benchmark = root.Benchmark || (root.Benchmark = (
    Benchmark = load('../benchmark.js') || root.Benchmark,
    Benchmark = Benchmark.Benchmark || Benchmark,
    Benchmark.runInContext(root)
  ));

  /** Used to create dummy benchmarks for comparisons */
  var benchData = {
    'hz': 1000,
    'count': 10,
    'cycles': 1,
    'stats': {
      'deviation': 0,
      'mean': 1,
      'moe': 0,
      'rme': 0,
      'sample': [1, 1, 1, 1, 1],
      'sem': 0,
      'variance': 0
    }
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Skips a given number of tests with a passing result.
   *
   * @private
   * @param {Number} [count=1] The number of tests to skip.
   */
  function skipTest(count) {
    count || (count = 1);
    while (count--) {
      ok(true, 'test skipped');
    }
  }

  /*--------------------------------------------------------------------------*/

  // init Benchmark.options.minTime
  Benchmark(function() { throw 0; }).run();

  // set a shorter max time
  Benchmark.options.maxTime = Benchmark.options.minTime * 5;

  // explicitly call `QUnit.module()` instead of `module()`
  // in case we are in a CLI environment
  QUnit.module('Benchmark');

  (function() {
    test('supports loading Benchmark.js as a module', function() {
      if (amd) {
        equal((benchmarkModule || {}).version, Benchmark.version);
      }
      else {
        skipTest();
      }
    });

    test('supports loading Platform.js as a module', function() {
      if (amd) {
        var platform = (benchmarkModule || {}).platform || {},
            name = platform.name;

        ok(typeof name == 'string' || name === null);
      }
      else {
        skipTest();
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark constructor');

  (function() {
    test('creates a new instance when called without the `new` operator', function() {
      ok(Benchmark() instanceof Benchmark);
    });

    test('supports passing an options object', function() {
      var bench = Benchmark({ 'name': 'foo', 'fn': function() {} });
      ok(bench.fn && bench.name == 'foo');
    });

    test('supports passing a "name" and "fn" argument', function() {
      var bench = Benchmark('foo', function() {});
      ok(bench.fn && bench.name == 'foo');
    });

    test('supports passing a "name" argument and an options object', function() {
      var bench = Benchmark('foo', { 'fn': function() {} });
      ok(bench.fn && bench.name == 'foo');
    });

    test('supports passing a "name" argument and an options object', function() {
      var bench = Benchmark('foo', function() {}, { 'id': 'bar' });
      ok(bench.fn && bench.name == 'foo' && bench.id == 'bar');
    });

    test('supports passing an empy string for the "fn" options property', function() {
      var bench = Benchmark({ 'fn': '' }).run();
      ok(!bench.error);
    });

    test('detects dead code', function() {
      var bench = Benchmark(function() {}).run();
      ok(/setup\(\)/.test(bench.compiled) ? !bench.error : bench.error);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark compilation');

  (function() {
    test('compiles using the default `Function#toString`', function() {
      var bench = Benchmark({
        'setup': function() { var a = 1; },
        'fn': function() { throw a; },
        'teardown': function() { a = 2; }
      }).run();

      var compiled = bench.compiled;
      if (/setup\(\)/.test(compiled)) {
        skipTest();
      }
      else {
        ok(/var a\s*=\s*1/.test(compiled) && /throw a/.test(compiled) && /a\s*=\s*2/.test(compiled));
      }
    });

    test('compiles using a custom "toString" method', function() {
      var bench = Benchmark({
        'setup': function() {},
        'fn': function() {},
        'teardown': function() {}
      });

      bench.setup.toString = function() { return 'var a = 1;' };
      bench.fn.toString = function() { return 'throw a;' };
      bench.teardown.toString = function() { return 'a = 2;' };
      bench.run();

      var compiled = bench.compiled;
      if (/setup\(\)/.test(compiled)) {
        skipTest();
      }
      else {
        ok(/var a\s*=\s*1/.test(compiled) && /throw a/.test(compiled) && /a\s*=\s*2/.test(compiled));
      }
    });

    test('compiles using a string value', function() {
      var bench = Benchmark({
        'setup': 'var a = 1;',
        'fn': 'throw a;',
        'teardown': 'a = 2;'
      }).run();

      var compiled = bench.compiled;
      if (/setup\(\)/.test(compiled)) {
        skipTest();
      }
      else {
        ok(/var a\s*=\s*1/.test(compiled) && /throw a/.test(compiled) && /a\s*=\s*2/.test(compiled));
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark test binding');

  (function() {
    var count = 0;

    var tests = {
      'inlined "setup", "fn", and "teardown"': (
        'if(/ops/.test(this))this._fn=true;'
      ),
      'called "fn" and inlined "setup"/"teardown" reached by error': function() {
        count++;
        if (/ops/.test(this)) {
          this._fn = true;
        }
      },
      'called "fn" and inlined "setup"/"teardown" reached by `return` statement': function() {
        if (/ops/.test(this)) {
          this._fn = true;
        }
        return;
      }
    };

    _.forOwn(tests, function(fn, title) {
      test('has correct binding for ' + title, function() {
        var bench = Benchmark({
          'setup': 'if(/ops/.test(this))this._setup=true;',
          'fn': fn,
          'teardown': 'if(/ops/.test(this))this._teardown=true;',
          'onCycle': function() { this.abort(); }
        }).run();

        var compiled = bench.compiled;
        if (/setup\(\)/.test(compiled)) {
          skipTest(3);
        }
        else {
          ok(bench._setup, 'correct binding for "setup"');
          ok(bench._fn, 'correct binding for "fn"');
          ok(bench._teardown, 'correct binding for "teardown"');
        }
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.filter');

  (function() {
    var objects = {
      'array': ['a', 'b', 'c', ''],
      'array-like-object': { '0': 'a', '1': 'b', '2': 'c',  '3': '', 'length': 4 }
    };

    _.forOwn(objects, function(object, key) {
      test('passes the correct arguments when passing an ' + key, function() {
        var args;
        Benchmark.filter(object, function() {
          args || (args = slice.call(arguments));
        });

        deepEqual(args, ['a', 0, object]);
      });

      test('produces the correct result when passing an ' + key, function() {
        var actual = Benchmark.filter(object, function(value, index) {
          return index > 0;
        });

        deepEqual(actual, ['b', 'c', '']);
      });
    });

    test('should correctly detect the fastest/slowest benchmark for small sample sizes', function() {
      var data = _.cloneDeep(benchData),
          bench = Benchmark(data);

      var other = Benchmark(_.merge(data, {
        'hz': 500,
        'stats': {
          'mean': 2,
          'sample': [2, 2, 2, 2, 2]
        }
      }));

      var actual = Benchmark.filter([bench, other], 'fastest');
      deepEqual(actual, [bench], 'correctly detects the fastest');

      actual = Benchmark.filter([bench, other], 'slowest');
      deepEqual(actual, [other], 'correctly detects the slowest');
    });

    test('should correctly detect the fastest/slowest benchmark for large sample sizes', function() {
      var data = _.cloneDeep(benchData);

      var bench = Benchmark(_.merge(data, {
        'stats': {
          'sample': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }
      }));

      var other = Benchmark(_.merge(data, {
        'hz': 500,
        'stats': {
          'mean': 2,
          'sample': [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
        }
      }));

      var actual = Benchmark.filter([bench, other], 'fastest');
      deepEqual(actual, [bench], 'correctly detects the fastest');

      actual = Benchmark.filter([bench, other], 'slowest');
      deepEqual(actual, [other], 'correctly detects the slowest');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.formatNumber');

  (function() {
    test('formats a million correctly', function() {
      equal(Benchmark.formatNumber(1e6), '1,000,000');
    });

    test('formats less than 100 correctly', function() {
      equal(Benchmark.formatNumber(23), '23');
    });

    test('formats numbers with decimal values correctly', function() {
      equal(Benchmark.formatNumber(1234.56), '1,234.56');
    });

    test('formats negative numbers correctly', function() {
      equal(Benchmark.formatNumber(-1234.56), '-1,234.56');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.invoke');

  (function() {
    var objects = {
      'array': ['a', ['b'], 'c', null],
      'array-like-object': { '0': 'a', '1': ['b'], '2': 'c',  '3': null, 'length': 4 }
    };

    _.forOwn(objects, function(object, key) {
      test('produces the correct result when passing an ' + key, function() {
        var actual = Benchmark.invoke(object, 'concat');
        deepEqual(actual, ['a', ['b'], 'c', undefined]);
      });

      test('passes the correct arguments to the invoked method when passing an ' + key, function() {
        var actual = Benchmark.invoke(object, 'concat', 'x', 'y', 'z');
        deepEqual(actual, ['axyz', ['b', 'x', 'y', 'z'], 'cxyz', undefined]);
      });

      test('handles options object with callbacks correctly when passing an ' + key, function() {
        function callback() {
          callbacks.push(slice.call(arguments));
        }

        var callbacks = [];
        var actual = Benchmark.invoke(object, {
          'name': 'concat',
          'args': ['x', 'y', 'z'],
          'onStart': callback,
          'onCycle': callback,
          'onComplete': callback
        });

        deepEqual(actual, ['axyz', ['b', 'x', 'y', 'z'], 'cxyz', undefined]);

        equal(callbacks[0].length, 1);
        equal(callbacks[0][0].target, 'a');
        deepEqual(callbacks[0][0].currentTarget, object);
        equal(callbacks[0][0].type, 'start');
        equal(callbacks[1][0].type, 'cycle');
        equal(callbacks[5][0].type, 'complete');
      });

      test('supports queuing when passing an ' + key, function() {
        var lengths = [];
        var actual = Benchmark.invoke(object, {
          'name': 'concat',
          'queued': true,
          'args': 'x',
          'onCycle': function() {
            lengths.push(object.length);
          }
        });

        deepEqual(lengths, [4, 3, 2, 1]);
        deepEqual(actual, ['ax', ['b', 'x'], 'cx', undefined]);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.join');

  (function() {
    var objects = {
      'array': ['a', 'b', ''],
      'array-like-object': { '0': 'a', '1': 'b', '2': '', 'length': 3 },
      'object': { 'a': '0', 'b': '1', '': '2' }
    };

    _.forOwn(objects, function(object, key) {
      test('joins correctly using the default separator when passing an ' + key, function() {
        equal(Benchmark.join(object), key == 'object' ? 'a: 0,b: 1,: 2' : 'a,b,');
      });

      test('joins correctly using a custom separator when passing an ' + key, function() {
        equal(Benchmark.join(object, '+', '@'), key == 'object' ? 'a@0+b@1+@2' :  'a+b+');
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark#clone');

  (function() {
    var bench = Benchmark(function() { this.count += 0; }).run();

    test('produces the correct result passing no arguments', function() {
      var clone = bench.clone();
      deepEqual(clone, bench);
      ok(clone.stats != bench.stats && clone.times != bench.times && clone.options != bench.options);
    });

    test('produces the correct result passing a data object', function() {
      var clone = bench.clone({ 'fn': '', 'name': 'foo' });
      ok(clone.fn === '' && clone.options.fn === '');
      ok(clone.name == 'foo' && clone.options.name == 'foo');
    });
  }());


  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark#compare');

  (function() {
    test('should return `0` when compared to itself', function() {
      var bench = Benchmark(benchData);
      strictEqual(bench.compare(bench), 0);
    });

    test('should correctly detect the faster benchmark for small sample sizes', function() {
      var data = _.cloneDeep(benchData),
          bench = Benchmark(data);

      var other = Benchmark(_.merge(data, {
        'hz': 500,
        'stats': {
          'mean': 2,
          'sample': [2, 2, 2, 2, 2]
        }
      }));

      strictEqual(bench.compare(other), 1);
      strictEqual(other.compare(bench), -1);
    });

    test('should correctly detect the faster benchmark for large sample sizes', function() {
      var data = _.cloneDeep(benchData);

      var bench = Benchmark(_.merge(data, {
        'stats': {
          'sample': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }
      }));

      var other = Benchmark(_.merge(data, {
        'hz': 500,
        'stats': {
          'mean': 2,
          'sample': [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
        }
      }));

      strictEqual(bench.compare(other), 1);
      strictEqual(other.compare(bench), -1);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark#run');

  (function() {
    var data = { 'onComplete': 0, 'onCycle': 0, 'onStart': 0 };

    var bench = Benchmark({
      'fn': function() {
        this.count += 0;
      },
      'onStart': function() {
        data.onStart++;
      },
      'onComplete': function() {
        data.onComplete++;
      }
    })
    .run();

    test('onXYZ callbacks should not be triggered by internal benchmark clones', function() {
      equal(data.onStart, 1);
      equal(data.onComplete, 1);
    });
  }());

  /*--------------------------------------------------------------------------*/

  _.forOwn({
    'Benchmark': Benchmark,
    'Benchmark.Suite': Benchmark.Suite
  },
  function(Constructor, namespace) {

    QUnit.module(namespace + '#emit');

    (function() {
      test('emits passed arguments', function() {
        var args,
            object = Constructor();

        object.on('args', function() { args = slice.call(arguments, 1); });
        object.emit('args', 'a', 'b', 'c');
        deepEqual(args, ['a', 'b', 'c']);
      });

      test('emits with no listeners', function() {
        var event = Benchmark.Event('empty'),
            object = Constructor();

        object.emit(event);
        equal(event.cancelled, false);
      });

      test('emits with an event type of "toString"', function() {
        var event = Benchmark.Event('toString'),
            object = Constructor();

        object.emit(event);
        equal(event.cancelled, false);
      });

      test('returns the last listeners returned value', function() {
        var event = Benchmark.Event('result'),
            object = Constructor();

        object.on('result', function() { return 'x'; });
        object.on('result', function() { return 'y'; });
        equal(object.emit(event), 'y');
      });

      test('aborts the emitters listener iteration when `event.aborted` is `true`', function() {
        var event = Benchmark.Event('aborted'),
            object = Constructor();

        object.on('aborted', function(event) {
          event.aborted = true;
          return false;
        });

        object.on('aborted', function(event) {
          // should not get here
          event.aborted = false;
          return true;
        });

        equal(object.emit(event), false);
        equal(event.aborted, true);
      });

      test('cancels the event if a listener explicitly returns `false`', function() {
        var event = Benchmark.Event('cancel'),
            object = Constructor();

        object.on('cancel', function() { return false; });
        object.on('cancel', function() { return true; });
        object.emit(event);
        equal(event.cancelled, true);
      });

      test('uses a shallow clone of the listeners when emitting', function() {
        var event,
            listener2 = function(eventObject) { eventObject.listener2 = true },
            object = Constructor();

        object.on('shallowclone', function(eventObject) {
          event = eventObject;
          object.off(event.type, listener2);
        })
        .on('shallowclone', listener2)
        .emit('shallowclone');

        ok(event.listener2);
      });

      test('emits a custom event object', function() {
        var event = Benchmark.Event('custom'),
            object = Constructor();

        object.on('custom', function(eventObject) { eventObject.touched = true; });
        object.emit(event);
        ok(event.touched);
      });

      test('sets `event.result` correctly', function() {
        var event = Benchmark.Event('result'),
            object = Constructor();

        object.on('result', function() { return 'x'; });
        object.emit(event);
        equal(event.result, 'x');
      });

      test('sets `event.type` correctly', function() {
        var event,
            object = Constructor();

        object.on('type', function(eventObj) {
          event = eventObj;
        });

        object.emit('type');
        equal(event.type, 'type');
      });
    }());

    /*------------------------------------------------------------------------*/

    QUnit.module(namespace + '#listeners');

    (function() {
      test('returns the correct listeners', function() {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        deepEqual(object.listeners('x'), [listener]);
      });

      test('returns an array and initializes previously uninitialized listeners', function() {
        var object = Constructor();
        deepEqual(object.listeners('x'), []);
        deepEqual(object.events, { 'x': [] });
      });
    }());

    /*------------------------------------------------------------------------*/

    QUnit.module(namespace + '#off');

    (function() {
      test('returns the benchmark', function() {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        equal(object.off('x', listener), object);
      });

      test('will ignore inherited properties of the event cache', function() {
        var Dummy = function() {},
            listener = function() {},
            object = Constructor();

        Dummy.prototype.x = [listener];
        object.events = new Dummy;

        object.off('x', listener);
        deepEqual(object.events.x, [listener]);
      });

      test('handles an event type and listener', function() {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        object.off('x', listener);
        deepEqual(object.events.x, []);
      });

      test('handles unregistering duplicate listeners', function() {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        object.on('x', listener);

        var events = object.events;
        object.off('x', listener);
        deepEqual(events.x, [listener]);

        object.off('x', listener);
        deepEqual(events.x, []);
      });

      test('handles a non-registered listener', function() {
        var object = Constructor();
        object.off('x', function() {});
        equal(object.events, undefined);
      });

      test('handles space separated event type and listener', function() {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        object.on('y', listener);

        var events = object.events;
        object.off('x y', listener);
        deepEqual(events.x, []);
        deepEqual(events.y, []);
      });

      test('handles space separated event type and no listener', function() {
        var listener1 = function() {},
            listener2 = function() {},
            object = Constructor();

        object.on('x', listener1);
        object.on('y', listener2);

        var events = object.events;
        object.off('x y');
        deepEqual(events.x, []);
        deepEqual(events.y, []);
      });

      test('handles no arguments', function() {
        var listener1 = function() {},
            listener2 = function() {},
            listener3 = function() {},
            object = Constructor();

        object.on('x', listener1);
        object.on('y', listener2);
        object.on('z', listener3);

        var events = object.events;
        object.off();
        deepEqual(events.x, []);
        deepEqual(events.y, []);
        deepEqual(events.z, []);
      });
    }());

    /*------------------------------------------------------------------------*/

    QUnit.module(namespace + '#on');

    (function() {
      test('returns the benchmark', function() {
        var listener = function() {},
            object = Constructor();

        equal(object.on('x', listener), object);
      });

      test('will ignore inherited properties of the event cache', function() {
        var Dummy = function() {},
            listener1 = function() {},
            listener2 = function() {},
            object = Constructor();

        Dummy.prototype.x = [listener1];
        object.events = new Dummy;

        object.on('x', listener2);
        deepEqual(object.events.x, [listener2]);
      });

      test('handles an event type and listener', function() {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        deepEqual(object.events.x, [listener]);
      });

      test('handles registering duplicate listeners', function() {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        object.on('x', listener);
        deepEqual(object.events.x, [listener, listener]);
      });

      test('handles space separated event type and listener', function() {
        var listener = function() {},
            object = Constructor();

        object.on('x y', listener);

        var events = object.events;
        deepEqual(events.x, [listener]);
        deepEqual(events.y, [listener]);
      });
    }());
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite#abort');

  (function() {
    test('igores abort calls when the suite isn\'t running', function() {
      var fired = false;
      var suite = Benchmark.Suite('suite', {
        'onAbort': function() { fired = true; }
      });

      suite.add('foo', function() {});
      suite.abort();
      equal(fired, false);
    });

    test('ignores abort calls from `Benchmark.Suite#reset` when the suite isn\'t running', function() {
      var fired = false;
      var suite = Benchmark.Suite('suite', {
        'onAbort': function() { fired = true; }
      });

      suite.add('foo', function() {});
      suite.reset();
      equal(fired, false);
    });

    asyncTest('emits an abort event when running', function() {
      var fired = false;

      Benchmark.Suite({
        'onAbort': function() { fired = true; }
      })
      .on('start', function() {
        this.abort();
      })
      .on('complete', function() {
        ok(fired);
        QUnit.start();
      })
      .add(function(){})
      .run({ 'async': true });
    });

    asyncTest('emits an abort event after calling `Benchmark.Suite#reset`', function() {
      var fired = false;

      Benchmark.Suite({
        'onAbort': function() { fired = true; }
      })
      .on('start', function() {
        this.reset();
      })
      .on('complete', function() {
        ok(fired);
        QUnit.start();
      })
      .add(function(){})
      .run({ 'async': true });
    });

    asyncTest('should abort deferred benchmark', function() {
      var fired = false,
          suite = Benchmark.Suite();

      suite.on('complete', function() {
        equal(fired, false);
        QUnit.start();
      })
      .add('a', {
        'defer': true,
        'fn': function(deferred) {
          // avoid test inlining
          suite.name;
          // delay resolve
          setTimeout(function() {
            deferred.resolve();
            suite.abort();
          }, 10);
        }
      })
      .add('b', {
        'defer': true,
        'fn': function(deferred) {
          // avoid test inlining
          suite.name;
          // delay resolve
          setTimeout(function() {
            deferred.resolve();
            fired = true;
          }, 10);
        }
      })
      .run();
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite#reverse');

  (function() {
    test('reverses the element order', function() {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 1;
      suite.length = 2;

      var actual = suite.reverse();
      equal(actual, suite);
      deepEqual(slice.call(actual), [1, 0]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite#shift');

  (function() {
    test('removes the first element', function() {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 1;
      suite.length = 2;

      var actual = suite.shift();
      equal(actual, 0);
      deepEqual(slice.call(suite), [1]);
    });

    test('shifts an object with no elements', function() {
      var suite = Benchmark.Suite(),
          actual = suite.shift();

      equal(actual, undefined);
      deepEqual(slice.call(suite), []);
    });

    test('should have no elements when length is 0 after shift', function() {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite.length = 1;
      suite.shift();

      // ensure element is removed
      equal('0' in suite, false);
      equal(suite.length, 0);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite#splice');

  (function() {
    test('should have no elements when length is 0 after splice', function() {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite.length = 1
      suite.splice(0, 1);

      // ensure element is removed
      equal('0' in suite, false);
      equal(suite.length, 0);
    });

    test('works with positive `start` argument', function() {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 3;
      suite.length = 2;

      var actual = suite.splice(1, 0, 1, 2);
      deepEqual(actual, []);
      deepEqual(slice.call(suite), [0, 1, 2, 3]);
    });

    test('works with positive `start` and `deleteCount` arguments', function() {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 3;
      suite.length = 2;

      var actual = suite.splice(1, 1, 1, 2);
      deepEqual(actual, [3]);
      deepEqual(slice.call(suite), [0, 1, 2]);
    });

    test('works with `deleteCount` values exceeding length', function() {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 3;
      suite.length = 2;

      var actual = suite.splice(1, 10, 1, 2);
      deepEqual(actual, [3]);
      deepEqual(slice.call(suite), [0, 1, 2]);
    });

    test('works with negative `start` and `deleteCount` arguments', function() {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 3;
      suite.length = 2;

      var actual = suite.splice(-1, -1, 1, 2);
      deepEqual(actual, []);
      deepEqual(slice.call(suite), [0, 1, 2, 3]);
    });

    test('works with an extreme negative `deleteCount` value', function() {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 3;
      suite.length = 2;

      var actual = suite.splice(0, -10, 1, 2);
      deepEqual(actual, []);
      deepEqual(slice.call(suite), [1, 2, 0, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite#unshift');

  (function() {
    test('adds a first element', function() {
      var suite = Benchmark.Suite();
      suite[0] = 1;
      suite.length = 1;

      var actual = suite.unshift(0);
      equal(actual, 2);
      deepEqual(slice.call(suite), [0, 1]);
    });

    test('adds multiple elements to the front', function() {
      var suite = Benchmark.Suite();
      suite[0] = 3;
      suite.length = 1;

      var actual = suite.unshift(0, 1, 2);
      equal(actual, 4);
      deepEqual(slice.call(suite), [0, 1, 2, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite filtered results onComplete');

  (function() {
    var count = 0,
        suite = Benchmark.Suite();

    suite.add('a', function() {
      count++;
    })
    .add('b', function() {
      for (var i = 0; i < 1e6; i++) {
        count++;
      }
    })
    .add('c', function() {
      throw new TypeError;
    });

    asyncTest('should filter by fastest', function() {
      suite.on('complete', function() {
        suite.off();
        deepEqual(this.filter('fastest').pluck('name'), ['a']);
        QUnit.start();
      })
      .run({ 'async': true });
    });

    asyncTest('should filter by slowest', function() {
      suite.on('complete', function() {
        suite.off();
        deepEqual(this.filter('slowest').pluck('name'), ['b']);
        QUnit.start();
      })
      .run({ 'async': true });
    });

    asyncTest('should filter by successful', function() {
      suite.on('complete', function() {
        suite.off();
        deepEqual(this.filter('successful').pluck('name'), ['a', 'b']);
        QUnit.start();
      })
      .run({ 'async': true });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite event flow');

  (function() {
    var events = [],
        callback = function(event) { events.push(event); };

    var suite = Benchmark.Suite('suite', {
      'onAdd': callback,
      'onAbort': callback,
      'onClone': callback,
      'onError': callback,
      'onStart': callback,
      'onCycle': callback,
      'onComplete': callback,
      'onReset': callback
    })
    .add('bench', function() {
      throw null;
    }, {
      'onAbort': callback,
      'onClone': callback,
      'onError': callback,
      'onStart': callback,
      'onCycle': callback,
      'onComplete': callback,
      'onReset': callback
    })
    .run({ 'async': false });

    // first Suite#onAdd
    test('should emit the suite "add" event first', function() {
      var event = events[0];
      ok(event.type == 'add' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
    });

    // next we start the Suite because no reset was needed
    test('should emit the suite "start" event', function() {
      var event = events[1];
      ok(event.type == 'start' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
    });

    // and so start the first benchmark
    test('should emit the benchmark "start" event', function() {
      var event = events[2];
      ok(event.type == 'start' && event.currentTarget.name == 'bench');
    });

    // oh no! we abort because of an error
    test('should emit the benchmark "error" event', function() {
      var event = events[3];
      ok(event.type == 'error' && event.currentTarget.name == 'bench');
    });

    // benchmark error triggered
    test('should emit the benchmark "abort" event', function() {
      var event = events[4];
      ok(event.type == 'abort' && event.currentTarget.name == 'bench');
    });

    // we reset the benchmark as part of the abort
    test('should emit the benchmark "reset" event', function() {
      var event = events[5];
      ok(event.type == 'reset' && event.currentTarget.name == 'bench');
    });

    // benchmark is cycle is finished
    test('should emit the benchmark "cycle" event', function() {
      var event = events[6];
      ok(event.type == 'cycle' && event.currentTarget.name == 'bench');
    });

    // benchmark is complete
    test('should emit the benchmark "complete" event', function() {
      var event = events[7];
      ok(event.type == 'complete' && event.currentTarget.name == 'bench');
    });

    // the benchmark error triggers a Suite error
    test('should emit the suite "error" event', function() {
      var event = events[8];
      ok(event.type == 'error' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
    });

    // the Suite cycle finishes
    test('should emit the suite "cycle" event', function() {
      var event = events[9];
      ok(event.type == 'cycle' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
    });

    // the Suite completes
    test('finally it should emit the suite "complete" event', function() {
      var event = events[10];
      ok(event.type == 'complete' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
    });

    test('emitted all expected events', function() {
      ok(events.length == 11);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Deferred benchmarks');

  (function() {
    asyncTest('should run a deferred benchmark correctly', function() {
      Benchmark(function(deferred) {
        setTimeout(function() { deferred.resolve(); }, 1e3);
      }, {
        'defer': true,
        'onComplete': function() {
          equal(this.hz.toFixed(0), 1);
          QUnit.start();
        }
      })
      .run();
    });

    asyncTest('should run with string values for "fn", "setup", and "teardown"', function() {
      Benchmark({
        'defer': true,
        'setup': 'var x = [3, 2, 1];',
        'fn': 'setTimeout(function() { x.sort(); deferred.resolve(); }, 10);',
        'teardown': 'x.length = 0;',
        'onComplete': function() {
          ok(true);
          QUnit.start();
        }
      })
      .run();
    });

    asyncTest('should execute "setup", "fn", and "teardown" in correct order', function() {
      var fired = [];

      Benchmark({
        'defer': true,
        'setup': function() {
          fired.push('setup');
        },
        'fn': function(deferred) {
          fired.push('fn');
          setTimeout(function() { deferred.resolve(); }, 10);
        },
        'teardown': function() {
          fired.push('teardown');
        },
        'onComplete': function() {
          var actual = fired.join().replace(/(fn,)+/g, '$1').replace(/(setup,fn,teardown(?:,|$))+/, '$1');
          equal(actual, 'setup,fn,teardown');
          QUnit.start();
        }
      })
      .run();
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.config.asyncRetries = 10;
  QUnit.config.hidepassed = true;

  if (!document) {
    QUnit.config.noglobals = true;
    QUnit.start();
  }
}.call(this));
