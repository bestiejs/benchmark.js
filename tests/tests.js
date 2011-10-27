(function(window, undefined) {

  /** Use a single load function */
  var load = typeof require == 'function' ? require : window.load;

  /** The unit testing framework */
  var QUnit =
    window.QUnit ||
    (window.QUnit = load('../vendor/qunit/qunit/qunit.js') || window.QUnit) &&
    (load('../vendor/qunit-clib/qunit-clib.js'), window.QUnit);

  /** The `Benchmark` constructor to test */
  var Benchmark =
    window.Benchmark ||
    (Benchmark = load('../benchmark.js') || window.Benchmark) &&
    (Benchmark.Benchmark || Benchmark);

  /*--------------------------------------------------------------------------*/

  // in-browser tests
  if (window.document) {
    // must explicitly use `QUnit.module` instead of `module()`
    // in case we are in a CLI environment
    QUnit.module('Benchmark');

    test('Benchmark.platform', function() {
      equal(navigator.userAgent, String(Benchmark.platform), 'default value');
    });

    if (window.require) {
      test('require("benchmark")', function() {
        equal((Benchmark2 || {}).version, Benchmark2.version, 'require("benchmark")');
      });

      test('require("platform")', function() {
        var bench = Benchmark2 || {},
            platform = bench.platform || {};
        equal(typeof platform.name, 'string', 'auto required');
      });
    }
  }

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.each');

  test('basic', function() {
    var args,
        o = ['a', 'b', 'c'],
        values = [];

    var result = Benchmark.each(o, function(value) {
      args || (args = [].slice.call(arguments));
      values.push(value);
    });

    ok(o === result, 'object returned');
    deepEqual(values, ['a', 'b', 'c'], 'values');
    deepEqual(args, ['a', 0, o], 'passed arguments to callback');
    values.length = 0;

    Benchmark.each(o, function(value, index) {
      return index == 2 ? false : values.push(value);
    });

    deepEqual(values, ['a', 'b'], 'exit early');
  });

  test('array-like-object', function() {
    var o = { '0': 'a', '2': 'c', 'length': 3 },
        values = [];

    Benchmark.each(o, function(value) {
      values.push(value);
    });

    deepEqual(values, ['a', 'c'], 'sparse check');
  });

  if (window.document && document.evaluate) {
    test('xpath snapshot', function() {
      var o = document.evaluate('//html', document, null, 7, null),
          values = [];

      Benchmark.each(o, function(value) {
        values.push(value);
      });

      deepEqual(values, [document.documentElement], 'basic');
    });
  }

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.filter');

  test('basic', function() {
    var args,
        o = ['a', 'b', 'c'];

    var result = Benchmark.filter(o, function(value) {
      args || (args = [].slice.call(arguments));
      return value == 'b';
    });

    deepEqual(result, ['b'], 'basic');
    deepEqual(args, ['a', 0, o], 'passed arguments to callback');
  });

  test('array-like-object', function() {
    var count = 0,
        o = { '0': 'a', '2': 'c', 'length': 3 };

    var result = Benchmark.filter(o, function(value) {
      count++;
      return value != null;
    });

    deepEqual(result, ['a', 'c'], 'basic');
    equal(count, 2, 'sparse check');
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.forIn');

  test('basic', function() {
    var args,
        O = function(){ var me = this; me.a = 1; me.b = 2; me.c = 3; },
        o = (O.prototype.d = 4, new O),
        values = [];

    var result = Benchmark.forIn(o, function(value) {
      args || (args = [].slice.call(arguments));
      values.push(value);
    });

    ok(o === result, 'object returned');
    deepEqual(values, [1, 2, 3], 'values');
    deepEqual(args, [1, 'a', o], 'passed arguments to callback');
    values.length = 0;

    Benchmark.forIn(o, function(value, key) {
      return key == 'c' ? false : values.push(value);
    });

    deepEqual(values, [1, 2], 'exit early');
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.formatNumber');

  test('basic', function() {
    var num = 1e6;
    equal(Benchmark.formatNumber(num), '1,000,000', 'basic');

    num = 23;
    equal(Benchmark.formatNumber(num), '23', 'short');

    num = 1234.56;
    equal(Benchmark.formatNumber(num), '1,234.56', 'decimals');

    num *= -1;
    equal(Benchmark.formatNumber(num), '-1,234.56', 'negatives');
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.indexOf');

  test('basic', function() {
    var o = ['a', 'b', 'c'];
    equal(Benchmark.indexOf(o, 'b'), 1, 'basic');
    equal(Benchmark.indexOf(o, new String('b')), -1, 'strict');
  });

  test('array-like-object', function() {
    var o = { '0': 'a', '2': 'c', 'length': 3 };
    equal(Benchmark.indexOf(o, 'c'), 2, 'basic');
    equal(Benchmark.indexOf(o, 'b'), -1, 'not found');
    equal(Benchmark.indexOf(o, undefined), -1, 'sparse check');
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.invoke');

  test('basic', function() {
    var callbacks = [],
        lengths = [],
        callback = function() { callbacks.push(slice.call(arguments)); },
        slice = [].slice,
        o = [new Array, null, new Array, new Array];

    var result = Benchmark.invoke(o, 'push', 'b');
    deepEqual(result, [1, undefined, 1, 1], 'return values');

    result = Benchmark.pluck(o, '0');
    deepEqual(result, ['b', undefined, 'b', 'b'], 'methods invoked');

    Benchmark.invoke(o, {
      'name': 'splice',
      'args': [0, 0, 'a'],
      'onStart': callback,
      'onCycle': callback,
      'onComplete': callback
    });

    ok(callbacks[0].length == 2 && callbacks[0][0].type && callbacks[0][1].push, 'passed arguments to callback');
    equal(callbacks.shift()[0].type, 'start', 'onStart');
    equal(callbacks.shift()[0].type, 'cycle', 'onCycle');
    equal(callbacks.pop()[0].type, 'complete', 'onComplete');
  });

  test('queued', function() {
    var lengths = [],
        expected = [1, 1],
        o = [new Array, new Array];

    o[3] = new Array;
    expected[3] = 1;

    var result = Benchmark.invoke(o, {
      'name': 'push',
      'queued': true,
      'args': 'a',
      'onCycle': function() {
        lengths.push(o.length);
      }
    });

    deepEqual(lengths, [4, 3, 1], 'removed queued items');
    deepEqual(result, expected, 'return values');
  });

  test('array-like-object', function() {
    var expected = [1],
        o = { '0': new Array, '2': new Array, 'length': 3 },
        result = Benchmark.invoke(o, 'push', 'a');

    expected[2] = 1;
    deepEqual(result, expected, 'sparse check');
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.join');

  test('basic', function() {
    var o = ['a', 'b', 'c'];
    equal(Benchmark.join(o), 'a,b,c', 'default separator 1');
    equal(Benchmark.join(o, '+', '@'), 'a+b+c', 'custom separator 1');

    o = { 'a': 'apple', 'b': 'ball', 'c': 'cat' };
    equal(Benchmark.join(o), 'a: apple,b: ball,c: cat', 'default separator 2');
    equal(Benchmark.join(o, '; ', ' -> '), 'a -> apple; b -> ball; c -> cat', 'custom separator 2');
  });

  test('array-like-object', function() {
    var o = { '0': 'a', '2': 'c', 'length': 3 };
    equal(Benchmark.join(o), 'a,c', 'sparse check');
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.map');

  test('basic', function() {
    var args,
        o = ['a', 'b', 'c'];

    var result = Benchmark.map(o, function(value, index) {
      args || (args = [].slice.call(arguments));
      return index;
    });

    deepEqual(result, [0, 1, 2], 'basic');
    deepEqual(args, ['a', 0, o], 'passed arguments to callback');
  });

  test('array-like-object', function() {
    var expected = [0],
        o = { '0': 'a', '2': 'c', 'length': 4 },
        result = Benchmark.map(o, function(value, index) { return index; });

    expected[2] = 2;
    expected.length = 4;
    deepEqual(result, expected, 'sparse value check');
    deepEqual(result.length, 4, 'sparse length check');
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.pluck');

  test('basic', function() {
    var o = [{ 'name': 'a' }, null, { 'name': 'c' }],
        result = Benchmark.pluck(o, 'name');

    deepEqual(result, ['a', undefined, 'c'], 'basic');

    result = Benchmark.pluck(o, 'nonexistent');
    deepEqual(result, [undefined, undefined, undefined], 'undefined property');
  });

  test('array-like-object', function() {
    var expected = ['a'],
        o = { '0': { 'name': 'a' }, '2': { 'name': 'c' }, 'length': 3 },
        result = Benchmark.pluck(o, 'name');

    expected[2] = 'c';
    deepEqual(result, expected, 'sparse check');
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.reduce');

  test('basic', function() {
    var args,
        slice = [].slice,
        o = ['a', 'b', 'c'];

    var result = Benchmark.reduce(o, function(string, value, index) {
      args || (args = slice.call(arguments));
      return string + value;
    }, '');

    equal(result, 'abc', 'accumulation correct');
    deepEqual(args, ['', 'a', 0, o], 'passed arguments to callback');
    args = null;

    Benchmark.reduce(o, function() {
      args || (args = slice.call(arguments));
    });
    deepEqual(args, ['a', 'b', 1, o], 'no initial value');
  });

  test('array-like-object', function() {
    var o = { '0': 'a', '2': 'c', 'length': 3 };
    var result = Benchmark.reduce(o, function(string, value, index) {
      return string + value;
    });

    equal(result, 'ac', 'sparse check');
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark#emit');

  test('event object', function() {
    var args = [],
        bench = Benchmark(function() {}),
        event = Benchmark.Event('custom'),
        listener2 = function(event) { event.listener2 = 1 };

    bench.on('custom', function(event) { event.touched = 1; });
    bench.emit(event);
    bench.events = {};
    ok(event.touched, 'emit custom event object');

    bench.on('type', function(eventObj) { event = eventObj; });
    bench.emit('type');
    bench.events = {};
    equal(event.type, 'type', 'emit event.type');

    bench.on('args', function() { args = args.slice.call(arguments, 1); });
    bench.emit('args', 'a', 'b', 'c');
    bench.events = {};
    deepEqual(args, ['a', 'b', 'c'], 'emit curried arguments');

    ok(bench.emit('empty'), 'emit empty successful');

    bench.on('success', function() { return 'bogus'; });
    ok(bench.emit('success'), 'emit successful');

    bench.on('success', function() { return false; });
    ok(!bench.emit('success'), 'emit unsuccessful');
    bench.events = {};

    bench.on('shallowclone', function(eventObject) {
      event = eventObject;
      bench.removeListener(event.type, listener2);
    })
    .on('shallowclone', listener2)
    .emit('shallowclone');
    bench.events = {};
    ok(event.listener2, 'emit shallow cloned listeners');
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite#abort');

  test('basic', function() {
    var fired = false;

    var suite = Benchmark.Suite('foo', {
      'onAbort': function() { fired = true }
    })
    .add('bar', function() { });

    suite.abort();
    ok(fired == false, 'calling abort() won\'t fire an abort event when suite isn\'t running');

    fired = false;
    suite.reset();
    ok(fired == false, 'calling reset() won\'t fire an abort event when suite isn\'t running');
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite#add');

  test('event flow', function() {
    var args,
        pair,
        thisBinding,
        slice = [].slice,
        callbacks = [],
        callback = function() { callbacks.push([arguments, this]); };

    var suite = Benchmark.Suite('foo', {
      'onAdd': callback,
      'onAbort': callback,
      'onClone': callback,
      'onError': callback,
      'onStart': callback,
      'onCycle': callback,
      'onComplete': callback,
      'onReset': callback
    })
    .add('bar', function() {
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
    pair = callbacks.shift();
    args = pair[0];
    thisBinding = pair[1];
    ok(args.length == 2 && args[0].type == 'add' && thisBinding.name == 'foo' && args[1].name == 'bar', 'passed arguments to Suite#onAdd');

    // next we start the Suite because no reset was needed
    pair = callbacks.shift();
    args = pair[0];
    thisBinding = pair[1];
    ok(args.length == 2 && args[0].type == 'start' && thisBinding.name == 'foo' && args[1].name == 'bar', 'passed arguments to Suite#onStart');

    // and so start the first benchmark
    pair = callbacks.shift();
    args = pair[0];
    thisBinding = pair[1];
    ok(args.length == 1 && args[0].type == 'start' && thisBinding.name == 'bar', 'passed arguments to Benchmark#onStart');

    // after starting we reset the benchmark
    pair = callbacks.shift();
    args = pair[0];
    thisBinding = pair[1];
    ok(args.length == 1 && args[0].type == 'reset' && thisBinding.name == 'bar', 'passed arguments to Benchmark#onReset');

    // oh no! we abort because of an error
    pair = callbacks.shift();
    args = pair[0];
    thisBinding = pair[1];
    ok(args.length == 1 && args[0].type == 'abort' && thisBinding.name == 'bar', 'passed arguments to Benchmark#onAbort');

    // benchmark error triggered
    pair = callbacks.shift();
    args = pair[0];
    thisBinding = pair[1];
    ok(args.length == 1 && args[0].type == 'error' && thisBinding.name == 'bar', 'passed arguments to Benchmark#onError');

    // benchmark is cycle is finished
    pair = callbacks.shift();
    args = pair[0];
    thisBinding = pair[1];
    ok(args.length == 1 && args[0].type == 'cycle' && thisBinding.name == 'bar', 'passed arguments to Benchmark#onCycle');

    // benchmark is complete
    pair = callbacks.shift();
    args = pair[0];
    thisBinding = pair[1];
    ok(args.length == 1 && args[0].type == 'complete' && thisBinding.name == 'bar', 'passed arguments to Benchmark#onComplete');

    // the benchmark error triggers a Suite error
    pair = callbacks.shift();
    args = pair[0];
    thisBinding = pair[1];
    ok(args.length == 2 && args[0].type == 'error' && thisBinding.name == 'foo' && args[1].name == 'bar', 'passed arguments to Suite#onError');

    // the Suite cycle finishes
    pair = callbacks.shift();
    args = pair[0];
    thisBinding = pair[1];
    ok(args.length == 2 && args[0].type == 'cycle' && thisBinding.name == 'foo' && args[1].name == 'bar', 'passed arguments to Suite#onCycle');

    // the Suite completes
    pair = callbacks.shift();
    args = pair[0];
    thisBinding = pair[1];
    ok(args.length == 2 && args[0].type == 'complete' && thisBinding.name == 'foo' && args[1].name == 'bar', 'passed arguments to Suite#onComplete');

    ok(callbacks.length == 0, 'callbacks executed in order');
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Async tests');

  asyncTest('Benchmark.filter', function() {
    var count = 0,
        options = Benchmark.options,
        maxTime = options.maxTime,
        suite = new Benchmark.Suite;

    options.minTime && (options.maxTime = options.minTime * 5);

    suite.add('a', function() {
      // empty
    })
    .add('b', function() {
      for (var i = 0; i < 1e6; i++) {
        count++;
      }
    })
    .add('c', function() {
      throw new TypeError;
    })
    .on('complete', function() {
      deepEqual(this.filter('fastest').pluck('name'), ['a'], 'by fastest');
      deepEqual(this.filter('slowest').pluck('name'), ['b'], 'by slowest');
      deepEqual(this.filter('successful').pluck('name'), ['a', 'b'], 'by successful');
      options.maxTime = maxTime;
      QUnit.start();
    })
    .run({ 'async': true });
  });

  asyncTest('Benchmark.Suite#abort', function() {
    var count = -1,
        fired = false;

    var suite = Benchmark.Suite('foo', {
      'onAbort': function() { fired = true }
    })
    .add('a', function() {
      // empty
    })
    .on('start', function() {
      this[++count ? 'reset' : 'abort']();
      this.aborted = true;
    })
    .on('complete', function() {
      if (count == 0) {
        ok(fired == true, 'calling abort() fires an abort event when suite is running');
        fired = false;
        suite.run({ 'async': true });
      } else {
        ok(fired == true, 'calling reset() fires an abort event when suite is running');
        QUnit.start();
      }
    });

    suite.run({ 'async': true });
  });

  /*--------------------------------------------------------------------------*/

  // explicitly call `QUnit.start()` in a CLI environment
  if (!window.document) {
    QUnit.start();
  }
}(typeof global == 'object' && global || this));