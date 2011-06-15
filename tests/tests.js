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
    var args,
        slice = [].slice,
        o = { '1': 'b', '2': 'c', 'length': 3 };

    var result = Benchmark.reduce(o, function(string, value, index) {
      args || (args = slice.call(arguments));
      return string + value;
    });

    equals(result, 'bc', 'accumulation correct');
  });

  /*--------------------------------------------------------------------------*/

  module('Benchmark#emit');

  test('event object', function() {
    var args = [],
        bench = new Benchmark(function() { }),
        event = { 'type': 'custom' },
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

}(this));