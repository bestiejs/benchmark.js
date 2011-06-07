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