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

}(this));