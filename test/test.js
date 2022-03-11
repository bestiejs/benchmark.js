/** Used as a safe reference for `undefined` in pre ES5 environments. */
var undefined;

/** Used as a reference to the global object. */
var root = (typeof global == 'object' && global) || this;

/** Method and object shortcuts. */
var amd = root.define && define.amd,
  slice = Array.prototype.slice;

var assert = require('assert');
var Benchmark = require('../benchmark');

/** Used to create dummy benchmarks for comparisons. */
function generateBenchData() {
  return {
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
}

// // Init Benchmark.options.minTime.
Benchmark(function () { throw 0; }).run();

// // Set a shorter max time.
Benchmark.options.maxTime = Benchmark.options.minTime * 5;

/*--------------------------------------------------------------------------*/

describe('Benchmark', function () {
  it('should support loading Benchmark.js as a module', function () {
    if (amd) {
      assert.strictEqual((benchmarkModule || {}).version, Benchmark.version);
    }
    else {
      this.skip();
    }
  });

  it('should support loading Platform.js as a module', function () {
    if (amd) {
      var platform = (benchmarkModule || {}).platform || {},
        name = platform.name;

      assert.ok(typeof name == 'string' || name === null);
    }
    else {
      this.skip();
    }
  });
});

/*--------------------------------------------------------------------------*/

describe('Benchmark constructor', function () {
  it('should create a new instance when called without the `new` operator', function () {
    assert.ok(Benchmark() instanceof Benchmark);
  });

  it('should support passing an options object', function () {
    var bench = Benchmark({ 'name': 'foo', 'fn': function () { } });
    assert.ok(bench.fn && bench.name == 'foo');
  });

  it('should support passing a "name" and "fn" argument', function () {
    var bench = Benchmark('foo', function () { });
    assert.ok(bench.fn && bench.name == 'foo');
  });

  it('should support passing a "name" argument and an options object', function () {
    var bench = Benchmark('foo', { 'fn': function () { } });
    assert.ok(bench.fn && bench.name == 'foo');
  });

  it('should support passing a "name" argument and an options object', function () {
    var bench = Benchmark('foo', function () { }, { 'id': 'bar' });
    assert.ok(bench.fn && bench.name == 'foo' && bench.id == 'bar');
  });

  it('should support passing an empty string for the "fn" options property', function () {
    this.timeout(Infinity);
    var bench = Benchmark({ 'fn': '' }).run();
    assert.ok(!bench.error);
  });

  it('should detect dead code', function () {
    this.timeout(Infinity);
    var bench = Benchmark(function () { }).run();
    assert.ok(/setup\(\)/.test(bench.compiled) ? !bench.error : bench.error);
  });
});

/*--------------------------------------------------------------------------*/

describe('Benchmark compilation', function () {
  it('should compile using the default "toString" method', function () {
    var bench = Benchmark({
      'setup': function () { var a = 1; },
      'fn': function () { throw a; },
      'teardown': function () { a = 2; }
    }).run();

    var compiled = bench.compiled;
    if (/setup\(\)/.test(compiled)) {
      this.skip();
    }
    else {
      assert.ok(/var a\s*=\s*1/.test(compiled) && /throw a/.test(compiled) && /a\s*=\s*2/.test(compiled));
    }
  });

  it('should compile using a custom "toString" method', function () {
    var bench = Benchmark({
      'setup': function () { },
      'fn': function () { },
      'teardown': function () { }
    });

    bench.setup.toString = function () { return 'var a = 1;' };
    bench.fn.toString = function () { return 'throw a;' };
    bench.teardown.toString = function () { return 'a = 2;' };
    bench.run();

    var compiled = bench.compiled;
    if (/setup\(\)/.test(compiled)) {
      this.skip();
    }
    else {
      assert.ok(/var a\s*=\s*1/.test(compiled) && /throw a/.test(compiled) && /a\s*=\s*2/.test(compiled));
    }
  });

  it('should compile using a string value', function () {
    var bench = Benchmark({
      'setup': 'var a = 1;',
      'fn': 'throw a;',
      'teardown': 'a = 2;'
    }).run();

    var compiled = bench.compiled;
    if (/setup\(\)/.test(compiled)) {
      this.skip();
    }
    else {
      assert.ok(/var a\s*=\s*1/.test(compiled) && /throw a/.test(compiled) && /a\s*=\s*2/.test(compiled));
    }
  });
});

/*--------------------------------------------------------------------------*/

describe('Benchmark test binding', function () {
  var count = 0;

  var tests = {
    'inlined "setup", "fn", and "teardown"': (
      'if(/ops/.test(this))this._fn=true;'
    ),
    'called "fn" and inlined "setup"/"teardown" reached by error': function () {
      count++;
      if (/ops/.test(this)) {
        this._fn = true;
      }
    },
    'called "fn" and inlined "setup"/"teardown" reached by `return` statement': function () {
      if (/ops/.test(this)) {
        this._fn = true;
      }
      return;
    }
  };

  var keys = Object.keys(tests);
  for (let i = 0, il = keys.length; i < il; ++i) {
    var title = keys[i];
    it('should have correct binding for ' + title, function () {
      var bench = Benchmark({
        'setup': 'if(/ops/.test(this))this._setup=true;',
        'fn': tests[title],
        'teardown': 'if(/ops/.test(this))this._teardown=true;',
        'onCycle': function () { this.abort(); }
      }).run();

      var compiled = bench.compiled;
      if (/setup\(\)/.test(compiled)) {
        this.skip();
      }
      else {
        assert.ok(bench._setup, 'correct binding for "setup"');
        assert.ok(bench._fn, 'correct binding for "fn"');
        assert.ok(bench._teardown, 'correct binding for "teardown"');
      }
    });
  };
});

/*--------------------------------------------------------------------------*/

describe('Benchmark.filter', function () {
  var objects = {
    'array': ['a', 'b', 'c', ''],
    'array-like-object': { '0': 'a', '1': 'b', '2': 'c', '3': '', 'length': 4 }
  };

  var keys = Object.keys(objects);
  for (let i = 0, il = keys.length; i < il; ++i) {
    var key = keys[i];
    it('should providee the correct arguments when passing an ' + key, function () {
      var args;
      Benchmark.filter(objects[key], function () {
        args || (args = slice.call(arguments));
      });

      assert.deepEqual(args, ['a', 0, objects[key]]);
    });

    it('should return correct result when passing an ' + key, function () {
      var actual = Benchmark.filter(objects[key], function (value, index) {
        return index > 0;
      });

      assert.deepEqual(actual, ['b', 'c', '']);
    });
  };

  it('should correctly detect the fastest/slowest benchmark for small sample sizes', function () {
    var data = generateBenchData(),
      bench = Benchmark(data);

    var otherData = generateBenchData();
    otherData.hz = 500;
    otherData.stats.mean = 2;
    otherData.stats.sample = [2, 2, 2, 2, 2]
    var other = Benchmark(otherData);

    var actual = Benchmark.filter([bench, other], 'fastest');
    assert.deepEqual(actual, [bench], 'correctly detects the fastest');

    actual = Benchmark.filter([bench, other], 'slowest');
    assert.deepEqual(actual, [other], 'correctly detects the slowest');
  });

  it('should correctly detect the fastest/slowest benchmark for large sample sizes', function () {
    var data = generateBenchData();
    data.stats.sample = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    var bench = Benchmark(data);

    var otherData = generateBenchData();
    otherData.hz = 500;
    otherData.stats.mean = 2;
    otherData.stats.sample = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    var other = Benchmark(otherData);

    var actual = Benchmark.filter([bench, other], 'fastest');
    assert.deepEqual(actual, [bench], 'correctly detects the fastest');

    actual = Benchmark.filter([bench, other], 'slowest');
    assert.deepEqual(actual, [other], 'correctly detects the slowest');
  });
});

/*--------------------------------------------------------------------------*/

describe('Benchmark.formatNumber', function () {
  it('should format a million correctly', function () {
    assert.strictEqual(Benchmark.formatNumber(1e6), '1,000,000');
  });

  it('should format less than 100 correctly', function () {
    assert.strictEqual(Benchmark.formatNumber(23), '23');
  });

  it('should format numbers with decimal values correctly', function () {
    assert.strictEqual(Benchmark.formatNumber(1234.56), '1,234.56');
  });

  it('should format negative numbers correctly', function () {
    assert.strictEqual(Benchmark.formatNumber(-1234.56), '-1,234.56');
  });
});

/*--------------------------------------------------------------------------*/

describe('Benchmark.invoke', function () {
  var objects = {
    'array': ['a', ['b'], 'c', null],
    'array-like-object': { '0': 'a', '1': ['b'], '2': 'c', '3': null, 'length': 4 }
  };

  var keys = Object.keys(objects);
  for (let i = 0, il = keys.length; i < il; ++i) {
    var key = keys[i];
    it('should return the correct result when passing an ' + key, function () {
      var actual = Benchmark.invoke(objects[key], 'concat');
      assert.deepEqual(actual, ['a', ['b'], 'c', undefined]);
    });

    it('should provide the correct arguments to the invoked method when passing an ' + key, function () {
      var actual = Benchmark.invoke(objects[key], 'concat', 'x', 'y', 'z');
      assert.deepEqual(actual, ['axyz', ['b', 'x', 'y', 'z'], 'cxyz', undefined]);
    });

    it('should handle options object with callbacks correctly when passing an ' + key, function () {
      function callback() {
        callbacks.push(slice.call(arguments));
      }

      var callbacks = [];
      var actual = Benchmark.invoke(objects[key], {
        'name': 'concat',
        'args': ['x', 'y', 'z'],
        'onStart': callback,
        'onCycle': callback,
        'onComplete': callback
      });

      assert.deepEqual(actual, ['axyz', ['b', 'x', 'y', 'z'], 'cxyz', undefined]);

      assert.strictEqual(callbacks[0].length, 1);
      assert.strictEqual(callbacks[0][0].target, 'a');
      assert.deepEqual(callbacks[0][0].currentTarget, objects[key]);
      assert.strictEqual(callbacks[0][0].type, 'start');
      assert.strictEqual(callbacks[1][0].type, 'cycle');
      assert.strictEqual(callbacks[5][0].type, 'complete');
    });

    it('should support queuing when passing an ' + key, function () {
      var lengths = [];
      var array = Array.isArray(objects[key]) && Array.from(objects[key]) || { ...objects[key] };
      var actual = Benchmark.invoke(array, {
        'name': 'concat',
        'queued': true,
        'args': 'x',
        'onCycle': function () {
          lengths.push(array.length);
        }
      });

      assert.deepEqual(lengths, [4, 3, 2, 1]);
      assert.deepEqual(actual, ['ax', ['b', 'x'], 'cx', undefined]);
    });
  };
});

/*--------------------------------------------------------------------------*/

describe('Benchmark.join', function () {
  var objects = {
    'array': ['a', 'b', ''],
    'array-like-object': { '0': 'a', '1': 'b', '2': '', 'length': 3 },
    'object': { 'a': '0', 'b': '1', '': '2' }
  };

  var keys = Object.keys(objects);
  for (let i = 0, il = keys.length; i < il; ++i) {
    var key = keys[i];
    it('should join correctly using the default separator when passing an ' + key, function () {
      assert.strictEqual(Benchmark.join(objects[key]), key == 'object' ? 'a: 0,b: 1,: 2' : 'a,b,');
    });

    it('should join correctly using a custom separator when passing an ' + key, function () {
      assert.strictEqual(Benchmark.join(objects[key], '+', '@'), key == 'object' ? 'a@0+b@1+@2' : 'a+b+');
    });
  }
});

/*--------------------------------------------------------------------------*/

describe('Benchmark#clone', function () {
  var bench = Benchmark(function () { this.count += 0; }).run();

  it('should return the correct result passing no arguments', function () {
    var clone = bench.clone();
    assert.deepEqual(clone, bench);
    assert.ok(clone.stats != bench.stats && clone.times != bench.times && clone.options != bench.options);
  });

  it('should return the correct result passing a data object', function () {
    var clone = bench.clone({ 'fn': '', 'name': 'foo' });
    assert.ok(clone.fn === '' && clone.options.fn === '');
    assert.ok(clone.name == 'foo' && clone.options.name == 'foo');
  });
});


/*--------------------------------------------------------------------------*/

describe('Benchmark#compare', function () {
  it('should return `0` when compared to itself', function () {
    var bench = Benchmark(generateBenchData());
    assert.strictEqual(bench.compare(bench), 0);
  });

  it('should correctly detect the faster benchmark for small sample sizes', function () {
    var data = generateBenchData(),
      bench = Benchmark(data);

    var otherData = generateBenchData();
    otherData.hz = 500;
    otherData.stats.mean = 2;
    otherData.stats.sample = [2, 2, 2, 2, 2];

    var other = Benchmark(otherData);

    assert.strictEqual(bench.compare(other), 1);
    assert.strictEqual(other.compare(bench), -1);
  });

  it('should correctly detect the faster benchmark for large sample sizes', function () {
    var data = generateBenchData();
    data.stats.sample = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    var bench = Benchmark(data);

    var otherData = generateBenchData();
    otherData.hz = 500;
    otherData.stats.mean = 2;
    otherData.stats.sample = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

    var other = Benchmark(otherData);

    assert.strictEqual(bench.compare(other), 1);
    assert.strictEqual(other.compare(bench), -1);
  });
});

/*--------------------------------------------------------------------------*/

describe('Benchmark#reset', function () {
  it('should not reset default event handlers', function () {
    var handler = function () { };
    Benchmark.options.onStart = handler;

    var bench = Benchmark(),
      clone = bench.clone({ 'events': { 'cycle': [function () { }] } });

    clone.reset();

    assert.deepEqual(clone.events, { 'start': [handler] });
    delete Benchmark.options.onStart;
  });
});

/*--------------------------------------------------------------------------*/

describe('Benchmark#run', function () {
  var data = { 'onComplete': 0, 'onCycle': 0, 'onStart': 0 };

  Benchmark({
    'fn': function () {
      this.count += 0;
    },
    'onStart': function () {
      data.onStart++;
    },
    'onComplete': function () {
      data.onComplete++;
    }
  }).run();

  it('should not trigger event handlers by internal benchmark clones', function () {
    assert.strictEqual(data.onStart, 1);
    assert.strictEqual(data.onComplete, 1);
  });
});

/*--------------------------------------------------------------------------*/

var constructors = {
  'Benchmark': Benchmark,
  'Benchmark.Suite': Benchmark.Suite
};

var namespaces = Object.keys(constructors);
for (let i = 0, il = namespaces.length; i < il; ++i) {
  var namespace = namespaces[i];
  var Constructor = constructors[namespaces[i]];

  describe(namespace + '#emit', function () {
    it('should emit passed arguments', function () {
      var args,
        object = Constructor();

      object.on('args', function () { args = slice.call(arguments, 1); });
      object.emit('args', 'a', 'b', 'c');
      assert.deepEqual(args, ['a', 'b', 'c']);
    });

    it('should emit with no listeners', function () {
      var event = Benchmark.Event('empty'),
        object = Constructor();

      object.emit(event);
      assert.strictEqual(event.cancelled, false);
    });

    it('should emit with an event type of "toString"', function () {
      var event = Benchmark.Event('toString'),
        object = Constructor();

      object.emit(event);
      assert.strictEqual(event.cancelled, false);
    });

    it('should returns the last listeners returned value', function () {
      var event = Benchmark.Event('result'),
        object = Constructor();

      object.on('result', function () { return 'x'; });
      object.on('result', function () { return 'y'; });
      assert.strictEqual(object.emit(event), 'y');
    });

    it('should abort the emitters listener iteration when `event.aborted` is `true`', function () {
      var event = Benchmark.Event('aborted'),
        object = Constructor();

      object.on('aborted', function (event) {
        event.aborted = true;
        return false;
      });

      object.on('aborted', function (event) {
        // should not get here
        event.aborted = false;
        return true;
      });

      assert.strictEqual(object.emit(event), false);
      assert.strictEqual(event.aborted, true);
    });

    it('should cancel the event if a listener explicitly returns `false`', function () {
      var event = Benchmark.Event('cancel'),
        object = Constructor();

      object.on('cancel', function () { return false; });
      object.on('cancel', function () { return true; });
      object.emit(event);
      assert.strictEqual(event.cancelled, true);
    });

    it('should use a shallow clone of the listeners when emitting', function () {
      var event,
        listener2 = function (eventObject) { eventObject.listener2 = true },
        object = Constructor();

      object.on('shallowclone', function (eventObject) {
        event = eventObject;
        object.off(event.type, listener2);
      })
        .on('shallowclone', listener2)
        .emit('shallowclone');

      assert.ok(event.listener2);
    });

    it('should emit a custom event object', function () {
      var event = Benchmark.Event('custom'),
        object = Constructor();

      object.on('custom', function (eventObject) { eventObject.touched = true; });
      object.emit(event);
      assert.ok(event.touched);
    });

    it('should set `event.result` correctly', function () {
      var event = Benchmark.Event('result'),
        object = Constructor();

      object.on('result', function () { return 'x'; });
      object.emit(event);
      assert.strictEqual(event.result, 'x');
    });

    it('should correctly set `event.type`', function () {
      var event,
        object = Constructor();

      object.on('type', function (eventObj) {
        event = eventObj;
      });

      object.emit('type');
      assert.strictEqual(event.type, 'type');
    });
  });

  /*------------------------------------------------------------------------*/

  describe(namespace + '#listeners', function () {
    it('should return the correct listeners', function () {
      var listener = function () { },
        object = Constructor();

      object.on('x', listener);
      assert.deepEqual(object.listeners('x'), [listener]);
    });

    it('should return an array and initializes previously uninitialized listeners', function () {
      var object = Constructor();
      assert.deepEqual(object.listeners('x'), []);
      assert.deepEqual(object.events, { 'x': [] });
    });
  });

  /*------------------------------------------------------------------------*/

  describe(namespace + '#off', function () {
    it('should return the benchmark', function () {
      var listener = function () { },
        object = Constructor();

      object.on('x', listener);
      assert.strictEqual(object.off('x', listener), object);
    });

    it('should ignore inherited properties of the event cache', function () {
      var Dummy = function () { },
        listener = function () { },
        object = Constructor();

      Dummy.prototype.x = [listener];
      object.events = new Dummy;

      object.off('x', listener);
      assert.deepEqual(object.events.x, [listener]);
    });

    it('should handle an event type and listener', function () {
      var listener = function () { },
        object = Constructor();

      object.on('x', listener);
      object.off('x', listener);
      assert.deepEqual(object.events.x, []);
    });

    it('should handle unregistering duplicate listeners', function () {
      var listener = function () { },
        object = Constructor();

      object.on('x', listener);
      object.on('x', listener);

      var events = object.events;
      object.off('x', listener);
      assert.deepEqual(events.x, [listener]);

      object.off('x', listener);
      assert.deepEqual(events.x, []);
    });

    it('should handle a non-registered listener', function () {
      var object = Constructor();
      object.off('x', function () { });
      assert.strictEqual(object.events, undefined);
    });

    it('should handle space separated event type and listener', function () {
      var listener = function () { },
        object = Constructor();

      object.on('x', listener);
      object.on('y', listener);

      var events = object.events;
      object.off('x y', listener);
      assert.deepEqual(events.x, []);
      assert.deepEqual(events.y, []);
    });

    it('should handle space separated event type and no listener', function () {
      var listener1 = function () { },
        listener2 = function () { },
        object = Constructor();

      object.on('x', listener1);
      object.on('y', listener2);

      var events = object.events;
      object.off('x y');
      assert.deepEqual(events.x, []);
      assert.deepEqual(events.y, []);
    });

    it('should handle no arguments', function () {
      var listener1 = function () { },
        listener2 = function () { },
        listener3 = function () { },
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
  });

  /*------------------------------------------------------------------------*/

  describe(namespace + '#on', function () {
    it('should return the benchmark', function () {
      var listener = function () { },
        object = Constructor();

      assert.strictEqual(object.on('x', listener), object);
    });

    it('should ignore inherited properties of the event cache', function () {
      var Dummy = function () { },
        listener1 = function () { },
        listener2 = function () { },
        object = Constructor();

      Dummy.prototype.x = [listener1];
      object.events = new Dummy;

      object.on('x', listener2);
      assert.deepEqual(object.events.x, [listener2]);
    });

    it('should handle an event type and listener', function () {
      var listener = function () { },
        object = Constructor();

      object.on('x', listener);
      assert.deepEqual(object.events.x, [listener]);
    });

    it('should handle registering duplicate listeners', function () {
      var listener = function () { },
        object = Constructor();

      object.on('x', listener);
      object.on('x', listener);
      assert.deepEqual(object.events.x, [listener, listener]);
    });

    it('should handle space separated event type and listener', function () {
      var listener = function () { },
        object = Constructor();

      object.on('x y', listener);

      var events = object.events;
      assert.deepEqual(events.x, [listener]);
      assert.deepEqual(events.y, [listener]);
    });
  });
}
/*--------------------------------------------------------------------------*/

describe('Benchmark.Suite#abort', function () {
  it('should ignore abort calls when the suite isn\'t running', function () {
    var fired = false;
    var suite = Benchmark.Suite('suite', {
      'onAbort': function () { fired = true; }
    });

    suite.add('foo', function () { });
    suite.abort();
    assert.strictEqual(fired, false);
  });

  it('should ignore abort calls from `Benchmark.Suite#reset` when the suite isn\'t running', function () {
    var fired = false;
    var suite = Benchmark.Suite('suite', {
      'onAbort': function () { fired = true; }
    });

    suite.add('foo', function () { });
    suite.reset();
    assert.strictEqual(fired, false);
  });

  it('should emit an abort event when running', function (done) {

    var fired = false;

    Benchmark.Suite({
      'onAbort': function () { fired = true; }
    })
      .on('start', function () {
        this.abort();
      })
      .on('complete', function () {
        assert.ok(fired);
        done();
      })
      .add(function () { })
      .run({ 'async': true });
  });

  it('should emit an abort event after calling `Benchmark.Suite#reset`', function (done) {

    var fired = false;

    Benchmark.Suite({
      'onAbort': function () { fired = true; }
    })
      .on('start', function () {
        this.reset();
      })
      .on('complete', function () {
        assert.ok(fired);
        done();
      })
      .add(function () { })
      .run({ 'async': true });
  });

  it('should abort deferred benchmark', function (done) {

    var fired = false,
      suite = Benchmark.Suite();

    suite.on('complete', function () {
      assert.strictEqual(fired, false);
      done();
    })
      .add('a', {
        'defer': true,
        'fn': function (deferred) {
          // avoid test inlining
          suite.name;
          // delay resolve
          setTimeout(function () {
            deferred.resolve();
            suite.abort();
          }, 10);
        }
      })
      .add('b', {
        'defer': true,
        'fn': function (deferred) {
          // avoid test inlining
          suite.name;
          // delay resolve
          setTimeout(function () {
            deferred.resolve();
            fired = true;
          }, 10);
        }
      })
      .run();
  });
});

/*--------------------------------------------------------------------------*/

describe('Benchmark.Suite#reverse', function () {
  it('should reverses the element order', function () {
    var suite = Benchmark.Suite();
    suite[0] = 0;
    suite[1] = 1;
    suite.length = 2;

    var actual = suite.reverse();
    assert.strictEqual(actual, suite);
    assert.deepEqual(slice.call(actual), [1, 0]);
  });
});

/*--------------------------------------------------------------------------*/

describe('Benchmark.Suite#shift', function () {
  it('should remove the first element', function () {
    var suite = Benchmark.Suite();
    suite[0] = 0;
    suite[1] = 1;
    suite.length = 2;

    var actual = suite.shift();
    assert.strictEqual(actual, 0);
    assert.deepEqual(slice.call(suite), [1]);
  });

  it('should shift an object with no elements', function () {
    var suite = Benchmark.Suite(),
      actual = suite.shift();

    assert.strictEqual(actual, undefined);
    assert.deepEqual(slice.call(suite), []);
  });

  it('should have no elements when length is `0` after shift', function () {
    var suite = Benchmark.Suite();
    suite[0] = 0;
    suite.length = 1;
    suite.shift();

    // ensure element is removed
    assert.strictEqual('0' in suite, false);
    assert.strictEqual(suite.length, 0);
  });
});

/*--------------------------------------------------------------------------*/

describe('Benchmark.Suite#splice', function () {
  it('should work with positive `start` argument', function () {
    var suite = Benchmark.Suite();
    suite[0] = 0;
    suite[1] = 3;
    suite.length = 2;

    var actual = suite.splice(1, 0, 1, 2);
    assert.deepEqual(actual, []);
    assert.deepEqual(slice.call(suite), [0, 1, 2, 3]);
  });

  it('should work with positive `start` and `deleteCount` arguments', function () {
    var suite = Benchmark.Suite();
    suite[0] = 0;
    suite[1] = 3;
    suite.length = 2;

    var actual = suite.splice(1, 1, 1, 2);
    assert.deepEqual(actual, [3]);
    assert.deepEqual(slice.call(suite), [0, 1, 2]);
  });

  it('should work with `deleteCount` values exceeding length', function () {
    var suite = Benchmark.Suite();
    suite[0] = 0;
    suite[1] = 3;
    suite.length = 2;

    var actual = suite.splice(1, 10, 1, 2);
    assert.deepEqual(actual, [3]);
    assert.deepEqual(slice.call(suite), [0, 1, 2]);
  });

  it('should work with negative `start` and `deleteCount` arguments', function () {
    var suite = Benchmark.Suite();
    suite[0] = 0;
    suite[1] = 3;
    suite.length = 2;

    var actual = suite.splice(-1, -1, 1, 2);
    assert.deepEqual(actual, []);
    assert.deepEqual(slice.call(suite), [0, 1, 2, 3]);
  });

  it('should work with an extreme negative `deleteCount` value', function () {
    var suite = Benchmark.Suite();
    suite[0] = 0;
    suite[1] = 3;
    suite.length = 2;

    var actual = suite.splice(0, -10, 1, 2);
    assert.deepEqual(actual, []);
    assert.deepEqual(slice.call(suite), [1, 2, 0, 3]);
  });

  it('should have no elements when length is `0` after splice', function () {
    var suite = Benchmark.Suite();
    suite[0] = 0;
    suite.length = 1
    suite.splice(0, 1);

    // ensure element is removed
    assert.strictEqual('0' in suite, false);
    assert.strictEqual(suite.length, 0);
  });
});

/*--------------------------------------------------------------------------*/

describe('Benchmark.Suite#unshift', function () {
  it('should add a first element', function () {
    var suite = Benchmark.Suite();
    suite[0] = 1;
    suite.length = 1;

    var actual = suite.unshift(0);
    assert.strictEqual(actual, 2);
    assert.deepEqual(slice.call(suite), [0, 1]);
  });

  it('should add multiple elements to the front', function () {
    var suite = Benchmark.Suite();
    suite[0] = 3;
    suite.length = 1;

    var actual = suite.unshift(0, 1, 2);
    assert.strictEqual(actual, 4);
    assert.deepEqual(slice.call(suite), [0, 1, 2, 3]);
  });
});

/*--------------------------------------------------------------------------*/

describe('Benchmark.Suite filtered results onComplete', function () {
  var count = 0,
    suite = Benchmark.Suite();

  suite.add('a', function () {
    for (var i = 0; i < 1e5; i++) {
      count++;
    }
  })
    .add('b', function () {
      for (var i = 0; i < 1e6; i++) {
        count++;
      }
    })
    .add('c', function () {
      throw new TypeError;
    });

  it('should filter by fastest', function (done) {

    suite.on('complete', function () {
      suite.off();
      assert.deepEqual(this.filter('fastest').map('name'), ['a']);
      done();
    })
      .run({ 'async': true });
  });

  it('should filter by slowest', function (done) {

    suite.on('complete', function () {
      suite.off();
      assert.deepEqual(this.filter('slowest').map('name'), ['b']);
      done();
    })
      .run({ 'async': true });
  });

  it('should filter by successful', function (done) {

    suite.on('complete', function () {
      suite.off();
      assert.deepEqual(this.filter('successful').map('name'), ['a', 'b']);
      done();
    })
      .run({ 'async': true });
  });
});

/*--------------------------------------------------------------------------*/

describe('Benchmark.Suite event flow', function () {
  var events = [],
    callback = function (event) { events.push(event); };

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
    .add('bench', function () {
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
  it('should emit the suite "add" event first', function () {
    var event = events[0];
    assert.ok(event.type == 'add' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
  });

  // next we start the Suite because no reset was needed
  it('should emit the suite "start" event', function () {
    var event = events[1];
    assert.ok(event.type == 'start' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
  });

  // and so start the first benchmark
  it('should emit the benchmark "start" event', function () {
    var event = events[2];
    assert.ok(event.type == 'start' && event.currentTarget.name == 'bench');
  });

  // oh no! we abort because of an error
  it('should emit the benchmark "error" event', function () {
    var event = events[3];
    assert.ok(event.type == 'error' && event.currentTarget.name == 'bench');
  });

  // benchmark error triggered
  it('should emit the benchmark "abort" event', function () {
    var event = events[4];
    assert.ok(event.type == 'abort' && event.currentTarget.name == 'bench');
  });

  // we reset the benchmark as part of the abort
  it('should emit the benchmark "reset" event', function () {
    var event = events[5];
    assert.ok(event.type == 'reset' && event.currentTarget.name == 'bench');
  });

  // benchmark is cycle is finished
  it('should emit the benchmark "cycle" event', function () {
    var event = events[6];
    assert.ok(event.type == 'cycle' && event.currentTarget.name == 'bench');
  });

  // benchmark is complete
  it('should emit the benchmark "complete" event', function () {
    var event = events[7];
    assert.ok(event.type == 'complete' && event.currentTarget.name == 'bench');
  });

  // the benchmark error triggers a Suite error
  it('should emit the suite "error" event', function () {
    var event = events[8];
    assert.ok(event.type == 'error' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
  });

  // the Suite cycle finishes
  it('should emit the suite "cycle" event', function () {
    var event = events[9];
    assert.ok(event.type == 'cycle' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
  });

  // the Suite completes
  it('should emit the suite "complete" event', function () {
    var event = events[10];
    assert.ok(event.type == 'complete' && event.currentTarget.name == 'suite' && event.target.name == 'bench');
  });

  it('should emit all expected events', function () {
    assert.ok(events.length == 11);
  });
});

/*--------------------------------------------------------------------------*/

describe('lodash helper substitutes', function () {
  describe('forOwn', function () {
    it('example 1', function () {
      function Foo() {
        this.a = 1;
        this.b = 2;
      }
       
      Foo.prototype.c = 3;
      
      var result = [];
      Benchmark.forOwn(new Foo, function(value, key) {
        result.push(key);
      });

      assert.ok(result.length === 2);
      assert.ok(result[0] === 'a');
      assert.ok(result[1] === 'b');
    });
  });

  describe('each', function () {
    it('example 1', function () {
      var result = [];

      Benchmark.each([1, 2], function(value) {
        result.push(value);
      });

      assert.ok(result.length === 2);
      assert.ok(result[0] === 1);
      assert.ok(result[1] === 2);
    });
    it('example 2', function () {
      var keys = [];
      var values = [];

      Benchmark.each({ 'a': 1, 'b': 2 }, function(value, key) {
        keys.push(key);
        values.push(value);
      });

      assert.ok(values.length === 2);
      assert.ok(values[0] === 1);
      assert.ok(values[1] === 2);

      assert.ok(keys.length === 2);
      assert.ok(keys[0] === 'a');
      assert.ok(keys[1] === 'b');
    });
  });

  describe('has', function () {
    it('example 1', function () {
      var object = { 'a': { 'b': 2 } };

      assert.ok(Benchmark.has(object, 'a'));
      assert.ok(Benchmark.has(object, 'a.b'));
      assert.ok(Benchmark.has(object, ['a', 'b']));
    });
    
    it('example 2', function () {
      function Foo() {}
       
      Foo.prototype.a = { 'b': 2 };
      
      assert.ok(!Benchmark.has(new Foo, 'a'));
    });
    
  });

  describe('indexOf', function () {
    it('example 1', function () {
      assert.ok(Benchmark.indexOf([1, 2, 1, 2], 2) === 1);
    });
    it('example 2', function () {
      assert.ok(Benchmark.indexOf([1, 2, 1, 2], 2, 2) === 3);
    });
  });

  describe('map', function () {
    function square(n) {
      return n * n;
    }

    it('example 1', function () {
      var result = Benchmark.map([4, 8], square);

      assert.ok(result.length === 2);
      assert.ok(result[0] === 16);
      assert.ok(result[1] === 64);
    });

    it('example 2', function () {
      var result = Benchmark.map({ 'a': 4, 'b': 8 }, square);

      assert.ok(result.length === 2);
      assert.ok(result[0] === 16);
      assert.ok(result[1] === 64);
    });

    it('example 3', function () {
      var users = [
        { 'user': 'barney' },
        { 'user': 'fred' }
      ];
       
      var result = Benchmark.map(users, 'user');

      assert.ok(result.length === 2);
      assert.ok(result[0] === 'barney');
      assert.ok(result[1] === 'fred');
    });
  });

  describe('reduce', function () {
    it('example 1', function () {
      assert.ok(Benchmark.reduce([1, 2], function(sum, n) {
        return sum + n;
      }, 0) === 3);
    });

    it('example 1 mod', function () {
      assert.ok(Benchmark.reduce([1, 2], function(sum, n) {
        return sum + n;
      }) === 3);
    });

    it('example 2', function () {
      assert.deepEqual(Benchmark.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
        (result[value] || (result[value] = [])).push(key);
        return result;
      }, {}), { '1': ['a', 'c'], '2': ['b'] } );
    });
  });
});

/*--------------------------------------------------------------------------*/

describe('Deferred benchmarks', function () {
  it('should run a deferred benchmark correctly', function (done) {
    this.timeout(7000);

    Benchmark(function (deferred) {
      setTimeout(function () { deferred.resolve(); }, 1e3);
    }, {
      'defer': true,
      'onComplete': function () {
        assert.strictEqual(this.hz.toFixed(0), '1');
        done();
      }
    })
      .run();
  });

  it('should run with string values for "fn", "setup", and "teardown"', function (done) {

    Benchmark({
      'defer': true,
      'setup': 'var x = [3, 2, 1];',
      'fn': 'setTimeout(function() { x.sort(); deferred.resolve(); }, 10);',
      'teardown': 'x.length = 0;',
      'onComplete': function () {
        assert.ok(true);
        done();
      }
    })
      .run();
  });

  it('should execute "setup", "fn", and "teardown" in correct order', function (done) {
    var fired = [];

    Benchmark({
      'defer': true,
      'setup': function () {
        fired.push('setup');
      },
      'fn': function (deferred) {
        fired.push('fn');
        setTimeout(function () { deferred.resolve(); }, 10);
      },
      'teardown': function () {
        fired.push('teardown');
      },
      'onComplete': function () {
        assert.ok(fired.includes('fn'));
        assert.ok(fired.includes('setup'));
        assert.ok(fired.includes('teardown'));
        done();
      }
    })
      .run();
  });
});
