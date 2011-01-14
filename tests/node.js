(function() {

  // load Benchmark
  var Benchmark = require('../benchmark.js');

  // check Benchmark.platform
  console.log('Benchmark.platform: expected at least "Node.js"; got "' +
    Benchmark.platform + '";');

  (function() {
    global.arr = new Array(100);
    var bench = new Benchmark(function() { arr.join(' '); }),
        counter = 0;

    // check synchronous run
    bench.on('complete', function() {
      console.log('Test sync: expected sync; got ' +
        (counter ? 'a' : '') + 'sync ' + bench);

      bench.removeAllListeners('complete');

      // check asynchronous run
      bench.on('complete', function() {
        console.log('Test async: expected async; got ' +
          (counter ? 'a' : '') + 'sync ' + bench);

        // check Benchmark#MIN_TIME
        console.log('Benchmark#MIN_TIME: expected at most 0.05; got ' +
          Benchmark.prototype.MIN_TIME + ';');
      });

      counter = 0;
      bench.run(true);
      counter++;
    });

    bench.run();
    counter++;
  })();

}());