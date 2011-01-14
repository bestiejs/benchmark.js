(function(global) {

  // load Benchmark
  load('../benchmark.js');

  // check Benchmark.platform
  print('Benchmark.platform: expected at least "Rhino"; got "' +
    Benchmark.platform + '";');

  (function() {
    global.arr = new Array(100);
    var bench = new Benchmark(function() { arr.join(' '); }),
        counter = 0;

    // check synchronous run
    bench.on('complete', function() {
      print('Test sync: expected sync; got ' +
        (counter ? 'a' : '') + 'sync ' + bench);

      bench.removeAllListeners('complete');

      // check asynchronous run
      bench.on('complete', function() {
        print('Test async: expected async; got ' +
          (counter ? 'a' : '') + 'sync ' + bench);

        // check Benchmark#MIN_TIME
        print('Benchmark#MIN_TIME: expected at most 0.05; got ' +
          Benchmark.prototype.MIN_TIME + ';');
      });

      counter = 0;
      bench.run(true);
      counter++;
    });

    bench.run();
    counter++;
  })();

}(this));