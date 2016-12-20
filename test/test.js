;(function() {

  /** Used as a safe reference for `undefined` in pre ES5 environments. */
  var undefined;

  /** Used as a reference to the global object. */
  var root = (typeof global == 'object' && global) || this;

  /** Method and object shortcuts. */
  var phantom = root.phantom,
      amd = root.define && define.amd,
      document = !phantom && root.document,
      slice = Array.prototype.slice;

  /** Load libraries. */
  var _ = root._ || require('lodash'),
      Benchmark = root.Benchmark || require('../benchmark.js'),
      QUnit = root.QUnit || require('qunit-extras');

  /** Used to create dummy benchmarks for comparisons. */
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

  // Init Benchmark.options.minTime.
  Benchmark(function() { throw 0; }).run();

  // Set a shorter max time.
  Benchmark.options.maxTime = Benchmark.options.minTime * 5;

  /*--------------------------------------------------------------------------*/

  /**
   * Skips a given number of tests with a passing result.
   *
   * @private
   * @param {Object} assert The QUnit assert object.
   * @param {number} [count=1] The number of tests to skip.
   */
  function skipTest(assert, count) {
    count || (count = 1);
    while (count--) {
      assert.ok(true, 'test skipped');
    }
  }

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark');

  (function() {
    QUnit.test('should support loading Benchmark.js as a module', function(assert) {
      if (amd) {
        assert.strictEqual((benchmarkModule || {}).version, Benchmark.version);
      }
      else {
        skipTest(assert);
      }
    });

    QUnit.test('should support loading Platform.js as a module', function(assert) {
      if (amd) {
        var platform = (benchmarkModule || {}).platform || {},
            name = platform.name;

        assert.ok(typeof name == 'string' || name === null);
      }
      else {
        skipTest(assert);
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark constructor');

  (function() {
    QUnit.test('should create a new instance when called without the `new` operator', function(assert) {
      assert.ok(Benchmark() instanceof Benchmark);
    });

    QUnit.test('should support passing an options object', function(assert) {
      var bench = Benchmark({ 'name': 'foo', 'fn': function() {} });
      assert.ok(bench.fn && bench.name == 'foo');
    });

    QUnit.test('should support passing a "name" and "fn" argument', function(assert) {
      var bench = Benchmark('foo', function() {});
      assert.ok(bench.fn && bench.name == 'foo');
    });

    QUnit.test('should support passing a "name" argument and an options object', function(assert) {
      var bench = Benchmark('foo', { 'fn': function() {} });
      assert.ok(bench.fn && bench.name == 'foo');
    });

    QUnit.test('should support passing a "name" argument and an options object', function(assert) {
      var bench = Benchmark('foo', function() {}, { 'id': 'bar' });
      assert.ok(bench.fn && bench.name == 'foo' && bench.id == 'bar');
    });

    QUnit.test('should support passing an empty string for the "fn" options property', function(assert) {
      var bench = Benchmark({ 'fn': '' }).run();
      assert.ok(!bench.error);
    });

    QUnit.test('should detect dead code', function(assert) {
      var bench = Benchmark(function() {}).run();
      assert.ok(/setup\(\)/.test(bench.compiled) ? !bench.error : bench.error);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark compilation');

  (function() {
    QUnit.test('should compile using the default "toString" method', function(assert) {
      var bench = Benchmark({
        'setup': function() { var a = 1; },
        'fn': function() { throw a; },
        'teardown': function() { a = 2; }
      }).run();

      var compiled = bench.compiled;
      if (/setup\(\)/.test(compiled)) {
        skipTest(assert);
      }
      else {
        assert.ok(/var a\s*=\s*1/.test(compiled) && /throw a/.test(compiled) && /a\s*=\s*2/.test(compiled));
      }
    });

    QUnit.test('should compile using a custom "toString" method', function(assert) {
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
        skipTest(assert);
      }
      else {
        assert.ok(/var a\s*=\s*1/.test(compiled) && /throw a/.test(compiled) && /a\s*=\s*2/.test(compiled));
      }
    });

    QUnit.test('should compile using a string value', function(assert) {
      var bench = Benchmark({
        'setup': 'var a = 1;',
        'fn': 'throw a;',
        'teardown': 'a = 2;'
      }).run();

      var compiled = bench.compiled;
      if (/setup\(\)/.test(compiled)) {
        skipTest(assert);
      }
      else {
        assert.ok(/var a\s*=\s*1/.test(compiled) && /throw a/.test(compiled) && /a\s*=\s*2/.test(compiled));
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
      QUnit.test('should have correct binding for ' + title, function(assert) {
        var bench = Benchmark({
          'setup': 'if(/ops/.test(this))this._setup=true;',
          'fn': fn,
          'teardown': 'if(/ops/.test(this))this._teardown=true;',
          'onCycle': function() { this.abort(); }
        }).run();

        var compiled = bench.compiled;
        if (/setup\(\)/.test(compiled)) {
          skipTest(assert, 3);
        }
        else {
          assert.ok(bench._setup, 'correct binding for "setup"');
          assert.ok(bench._fn, 'correct binding for "fn"');
          assert.ok(bench._teardown, 'correct binding for "teardown"');
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
      QUnit.test('should providee the correct arguments when passing an ' + key, function(assert) {
        var args;
        Benchmark.filter(object, function() {
          args || (args = slice.call(arguments));
        });

        assert.deepEqual(args, ['a', 0, object]);
      });

      QUnit.test('should return correct result when passing an ' + key, function(assert) {
        var actual = Benchmark.filter(object, function(value, index) {
          return index > 0;
        });

        assert.deepEqual(actual, ['b', 'c', '']);
      });
    });

    QUnit.test('should correctly detect the fastest/slowest benchmark for small sample sizes', function(assert) {
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
      assert.deepEqual(actual, [bench], 'correctly detects the fastest');

      actual = Benchmark.filter([bench, other], 'slowest');
      assert.deepEqual(actual, [other], 'correctly detects the slowest');
    });

    QUnit.test('should correctly detect the fastest/slowest benchmark for large sample sizes', function(assert) {
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
      assert.deepEqual(actual, [bench], 'correctly detects the fastest');

      actual = Benchmark.filter([bench, other], 'slowest');
      assert.deepEqual(actual, [other], 'correctly detects the slowest');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.formatNumber');

  (function() {
    QUnit.test('should format a million correctly', function(assert) {
      assert.strictEqual(Benchmark.formatNumber(1e6), '1,000,000');
    });

    QUnit.test('should format less than 100 correctly', function(assert) {
      assert.strictEqual(Benchmark.formatNumber(23), '23');
    });

    QUnit.test('should format numbers with decimal values correctly', function(assert) {
      assert.strictEqual(Benchmark.formatNumber(1234.56), '1,234.56');
    });

    QUnit.test('should format negative numbers correctly', function(assert) {
      assert.strictEqual(Benchmark.formatNumber(-1234.56), '-1,234.56');
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
      QUnit.test('should return the correct result when passing an ' + key, function(assert) {
        var actual = Benchmark.invoke(object, 'concat');
        assert.deepEqual(actual, ['a', ['b'], 'c', undefined]);
      });

      QUnit.test('should provide the correct arguments to the invoked method when passing an ' + key, function(assert) {
        var actual = Benchmark.invoke(object, 'concat', 'x', 'y', 'z');
        assert.deepEqual(actual, ['axyz', ['b', 'x', 'y', 'z'], 'cxyz', undefined]);
      });

      QUnit.test('should handle options object with callbacks correctly when passing an ' + key, function(assert) {
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

        assert.deepEqual(actual, ['axyz', ['b', 'x', 'y', 'z'], 'cxyz', undefined]);

        assert.strictEqual(callbacks[0].length, 1);
        assert.strictEqual(callbacks[0][0].target, 'a');
        assert.deepEqual(callbacks[0][0].currentTarget, object);
        assert.strictEqual(callbacks[0][0].type, 'start');
        assert.strictEqual(callbacks[1][0].type, 'cycle');
        assert.strictEqual(callbacks[5][0].type, 'complete');
      });

      QUnit.test('should support queuing when passing an ' + key, function(assert) {
        var lengths = [];
        var actual = Benchmark.invoke(object, {
          'name': 'concat',
          'queued': true,
          'args': 'x',
          'onCycle': function() {
            lengths.push(object.length);
          }
        });

        assert.deepEqual(lengths, [4, 3, 2, 1]);
        assert.deepEqual(actual, ['ax', ['b', 'x'], 'cx', undefined]);
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
      QUnit.test('should join correctly using the default separator when passing an ' + key, function(assert) {
        assert.strictEqual(Benchmark.join(object), key == 'object' ? 'a: 0,b: 1,: 2' : 'a,b,');
      });

      QUnit.test('should join correctly using a custom separator when passing an ' + key, function(assert) {
        assert.strictEqual(Benchmark.join(object, '+', '@'), key == 'object' ? 'a@0+b@1+@2' :  'a+b+');
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark#clone');

  (function() {
    var bench = Benchmark(function() { this.count += 0; }).run();

    QUnit.test('should return the correct result passing no arguments', function(assert) {
      var clone = bench.clone();
      assert.deepEqual(clone, bench);
      assert.ok(clone.stats != bench.stats && clone.times != bench.times && clone.options != bench.options);
    });

    QUnit.test('should return the correct result passing a data object', function(assert) {
      var clone = bench.clone({ 'fn': '', 'name': 'foo' });
      assert.ok(clone.fn === '' && clone.options.fn === '');
      assert.ok(clone.name == 'foo' && clone.options.name == 'foo');
    });
  }());


  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark#compare');

  (function() {
    QUnit.test('should return `0` when compared to itself', function(assert) {
      var bench = Benchmark(benchData);
      assert.strictEqual(bench.compare(bench), 0);
    });

    QUnit.test('should correctly detect the faster benchmark for small sample sizes', function(assert) {
      var data = _.cloneDeep(benchData),
          bench = Benchmark(data);

      var other = Benchmark(_.merge(data, {
        'hz': 500,
        'stats': {
          'mean': 2,
          'sample': [2, 2, 2, 2, 2]
        }
      }));

      assert.strictEqual(bench.compare(other), 1);
      assert.strictEqual(other.compare(bench), -1);
    });

    QUnit.test('should correctly detect the faster benchmark for large sample sizes', function(assert) {
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

      assert.strictEqual(bench.compare(other), 1);
      assert.strictEqual(other.compare(bench), -1);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark#reset');

  (function() {
    QUnit.test('should not reset default event handlers', function(assert) {
      var handler = function() {};
      Benchmark.options.onStart = handler;

      var bench = Benchmark(),
          clone = bench.clone({ 'events': { 'cycle': [function() {}] } });

      clone.reset();

      assert.deepEqual(clone.events, { 'start': [handler] });
      delete Benchmark.options.onStart;
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

    QUnit.test('should not trigger event handlers by internal benchmark clones', function(assert) {
      assert.strictEqual(data.onStart, 1);
      assert.strictEqual(data.onComplete, 1);
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
      QUnit.test('should emit passed arguments', function(assert) {
        var args,
            object = Constructor();

        object.on('args', function() { args = slice.call(arguments, 1); });
        object.emit('args', 'a', 'b', 'c');
        assert.deepEqual(args, ['a', 'b', 'c']);
      });

      QUnit.test('should emit with no listeners', function(assert) {
        var event = Benchmark.Event('empty'),
            object = Constructor();

        object.emit(event);
        assert.strictEqual(event.cancelled, false);
      });

      QUnit.test('should emit with an event type of "toString"', function(assert) {
        var event = Benchmark.Event('toString'),
            object = Constructor();

        object.emit(event);
        assert.strictEqual(event.cancelled, false);
      });

      QUnit.test('should returns the last listeners returned value', function(assert) {
        var event = Benchmark.Event('result'),
            object = Constructor();

        object.on('result', function() { return 'x'; });
        object.on('result', function() { return 'y'; });
        assert.strictEqual(object.emit(event), 'y');
      });

      QUnit.test('should abort the emitters listener iteration when `event.aborted` is `true`', function(assert) {
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

        assert.strictEqual(object.emit(event), false);
        assert.strictEqual(event.aborted, true);
      });

      QUnit.test('should cancel the event if a listener explicitly returns `false`', function(assert) {
        var event = Benchmark.Event('cancel'),
            object = Constructor();

        object.on('cancel', function() { return false; });
        object.on('cancel', function() { return true; });
        object.emit(event);
        assert.strictEqual(event.cancelled, true);
      });

      QUnit.test('should use a shallow clone of the listeners when emitting', function(assert) {
        var event,
            listener2 = function(eventObject) { eventObject.listener2 = true },
            object = Constructor();

        object.on('shallowclone', function(eventObject) {
          event = eventObject;
          object.off(event.type, listener2);
        })
        .on('shallowclone', listener2)
        .emit('shallowclone');

        assert.ok(event.listener2);
      });

      QUnit.test('should emit a custom event object', function(assert) {
        var event = Benchmark.Event('custom'),
            object = Constructor();

        object.on('custom', function(eventObject) { eventObject.touched = true; });
        object.emit(event);
        assert.ok(event.touched);
      });

      QUnit.test('should set `event.result` correctly', function(assert) {
        var event = Benchmark.Event('result'),
            object = Constructor();

        object.on('result', function() { return 'x'; });
        object.emit(event);
        assert.strictEqual(event.result, 'x');
      });

      QUnit.test('should correctly set `event.type`', function(assert) {
        var event,
            object = Constructor();

        object.on('type', function(eventObj) {
          event = eventObj;
        });

        object.emit('type');
        assert.strictEqual(event.type, 'type');
      });
    }());

    /*------------------------------------------------------------------------*/

    QUnit.module(namespace + '#listeners');

    (function() {
      QUnit.test('should return the correct listeners', function(assert) {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        assert.deepEqual(object.listeners('x'), [listener]);
      });

      QUnit.test('should return an array and initializes previously uninitialized listeners', function(assert) {
        var object = Constructor();
        assert.deepEqual(object.listeners('x'), []);
        assert.deepEqual(object.events, { 'x': [] });
      });
    }());

    /*------------------------------------------------------------------------*/

    QUnit.module(namespace + '#off');

    (function() {
      QUnit.test('should return the benchmark', function(assert) {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        assert.strictEqual(object.off('x', listener), object);
      });

      QUnit.test('should ignore inherited properties of the event cache', function(assert) {
        var Dummy = function() {},
            listener = function() {},
            object = Constructor();

        Dummy.prototype.x = [listener];
        object.events = new Dummy;

        object.off('x', listener);
        assert.deepEqual(object.events.x, [listener]);
      });

      QUnit.test('should handle an event type and listener', function(assert) {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        object.off('x', listener);
        assert.deepEqual(object.events.x, []);
      });

      QUnit.test('should handle unregistering duplicate listeners', function(assert) {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        object.on('x', listener);

        var events = object.events;
        object.off('x', listener);
        assert.deepEqual(events.x, [listener]);

        object.off('x', listener);
        assert.deepEqual(events.x, []);
      });

      QUnit.test('should handle a non-registered listener', function(assert) {
        var object = Constructor();
        object.off('x', function() {});
        assert.strictEqual(object.events, undefined);
      });

      QUnit.test('should handle space separated event type and listener', function(assert) {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        object.on('y', listener);

        var events = object.events;
        object.off('x y', listener);
        assert.deepEqual(events.x, []);
        assert.deepEqual(events.y, []);
      });

      QUnit.test('should handle space separated event type and no listener', function(assert) {
        var listener1 = function() {},
            listener2 = function() {},
            object = Constructor();

        object.on('x', listener1);
        object.on('y', listener2);

        var events = object.events;
        object.off('x y');
        assert.deepEqual(events.x, []);
        assert.deepEqual(events.y, []);
      });

      QUnit.test('should handle no arguments', function(assert) {
        var listener1 = function() {},
            listener2 = function() {},
            listener3 = function() {},
            object = Constructor();

        object.on('x', listener1);
        object.on('y', listener2);
        object.on('z', listener3);

        var events = object.events;
        object.off();
        assert.deepEqual(events.x, []);
        assert.deepEqual(events.y, []);
        assert.deepEqual(events.z, []);
      });
    }());

    /*------------------------------------------------------------------------*/

    QUnit.module(namespace + '#on');

    (function() {
      QUnit.test('should return the benchmark', function(assert) {
        var listener = function() {},
            object = Constructor();

        assert.strictEqual(object.on('x', listener), object);
      });

      QUnit.test('should ignore inherited properties of the event cache', function(assert) {
        var Dummy = function() {},
            listener1 = function() {},
            listener2 = function() {},
            object = Constructor();

        Dummy.prototype.x = [listener1];
        object.events = new Dummy;

        object.on('x', listener2);
        assert.deepEqual(object.events.x, [listener2]);
      });

      QUnit.test('should handle an event type and listener', function(assert) {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        assert.deepEqual(object.events.x, [listener]);
      });

      QUnit.test('should handle registering duplicate listeners', function(assert) {
        var listener = function() {},
            object = Constructor();

        object.on('x', listener);
        object.on('x', listener);
        assert.deepEqual(object.events.x, [listener, listener]);
      });

      QUnit.test('should handle space separated event type and listener', function(assert) {
        var listener = function() {},
            object = Constructor();

        object.on('x y', listener);

        var events = object.events;
        assert.deepEqual(events.x, [listener]);
        assert.deepEqual(events.y, [listener]);
      });
    }());
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite#abort');

  (function() {
    QUnit.test('should ignore abort calls when the suite isn\'t running', function(assert) {
      var fired = false;
      var suite = Benchmark.Suite('suite', {
        'onAbort': function() { fired = true; }
      });

      suite.add('foo', function() {});
      suite.abort();
      assert.strictEqual(fired, false);
    });

    QUnit.test('should ignore abort calls from `Benchmark.Suite#reset` when the suite isn\'t running', function(assert) {
      var fired = false;
      var suite = Benchmark.Suite('suite', {
        'onAbort': function() { fired = true; }
      });

      suite.add('foo', function() {});
      suite.reset();
      assert.strictEqual(fired, false);
    });

    QUnit.test('should emit an abort event when running', function(assert) {
      var done = assert.async();

      var fired = false;

      Benchmark.Suite({
        'onAbort': function() { fired = true; }
      })
      .on('start', function() {
        this.abort();
      })
      .on('complete', function() {
        assert.ok(fired);
        done();
      })
      .add(function(){})
      .run({ 'async': true });
    });

    QUnit.test('should emit an abort event after calling `Benchmark.Suite#reset`', function(assert) {
      var done = assert.async();

      var fired = false;

      Benchmark.Suite({
        'onAbort': function() { fired = true; }
      })
      .on('start', function() {
        this.reset();
      })
      .on('complete', function() {
        assert.ok(fired);
        done();
      })
      .add(function(){})
      .run({ 'async': true });
    });

    QUnit.test('should abort deferred benchmark', function(assert) {
      var done = assert.async();

      var fired = false,
          suite = Benchmark.Suite();

      suite.on('complete', function() {
        assert.strictEqual(fired, false);
        done();
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
    QUnit.test('should reverses the element order', function(assert) {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 1;
      suite.length = 2;

      var actual = suite.reverse();
      assert.strictEqual(actual, suite);
      assert.deepEqual(slice.call(actual), [1, 0]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite#shift');

  (function() {
    QUnit.test('should remove the first element', function(assert) {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 1;
      suite.length = 2;

      var actual = suite.shift();
      assert.strictEqual(actual, 0);
      assert.deepEqual(slice.call(suite), [1]);
    });

    QUnit.test('should shift an object with no elements', function(assert) {
      var suite = Benchmark.Suite(),
          actual = suite.shift();

      assert.strictEqual(actual, undefined);
      assert.deepEqual(slice.call(suite), []);
    });

    QUnit.test('should have no elements when length is `0` after shift', function(assert) {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite.length = 1;
      suite.shift();

      // ensure element is removed
      assert.strictEqual('0' in suite, false);
      assert.strictEqual(suite.length, 0);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite#splice');

  (function() {
    QUnit.test('should work with positive `start` argument', function(assert) {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 3;
      suite.length = 2;

      var actual = suite.splice(1, 0, 1, 2);
      assert.deepEqual(actual, []);
      assert.deepEqual(slice.call(suite), [0, 1, 2, 3]);
    });

    QUnit.test('should work with positive `start` and `deleteCount` arguments', function(assert) {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 3;
      suite.length = 2;

      var actual = suite.splice(1, 1, 1, 2);
      assert.deepEqual(actual, [3]);
      assert.deepEqual(slice.call(suite), [0, 1, 2]);
    });

    QUnit.test('should work with `deleteCount` values exceeding length', function(assert) {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 3;
      suite.length = 2;

      var actual = suite.splice(1, 10, 1, 2);
      assert.deepEqual(actual, [3]);
      assert.deepEqual(slice.call(suite), [0, 1, 2]);
    });

    QUnit.test('should work with negative `start` and `deleteCount` arguments', function(assert) {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 3;
      suite.length = 2;

      var actual = suite.splice(-1, -1, 1, 2);
      assert.deepEqual(actual, []);
      assert.deepEqual(slice.call(suite), [0, 1, 2, 3]);
    });

    QUnit.test('should work with an extreme negative `deleteCount` value', function(assert) {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite[1] = 3;
      suite.length = 2;

      var actual = suite.splice(0, -10, 1, 2);
      assert.deepEqual(actual, []);
      assert.deepEqual(slice.call(suite), [1, 2, 0, 3]);
    });

    QUnit.test('should have no elements when length is `0` after splice', function(assert) {
      var suite = Benchmark.Suite();
      suite[0] = 0;
      suite.length = 1
      suite.splice(0, 1);

      // ensure element is removed
      assert.strictEqual('0' in suite, false);
      assert.strictEqual(suite.length, 0);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite#unshift');

  (function() {
    QUnit.test('should add a first element', function(assert) {
      var suite = Benchmark.Suite();
      suite[0] = 1;
      suite.length = 1;

      var actual = suite.unshift(0);
      assert.strictEqual(actual, 2);
      assert.deepEqual(slice.call(suite), [0, 1]);
    });

    QUnit.test('should add multiple elements to the front', function(assert) {
      var suite = Benchmark.Suite();
      suite[0] = 3;
      suite.length = 1;

      var actual = suite.unshift(0, 1, 2);
      assert.strictEqual(actual, 4);
      assert.deepEqual(slice.call(suite), [0, 1, 2, 3]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite filtered results onComplete');

  (function() {
    var count = 0,
        suite = Benchmark.Suite();

    suite.add('a', function() {
      for (var i = 0; i < 1e5; i++) {
        count++;
      }
    })
    .add('b', function() {
      for (var i = 0; i < 1e6; i++) {
        count++;
      }
    })
    .add('c', function() {
      throw new TypeError;
    });

    QUnit.test('should filter by fastest', function(assert) {
      var done = assert.async();

      suite.on('complete', function() {
        suite.off();
        assert.deepEqual(this.filter('fastest').map('name'), ['a']);
        done();
      })
      .run({ 'async': true });
    });

    QUnit.test('should filter by slowest', function(assert) {
      var done = assert.async();

      suite.on('complete', function() {
        suite.off();
        assert.deepEqual(this.filter('slowest').map('name'), ['b']);
        done();
      })
      .run({ 'async': true });
    });

    QUnit.test('should filter by successful', function(assert) {
      var done = assert.async();

      suite.on('complete', function() {
        suite.off();
        assert.deepEqual(this.filter('successful').map('name'), ['a', 'b']);
        done();
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
    QUnit.test('should emit the suite "add" event first', function(assert) {
      var event = events[0];
      assert.ok(event.type == 'add' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
    });

    // next we start the Suite because no reset was needed
    QUnit.test('should emit the suite "start" event', function(assert) {
      var event = events[1];
      assert.ok(event.type == 'start' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
    });

    // and so start the first benchmark
    QUnit.test('should emit the benchmark "start" event', function(assert) {
      var event = events[2];
      assert.ok(event.type == 'start' && event.currentTarget.name == 'bench');
    });

    // oh no! we abort because of an error
    QUnit.test('should emit the benchmark "error" event', function(assert) {
      var event = events[3];
      assert.ok(event.type == 'error' && event.currentTarget.name == 'bench');
    });

    // benchmark error triggered
    QUnit.test('should emit the benchmark "abort" event', function(assert) {
      var event = events[4];
      assert.ok(event.type == 'abort' && event.currentTarget.name == 'bench');
    });

    // we reset the benchmark as part of the abort
    QUnit.test('should emit the benchmark "reset" event', function(assert) {
      var event = events[5];
      assert.ok(event.type == 'reset' && event.currentTarget.name == 'bench');
    });

    // benchmark is cycle is finished
    QUnit.test('should emit the benchmark "cycle" event', function(assert) {
      var event = events[6];
      assert.ok(event.type == 'cycle' && event.currentTarget.name == 'bench');
    });

    // benchmark is complete
    QUnit.test('should emit the benchmark "complete" event', function(assert) {
      var event = events[7];
      assert.ok(event.type == 'complete' && event.currentTarget.name == 'bench');
    });

    // the benchmark error triggers a Suite error
    QUnit.test('should emit the suite "error" event', function(assert) {
      var event = events[8];
      assert.ok(event.type == 'error' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
    });

    // the Suite cycle finishes
    QUnit.test('should emit the suite "cycle" event', function(assert) {
      var event = events[9];
      assert.ok(event.type == 'cycle' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
    });

    // the Suite completes
    QUnit.test('should emit the suite "complete" event', function(assert) {
      var event = events[10];
      assert.ok(event.type == 'complete' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
    });

    QUnit.test('should emit all expected events', function(assert) {
      assert.ok(events.length == 11);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Deferred benchmarks');

  (function() {
    QUnit.test('should run a deferred benchmark correctly', function(assert) {
      var done = assert.async();

      Benchmark(function(deferred) {
        setTimeout(function() { deferred.resolve(); }, 1e3);
      }, {
        'defer': true,
        'onComplete': function() {
          assert.strictEqual(this.hz.toFixed(0), '1');
          done();
        }
      })
      .run();
    });

    QUnit.test('should run with string values for "fn", "setup", and "teardown"', function(assert) {
      var done = assert.async();

      Benchmark({
        'defer': true,
        'setup': 'var x = [3, 2, 1];',
        'fn': 'setTimeout(function() { x.sort(); deferred.resolve(); }, 10);',
        'teardown': 'x.length = 0;',
        'onComplete': function() {
          assert.ok(true);
          done();
        }
      })
      .run();
    });

    QUnit.test('should execute "setup", "fn", and "teardown" in correct order', function(assert) {
      var done = assert.async();

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
          assert.strictEqual(actual, 'setup,fn,teardown');
          done();
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
    QUnit.load();
    QUnit.start();
  }
}.call(this));
