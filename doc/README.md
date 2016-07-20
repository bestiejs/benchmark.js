# <a href="https://benchmarkjs.com/">Benchmark.js</a> <span>v2.1.1</span>

<!-- div class="toc-container" -->

<!-- div -->

## `Methods`
* <a href="#benchmarkname-fn-options">`Benchmark`</a>
* <a href="#benchmarkdeferredclone">`Benchmark.Deferred`</a>
* <a href="#benchmarkdeferredprototyperesolve">`Benchmark.Deferred.prototype.resolve`</a>
* <a href="#benchmarkeventtype">`Benchmark.Event`</a>
* <a href="#benchmarksuitename-options">`Benchmark.Suite`</a>
* <a href="#benchmarksuiteprototypeabort">`Benchmark.Suite.prototype.abort`</a>
* <a href="#benchmarksuiteprototypeaddname-fn-options">`Benchmark.Suite.prototype.add`</a>
* <a href="#benchmarksuiteprototypecloneoptions">`Benchmark.Suite.prototype.clone`</a>
* <a href="#benchmarksuiteprototypefiltercallback">`Benchmark.Suite.prototype.filter`</a>
* <a href="#benchmarksuiteprototypereset">`Benchmark.Suite.prototype.reset`</a>
* <a href="#benchmarksuiteprototyperunoptions">`Benchmark.Suite.prototype.run`</a>
* <a href="#benchmarkfilterarray-callback">`Benchmark.filter`</a>
* <a href="#benchmarkformatnumbernumber">`Benchmark.formatNumber`</a>
* <a href="#benchmarkinvokebenches-name-args">`Benchmark.invoke`</a>
* <a href="#benchmarkjoinobject-separator1-separator2:">`Benchmark.join`</a>
* <a href="#benchmarkrunincontextcontextroot">`Benchmark.runInContext`</a>
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

## `Properties`
* <a href="#benchmarkdeferredprototypebenchmark">`Benchmark.Deferred.prototype.benchmark`</a>
* <a href="#benchmarkdeferredprototypecycles">`Benchmark.Deferred.prototype.cycles`</a>
* <a href="#benchmarkdeferredprototypeelapsed">`Benchmark.Deferred.prototype.elapsed`</a>
* <a href="#benchmarkdeferredprototypetimestamp">`Benchmark.Deferred.prototype.timeStamp`</a>
* <a href="#benchmarkeventprototypeaborted">`Benchmark.Event.prototype.aborted`</a>
* <a href="#benchmarkeventprototypecancelled">`Benchmark.Event.prototype.cancelled`</a>
* <a href="#benchmarkeventprototypecurrenttarget">`Benchmark.Event.prototype.currentTarget`</a>
* <a href="#benchmarkeventprototyperesult">`Benchmark.Event.prototype.result`</a>
* <a href="#benchmarkeventprototypetarget">`Benchmark.Event.prototype.target`</a>
* <a href="#benchmarkeventprototypetimestamp">`Benchmark.Event.prototype.timeStamp`</a>
* <a href="#benchmarkeventprototypetype">`Benchmark.Event.prototype.type`</a>
* <a href="#benchmarksuiteoptions">`Benchmark.Suite.options`</a>
* <a href="#benchmarksuiteoptionsname">`Benchmark.Suite.options.name`</a>
* <a href="#benchmarksuiteprototypeaborted">`Benchmark.Suite.prototype.aborted`</a>
* <a href="#benchmarksuiteprototypelength">`Benchmark.Suite.prototype.length`</a>
* <a href="#benchmarksuiteprototyperunning">`Benchmark.Suite.prototype.running`</a>
* <a href="#benchmarkoptions">`Benchmark.options`</a>
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
* <a href="#benchmarkplatform">`Benchmark.platform`</a>
* <a href="#benchmarksupport">`Benchmark.support`</a>
* <a href="#benchmarksupportbrowser">`Benchmark.support.browser`</a>
* <a href="#benchmarkversion">`Benchmark.version`</a>
* <a href="#benchmarkprototypeaborted">`Benchmark.prototype.aborted`</a>
* <a href="#benchmarkprototypecompiled">`Benchmark.prototype.compiled`</a>
* <a href="#benchmarkprototypecount">`Benchmark.prototype.count`</a>
* <a href="#benchmarkprototypecycles">`Benchmark.prototype.cycles`</a>
* <a href="#benchmarksupportdecompilation">`Benchmark.support.decompilation`</a>
* <a href="#benchmarkprototypeerror">`Benchmark.prototype.error`</a>
* <a href="#benchmarkprototypefn">`Benchmark.prototype.fn`</a>
* <a href="#benchmarkprototypehz">`Benchmark.prototype.hz`</a>
* <a href="#benchmarkprototyperunning">`Benchmark.prototype.running`</a>
* <a href="#benchmarkprototypesetup">`Benchmark.prototype.setup`</a>
* <a href="#benchmarkprototypestats">`Benchmark.prototype.stats`</a>
* <a href="#benchmarkprototypeteardown">`Benchmark.prototype.teardown`</a>
* <a href="#benchmarksupporttimeout">`Benchmark.support.timeout`</a>
* <a href="#benchmarkprototypetimes">`Benchmark.prototype.times`</a>
* <a href="#benchmark-statsdeviation">`Benchmark#stats.deviation`</a>
* <a href="#benchmark-statsmean">`Benchmark#stats.mean`</a>
* <a href="#benchmark-statsmoe">`Benchmark#stats.moe`</a>
* <a href="#benchmark-statsrme">`Benchmark#stats.rme`</a>
* <a href="#benchmark-statssample">`Benchmark#stats.sample`</a>
* <a href="#benchmark-statssem">`Benchmark#stats.sem`</a>
* <a href="#benchmark-statsvariance">`Benchmark#stats.variance`</a>
* <a href="#benchmark-timescycle">`Benchmark#times.cycle`</a>
* <a href="#benchmark-timeselapsed">`Benchmark#times.elapsed`</a>
* <a href="#benchmark-timesperiod">`Benchmark#times.period`</a>
* <a href="#benchmark-timestimestamp">`Benchmark#times.timeStamp`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `Methods`

