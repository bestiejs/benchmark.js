(function(window) {

  module('Benchmark');

  test('Benchmark.platform', function() {
    equals(navigator.userAgent, String(Benchmark.platform), 'default value');
  });

  if (window.require != null) {
    test('require("benchmark")', function() {
      equals((Benchmark2 || { }).version, Benchmark2.version, 'require("benchmark")');
    });

    test('require("platform")', function() {
      var bench = Benchmark2 || { },
          platform = bench.platform || { };
      equals(typeof platform.name, 'string', 'auto required');
    });
  }

  /*--------------------------------------------------------------------------*/

  module('Benchmark.each');

  test('basic', function() {
    var args,
        values = [],
        slice = [].slice,
        o = ['a', 'b', 'c'];

    var result = Benchmark.each(o, function(value, index) {
      args || (args = slice.call(arguments));
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
    var values = [],
        o = { '1': 'b', '2': 'c', 'length': 3 };

    Benchmark.each(o, function(value) {
      values.push(value);
    });

    deepEqual(values, ['b', 'c'], 'basic');
  });

  /*--------------------------------------------------------------------------*/

  module('Benchmark.filter');

  test('basic', function() {
    var args,
        slice = [].slice,
        o = ['a', 'b', 'c'];

    var result = Benchmark.filter(o, function(value) {
      args || (args = slice.call(arguments));
      return value == 'b';
    });

    deepEqual(result, ['b'], 'basic');
    deepEqual(args, ['a', 0, o], 'passed arguments to callback');
  });

  test('array-like-object', function() {
    var o = { '1': 'b', '2': 'c', 'length': 3 };
    var result = Benchmark.filter(o, function(value) {
      return value != null;
    });

    deepEqual(result, ['b', 'c'], 'basic');
  });

  /*--------------------------------------------------------------------------*/

  module('Benchmark.formatNumber');

  test('basic', function() {
    var num = 1e6;
    equals(Benchmark.formatNumber(num), '1,000,000', 'basic');

    num = 23;
    equals(Benchmark.formatNumber(num), '23', 'short');

    num = 1234.56;
    equals(Benchmark.formatNumber(num), '1,234.56', 'decimals');

    num *= -1;
    equals(Benchmark.formatNumber(num), '-1,234.56', 'negatives');
  });

  /*--------------------------------------------------------------------------*/

  module('Benchmark.indexOf');

  test('basic', function() {
    var o = ['a', 'b', 'c'];
    equals(Benchmark.indexOf(o, 'b'), 1, 'basic');
    equals(Benchmark.indexOf(o, new String('b')), -1, 'strict');
  });

  test('array-like-object', function() {
    var o = { '1': 'b', '2': 'c', 'length': 3 };
    equals(Benchmark.indexOf(o, 'c'), 2, 'basic');
    equals(Benchmark.indexOf(o, 'a'), -1, 'not found');
  });

  /*--------------------------------------------------------------------------*/

  module('Benchmark.invoke');

  test('basic', function() {
    var callbacks = [],
        lengths = [],
        callback = function() { callbacks.push(slice.call(arguments)); },
        slice = [].slice,
        o = [new Array, new Array, new Array];

    var result = Benchmark.invoke(o, 'push', 'b');
    deepEqual(result, [1, 1, 1], 'return values');

    result = Benchmark.pluck(o, '0');
    deepEqual(result, ['b', 'b', 'b'], 'methods invoked');

    Benchmark.invoke(o, {
      'name': 'splice',
      'args': [0, 0, 'a'],
      'onStart': callback,
      'onCycle': callback,
      'onComplete': callback
    });

    ok(callbacks[0].length == 2 && callbacks[0][0].type && callbacks[0][1].push, 'passed arguments to callback');
    equals(callbacks.shift()[0].type, 'start', 'onStart');
    equals(callbacks.shift()[0].type, 'cycle', 'onCycle');
    equals(callbacks.pop()[0].type, 'complete', 'onComplete');
  });

  test('queued', function() {
    var lengths = [],
        o = [new Array, new Array, new Array];

    var result = Benchmark.invoke(o, {
      'name': 'push',
      'queued': true,
      'args': 'a',
      'onCycle': function() {
        lengths.push(o.length);
      }
    });

    deepEqual(lengths, [3, 2, 1], 'removed queued items');
    deepEqual(result, [1, 1, 1], 'return values');
  });

  test('array-like-object', function() {
    var o = { '1': new Array, '2': new Array, 'length': 3 };
    var result = Benchmark.invoke(o, 'push', 'a');

    deepEqual(result, [1, 1], 'return values');
  });

  /*--------------------------------------------------------------------------*/

  module('Benchmark.join');

  test('basic', function() {
    var o = ['a', 'b', 'c'];
    equals(Benchmark.join(o), 'a,b,c', 'default separator 1');
    equals(Benchmark.join(o, '|', '@'), 'a|b|c', 'custom separator 1');

    o = { 'a': 'apple', 'b': 'ball', 'c': 'cat' };
    equals(Benchmark.join(o), 'a: apple,b: ball,c: cat', 'default separator 2');
    equals(Benchmark.join(o, '|', '@'), 'a@apple|b@ball|c@cat', 'custom separator 2');
  });

  test('array-like-object', function() {
    var o = { '1': 'b', '2': 'c', 'length': 3 };
    equals(Benchmark.join(o), 'b,c', 'default separator 1');
  });

  /*--------------------------------------------------------------------------*/

  module('Benchmark.map');

  test('basic', function() {
    var args,
        slice = [].slice,
        o = ['a', 'b', 'c'];

    var result = Benchmark.map(o, function(value, index) {
      args || (args = slice.call(arguments));
      return index;
    });

    deepEqual(result, [0, 1, 2], 'basic');
    deepEqual(args, ['a', 0, o], 'passed arguments to callback');
  });

  test('array-like-object', function() {
    var o = { '1': 'b', '2': 'c', 'length': 3 };
    var result = Benchmark.map(o, function(value, index) {
      return index;
    });

    deepEqual(result, [1, 2], 'basic');
  });

  /*--------------------------------------------------------------------------*/

  module('Benchmark.pluck');

  test('basic', function() {
    var undef,
        o = [document.documentElement, document.getElementsByTagName('head')[0]];

    var result = Benchmark.pluck(o, 'nodeName');
    deepEqual(result, ['HTML', 'HEAD'], 'basic');

    result = Benchmark.pluck(o, 'nonexistent');
    deepEqual(result, [undef, undef], 'undefined property');
  });

  test('array-like-object', function() {
    var o = { '1': document.getElementsByTagName('head')[0], '2': document.body, 'length': 3 };
    var result = Benchmark.pluck(o, 'nodeName');

    deepEqual(result, ['HEAD', 'BODY'], 'basic');
  });

  /*--------------------------------------------------------------------------*/

  module('Benchmark.reduce');

  test('basic', function() {
    var args,
        slice = [].slice,
        o = ['a', 'b', 'c'];

    var result = Benchmark.reduce(o, function(string, value, index) {
      args || (args = slice.call(arguments));
      return string + value;
    }, '');

    equals(result, 'abc', 'accumulation correct');
    deepEqual(args, ['', 'a', 0, o], 'passed arguments to callback');
    args = null;

    Benchmark.reduce(o, function() {
      args || (args = slice.call(arguments));
    });
    deepEqual(args, ['a', 'b', 1, o], 'no initial value');
  });

  test('array-like-object', function() {
    var o = { '1': 'b', '2': 'c', 'length': 3 };
    var result = Benchmark.reduce(o, function(string, value, index) {
      return string + value;
    });

    equals(result, 'bc', 'accumulation correct');
  });

  /*--------------------------------------------------------------------------*/

  module('Benchmark#emit');

  test('event object', function() {
    var args = [],
        bench = new Benchmark(function() { }),
        event = new Benchmark.Event('custom'),
        listener2 = function(event) { event.listener2 = 1 };

    bench.on('custom', function(event) { event.touched = 1; });
    bench.emit(event);
    bench.events = { };
    ok(event.touched, 'emit custom event object');

    bench.on('type', function(eventObj) { event = eventObj; });
    bench.emit('type');
    bench.events = { };
    equals(event.type, 'type', 'emit event.type');

    bench.on('args', function() { args = args.slice.call(arguments, 1); });
    bench.emit('args', 'a', 'b', 'c');
    bench.events = { };
    deepEqual(args, ['a', 'b', 'c'], 'emit curried arguments');

    ok(bench.emit('empty'), 'emit empty successful');

    bench.on('success', function() { return 'bogus'; });
    ok(bench.emit('success'), 'emit successful');

    bench.on('success', function() { return false; });
    ok(!bench.emit('success'), 'emit unsuccessful');
    bench.events = { };

    bench.on('shallowclone', function(eventObject) {
      event = eventObject;
      bench.removeListener(event.type, listener2);
    })
    .on('shallowclone', listener2)
    .emit('shallowclone');
    bench.events = { };
    ok(event.listener2, 'emit shallow cloned listeners');
  });

  /*--------------------------------------------------------------------------*/

  module('Async tests');

  asyncTest('Benchmark.filter', function() {
    var suite = new Benchmark.Suite,
        options = Benchmark.options,
        maxTime = options.maxTime;

    options.maxTime = .75;
    suite.add('a', function() {
      'x' == new String('x');
    })
    .add('b', function() {
      document.body.cloneNode(true);
    })
    .add('c', function() {
      throw new TypeError;
    })
    .on('complete', function() {
      deepEqual(this.filter('fastest').pluck('name'), ['a'], 'by fastest');
      deepEqual(this.filter('slowest').pluck('name'), ['b'], 'by slowest');
      deepEqual(['a', 'b'], this.filter('successful').pluck('name'), 'by successful');
      options.maxTime = maxTime;
      QUnit.start();
    })
    .run(true);
  });

}(this));