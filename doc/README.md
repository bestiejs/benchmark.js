# <a href="http://benchmarkjs.com/">Benchmark.js</a> <sup>v1.0.0</sup>

<!-- div -->


<!-- div -->

## <a id="Benchmark"></a>`Benchmark`
* [`Benchmark`](#benchmarkname-fn-options)
* <a href="#benchmarkversion">`Benchmark.version`</a>
* <a href="#benchmarkfilterarray-callback-thisarg">`Benchmark.filter`</a>
* <a href="#benchmarkformatnumbernumber">`Benchmark.formatNumber`</a>
* <a href="#benchmarkinvokebenches-name-args">`Benchmark.invoke`</a>
* <a href="#benchmarkjoinobject-separator1-separator2:">`Benchmark.join`</a>
* <a href="#benchmarkrunincontextcontextroot">`Benchmark.runInContext`</a>

<!-- /div -->


<!-- div -->

## `Benchmark.prototype`
* <a href="#benchmarkprototypeaborted">`Benchmark.prototype.aborted`</a>
* <a href="#benchmarkprototypecompiled">`Benchmark.prototype.compiled`</a>
* <a href="#benchmarkprototypecount">`Benchmark.prototype.count`</a>
* <a href="#benchmarkprototypecycles">`Benchmark.prototype.cycles`</a>
* <a href="#benchmarkprototypeerror">`Benchmark.prototype.error`</a>
* <a href="#benchmarkprototypefn">`Benchmark.prototype.fn`</a>
* <a href="#benchmarkprototypehz">`Benchmark.prototype.hz`</a>
* <a href="#benchmarkprototyperunning">`Benchmark.prototype.running`</a>
* <a href="#benchmarkprototypesetup">`Benchmark.prototype.setup`</a>
* <a href="#benchmarkprototypeteardown">`Benchmark.prototype.teardown`</a>
* <a href="#benchmarkprototypeabort">`Benchmark.prototype.abort`</a>
* <a href="#benchmarkprototypecloneoptions">`Benchmark.prototype.clone`</a>
* <a href="#benchmarkprototypecompareother">`Benchmark.prototype.compare`</a>
* <a href="#benchmarkprototypeemittype-args">`Benchmark.prototype.emit`</a>
* <a href="#benchmarkprototypelistenerstype">`Benchmark.prototype.listeners`</a>
* <a href="#benchmarkprototypeofftype-listener">`Benchmark.prototype.off`</a>
* <a href="#benchmarkprototypeontype-listener">`Benchmark.prototype.on`</a>
* <a href="#benchmarkprototypereset">`Benchmark.prototype.reset`</a>
* <a href="#benchmarkprototyperunoptions">`Benchmark.prototype.run`</a>
* <a href="#benchmarkprototypetostring">`Benchmark.prototype.toString`</a>

<!-- /div -->


<!-- div -->

## `Benchmark.options`
* [`Benchmark.options`](#benchmarkoptions)
* <a href="#benchmarkoptionsasync">`Benchmark.options.async`</a>
* <a href="#benchmarkoptionsdefer">`Benchmark.options.defer`</a>
* <a href="#benchmarkoptionsdelay">`Benchmark.options.delay`</a>
* <a href="#benchmarkoptionsid">`Benchmark.options.id`</a>
* <a href="#benchmarkoptionsinitcount">`Benchmark.options.initCount`</a>
* <a href="#benchmarkoptionsmaxtime">`Benchmark.options.maxTime`</a>
* <a href="#benchmarkoptionsminsamples">`Benchmark.options.minSamples`</a>
* <a href="#benchmarkoptionsmintime">`Benchmark.options.minTime`</a>
* <a href="#benchmarkoptionsname">`Benchmark.options.name`</a>
* <a href="#benchmarkoptionsonabort">`Benchmark.options.onAbort`</a>
* <a href="#benchmarkoptionsoncomplete">`Benchmark.options.onComplete`</a>
* <a href="#benchmarkoptionsoncycle">`Benchmark.options.onCycle`</a>
* <a href="#benchmarkoptionsonerror">`Benchmark.options.onError`</a>
* <a href="#benchmarkoptionsonreset">`Benchmark.options.onReset`</a>
* <a href="#benchmarkoptionsonstart">`Benchmark.options.onStart`</a>

<!-- /div -->


<!-- div -->

## `Benchmark.platform`
* [`Benchmark.platform`](#benchmarkplatform)

<!-- /div -->


<!-- div -->

## `Benchmark.support`
* [`Benchmark.support`](#benchmarksupport)
* <a href="#benchmarksupportbrowser">`Benchmark.support.browser`</a>
* <a href="#benchmarksupportdecompilation">`Benchmark.support.decompilation`</a>
* <a href="#benchmarksupportjava">`Benchmark.support.java`</a>
* <a href="#benchmarksupporttimeout">`Benchmark.support.timeout`</a>
* <a href="#benchmarksupportunshiftresult">`Benchmark.support.unshiftResult`</a>

<!-- /div -->


<!-- div -->

## `Benchmark.prototype.stats`
* [`Benchmark.prototype.stats`](#benchmarkprototypestats)
* <a href="#benchmark-statsdeviation">`Benchmark.prototype.stats.deviation`</a>
* <a href="#benchmark-statsmean">`Benchmark.prototype.stats.mean`</a>
* <a href="#benchmark-statsmoe">`Benchmark.prototype.stats.moe`</a>
* <a href="#benchmark-statsrme">`Benchmark.prototype.stats.rme`</a>
* <a href="#benchmark-statssample">`Benchmark.prototype.stats.sample`</a>
* <a href="#benchmark-statssem">`Benchmark.prototype.stats.sem`</a>
* <a href="#benchmark-statsvariance">`Benchmark.prototype.stats.variance`</a>

<!-- /div -->


<!-- div -->

## `Benchmark.prototype.times`
* [`Benchmark.prototype.times`](#benchmarkprototypetimes)
* <a href="#benchmark-timescycle">`Benchmark.prototype.times.cycle`</a>
* <a href="#benchmark-timeselapsed">`Benchmark.prototype.times.elapsed`</a>
* <a href="#benchmark-timesperiod">`Benchmark.prototype.times.period`</a>
* <a href="#benchmark-timestimestamp">`Benchmark.prototype.times.timeStamp`</a>

<!-- /div -->


<!-- div -->

## `Benchmark.Deferred`
* [`Benchmark.Deferred`](#benchmarkdeferredclone)

<!-- /div -->


<!-- div -->

## `Benchmark.Deferred.prototype`
* <a href="#benchmarkdeferredprototypebenchmark">`Benchmark.Deferred.prototype.benchmark`</a>
* <a href="#benchmarkdeferredprototypecycles">`Benchmark.Deferred.prototype.cycles`</a>
* <a href="#benchmarkdeferredprototypeelapsed">`Benchmark.Deferred.prototype.elapsed`</a>
* <a href="#benchmarkdeferredprototypetimestamp">`Benchmark.Deferred.prototype.timeStamp`</a>

<!-- /div -->


<!-- div -->

## `Benchmark.Event`
* [`Benchmark.Event`](#benchmarkeventtype)

<!-- /div -->


<!-- div -->

## `Benchmark.Event.prototype`
* <a href="#benchmarkeventprototypeaborted">`Benchmark.Event.prototype.aborted`</a>
* <a href="#benchmarkeventprototypecancelled">`Benchmark.Event.prototype.cancelled`</a>
* <a href="#benchmarkeventprototypecurrenttarget">`Benchmark.Event.prototype.currentTarget`</a>
* <a href="#benchmarkeventprototyperesult">`Benchmark.Event.prototype.result`</a>
* <a href="#benchmarkeventprototypetarget">`Benchmark.Event.prototype.target`</a>
* <a href="#benchmarkeventprototypetimestamp">`Benchmark.Event.prototype.timeStamp`</a>
* <a href="#benchmarkeventprototypetype">`Benchmark.Event.prototype.type`</a>

<!-- /div -->


<!-- div -->

## `Benchmark.Suite`
* [`Benchmark.Suite`](#benchmarksuitename-options)

<!-- /div -->


<!-- div -->

## `Benchmark.Suite.prototype`
* <a href="#benchmarksuiteprototypeaborted">`Benchmark.Suite.prototype.aborted`</a>
* <a href="#benchmarksuiteprototypelength">`Benchmark.Suite.prototype.length`</a>
* <a href="#benchmarksuiteprototyperunning">`Benchmark.Suite.prototype.running`</a>
* <a href="#benchmarksuiteprototypeabort">`Benchmark.Suite.prototype.abort`</a>
* <a href="#benchmarksuiteprototypeaddname-fn-options">`Benchmark.Suite.prototype.add`</a>
* <a href="#benchmarksuiteprototypecloneoptions">`Benchmark.Suite.prototype.clone`</a>
* <a href="#benchmarkprototypeemittype-args">`Benchmark.Suite.prototype.emit`</a>
* <a href="#benchmarksuiteprototypefiltercallback">`Benchmark.Suite.prototype.filter`</a>
* <a href="#benchmarkprototypelistenerstype">`Benchmark.Suite.prototype.listeners`</a>
* <a href="#benchmarkprototypeofftype-listener">`Benchmark.Suite.prototype.off`</a>
* <a href="#benchmarkprototypeontype-listener">`Benchmark.Suite.prototype.on`</a>
* <a href="#benchmarksuiteprototypereset">`Benchmark.Suite.prototype.reset`</a>
* <a href="#benchmarksuiteprototyperunoptions">`Benchmark.Suite.prototype.run`</a>

<!-- /div -->


<!-- div -->

## `Benchmark.Suite.options`
* [`Benchmark.Suite.options`](#benchmarksuiteoptions)
* <a href="#benchmarksuiteoptionsname">`Benchmark.Suite.options.name`</a>

<!-- /div -->


<!-- /div -->


<!-- div -->


<!-- div -->

## `Benchmark`

<!-- div -->

### <a id="benchmarkname-fn-options"></a>`Benchmark(name, fn, [options={}])`
<a href="#benchmarkname-fn-options">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L379 "View in source") [&#x24C9;][1]

The Benchmark constructor.

Note: The Benchmark constructor exposes a handful of Lo-Dash methods to make working with arrays, collections, and objects easier. The Lo-Dash methods are:<br>
&#91;`each/forEach`&#93;(http://lodash.com/docs#forEach), &#91;`forOwn`&#93;(http://lodash.com/docs#forOwn), &#91;`has`&#93;(http://lodash.com/docs#has), &#91;`indexOf`&#93;(http://lodash.com/docs#indexOf), &#91;`map`&#93;(http://lodash.com/docs#map), &#91;`pluck`&#93;(http://lodash.com/docs#pluck), and &#91;`reduce`&#93;(http://lodash.com/docs#reduce)

#### Arguments
1. `name` *(string)*: A name to identify the benchmark.
2. `fn` *(Function|string)*: The test to benchmark.
3. `[options={}]` *(Object)*: Options object.

#### Example
```js
// basic usage (the `new` operator is optional)
var bench = new Benchmark(fn);

// or using a name first
var bench = new Benchmark('foo', fn);

// or with options
var bench = new Benchmark('foo', fn, {

  // displayed by Benchmark#toString if `name` is not available
  'id': 'xyz',

  // called when the benchmark starts running
  'onStart': onStart,

  // called after each run cycle
  'onCycle': onCycle,

  // called when aborted
  'onAbort': onAbort,

  // called when a test errors
  'onError': onError,

  // called when reset
  'onReset': onReset,

  // called when the benchmark completes running
  'onComplete': onComplete,

  // compiled/called before the test loop
  'setup': setup,

  // compiled/called after the test loop
  'teardown': teardown
});

// or name and options
var bench = new Benchmark('foo', {

  // a flag to indicate the benchmark is deferred
  'defer': true,

  // benchmark test function
  'fn': function(deferred) {
    // call resolve() when the deferred test is finished
    deferred.resolve();
  }
});

// or options only
var bench = new Benchmark({

  // benchmark name
  'name': 'foo',

  // benchmark test as a string
  'fn': '[1,2,3,4].sort()'
});

// a test's `this` binding is set to the benchmark instance
var bench = new Benchmark('foo', function() {
  'My name is '.concat(this.name); // My name is foo
});
```

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkversion"></a>`Benchmark.version`
<a href="#benchmarkversion">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2370 "View in source") [&#x24C9;][1]

*(string)*: The semantic version number.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkfilterarray-callback-thisarg"></a>`Benchmark.filter(array, callback, thisArg)`
<a href="#benchmarkfilterarray-callback-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L797 "View in source") [&#x24C9;][1]

A generic `Array#filter` like method.

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function|string)*: The function/alias called per iteration.
3. `thisArg` *(&#42;)*: The `this` binding for the callback.

#### Returns
*(Array)*: A new array of values that passed callback filter.

#### Example
```js
// get odd numbers
Benchmark.filter([1, 2, 3, 4, 5], function(n) {
  return n % 2;
}); // -> [1, 3, 5];

// get fastest benchmarks
Benchmark.filter(benches, 'fastest');

// get slowest benchmarks
Benchmark.filter(benches, 'slowest');

// get benchmarks that completed without erroring
Benchmark.filter(benches, 'successful');
```

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkformatnumbernumber"></a>`Benchmark.formatNumber(number)`
<a href="#benchmarkformatnumbernumber">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L826 "View in source") [&#x24C9;][1]

Converts a number to a more readable comma-separated string representation.

#### Arguments
1. `number` *(number)*: The number to convert.

#### Returns
*(string)*: The more readable string representation.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkinvokebenches-name-args"></a>`Benchmark.invoke(benches, name, [args])`
<a href="#benchmarkinvokebenches-name-args">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L871 "View in source") [&#x24C9;][1]

Invokes a method on all items in an array.

#### Arguments
1. `benches` *(Array)*: Array of benchmarks to iterate over.
2. `name` *(Object|string)*: The name of the method to invoke OR options object.
3. `[args]` *(...&#42;)*: Arguments to invoke the method with.

#### Returns
*(Array)*: A new array of values returned from each method invoked.

#### Example
```js
// invoke `reset` on all benchmarks
Benchmark.invoke(benches, 'reset');

// invoke `emit` with arguments
Benchmark.invoke(benches, 'emit', 'complete', listener);

// invoke `run(true)`, treat benchmarks as a queue, and register invoke callbacks
Benchmark.invoke(benches, {

  // invoke the `run` method
  'name': 'run',

  // pass a single argument
  'args': true,

  // treat as queue, removing benchmarks from front of `benches` until empty
  'queued': true,

  // called before any benchmarks have been invoked.
  'onStart': onStart,

  // called between invoking benchmarks
  'onCycle': onCycle,

  // called after all benchmarks have been invoked.
  'onComplete': onComplete
});
```

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkjoinobject-separator1-separator2:"></a>`Benchmark.join(object, [separator1=','], [separator2=': '])`
<a href="#benchmarkjoinobject-separator1-separator2:">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1023 "View in source") [&#x24C9;][1]

Creates a string of joined array values or object key-value pairs.

#### Arguments
1. `object` *(Array|Object)*: The object to operate on.
2. `[separator1=',']` *(string)*: The separator used between key-value pairs.
3. `[separator2=': ']` *(string)*: The separator used between keys and values.

#### Returns
*(string)*: The joined result.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkrunincontextcontextroot"></a>`Benchmark.runInContext([context=root])`
<a href="#benchmarkrunincontextcontextroot">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L125 "View in source") [&#x24C9;][1]

Create a new `Benchmark` function using the given `context` object.

#### Arguments
1. `[context=root]` *(Object)*: The context object.

#### Returns
*(Function)*: Returns a new `Benchmark` function.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.prototype`

<!-- div -->

### <a id="benchmarkprototypeaborted"></a>`Benchmark.prototype.aborted`
<a href="#benchmarkprototypeaborted">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2445 "View in source") [&#x24C9;][1]

*(boolean)*: A flag to indicate if the benchmark is aborted.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypecompiled"></a>`Benchmark.prototype.compiled`
<a href="#benchmarkprototypecompiled">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2421 "View in source") [&#x24C9;][1]

*(Function, string)*: The compiled test function.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypecount"></a>`Benchmark.prototype.count`
<a href="#benchmarkprototypecount">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2397 "View in source") [&#x24C9;][1]

*(number)*: The number of times a test was executed.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypecycles"></a>`Benchmark.prototype.cycles`
<a href="#benchmarkprototypecycles">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2405 "View in source") [&#x24C9;][1]

*(number)*: The number of cycles performed while benchmarking.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypeerror"></a>`Benchmark.prototype.error`
<a href="#benchmarkprototypeerror">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2429 "View in source") [&#x24C9;][1]

*(Object)*: The error object if the test failed.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypefn"></a>`Benchmark.prototype.fn`
<a href="#benchmarkprototypefn">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2437 "View in source") [&#x24C9;][1]

*(Function, string)*: The test to benchmark.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypehz"></a>`Benchmark.prototype.hz`
<a href="#benchmarkprototypehz">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2413 "View in source") [&#x24C9;][1]

*(number)*: The number of executions per second.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototyperunning"></a>`Benchmark.prototype.running`
<a href="#benchmarkprototyperunning">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2453 "View in source") [&#x24C9;][1]

*(boolean)*: A flag to indicate if the benchmark is running.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypesetup"></a>`Benchmark.prototype.setup`
<a href="#benchmarkprototypesetup">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2516 "View in source") [&#x24C9;][1]

*(Function, string)*: Compiled into the test and executed immediately &#42;&#42;before&#42;&#42; the test loop.

#### Example
```js
// basic usage
var bench = Benchmark({
  'setup': function() {
    var c = this.count,
        element = document.getElementById('container');
    while (c--) {
      element.appendChild(document.createElement('div'));
    }
  },
  'fn': function() {
    element.removeChild(element.lastChild);
  }
});

// compiles to something like:
var c = this.count,
    element = document.getElementById('container');
while (c--) {
  element.appendChild(document.createElement('div'));
}
var start = new Date;
while (count--) {
  element.removeChild(element.lastChild);
}
var end = new Date - start;

// or using strings
var bench = Benchmark({
  'setup': '\
    var a = 0;\n\
    (function() {\n\
      (function() {\n\
        (function() {',
  'fn': 'a += 1;',
  'teardown': '\
         }())\n\
       }())\n\
     }())'
});

// compiles to something like:
var a = 0;
(function() {
  (function() {
    (function() {
      var start = new Date;
      while (count--) {
        a += 1;
      }
      var end = new Date - start;
    }())
  }())
}())
```

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypeteardown"></a>`Benchmark.prototype.teardown`
<a href="#benchmarkprototypeteardown">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2524 "View in source") [&#x24C9;][1]

*(Function, string)*: Compiled into the test and executed immediately &#42;&#42;after&#42;&#42; the test loop.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypeabort"></a>`Benchmark.prototype.abort()`
<a href="#benchmarkprototypeabort">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1364 "View in source") [&#x24C9;][1]

Aborts the benchmark without recording times.

#### Returns
*(Object)*: The benchmark instance.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypecloneoptions"></a>`Benchmark.prototype.clone(options)`
<a href="#benchmarkprototypecloneoptions">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1403 "View in source") [&#x24C9;][1]

Creates a new benchmark using the same test and options.

#### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Object)*: The new benchmark instance.

#### Example
```js
var bizarro = bench.clone({
  'name': 'doppelganger'
});
```

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypecompareother"></a>`Benchmark.prototype.compare(other)`
<a href="#benchmarkprototypecompareother">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1427 "View in source") [&#x24C9;][1]

Determines if a benchmark is faster than another.

#### Arguments
1. `other` *(Object)*: The benchmark to compare.

#### Returns
*(number)*: Returns `-1` if slower, `1` if faster, and `0` if indeterminate.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypeemittype-args"></a>`Benchmark.Suite.prototype.emit(type, [args])`
<a href="#benchmarkprototypeemittype-args">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1238 "View in source") [&#x24C9;][1]

Executes all registered listeners of the specified event type.

#### Arguments
1. `type` *(Object|string)*: The event type or object.
2. `[args]` *(...&#42;)*: Arguments to invoke the listener with.

#### Returns
*(&#42;)*: Returns the return value of the last listener executed.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypelistenerstype"></a>`Benchmark.Suite.prototype.listeners(type)`
<a href="#benchmarkprototypelistenerstype">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1268 "View in source") [&#x24C9;][1]

Returns an array of event listeners for a given type that can be manipulated to add or remove listeners.

#### Arguments
1. `type` *(string)*: The event type.

#### Returns
*(Array)*: The listeners array.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypeofftype-listener"></a>`Benchmark.Suite.prototype.off([type], [listener])`
<a href="#benchmarkprototypeofftype-listener">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1301 "View in source") [&#x24C9;][1]

Unregisters a listener for the specified event type(s), or unregisters all listeners for the specified event type(s), or unregisters all listeners for all event types.

#### Arguments
1. `[type]` *(string)*: The event type.
2. `[listener]` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The benchmark instance.

#### Example
```js
// unregister a listener for an event type
bench.off('cycle', listener);

// unregister a listener for multiple event types
bench.off('start cycle', listener);

// unregister all listeners for an event type
bench.off('cycle');

// unregister all listeners for multiple event types
bench.off('start cycle complete');

// unregister all listeners for all event types
bench.off();
```

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypeontype-listener"></a>`Benchmark.Suite.prototype.on(type, listener)`
<a href="#benchmarkprototypeontype-listener">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1343 "View in source") [&#x24C9;][1]

Registers a listener for the specified event type(s).

#### Arguments
1. `type` *(string)*: The event type.
2. `listener` *(Function)*: The function to register.

#### Returns
*(Object)*: The benchmark instance.

#### Example
```js
// register a listener for an event type
bench.on('cycle', listener);

// register a listener for multiple event types
bench.on('start cycle', listener);
```

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypereset"></a>`Benchmark.prototype.reset()`
<a href="#benchmarkprototypereset">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1480 "View in source") [&#x24C9;][1]

Reset properties and abort if running.

#### Returns
*(Object)*: The benchmark instance.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototyperunoptions"></a>`Benchmark.prototype.run([options={}])`
<a href="#benchmarkprototyperunoptions">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2166 "View in source") [&#x24C9;][1]

Runs the benchmark.

#### Arguments
1. `[options={}]` *(Object)*: Options object.

#### Returns
*(Object)*: The benchmark instance.

#### Example
```js
// basic usage
bench.run();

// or with options
bench.run({ 'async': true });
```

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypetostring"></a>`Benchmark.prototype.toString()`
<a href="#benchmarkprototypetostring">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1558 "View in source") [&#x24C9;][1]

Displays relevant benchmark information when coerced to a string.

#### Returns
*(string)*: A string representation of the benchmark instance.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.options`

<!-- div -->

### <a id="benchmarkoptions"></a>`Benchmark.options`
<a href="#benchmarkoptions">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2215 "View in source") [&#x24C9;][1]

*(Object)*: The default options copied by benchmark instances.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsasync"></a>`Benchmark.options.async`
<a href="#benchmarkoptionsasync">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2224 "View in source") [&#x24C9;][1]

*(boolean)*: A flag to indicate that benchmark cycles will execute asynchronously by default.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsdefer"></a>`Benchmark.options.defer`
<a href="#benchmarkoptionsdefer">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2232 "View in source") [&#x24C9;][1]

*(boolean)*: A flag to indicate that the benchmark clock is deferred.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsdelay"></a>`Benchmark.options.delay`
<a href="#benchmarkoptionsdelay">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2239 "View in source") [&#x24C9;][1]

*(number)*: The delay between test cycles *(secs)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsid"></a>`Benchmark.options.id`
<a href="#benchmarkoptionsid">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2248 "View in source") [&#x24C9;][1]

*(string)*: Displayed by Benchmark#toString when a `name` is not available *(auto-generated if absent)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsinitcount"></a>`Benchmark.options.initCount`
<a href="#benchmarkoptionsinitcount">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2256 "View in source") [&#x24C9;][1]

*(number)*: The default number of times to execute a test on a benchmark's first cycle.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsmaxtime"></a>`Benchmark.options.maxTime`
<a href="#benchmarkoptionsmaxtime">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2266 "View in source") [&#x24C9;][1]

*(number)*: The maximum time a benchmark is allowed to run before finishing *(secs)*.

Note: Cycle delays aren't counted toward the maximum time.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsminsamples"></a>`Benchmark.options.minSamples`
<a href="#benchmarkoptionsminsamples">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2274 "View in source") [&#x24C9;][1]

*(number)*: The minimum sample size required to perform statistical analysis.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsmintime"></a>`Benchmark.options.minTime`
<a href="#benchmarkoptionsmintime">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2282 "View in source") [&#x24C9;][1]

*(number)*: The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsname"></a>`Benchmark.options.name`
<a href="#benchmarkoptionsname">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2290 "View in source") [&#x24C9;][1]

*(string)*: The name of the benchmark.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsonabort"></a>`Benchmark.options.onAbort`
<a href="#benchmarkoptionsonabort">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2298 "View in source") [&#x24C9;][1]

An event listener called when the benchmark is aborted.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsoncomplete"></a>`Benchmark.options.onComplete`
<a href="#benchmarkoptionsoncomplete">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2306 "View in source") [&#x24C9;][1]

An event listener called when the benchmark completes running.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsoncycle"></a>`Benchmark.options.onCycle`
<a href="#benchmarkoptionsoncycle">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2314 "View in source") [&#x24C9;][1]

An event listener called after each run cycle.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsonerror"></a>`Benchmark.options.onError`
<a href="#benchmarkoptionsonerror">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2322 "View in source") [&#x24C9;][1]

An event listener called when a test errors.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsonreset"></a>`Benchmark.options.onReset`
<a href="#benchmarkoptionsonreset">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2330 "View in source") [&#x24C9;][1]

An event listener called when the benchmark is reset.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkoptionsonstart"></a>`Benchmark.options.onStart`
<a href="#benchmarkoptionsonstart">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2338 "View in source") [&#x24C9;][1]

An event listener called when the benchmark starts running.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.platform`

<!-- div -->

### <a id="benchmarkplatform"></a>`Benchmark.platform`
<a href="#benchmarkplatform">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2349 "View in source") [&#x24C9;][1]

*(Object)*: Platform object with properties describing things like browser name, version, and operating system.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.support`

<!-- div -->

### <a id="benchmarksupport"></a>`Benchmark.support`
<a href="#benchmarksupport">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L201 "View in source") [&#x24C9;][1]

*(Object)*: An object used to flag environments/features.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksupportbrowser"></a>`Benchmark.support.browser`
<a href="#benchmarksupportbrowser">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L211 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if running in a browser environment.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksupportdecompilation"></a>`Benchmark.support.decompilation`
<a href="#benchmarksupportdecompilation">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L244 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if function decompilation is support.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksupportjava"></a>`Benchmark.support.java`
<a href="#benchmarksupportjava">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L219 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if Java is enabled/exposed.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksupporttimeout"></a>`Benchmark.support.timeout`
<a href="#benchmarksupporttimeout">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L227 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if the Timers API exists.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksupportunshiftresult"></a>`Benchmark.support.unshiftResult`
<a href="#benchmarksupportunshiftresult">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L235 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if `Array#unshift` returns the new length of the array *(all but IE < `8`)*.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.prototype.stats`

<!-- div -->

### <a id="benchmarkprototypestats"></a>`Benchmark.prototype.stats`
<a href="#benchmarkprototypestats">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2532 "View in source") [&#x24C9;][1]

*(Object)*: An object of stats including mean, margin or error, and standard deviation.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmark-statsdeviation"></a>`Benchmark.prototype.stats.deviation`
<a href="#benchmark-statsdeviation">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2564 "View in source") [&#x24C9;][1]

*(number)*: The sample standard deviation.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmark-statsmean"></a>`Benchmark.prototype.stats.mean`
<a href="#benchmark-statsmean">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2572 "View in source") [&#x24C9;][1]

*(number)*: The sample arithmetic mean *(secs)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmark-statsmoe"></a>`Benchmark.prototype.stats.moe`
<a href="#benchmark-statsmoe">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2540 "View in source") [&#x24C9;][1]

*(number)*: The margin of error.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmark-statsrme"></a>`Benchmark.prototype.stats.rme`
<a href="#benchmark-statsrme">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2548 "View in source") [&#x24C9;][1]

*(number)*: The relative margin of error *(expressed as a percentage of the mean)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmark-statssample"></a>`Benchmark.prototype.stats.sample`
<a href="#benchmark-statssample">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2580 "View in source") [&#x24C9;][1]

*(Array)*: The array of sampled periods.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmark-statssem"></a>`Benchmark.prototype.stats.sem`
<a href="#benchmark-statssem">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2556 "View in source") [&#x24C9;][1]

*(number)*: The standard error of the mean.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmark-statsvariance"></a>`Benchmark.prototype.stats.variance`
<a href="#benchmark-statsvariance">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2588 "View in source") [&#x24C9;][1]

*(number)*: The sample variance.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.prototype.times`

<!-- div -->

### <a id="benchmarkprototypetimes"></a>`Benchmark.prototype.times`
<a href="#benchmarkprototypetimes">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2597 "View in source") [&#x24C9;][1]

*(Object)*: An object of timing data including cycle, elapsed, period, start, and stop.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmark-timescycle"></a>`Benchmark.prototype.times.cycle`
<a href="#benchmark-timescycle">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2605 "View in source") [&#x24C9;][1]

*(number)*: The time taken to complete the last cycle *(secs)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmark-timeselapsed"></a>`Benchmark.prototype.times.elapsed`
<a href="#benchmark-timeselapsed">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2613 "View in source") [&#x24C9;][1]

*(number)*: The time taken to complete the benchmark *(secs)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmark-timesperiod"></a>`Benchmark.prototype.times.period`
<a href="#benchmark-timesperiod">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2621 "View in source") [&#x24C9;][1]

*(number)*: The time taken to execute the test once *(secs)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmark-timestimestamp"></a>`Benchmark.prototype.times.timeStamp`
<a href="#benchmark-timestimestamp">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2629 "View in source") [&#x24C9;][1]

*(number)*: A timestamp of when the benchmark started *(ms)*.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Deferred`

<!-- div -->

### <a id="benchmarkdeferredclone"></a>`Benchmark.Deferred(clone)`
<a href="#benchmarkdeferredclone">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L422 "View in source") [&#x24C9;][1]

The Deferred constructor.

#### Arguments
1. `clone` *(Object)*: The cloned benchmark instance.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Deferred.prototype`

<!-- div -->

### <a id="benchmarkdeferredprototypebenchmark"></a>`Benchmark.Deferred.prototype.benchmark`
<a href="#benchmarkdeferredprototypebenchmark">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2656 "View in source") [&#x24C9;][1]

*(Object)*: The deferred benchmark instance.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkdeferredprototypecycles"></a>`Benchmark.Deferred.prototype.cycles`
<a href="#benchmarkdeferredprototypecycles">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2664 "View in source") [&#x24C9;][1]

*(number)*: The number of deferred cycles performed while benchmarking.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkdeferredprototypeelapsed"></a>`Benchmark.Deferred.prototype.elapsed`
<a href="#benchmarkdeferredprototypeelapsed">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2672 "View in source") [&#x24C9;][1]

*(number)*: The time taken to complete the deferred benchmark *(secs)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkdeferredprototypetimestamp"></a>`Benchmark.Deferred.prototype.timeStamp`
<a href="#benchmarkdeferredprototypetimestamp">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2680 "View in source") [&#x24C9;][1]

*(number)*: A timestamp of when the deferred benchmark started *(ms)*.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Event`

<!-- div -->

### <a id="benchmarkeventtype"></a>`Benchmark.Event(type)`
<a href="#benchmarkeventtype">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L438 "View in source") [&#x24C9;][1]

The Event constructor.

#### Arguments
1. `type` *(Object|string)*: The event type.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Event.prototype`

<!-- div -->

### <a id="benchmarkeventprototypeaborted"></a>`Benchmark.Event.prototype.aborted`
<a href="#benchmarkeventprototypeaborted">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2697 "View in source") [&#x24C9;][1]

*(boolean)*: A flag to indicate if the emitters listener iteration is aborted.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkeventprototypecancelled"></a>`Benchmark.Event.prototype.cancelled`
<a href="#benchmarkeventprototypecancelled">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2705 "View in source") [&#x24C9;][1]

*(boolean)*: A flag to indicate if the default action is cancelled.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkeventprototypecurrenttarget"></a>`Benchmark.Event.prototype.currentTarget`
<a href="#benchmarkeventprototypecurrenttarget">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2713 "View in source") [&#x24C9;][1]

*(Object)*: The object whose listeners are currently being processed.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkeventprototyperesult"></a>`Benchmark.Event.prototype.result`
<a href="#benchmarkeventprototyperesult">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2721 "View in source") [&#x24C9;][1]

*(Mixed)*: The return value of the last executed listener.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkeventprototypetarget"></a>`Benchmark.Event.prototype.target`
<a href="#benchmarkeventprototypetarget">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2729 "View in source") [&#x24C9;][1]

*(Object)*: The object to which the event was originally emitted.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkeventprototypetimestamp"></a>`Benchmark.Event.prototype.timeStamp`
<a href="#benchmarkeventprototypetimestamp">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2737 "View in source") [&#x24C9;][1]

*(number)*: A timestamp of when the event was created *(ms)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkeventprototypetype"></a>`Benchmark.Event.prototype.type`
<a href="#benchmarkeventprototypetype">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2745 "View in source") [&#x24C9;][1]

*(string)*: The event type.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Suite`

<!-- div -->

### <a id="benchmarksuitename-options"></a>`Benchmark.Suite(name, [options={}])`
<a href="#benchmarksuitename-options">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L491 "View in source") [&#x24C9;][1]

The Suite constructor.

Note: Each Suite instance has a handful of wrapped Lo-Dash methods to make working with Suites easier. The wrapped Lo-Dash methods are:<br>
&#91;`each/forEach`&#93;(http://lodash.com/docs#forEach), &#91;`indexOf`&#93;(http://lodash.com/docs#indexOf), &#91;`map`&#93;(http://lodash.com/docs#map), &#91;`pluck`&#93;(http://lodash.com/docs#pluck), and &#91;`reduce`&#93;(http://lodash.com/docs#reduce)

#### Arguments
1. `name` *(string)*: A name to identify the suite.
2. `[options={}]` *(Object)*: Options object.

#### Example
```js
// basic usage (the `new` operator is optional)
var suite = new Benchmark.Suite;

// or using a name first
var suite = new Benchmark.Suite('foo');

// or with options
var suite = new Benchmark.Suite('foo', {

  // called when the suite starts running
  'onStart': onStart,

  // called between running benchmarks
  'onCycle': onCycle,

  // called when aborted
  'onAbort': onAbort,

  // called when a test errors
  'onError': onError,

  // called when reset
  'onReset': onReset,

  // called when the suite completes running
  'onComplete': onComplete
});
```

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Suite.prototype`

<!-- div -->

### <a id="benchmarksuiteprototypeaborted"></a>`Benchmark.Suite.prototype.aborted`
<a href="#benchmarksuiteprototypeaborted">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2786 "View in source") [&#x24C9;][1]

*(boolean)*: A flag to indicate if the suite is aborted.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksuiteprototypelength"></a>`Benchmark.Suite.prototype.length`
<a href="#benchmarksuiteprototypelength">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2778 "View in source") [&#x24C9;][1]

*(number)*: The number of benchmarks in the suite.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksuiteprototyperunning"></a>`Benchmark.Suite.prototype.running`
<a href="#benchmarksuiteprototyperunning">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2794 "View in source") [&#x24C9;][1]

*(boolean)*: A flag to indicate if the suite is running.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksuiteprototypeabort"></a>`Benchmark.Suite.prototype.abort()`
<a href="#benchmarksuiteprototypeabort">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1044 "View in source") [&#x24C9;][1]

Aborts all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksuiteprototypeaddname-fn-options"></a>`Benchmark.Suite.prototype.add(name, fn, [options={}])`
<a href="#benchmarksuiteprototypeaddname-fn-options">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1104 "View in source") [&#x24C9;][1]

Adds a test to the benchmark suite.

#### Arguments
1. `name` *(string)*: A name to identify the benchmark.
2. `fn` *(Function|string)*: The test to benchmark.
3. `[options={}]` *(Object)*: Options object.

#### Returns
*(Object)*: The benchmark instance.

#### Example
```js
// basic usage
suite.add(fn);

// or using a name first
suite.add('foo', fn);

// or with options
suite.add('foo', fn, {
  'onCycle': onCycle,
  'onComplete': onComplete
});

// or name and options
suite.add('foo', {
  'fn': fn,
  'onCycle': onCycle,
  'onComplete': onComplete
});

// or options only
suite.add({
  'name': 'foo',
  'fn': fn,
  'onCycle': onCycle,
  'onComplete': onComplete
});
```

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksuiteprototypecloneoptions"></a>`Benchmark.Suite.prototype.clone(options)`
<a href="#benchmarksuiteprototypecloneoptions">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1123 "View in source") [&#x24C9;][1]

Creates a new suite with cloned benchmarks.

#### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Object)*: The new suite instance.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypeemittype-args"></a>`Benchmark.Suite.prototype.emit(type, [args])`
<a href="#benchmarkprototypeemittype-args">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1238 "View in source") [&#x24C9;][1]

Executes all registered listeners of the specified event type.

#### Arguments
1. `type` *(Object|string)*: The event type or object.
2. `[args]` *(...&#42;)*: Arguments to invoke the listener with.

#### Returns
*(&#42;)*: Returns the return value of the last listener executed.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksuiteprototypefiltercallback"></a>`Benchmark.Suite.prototype.filter(callback)`
<a href="#benchmarksuiteprototypefiltercallback">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1146 "View in source") [&#x24C9;][1]

An `Array#filter` like method.

#### Arguments
1. `callback` *(Function|string)*: The function/alias called per iteration.

#### Returns
*(Object)*: A new suite of benchmarks that passed callback filter.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypelistenerstype"></a>`Benchmark.Suite.prototype.listeners(type)`
<a href="#benchmarkprototypelistenerstype">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1268 "View in source") [&#x24C9;][1]

Returns an array of event listeners for a given type that can be manipulated to add or remove listeners.

#### Arguments
1. `type` *(string)*: The event type.

#### Returns
*(Array)*: The listeners array.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypeofftype-listener"></a>`Benchmark.Suite.prototype.off([type], [listener])`
<a href="#benchmarkprototypeofftype-listener">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1301 "View in source") [&#x24C9;][1]

Unregisters a listener for the specified event type(s), or unregisters all listeners for the specified event type(s), or unregisters all listeners for all event types.

#### Arguments
1. `[type]` *(string)*: The event type.
2. `[listener]` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The benchmark instance.

#### Example
```js
// unregister a listener for an event type
bench.off('cycle', listener);

// unregister a listener for multiple event types
bench.off('start cycle', listener);

// unregister all listeners for an event type
bench.off('cycle');

// unregister all listeners for multiple event types
bench.off('start cycle complete');

// unregister all listeners for all event types
bench.off();
```

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarkprototypeontype-listener"></a>`Benchmark.Suite.prototype.on(type, listener)`
<a href="#benchmarkprototypeontype-listener">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1343 "View in source") [&#x24C9;][1]

Registers a listener for the specified event type(s).

#### Arguments
1. `type` *(string)*: The event type.
2. `listener` *(Function)*: The function to register.

#### Returns
*(Object)*: The benchmark instance.

#### Example
```js
// register a listener for an event type
bench.on('cycle', listener);

// register a listener for multiple event types
bench.on('start cycle', listener);
```

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksuiteprototypereset"></a>`Benchmark.Suite.prototype.reset()`
<a href="#benchmarksuiteprototypereset">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1161 "View in source") [&#x24C9;][1]

Resets all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksuiteprototyperunoptions"></a>`Benchmark.Suite.prototype.run([options={}])`
<a href="#benchmarksuiteprototyperunoptions">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1198 "View in source") [&#x24C9;][1]

Runs the suite.

#### Arguments
1. `[options={}]` *(Object)*: Options object.

#### Returns
*(Object)*: The suite instance.

#### Example
```js
// basic usage
suite.run();

// or with options
suite.run({ 'async': true, 'queued': true });
```

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Suite.options`

<!-- div -->

### <a id="benchmarksuiteoptions"></a>`Benchmark.Suite.options`
<a href="#benchmarksuiteoptions">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2757 "View in source") [&#x24C9;][1]

*(Object)*: The default options copied by suite instances.

* * *

<!-- /div -->


<!-- div -->

### <a id="benchmarksuiteoptionsname"></a>`Benchmark.Suite.options.name`
<a href="#benchmarksuiteoptionsname">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2765 "View in source") [&#x24C9;][1]

*(string)*: The name of the suite.

* * *

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #Benchmark "Jump back to the TOC."