<!-- div -->

### <a id="benchmarkname-fn-options"></a>`Benchmark(name, fn, [options={}])`
[#](#benchmarkname-fn-options) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L356 "View in source") [&#x24C9;][1]

The Benchmark constructor.
<br>
<br>
Note: The Benchmark constructor exposes a handful of lodash methods to
make working with arrays, collections, and objects easier. The lodash
methods are:<br>
[`each/forEach`](https://lodash.com/docs#forEach), [`forOwn`](https://lodash.com/docs#forOwn),
[`has`](https://lodash.com/docs#has), [`indexOf`](https://lodash.com/docs#indexOf),
[`map`](https://lodash.com/docs#map), and [`reduce`](https://lodash.com/docs#reduce)

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

  // displayed by `Benchmark#toString` if `name` is not available
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
    // call `Deferred#resolve` when the deferred test is finished
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
  'My name is '.concat(this.name); // "My name is foo"
});
```
---

<!-- /div -->

<!-- div -->

### <a id="benchmarkdeferredclone"></a>`Benchmark.Deferred(clone)`
[#](#benchmarkdeferredclone) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L399 "View in source") [&#x24C9;][1]

The Deferred constructor.

#### Arguments
1. `clone` *(Object)*: The cloned benchmark instance.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkdeferredprototyperesolve"></a>`Benchmark.Deferred.prototype.resolve()`
[#](#benchmarkdeferredprototyperesolve) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L716 "View in source") [&#x24C9;][1]

Handles cycling/completing the deferred benchmark.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkeventtype"></a>`Benchmark.Event(type)`
[#](#benchmarkeventtype) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L415 "View in source") [&#x24C9;][1]

The Event constructor.

#### Arguments
1. `type` *(Object|string)*: The event type.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksuitename-options"></a>`Benchmark.Suite(name, [options={}])`
[#](#benchmarksuitename-options) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L467 "View in source") [&#x24C9;][1]

The Suite constructor.
<br>
<br>
Note: Each Suite instance has a handful of wrapped lodash methods to
make working with Suites easier. The wrapped lodash methods are:<br>
[`each/forEach`](https://lodash.com/docs#forEach), [`indexOf`](https://lodash.com/docs#indexOf),
[`map`](https://lodash.com/docs#map), and [`reduce`](https://lodash.com/docs#reduce)

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
---

<!-- /div -->

<!-- div -->

### <a id="benchmarksuiteprototypeabort"></a>`Benchmark.Suite.prototype.abort()`
[#](#benchmarksuiteprototypeabort) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1008 "View in source") [&#x24C9;][1]

Aborts all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksuiteprototypeaddname-fn-options"></a>`Benchmark.Suite.prototype.add(name, fn, [options={}])`
[#](#benchmarksuiteprototypeaddname-fn-options) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1068 "View in source") [&#x24C9;][1]

Adds a test to the benchmark suite.

#### Arguments
1. `name` *(string)*: A name to identify the benchmark.
2. `fn` *(Function|string)*: The test to benchmark.
3. `[options={}]` *(Object)*: Options object.

#### Returns
*(Object)*: The suite instance.

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
---

<!-- /div -->

<!-- div -->

### <a id="benchmarksuiteprototypecloneoptions"></a>`Benchmark.Suite.prototype.clone(options)`
[#](#benchmarksuiteprototypecloneoptions) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1087 "View in source") [&#x24C9;][1]

Creates a new suite with cloned benchmarks.

#### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Object)*: The new suite instance.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksuiteprototypefiltercallback"></a>`Benchmark.Suite.prototype.filter(callback)`
[#](#benchmarksuiteprototypefiltercallback) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1110 "View in source") [&#x24C9;][1]

An `Array#filter` like method.

#### Arguments
1. `callback` *(Function|string)*: The function/alias called per iteration.

#### Returns
*(Object)*: A new suite of benchmarks that passed callback filter.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksuiteprototypereset"></a>`Benchmark.Suite.prototype.reset()`
[#](#benchmarksuiteprototypereset) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1125 "View in source") [&#x24C9;][1]

Resets all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksuiteprototyperunoptions"></a>`Benchmark.Suite.prototype.run([options={}])`
[#](#benchmarksuiteprototyperunoptions) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1162 "View in source") [&#x24C9;][1]

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
---

<!-- /div -->

<!-- div -->

### <a id="benchmarkfilterarray-callback"></a>`Benchmark.filter(array, callback)`
[#](#benchmarkfilterarray-callback) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L763 "View in source") [&#x24C9;][1]

A generic `Array#filter` like method.

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function|string)*: The function/alias called per iteration.

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
---

<!-- /div -->

<!-- div -->

### <a id="benchmarkformatnumbernumber"></a>`Benchmark.formatNumber(number)`
[#](#benchmarkformatnumbernumber) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L792 "View in source") [&#x24C9;][1]

Converts a number to a more readable comma-separated string representation.

#### Arguments
1. `number` *(number)*: The number to convert.

#### Returns
*(string)*: The more readable string representation.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkinvokebenches-name-args"></a>`Benchmark.invoke(benches, name, [args])`
[#](#benchmarkinvokebenches-name-args) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L837 "View in source") [&#x24C9;][1]

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
---

<!-- /div -->

<!-- div -->

### <a id="benchmarkjoinobject-separator1-separator2:"></a>`Benchmark.join(object, [separator1=','], [separator2=': '])`
[#](#benchmarkjoinobject-separator1-separator2:) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L987 "View in source") [&#x24C9;][1]

Creates a string of joined array values or object key-value pairs.

#### Arguments
1. `object` *(Array|Object)*: The object to operate on.
2. `[separator1=',']` *(string)*: The separator used between key-value pairs.
3. `[separator2=': ']` *(string)*: The separator used between keys and values.

#### Returns
*(string)*: The joined result.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkrunincontextcontextroot"></a>`Benchmark.runInContext([context=root])`
[#](#benchmarkrunincontextcontextroot) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L125 "View in source") [&#x24C9;][1]

Create a new `Benchmark` function using the given `context` object.

#### Arguments
1. `[context=root]` *(Object)*: The context object.

#### Returns
*(Function)*: Returns a new `Benchmark` function.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypeabort"></a>`Benchmark.prototype.abort()`
[#](#benchmarkprototypeabort) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1328 "View in source") [&#x24C9;][1]

Aborts the benchmark without recording times.

#### Returns
*(Object)*: The benchmark instance.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypecloneoptions"></a>`Benchmark.prototype.clone(options)`
[#](#benchmarkprototypecloneoptions) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1367 "View in source") [&#x24C9;][1]

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
---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypecompareother"></a>`Benchmark.prototype.compare(other)`
[#](#benchmarkprototypecompareother) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1391 "View in source") [&#x24C9;][1]

Determines if a benchmark is faster than another.

#### Arguments
1. `other` *(Object)*: The benchmark to compare.

#### Returns
*(number)*: Returns `-1` if slower, `1` if faster, and `0` if indeterminate.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypeemittype-args"></a>`Benchmark.prototype.emit(type, [args])`
[#](#benchmarkprototypeemittype-args) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1202 "View in source") [&#x24C9;][1]

Executes all registered listeners of the specified event type.

#### Arguments
1. `type` *(Object|string)*: The event type or object.
2. `[args]` *(...&#42;)*: Arguments to invoke the listener with.

#### Returns
*(&#42;)*: Returns the return value of the last listener executed.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypelistenerstype"></a>`Benchmark.prototype.listeners(type)`
[#](#benchmarkprototypelistenerstype) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1232 "View in source") [&#x24C9;][1]

Returns an array of event listeners for a given type that can be manipulated
to add or remove listeners.

#### Arguments
1. `type` *(string)*: The event type.

#### Returns
*(Array)*: The listeners array.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypeofftype-listener"></a>`Benchmark.prototype.off([type], [listener])`
[#](#benchmarkprototypeofftype-listener) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1265 "View in source") [&#x24C9;][1]

Unregisters a listener for the specified event type(s),
or unregisters all listeners for the specified event type(s),
or unregisters all listeners for all event types.

#### Arguments
1. `[type]` *(string)*: The event type.
2. `[listener]` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The current instance.

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
---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypeontype-listener"></a>`Benchmark.prototype.on(type, listener)`
[#](#benchmarkprototypeontype-listener) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1307 "View in source") [&#x24C9;][1]

Registers a listener for the specified event type(s).

#### Arguments
1. `type` *(string)*: The event type.
2. `listener` *(Function)*: The function to register.

#### Returns
*(Object)*: The current instance.

#### Example
```js
// register a listener for an event type
bench.on('cycle', listener);

// register a listener for multiple event types
bench.on('start cycle', listener);
```
---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypereset"></a>`Benchmark.prototype.reset()`
[#](#benchmarkprototypereset) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1444 "View in source") [&#x24C9;][1]

Reset properties and abort if running.

#### Returns
*(Object)*: The benchmark instance.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototyperunoptions"></a>`Benchmark.prototype.run([options={}])`
[#](#benchmarkprototyperunoptions) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2080 "View in source") [&#x24C9;][1]

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
---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypetostring"></a>`Benchmark.prototype.toString()`
[#](#benchmarkprototypetostring) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L1522 "View in source") [&#x24C9;][1]

Displays relevant benchmark information when coerced to a string.

#### Returns
*(string)*: A string representation of the benchmark instance.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Properties`

<!-- div -->

### <a id="benchmarkdeferredprototypebenchmark"></a>`Benchmark.Deferred.prototype.benchmark`
[#](#benchmarkdeferredprototypebenchmark) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2570 "View in source") [&#x24C9;][1]

The deferred benchmark instance.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkdeferredprototypecycles"></a>`Benchmark.Deferred.prototype.cycles`
[#](#benchmarkdeferredprototypecycles) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2578 "View in source") [&#x24C9;][1]

The number of deferred cycles performed while benchmarking.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkdeferredprototypeelapsed"></a>`Benchmark.Deferred.prototype.elapsed`
[#](#benchmarkdeferredprototypeelapsed) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2586 "View in source") [&#x24C9;][1]

The time taken to complete the deferred benchmark *(secs)*.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkdeferredprototypetimestamp"></a>`Benchmark.Deferred.prototype.timeStamp`
[#](#benchmarkdeferredprototypetimestamp) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2594 "View in source") [&#x24C9;][1]

A timestamp of when the deferred benchmark started *(ms)*.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkeventprototypeaborted"></a>`Benchmark.Event.prototype.aborted`
[#](#benchmarkeventprototypeaborted) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2611 "View in source") [&#x24C9;][1]

A flag to indicate if the emitters listener iteration is aborted.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkeventprototypecancelled"></a>`Benchmark.Event.prototype.cancelled`
[#](#benchmarkeventprototypecancelled) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2619 "View in source") [&#x24C9;][1]

A flag to indicate if the default action is cancelled.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkeventprototypecurrenttarget"></a>`Benchmark.Event.prototype.currentTarget`
[#](#benchmarkeventprototypecurrenttarget) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2627 "View in source") [&#x24C9;][1]

The object whose listeners are currently being processed.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkeventprototyperesult"></a>`Benchmark.Event.prototype.result`
[#](#benchmarkeventprototyperesult) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2635 "View in source") [&#x24C9;][1]

The return value of the last executed listener.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkeventprototypetarget"></a>`Benchmark.Event.prototype.target`
[#](#benchmarkeventprototypetarget) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2643 "View in source") [&#x24C9;][1]

The object to which the event was originally emitted.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkeventprototypetimestamp"></a>`Benchmark.Event.prototype.timeStamp`
[#](#benchmarkeventprototypetimestamp) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2651 "View in source") [&#x24C9;][1]

A timestamp of when the event was created *(ms)*.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkeventprototypetype"></a>`Benchmark.Event.prototype.type`
[#](#benchmarkeventprototypetype) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2659 "View in source") [&#x24C9;][1]

The event type.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksuiteoptions"></a>`Benchmark.Suite.options`
[#](#benchmarksuiteoptions) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2671 "View in source") [&#x24C9;][1]

The default options copied by suite instances.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksuiteoptionsname"></a>`Benchmark.Suite.options.name`
[#](#benchmarksuiteoptionsname) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2679 "View in source") [&#x24C9;][1]

The name of the suite.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksuiteprototypeaborted"></a>`Benchmark.Suite.prototype.aborted`
[#](#benchmarksuiteprototypeaborted) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2700 "View in source") [&#x24C9;][1]

A flag to indicate if the suite is aborted.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksuiteprototypelength"></a>`Benchmark.Suite.prototype.length`
[#](#benchmarksuiteprototypelength) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2692 "View in source") [&#x24C9;][1]

The number of benchmarks in the suite.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksuiteprototyperunning"></a>`Benchmark.Suite.prototype.running`
[#](#benchmarksuiteprototyperunning) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2708 "View in source") [&#x24C9;][1]

A flag to indicate if the suite is running.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptions"></a>`Benchmark.options`
[#](#benchmarkoptions) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2129 "View in source") [&#x24C9;][1]

The default options copied by benchmark instances.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsasync"></a>`Benchmark.options.async`
[#](#benchmarkoptionsasync) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2138 "View in source") [&#x24C9;][1]

A flag to indicate that benchmark cycles will execute asynchronously
by default.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsdefer"></a>`Benchmark.options.defer`
[#](#benchmarkoptionsdefer) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2146 "View in source") [&#x24C9;][1]

A flag to indicate that the benchmark clock is deferred.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsdelay"></a>`Benchmark.options.delay`
[#](#benchmarkoptionsdelay) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2153 "View in source") [&#x24C9;][1]

The delay between test cycles *(secs)*.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsid"></a>`Benchmark.options.id`
[#](#benchmarkoptionsid) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2162 "View in source") [&#x24C9;][1]

Displayed by `Benchmark#toString` when a `name` is not available
*(auto-generated if absent)*.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsinitcount"></a>`Benchmark.options.initCount`
[#](#benchmarkoptionsinitcount) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2170 "View in source") [&#x24C9;][1]

The default number of times to execute a test on a benchmark's first cycle.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsmaxtime"></a>`Benchmark.options.maxTime`
[#](#benchmarkoptionsmaxtime) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2180 "View in source") [&#x24C9;][1]

The maximum time a benchmark is allowed to run before finishing *(secs)*.
<br>
<br>
Note: Cycle delays aren't counted toward the maximum time.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsminsamples"></a>`Benchmark.options.minSamples`
[#](#benchmarkoptionsminsamples) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2188 "View in source") [&#x24C9;][1]

The minimum sample size required to perform statistical analysis.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsmintime"></a>`Benchmark.options.minTime`
[#](#benchmarkoptionsmintime) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2196 "View in source") [&#x24C9;][1]

The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsname"></a>`Benchmark.options.name`
[#](#benchmarkoptionsname) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2204 "View in source") [&#x24C9;][1]

The name of the benchmark.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsonabort"></a>`Benchmark.options.onAbort`
[#](#benchmarkoptionsonabort) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2212 "View in source") [&#x24C9;][1]

An event listener called when the benchmark is aborted.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsoncomplete"></a>`Benchmark.options.onComplete`
[#](#benchmarkoptionsoncomplete) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2220 "View in source") [&#x24C9;][1]

An event listener called when the benchmark completes running.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsoncycle"></a>`Benchmark.options.onCycle`
[#](#benchmarkoptionsoncycle) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2228 "View in source") [&#x24C9;][1]

An event listener called after each run cycle.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsonerror"></a>`Benchmark.options.onError`
[#](#benchmarkoptionsonerror) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2236 "View in source") [&#x24C9;][1]

An event listener called when a test errors.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsonreset"></a>`Benchmark.options.onReset`
[#](#benchmarkoptionsonreset) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2244 "View in source") [&#x24C9;][1]

An event listener called when the benchmark is reset.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkoptionsonstart"></a>`Benchmark.options.onStart`
[#](#benchmarkoptionsonstart) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2252 "View in source") [&#x24C9;][1]

An event listener called when the benchmark starts running.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkplatform"></a>`Benchmark.platform`
[#](#benchmarkplatform) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2263 "View in source") [&#x24C9;][1]

Platform object with properties describing things like browser name,
version, and operating system. See [`platform.js`](https://mths.be/platform).

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksupport"></a>`Benchmark.support`
[#](#benchmarksupport) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L195 "View in source") [&#x24C9;][1]

An object used to flag environments/features.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksupportbrowser"></a>`Benchmark.support.browser`
[#](#benchmarksupportbrowser) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L205 "View in source") [&#x24C9;][1]

Detect if running in a browser environment.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkversion"></a>`Benchmark.version`
[#](#benchmarkversion) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2284 "View in source") [&#x24C9;][1]

The semantic version number.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypeaborted"></a>`Benchmark.prototype.aborted`
[#](#benchmarkprototypeaborted) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2359 "View in source") [&#x24C9;][1]

A flag to indicate if the benchmark is aborted.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypecompiled"></a>`Benchmark.prototype.compiled`
[#](#benchmarkprototypecompiled) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2335 "View in source") [&#x24C9;][1]

The compiled test function.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypecount"></a>`Benchmark.prototype.count`
[#](#benchmarkprototypecount) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2311 "View in source") [&#x24C9;][1]

The number of times a test was executed.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypecycles"></a>`Benchmark.prototype.cycles`
[#](#benchmarkprototypecycles) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2319 "View in source") [&#x24C9;][1]

The number of cycles performed while benchmarking.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksupportdecompilation"></a>`Benchmark.support.decompilation`
[#](#benchmarksupportdecompilation) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L222 "View in source") [&#x24C9;][1]

Detect if function decompilation is support.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypeerror"></a>`Benchmark.prototype.error`
[#](#benchmarkprototypeerror) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2343 "View in source") [&#x24C9;][1]

The error object if the test failed.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypefn"></a>`Benchmark.prototype.fn`
[#](#benchmarkprototypefn) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2351 "View in source") [&#x24C9;][1]

The test to benchmark.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypehz"></a>`Benchmark.prototype.hz`
[#](#benchmarkprototypehz) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2327 "View in source") [&#x24C9;][1]

The number of executions per second.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototyperunning"></a>`Benchmark.prototype.running`
[#](#benchmarkprototyperunning) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2367 "View in source") [&#x24C9;][1]

A flag to indicate if the benchmark is running.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypesetup"></a>`Benchmark.prototype.setup`
[#](#benchmarkprototypesetup) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2430 "View in source") [&#x24C9;][1]

Compiled into the test and executed immediately **before** the test loop.

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
---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypestats"></a>`Benchmark.prototype.stats`
[#](#benchmarkprototypestats) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2446 "View in source") [&#x24C9;][1]

An object of stats including mean, margin or error, and standard deviation.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypeteardown"></a>`Benchmark.prototype.teardown`
[#](#benchmarkprototypeteardown) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2438 "View in source") [&#x24C9;][1]

Compiled into the test and executed immediately **after** the test loop.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarksupporttimeout"></a>`Benchmark.support.timeout`
[#](#benchmarksupporttimeout) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L213 "View in source") [&#x24C9;][1]

Detect if the Timers API exists.

---

<!-- /div -->

<!-- div -->

### <a id="benchmarkprototypetimes"></a>`Benchmark.prototype.times`
[#](#benchmarkprototypetimes) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2511 "View in source") [&#x24C9;][1]

An object of timing data including cycle, elapsed, period, start, and stop.

---

<!-- /div -->

<!-- div -->

### <a id="benchmark-statsdeviation"></a>`Benchmark#stats.deviation`
[#](#benchmark-statsdeviation) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2478 "View in source") [&#x24C9;][1]

The sample standard deviation.

---

<!-- /div -->

<!-- div -->

### <a id="benchmark-statsmean"></a>`Benchmark#stats.mean`
[#](#benchmark-statsmean) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2486 "View in source") [&#x24C9;][1]

The sample arithmetic mean *(secs)*.

---

<!-- /div -->

<!-- div -->

### <a id="benchmark-statsmoe"></a>`Benchmark#stats.moe`
[#](#benchmark-statsmoe) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2454 "View in source") [&#x24C9;][1]

The margin of error.

---

<!-- /div -->

<!-- div -->

### <a id="benchmark-statsrme"></a>`Benchmark#stats.rme`
[#](#benchmark-statsrme) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2462 "View in source") [&#x24C9;][1]

The relative margin of error *(expressed as a percentage of the mean)*.

---

<!-- /div -->

<!-- div -->

### <a id="benchmark-statssample"></a>`Benchmark#stats.sample`
[#](#benchmark-statssample) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2494 "View in source") [&#x24C9;][1]

The array of sampled periods.

---

<!-- /div -->

<!-- div -->

### <a id="benchmark-statssem"></a>`Benchmark#stats.sem`
[#](#benchmark-statssem) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2470 "View in source") [&#x24C9;][1]

The standard error of the mean.

---

<!-- /div -->

<!-- div -->

### <a id="benchmark-statsvariance"></a>`Benchmark#stats.variance`
[#](#benchmark-statsvariance) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2502 "View in source") [&#x24C9;][1]

The sample variance.

---

<!-- /div -->

<!-- div -->

### <a id="benchmark-timescycle"></a>`Benchmark#times.cycle`
[#](#benchmark-timescycle) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2519 "View in source") [&#x24C9;][1]

The time taken to complete the last cycle *(secs)*.

---

<!-- /div -->

<!-- div -->

### <a id="benchmark-timeselapsed"></a>`Benchmark#times.elapsed`
[#](#benchmark-timeselapsed) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2527 "View in source") [&#x24C9;][1]

The time taken to complete the benchmark *(secs)*.

---

<!-- /div -->

<!-- div -->

### <a id="benchmark-timesperiod"></a>`Benchmark#times.period`
[#](#benchmark-timesperiod) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2535 "View in source") [&#x24C9;][1]

The time taken to execute the test once *(secs)*.

---

<!-- /div -->

<!-- div -->

### <a id="benchmark-timestimestamp"></a>`Benchmark#times.timeStamp`
[#](#benchmark-timestimestamp) [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.1/benchmark.js#L2543 "View in source") [&#x24C9;][1]

A timestamp of when the benchmark started *(ms)*.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #methods "Jump back to the TOC."
