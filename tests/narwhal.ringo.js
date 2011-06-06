(function() {

  var Benchmark = require('../benchmark.js').Benchmark;

  (function() {
    global.arr = new Array(100);
    var bench = new Benchmark(function() { arr.join(' '); }),
        counter = 0;

    // check synchronous run
    bench.on('complete', function() {
      print('Test sync: expected sync; got ' + (counter ? 'a' : '') + 'sync ' + bench);
      bench.removeAllListeners('complete');

      // check asynchronous run
      bench.on('complete', function() {
        print('Test async: expected async; got ' + (counter ? 'a' : '') + 'sync ' + bench);
        print('Min time: expected at most 0.05; got ' + Benchmark.options.minTime + ';');
      });

      counter = 0;
      bench.run(true);
      counter++;
    });

    bench.run();
    counter++;
  }());

}());