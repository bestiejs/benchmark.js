(function() {

  var Benchmark = require('../benchmark.js');

  (function() {
    global.arr = new Array(100);
    var bench = new Benchmark(function() { arr.join(' '); }),
        counter = 0;

    // check Benchmark.platform
    console.log('Benchmark.platform: expected at least "Node.js"; got "' + Benchmark.platform + '";');

    // check synchronous run
    bench.on('complete', function() {
      console.log('Test sync: expected sync; got ' + (counter ? 'a' : '') + 'sync ' + bench);
      bench.removeAllListeners('complete');

      // check asynchronous run
      bench.on('complete', function() {
        console.log('Test async: expected async; got ' + (counter ? 'a' : '') + 'sync ' + bench);
        console.log('Min time: expected at most 0.05; got ' + Benchmark.options.minTime + ';');
      });

      counter = 0;
      bench.run(true);
      counter++;
    });

    bench.run();
    counter++;
  }());

}());