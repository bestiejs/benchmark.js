# <a href="https://benchmarkjs.com/">Benchmark.js</a> <span>v2.1.4</span>

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

<h3 id="benchmarkname-fn-options"><code>Benchmark(name, fn, [options={}])</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L356 "View in source") [&#x24C9;][1]

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

<h3 id="benchmarkdeferredclone"><code>Benchmark.Deferred(clone)</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L399 "View in source") [&#x24C9;][1]

The Deferred constructor.

#### Arguments
1. `clone` *(Object)*: The cloned benchmark instance.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkdeferredprototyperesolve"><code>Benchmark.Deferred.prototype.resolve()</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L716 "View in source") [&#x24C9;][1]

Handles cycling/completing the deferred benchmark.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkeventtype"><code>Benchmark.Event(type)</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L415 "View in source") [&#x24C9;][1]

The Event constructor.

#### Arguments
1. `type` *(Object|string)*: The event type.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksuitename-options"><code>Benchmark.Suite(name, [options={}])</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L467 "View in source") [&#x24C9;][1]

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

<h3 id="benchmarksuiteprototypeabort"><code>Benchmark.Suite.prototype.abort()</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1008 "View in source") [&#x24C9;][1]

Aborts all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksuiteprototypeaddname-fn-options"><code>Benchmark.Suite.prototype.add(name, fn, [options={}])</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1068 "View in source") [&#x24C9;][1]

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

<h3 id="benchmarksuiteprototypecloneoptions"><code>Benchmark.Suite.prototype.clone(options)</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1087 "View in source") [&#x24C9;][1]

Creates a new suite with cloned benchmarks.

#### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Object)*: The new suite instance.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksuiteprototypefiltercallback"><code>Benchmark.Suite.prototype.filter(callback)</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1110 "View in source") [&#x24C9;][1]

An `Array#filter` like method.

#### Arguments
1. `callback` *(Function|string)*: The function/alias called per iteration.

#### Returns
*(Object)*: A new suite of benchmarks that passed callback filter.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksuiteprototypereset"><code>Benchmark.Suite.prototype.reset()</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1125 "View in source") [&#x24C9;][1]

Resets all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksuiteprototyperunoptions"><code>Benchmark.Suite.prototype.run([options={}])</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1162 "View in source") [&#x24C9;][1]

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

<h3 id="benchmarkfilterarray-callback"><code>Benchmark.filter(array, callback)</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L763 "View in source") [&#x24C9;][1]

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

<h3 id="benchmarkformatnumbernumber"><code>Benchmark.formatNumber(number)</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L792 "View in source") [&#x24C9;][1]

Converts a number to a more readable comma-separated string representation.

#### Arguments
1. `number` *(number)*: The number to convert.

#### Returns
*(string)*: The more readable string representation.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkinvokebenches-name-args"><code>Benchmark.invoke(benches, name, [args])</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L837 "View in source") [&#x24C9;][1]

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

<h3 id="benchmarkjoinobject-separator1-separator2:"><code>Benchmark.join(object, [separator1=','], [separator2=': '])</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L987 "View in source") [&#x24C9;][1]

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

<h3 id="benchmarkrunincontextcontextroot"><code>Benchmark.runInContext([context=root])</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L125 "View in source") [&#x24C9;][1]

Create a new `Benchmark` function using the given `context` object.

#### Arguments
1. `[context=root]` *(Object)*: The context object.

#### Returns
*(Function)*: Returns a new `Benchmark` function.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeabort"><code>Benchmark.prototype.abort()</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1328 "View in source") [&#x24C9;][1]

Aborts the benchmark without recording times.

#### Returns
*(Object)*: The benchmark instance.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypecloneoptions"><code>Benchmark.prototype.clone(options)</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1367 "View in source") [&#x24C9;][1]

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

<h3 id="benchmarkprototypecompareother"><code>Benchmark.prototype.compare(other)</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1391 "View in source") [&#x24C9;][1]

Determines if a benchmark is faster than another.

#### Arguments
1. `other` *(Object)*: The benchmark to compare.

#### Returns
*(number)*: Returns `-1` if slower, `1` if faster, and `0` if indeterminate.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeemittype-args"><code>Benchmark.prototype.emit(type, [args])</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1202 "View in source") [&#x24C9;][1]

Executes all registered listeners of the specified event type.

#### Arguments
1. `type` *(Object|string)*: The event type or object.
2. `[args]` *(...&#42;)*: Arguments to invoke the listener with.

#### Returns
*(&#42;)*: Returns the return value of the last listener executed.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypelistenerstype"><code>Benchmark.prototype.listeners(type)</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1232 "View in source") [&#x24C9;][1]

Returns an array of event listeners for a given type that can be manipulated
to add or remove listeners.

#### Arguments
1. `type` *(string)*: The event type.

#### Returns
*(Array)*: The listeners array.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeofftype-listener"><code>Benchmark.prototype.off([type], [listener])</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1265 "View in source") [&#x24C9;][1]

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

<h3 id="benchmarkprototypeontype-listener"><code>Benchmark.prototype.on(type, listener)</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1307 "View in source") [&#x24C9;][1]

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

<h3 id="benchmarkprototypereset"><code>Benchmark.prototype.reset()</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1444 "View in source") [&#x24C9;][1]

Reset properties and abort if running.

#### Returns
*(Object)*: The benchmark instance.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototyperunoptions"><code>Benchmark.prototype.run([options={}])</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2093 "View in source") [&#x24C9;][1]

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

<h3 id="benchmarkprototypetostring"><code>Benchmark.prototype.toString()</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L1525 "View in source") [&#x24C9;][1]

Displays relevant benchmark information when coerced to a string.

#### Returns
*(string)*: A string representation of the benchmark instance.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Properties`

<!-- div -->

<h3 id="benchmarkdeferredprototypebenchmark"><code>Benchmark.Deferred.prototype.benchmark</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2583 "View in source") [&#x24C9;][1]

The deferred benchmark instance.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkdeferredprototypecycles"><code>Benchmark.Deferred.prototype.cycles</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2591 "View in source") [&#x24C9;][1]

The number of deferred cycles performed while benchmarking.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkdeferredprototypeelapsed"><code>Benchmark.Deferred.prototype.elapsed</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2599 "View in source") [&#x24C9;][1]

The time taken to complete the deferred benchmark *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkdeferredprototypetimestamp"><code>Benchmark.Deferred.prototype.timeStamp</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2607 "View in source") [&#x24C9;][1]

A timestamp of when the deferred benchmark started *(ms)*.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkeventprototypeaborted"><code>Benchmark.Event.prototype.aborted</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2624 "View in source") [&#x24C9;][1]

A flag to indicate if the emitters listener iteration is aborted.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkeventprototypecancelled"><code>Benchmark.Event.prototype.cancelled</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2632 "View in source") [&#x24C9;][1]

A flag to indicate if the default action is cancelled.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkeventprototypecurrenttarget"><code>Benchmark.Event.prototype.currentTarget</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2640 "View in source") [&#x24C9;][1]

The object whose listeners are currently being processed.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkeventprototyperesult"><code>Benchmark.Event.prototype.result</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2648 "View in source") [&#x24C9;][1]

The return value of the last executed listener.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkeventprototypetarget"><code>Benchmark.Event.prototype.target</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2656 "View in source") [&#x24C9;][1]

The object to which the event was originally emitted.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkeventprototypetimestamp"><code>Benchmark.Event.prototype.timeStamp</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2664 "View in source") [&#x24C9;][1]

A timestamp of when the event was created *(ms)*.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkeventprototypetype"><code>Benchmark.Event.prototype.type</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2672 "View in source") [&#x24C9;][1]

The event type.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksuiteoptions"><code>Benchmark.Suite.options</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2684 "View in source") [&#x24C9;][1]

The default options copied by suite instances.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksuiteoptionsname"><code>Benchmark.Suite.options.name</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2692 "View in source") [&#x24C9;][1]

The name of the suite.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksuiteprototypeaborted"><code>Benchmark.Suite.prototype.aborted</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2713 "View in source") [&#x24C9;][1]

A flag to indicate if the suite is aborted.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksuiteprototypelength"><code>Benchmark.Suite.prototype.length</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2705 "View in source") [&#x24C9;][1]

The number of benchmarks in the suite.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksuiteprototyperunning"><code>Benchmark.Suite.prototype.running</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2721 "View in source") [&#x24C9;][1]

A flag to indicate if the suite is running.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptions"><code>Benchmark.options</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2142 "View in source") [&#x24C9;][1]

The default options copied by benchmark instances.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsasync"><code>Benchmark.options.async</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2151 "View in source") [&#x24C9;][1]

A flag to indicate that benchmark cycles will execute asynchronously
by default.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsdefer"><code>Benchmark.options.defer</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2159 "View in source") [&#x24C9;][1]

A flag to indicate that the benchmark clock is deferred.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsdelay"><code>Benchmark.options.delay</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2166 "View in source") [&#x24C9;][1]

The delay between test cycles *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsid"><code>Benchmark.options.id</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2175 "View in source") [&#x24C9;][1]

Displayed by `Benchmark#toString` when a `name` is not available
*(auto-generated if absent)*.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsinitcount"><code>Benchmark.options.initCount</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2183 "View in source") [&#x24C9;][1]

The default number of times to execute a test on a benchmark's first cycle.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsmaxtime"><code>Benchmark.options.maxTime</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2193 "View in source") [&#x24C9;][1]

The maximum time a benchmark is allowed to run before finishing *(secs)*.
<br>
<br>
Note: Cycle delays aren't counted toward the maximum time.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsminsamples"><code>Benchmark.options.minSamples</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2201 "View in source") [&#x24C9;][1]

The minimum sample size required to perform statistical analysis.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsmintime"><code>Benchmark.options.minTime</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2209 "View in source") [&#x24C9;][1]

The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsname"><code>Benchmark.options.name</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2217 "View in source") [&#x24C9;][1]

The name of the benchmark.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsonabort"><code>Benchmark.options.onAbort</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2225 "View in source") [&#x24C9;][1]

An event listener called when the benchmark is aborted.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsoncomplete"><code>Benchmark.options.onComplete</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2233 "View in source") [&#x24C9;][1]

An event listener called when the benchmark completes running.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsoncycle"><code>Benchmark.options.onCycle</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2241 "View in source") [&#x24C9;][1]

An event listener called after each run cycle.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsonerror"><code>Benchmark.options.onError</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2249 "View in source") [&#x24C9;][1]

An event listener called when a test errors.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsonreset"><code>Benchmark.options.onReset</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2257 "View in source") [&#x24C9;][1]

An event listener called when the benchmark is reset.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkoptionsonstart"><code>Benchmark.options.onStart</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2265 "View in source") [&#x24C9;][1]

An event listener called when the benchmark starts running.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkplatform"><code>Benchmark.platform</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2276 "View in source") [&#x24C9;][1]

Platform object with properties describing things like browser name,
version, and operating system. See [`platform.js`](https://mths.be/platform).

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksupport"><code>Benchmark.support</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L195 "View in source") [&#x24C9;][1]

An object used to flag environments/features.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksupportbrowser"><code>Benchmark.support.browser</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L205 "View in source") [&#x24C9;][1]

Detect if running in a browser environment.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkversion"><code>Benchmark.version</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2297 "View in source") [&#x24C9;][1]

The semantic version number.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeaborted"><code>Benchmark.prototype.aborted</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2372 "View in source") [&#x24C9;][1]

A flag to indicate if the benchmark is aborted.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypecompiled"><code>Benchmark.prototype.compiled</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2348 "View in source") [&#x24C9;][1]

The compiled test function.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypecount"><code>Benchmark.prototype.count</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2324 "View in source") [&#x24C9;][1]

The number of times a test was executed.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypecycles"><code>Benchmark.prototype.cycles</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2332 "View in source") [&#x24C9;][1]

The number of cycles performed while benchmarking.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksupportdecompilation"><code>Benchmark.support.decompilation</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L222 "View in source") [&#x24C9;][1]

Detect if function decompilation is support.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeerror"><code>Benchmark.prototype.error</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2356 "View in source") [&#x24C9;][1]

The error object if the test failed.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypefn"><code>Benchmark.prototype.fn</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2364 "View in source") [&#x24C9;][1]

The test to benchmark.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypehz"><code>Benchmark.prototype.hz</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2340 "View in source") [&#x24C9;][1]

The number of executions per second.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototyperunning"><code>Benchmark.prototype.running</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2380 "View in source") [&#x24C9;][1]

A flag to indicate if the benchmark is running.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypesetup"><code>Benchmark.prototype.setup</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2443 "View in source") [&#x24C9;][1]

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

<h3 id="benchmarkprototypestats"><code>Benchmark.prototype.stats</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2459 "View in source") [&#x24C9;][1]

An object of stats including mean, margin or error, and standard deviation.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeteardown"><code>Benchmark.prototype.teardown</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2451 "View in source") [&#x24C9;][1]

Compiled into the test and executed immediately **after** the test loop.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarksupporttimeout"><code>Benchmark.support.timeout</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L213 "View in source") [&#x24C9;][1]

Detect if the Timers API exists.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypetimes"><code>Benchmark.prototype.times</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2524 "View in source") [&#x24C9;][1]

An object of timing data including cycle, elapsed, period, start, and stop.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmark-statsdeviation"><code>Benchmark#stats.deviation</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2491 "View in source") [&#x24C9;][1]

The sample standard deviation.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmark-statsmean"><code>Benchmark#stats.mean</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2499 "View in source") [&#x24C9;][1]

The sample arithmetic mean *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmark-statsmoe"><code>Benchmark#stats.moe</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2467 "View in source") [&#x24C9;][1]

The margin of error.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmark-statsrme"><code>Benchmark#stats.rme</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2475 "View in source") [&#x24C9;][1]

The relative margin of error *(expressed as a percentage of the mean)*.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmark-statssample"><code>Benchmark#stats.sample</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2507 "View in source") [&#x24C9;][1]

The array of sampled periods.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmark-statssem"><code>Benchmark#stats.sem</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2483 "View in source") [&#x24C9;][1]

The standard error of the mean.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmark-statsvariance"><code>Benchmark#stats.variance</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2515 "View in source") [&#x24C9;][1]

The sample variance.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmark-timescycle"><code>Benchmark#times.cycle</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2532 "View in source") [&#x24C9;][1]

The time taken to complete the last cycle *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmark-timeselapsed"><code>Benchmark#times.elapsed</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2540 "View in source") [&#x24C9;][1]

The time taken to complete the benchmark *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmark-timesperiod"><code>Benchmark#times.period</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2548 "View in source") [&#x24C9;][1]

The time taken to execute the test once *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmark-timestimestamp"><code>Benchmark#times.timeStamp</code></h3>
[&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/2.1.4/benchmark.js#L2556 "View in source") [&#x24C9;][1]

A timestamp of when the benchmark started *(ms)*.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #methods "Jump back to the TOC."
