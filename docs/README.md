# Benchmark.js API documentation

<!-- div -->


<!-- div -->

## `Benchmark`
* [`Benchmark`](#Benchmark)
* [`Benchmark.version`](#Benchmark.version)
* [`Benchmark.each`](#Benchmark.each)
* [`Benchmark.filter`](#Benchmark.filter)
* [`Benchmark.formatNumber`](#Benchmark.formatNumber)
* [`Benchmark.indexOf`](#Benchmark.indexOf)
* [`Benchmark.invoke`](#Benchmark.invoke)
* [`Benchmark.join`](#Benchmark.join)
* [`Benchmark.map`](#Benchmark.map)
* [`Benchmark.pluck`](#Benchmark.pluck)
* [`Benchmark.reduce`](#Benchmark.reduce)

<!-- /div -->


<!-- div -->

## `Benchmark.prototype`
* [`Benchmark#aborted`](#Benchmark:aborted)
* [`Benchmark#count`](#Benchmark:count)
* [`Benchmark#cycles`](#Benchmark:cycles)
* [`Benchmark#error`](#Benchmark:error)
* [`Benchmark#hz`](#Benchmark:hz)
* [`Benchmark#on`](#Benchmark:on)
* [`Benchmark#running`](#Benchmark:running)
* [`Benchmark#abort`](#Benchmark:abort)
* [`Benchmark#addListener`](#Benchmark:addListener)
* [`Benchmark#clone`](#Benchmark:clone)
* [`Benchmark#compare`](#Benchmark:compare)
* [`Benchmark#emit`](#Benchmark:emit)
* [`Benchmark#fn`](#Benchmark:fn)
* [`Benchmark#removeAllListeners`](#Benchmark:removeAllListeners)
* [`Benchmark#removeListener`](#Benchmark:removeListener)
* [`Benchmark#reset`](#Benchmark:reset)
* [`Benchmark#run`](#Benchmark:run)
* [`Benchmark#setup`](#Benchmark:setup)
* [`Benchmark#teardown`](#Benchmark:teardown)
* [`Benchmark#toString`](#Benchmark:toString)

<!-- /div -->


<!-- div -->

## `Benchmark.options`
* [`Benchmark.options`](#Benchmark.options)
* [`Benchmark.options.async`](#Benchmark.options.async)
* [`Benchmark.options.defer`](#Benchmark.options.defer)
* [`Benchmark.options.delay`](#Benchmark.options.delay)
* [`Benchmark.options.id`](#Benchmark.options.id)
* [`Benchmark.options.initCount`](#Benchmark.options.initCount)
* [`Benchmark.options.maxTime`](#Benchmark.options.maxTime)
* [`Benchmark.options.minSamples`](#Benchmark.options.minSamples)
* [`Benchmark.options.minTime`](#Benchmark.options.minTime)
* [`Benchmark.options.name`](#Benchmark.options.name)

<!-- /div -->


<!-- div -->

## `Benchmark.platform`
* [`Benchmark.platform`](#Benchmark.platform)
* [`Benchmark.platform.description`](#Benchmark.platform.description)
* [`Benchmark.platform.layout`](#Benchmark.platform.layout)
* [`Benchmark.platform.name`](#Benchmark.platform.name)
* [`Benchmark.platform.os`](#Benchmark.platform.os)
* [`Benchmark.platform.product`](#Benchmark.platform.product)
* [`Benchmark.platform.version`](#Benchmark.platform.version)
* [`Benchmark.platform.toString`](#Benchmark.platform.toString)

<!-- /div -->


<!-- div -->

## `Benchmark#stats`
* [`Benchmark#stats`](#Benchmark:stats)
* [`Benchmark#stats.deviation`](#Benchmark:stats.deviation)
* [`Benchmark#stats.mean`](#Benchmark:stats.mean)
* [`Benchmark#stats.moe`](#Benchmark:stats.moe)
* [`Benchmark#stats.rme`](#Benchmark:stats.rme)
* [`Benchmark#stats.sem`](#Benchmark:stats.sem)
* [`Benchmark#stats.size`](#Benchmark:stats.size)
* [`Benchmark#stats.variance`](#Benchmark:stats.variance)

<!-- /div -->


<!-- div -->

## `Benchmark#times`
* [`Benchmark#times`](#Benchmark:times)
* [`Benchmark#times.cycle`](#Benchmark:times.cycle)
* [`Benchmark#times.elapsed`](#Benchmark:times.elapsed)
* [`Benchmark#times.period`](#Benchmark:times.period)
* [`Benchmark#times.timeStamp`](#Benchmark:times.timeStamp)

<!-- /div -->


<!-- div -->

## `Benchmark.Deferred`
* [`Benchmark.Deferred`](#Benchmark.Deferred)

<!-- /div -->


<!-- div -->

## `Benchmark.Deferred.prototype`
* [`Benchmark.Deferred#cycles`](#Benchmark.Deferred:cycles)
* [`Benchmark.Deferred#elapsed`](#Benchmark.Deferred:elapsed)
* [`Benchmark.Deferred#resolve`](#Benchmark.Deferred:resolve)
* [`Benchmark.Deferred#timeStamp`](#Benchmark.Deferred:timeStamp)

<!-- /div -->


<!-- div -->

## `Benchmark.Deferred#benchmark`
* [`Benchmark.Deferred#benchmark`](#Benchmark.Deferred:benchmark)

<!-- /div -->


<!-- div -->

## `Benchmark.Event`
* [`Benchmark.Event`](#Benchmark.Event)

<!-- /div -->


<!-- div -->

## `Benchmark.Event.prototype`
* [`Benchmark.Event#type`](#Benchmark.Event:type)

<!-- /div -->


<!-- div -->

## `Benchmark.Suite`
* [`Benchmark.Suite`](#Benchmark.Suite)

<!-- /div -->


<!-- div -->

## `Benchmark.Suite.prototype`
* [`Benchmark.Suite#aborted`](#Benchmark.Suite:aborted)
* [`Benchmark.Suite#length`](#Benchmark.Suite:length)
* [`Benchmark.Suite#on`](#Benchmark:on)
* [`Benchmark.Suite#running`](#Benchmark.Suite:running)
* [`Benchmark.Suite#abort`](#Benchmark.Suite:abort)
* [`Benchmark.Suite#add`](#Benchmark.Suite:add)
* [`Benchmark.Suite#addListener`](#Benchmark:addListener)
* [`Benchmark.Suite#clone`](#Benchmark.Suite:clone)
* [`Benchmark.Suite#each`](#Benchmark.Suite:each)
* [`Benchmark.Suite#emit`](#Benchmark:emit)
* [`Benchmark.Suite#filter`](#Benchmark.Suite:filter)
* [`Benchmark.Suite#indexOf`](#Benchmark.Suite:indexOf)
* [`Benchmark.Suite#invoke`](#Benchmark.Suite:invoke)
* [`Benchmark.Suite#map`](#Benchmark.Suite:map)
* [`Benchmark.Suite#pluck`](#Benchmark.Suite:pluck)
* [`Benchmark.Suite#reduce`](#Benchmark.Suite:reduce)
* [`Benchmark.Suite#removeAllListeners`](#Benchmark:removeAllListeners)
* [`Benchmark.Suite#removeListener`](#Benchmark:removeListener)
* [`Benchmark.Suite#reset`](#Benchmark.Suite:reset)
* [`Benchmark.Suite#run`](#Benchmark.Suite:run)

<!-- /div -->


<!-- div -->

## `Benchmark.Suite.options`
* [`Benchmark.Suite.options`](#Benchmark.Suite.options)
* [`Benchmark.Suite.options.name`](#Benchmark.Suite.options.name)

<!-- /div -->


<!-- /div -->


<!-- div -->


<!-- div -->

## `Benchmark`

<!-- div -->

### <a id="Benchmark" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L135" title="View in source">`Benchmark(name, fn [, options={}])`</a>
Benchmark constructor.
[&#9650;][1]

#### Arguments
1. `name` *(String)*: A name to identify the benchmark.
2. `fn` *(Function)*: The test to benchmark.
3. `[options={}]` *(Object)*: Options object.

#### Example
~~~ js
// basic usage
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
  'deferred': true,

  // benchmark test function
  'fn': fn
});

// or options only
var bench = new Benchmark({

  // benchmark name
  'name': 'foo',

  // benchmark test function
  'fn': fn
});

// a test's `this` binding is set to the benchmark instance
var bench = new Benchmark('foo', function() {
  'My name is '.concat(this.name); // My name is foo
});
~~~

<!-- /div -->


<!-- div -->

## `Benchmark`
### <a id="Benchmark" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L135" title="View in source">`Benchmark(name, fn [, options={}])`</a>
Benchmark constructor.
[&#9650;][1]

<!-- div -->

### <a id="Benchmark.version" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1930" title="View in source">`Benchmark.version`</a>
*(String)*: The version number.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.each" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L737" title="View in source">`Benchmark.each(object, callback)`</a>
A bare-bones `Array#forEach`/`for-in` own property solution.
[&#9650;][1]

#### Arguments
1. `object` *(Array|Object)*: The object to iterate over.
2. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Array, Object)*: Returns the object iterated over.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.filter" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L783" title="View in source">`Benchmark.filter(array, callback)`</a>
A generic bare-bones `Array#filter` solution.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function|String)*: The function/alias called per iteration.

#### Returns
*(Array)*: A new array of values that passed callback filter.

#### Example
~~~ js
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
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark.formatNumber" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L813" title="View in source">`Benchmark.formatNumber(number)`</a>
Converts a number to a more readable comma-separated string representation.
[&#9650;][1]

#### Arguments
1. `number` *(Number)*: The number to convert.

#### Returns
*(String)*: The more readable string representation.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.indexOf" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L826" title="View in source">`Benchmark.indexOf(array, value)`</a>
A generic bare-bones `Array#indexOf` solution.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `value` *(Mixed)*: The value to search for.

#### Returns
*(Number)*: The index of the matched value or `-1`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.invoke" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L875" title="View in source">`Benchmark.invoke(benches, name [, arg1, arg2, ...])`</a>
Invokes a method on all items in an array.
[&#9650;][1]

#### Arguments
1. `benches` *(Array)*: Array of benchmarks to iterate over.
2. `name` *(String|Object)*: The name of the method to invoke OR options object.
3. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the method with.

#### Returns
*(Array)*: A new array of values returned from each method invoked.

#### Example
~~~ js
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
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark.join" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1021" title="View in source">`Benchmark.join(object [, separator1=',', separator2=': '])`</a>
Creates a string of joined array values or object key-value pairs.
[&#9650;][1]

#### Arguments
1. `object` *(Array|Object)*: The object to operate on.
2. `[separator1=',']` *(String)*: The separator used between key-value pairs.
3. `[separator2=': ']` *(String)*: The separator used between keys and values.

#### Returns
*(String)*: The joined result.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.map" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1041" title="View in source">`Benchmark.map(array, callback)`</a>
A generic bare-bones `Array#map` solution.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Array)*: A new array of values returned by the callback.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.pluck" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1056" title="View in source">`Benchmark.pluck(array, property)`</a>
Retrieves the value of a specified property from all items in an array.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `property` *(String)*: The property to pluck.

#### Returns
*(Array)*: A new array of property values.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.reduce" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1071" title="View in source">`Benchmark.reduce(array, callback, accumulator)`</a>
A generic bare-bones `Array#reduce` solution.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `accumulator` *(Mixed)*: Initial value of the accumulator.

#### Returns
*(Mixed)*: The accumulator.

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.prototype`
### <a id="Benchmark" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L135" title="View in source">`Benchmark(name, fn [, options={}])`</a>
Benchmark constructor.
[&#9650;][1]

<!-- div -->

### <a id="Benchmark:aborted" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2141" title="View in source">`Benchmark#aborted`</a>
*(Boolean)*: A flag to indicate if the benchmark is aborted.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:count" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2106" title="View in source">`Benchmark#count`</a>
*(Number)*: The number of times a test was executed.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:cycles" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2113" title="View in source">`Benchmark#cycles`</a>
*(Number)*: The number of cycles performed while benchmarking.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:error" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2120" title="View in source">`Benchmark#error`</a>
*(Object, Null)*: The error object if the test failed.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:hz" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2127" title="View in source">`Benchmark#hz`</a>
*(Number)*: The number of executions per second.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:on" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2154" title="View in source">`Benchmark.Suite#on`</a>
*(Unknown)*: Alias of [`Benchmark#addListener`](#Benchmark:addListener).
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:running" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2148" title="View in source">`Benchmark#running`</a>
*(Boolean)*: A flag to indicate if the benchmark is running.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:abort" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1315" title="View in source">`Benchmark#abort`</a>
Aborts the benchmark without recording times.
[&#9650;][1]

#### Returns
*(Object)*: The benchmark instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:addListener" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1225" title="View in source">`Benchmark.Suite#addListener(type, listener)`</a>
Registers a single listener of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function called when the event occurs.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// basic usage
bench.addListener('cycle', listener);

// register a listener for multiple event types
bench.addListener('start cycle', listener);
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark:clone" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1344" title="View in source">`Benchmark#clone(options)`</a>
Creates a new benchmark using the same test and options.
[&#9650;][1]

#### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Object)*: The new benchmark instance.

#### Example
~~~ js
var bizarro = bench.clone({
  'name': 'doppelganger'
});
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark:compare" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1363" title="View in source">`Benchmark#compare(other)`</a>
Determines if the benchmark's period is smaller than another.
[&#9650;][1]

#### Arguments
1. `other` *(Object)*: The benchmark to compare.

#### Returns
*(Number)*: Returns `1` if smaller, `-1` if larger, and `0` if indeterminate.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:emit" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1241" title="View in source">`Benchmark.Suite#emit(type)`</a>
Executes all registered listeners of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String|Object)*: The event type or object.

#### Returns
*(Boolean)*: Returns `true` if all listeners were executed, else `false`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:fn" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2134" title="View in source">`Benchmark#fn`</a>
The test to benchmark.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:removeAllListeners" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1298" title="View in source">`Benchmark.Suite#removeAllListeners(type)`</a>
Unregisters all listeners of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// basic usage
bench.removeAllListeners('cycle');

// unregister all listeners for multiple event types
bench.removeListener('start cycle');
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark:removeListener" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1271" title="View in source">`Benchmark.Suite#removeListener(type, listener)`</a>
Unregisters a single listener of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// basic usage
bench.removeListener('cycle', listener);

// unregister a listener for multiple event types
bench.removeListener('start cycle', listener);
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark:reset" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1383" title="View in source">`Benchmark#reset`</a>
Reset properties and abort if running.
[&#9650;][1]

#### Returns
*(Object)*: The benchmark instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:run" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1895" title="View in source">`Benchmark#run([async=false])`</a>
Runs the benchmark.
[&#9650;][1]

#### Arguments
1. `[async=false]` *(Boolean)*: Flag to cycle asynchronously.

#### Returns
*(Object)*: The benchmark instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:setup" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2180" title="View in source">`Benchmark#setup`</a>
Compiled into the test and executed immediately **before** the test loop.
[&#9650;][1]

#### Example
~~~ js
var bench = new Benchmark({
  'fn': function() {
    a += 1;
  },
  'setup': function() {
    // reset local var `a` at the beginning of each test cycle
    a = 0;
  }
});

// compiles into something like:
var a = 0;
var start = new Date;
while (count--) {
  a += 1;
}
var end = new Date - start;
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark:teardown" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2187" title="View in source">`Benchmark#teardown`</a>
Compiled into the test and executed immediately **after** the test loop.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:toString" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1422" title="View in source">`Benchmark#toString`</a>
Displays relevant benchmark information when coerced to a string.
[&#9650;][1]

#### Returns
*(String)*: A string representation of the benchmark instance.

<!-- /div -->


<!-- /div -->


<!-- div -->

## `options`

<!-- div -->

### <a id="Benchmark.options" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1938" title="View in source">`options`</a>
*(Object)*: The default options copied by benchmark instances.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.async" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1945" title="View in source">`Benchmark.options.async`</a>
*(Boolean)*: A flag to indicate that benchmark cycles will execute asynchronously by default.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.defer" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1952" title="View in source">`Benchmark.options.defer`</a>
*(Boolean)*: A flag to indicate that the benchmark clock is deferred.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.delay" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1959" title="View in source">`Benchmark.options.delay`</a>
*(Number)*: The delay between test cycles *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.id" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1966" title="View in source">`Benchmark.options.id`</a>
*(String, Null)*: Displayed by Benchmark#toString when a `name` is not available *(auto-generated if `null`)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.initCount" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1973" title="View in source">`Benchmark.options.initCount`</a>
*(Number)*: The default number of times to execute a test on a benchmark's first cycle.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.maxTime" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1981" title="View in source">`Benchmark.options.maxTime`</a>
*(Number)*: The maximum time a benchmark is allowed to run before finishing *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.minSamples" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1988" title="View in source">`Benchmark.options.minSamples`</a>
*(Number)*: The minimum sample size required to perform statistical analysis.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.minTime" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1995" title="View in source">`Benchmark.options.minTime`</a>
*(Number)*: The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.name" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2002" title="View in source">`Benchmark.options.name`</a>
*(String, Null)*: The name of the benchmark.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- div -->

## `platform`

<!-- div -->

### <a id="Benchmark.platform" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2011" title="View in source">`platform`</a>
*(Object)*: Platform object containing browser name, version, and operating system.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.description" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2018" title="View in source">`Benchmark.platform.description`</a>
*(String)*: The platform description.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.layout" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2025" title="View in source">`Benchmark.platform.layout`</a>
*(String, Null)*: The name of the browser layout engine.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.name" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2039" title="View in source">`Benchmark.platform.name`</a>
*(String, Null)*: The name of the browser/environment.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.os" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2046" title="View in source">`Benchmark.platform.os`</a>
*(String, Null)*: The name of the operating system.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.product" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2032" title="View in source">`Benchmark.platform.product`</a>
*(String, Null)*: The name of the product hosting the browser.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.version" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2053" title="View in source">`Benchmark.platform.version`</a>
*(String, Null)*: The browser/environment version.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.toString" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2061" title="View in source">`Benchmark.platform.toString`</a>
Return platform description when the platform object is coerced to a string.
[&#9650;][1]

#### Returns
*(String)*: The platform description.

<!-- /div -->


<!-- /div -->


<!-- div -->

## `stats`

<!-- div -->

### <a id="Benchmark:stats" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2194" title="View in source">`stats`</a>
*(Object)*: An object of stats including mean, margin or error, and standard deviation.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.deviation" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2222" title="View in source">`Benchmark#stats.deviation`</a>
*(Number)*: The sample standard deviation.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.mean" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2229" title="View in source">`Benchmark#stats.mean`</a>
*(Number)*: The sample arithmetic mean.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.moe" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2201" title="View in source">`Benchmark#stats.moe`</a>
*(Number)*: The margin of error.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.rme" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2208" title="View in source">`Benchmark#stats.rme`</a>
*(Number)*: The relative margin of error *(expressed as a percentage of the mean)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.sem" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2215" title="View in source">`Benchmark#stats.sem`</a>
*(Number)*: The standard error of the mean.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.size" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2236" title="View in source">`Benchmark#stats.size`</a>
*(Number)*: The sample size.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.variance" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2243" title="View in source">`Benchmark#stats.variance`</a>
*(Number)*: The sample variance.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- div -->

## `times`

<!-- div -->

### <a id="Benchmark:times" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2251" title="View in source">`times`</a>
*(Object)*: An object of timing data including cycle, elapsed, period, start, and stop.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times.cycle" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2258" title="View in source">`Benchmark#times.cycle`</a>
*(Number)*: The time taken to complete the last cycle *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times.elapsed" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2265" title="View in source">`Benchmark#times.elapsed`</a>
*(Number)*: The time taken to complete the benchmark *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times.period" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2272" title="View in source">`Benchmark#times.period`</a>
*(Number)*: The time taken to execute the test once *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times.timeStamp" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2279" title="View in source">`Benchmark#times.timeStamp`</a>
*(Number)*: A timestamp of when the benchmark started *(ms)*.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Deferred`

<!-- div -->

### <a id="Benchmark.Deferred" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L171" title="View in source">`Deferred(bench)`</a>
Deferred constructor.
[&#9650;][1]

#### Arguments
1. `bench` *(Object)*: The benchmark instance.

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Deferred.prototype`
### <a id="Benchmark.Deferred" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L171" title="View in source">`Deferred(bench)`</a>
Deferred constructor.
[&#9650;][1]

<!-- div -->

### <a id="Benchmark.Deferred:cycles" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2475" title="View in source">`Benchmark.Deferred#cycles`</a>
*(Number)*: The number of deferred cycles performed while benchmarking.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Deferred:elapsed" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2482" title="View in source">`Benchmark.Deferred#elapsed`</a>
*(Number)*: The time taken to complete the deferred benchmark *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Deferred:resolve" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L714" title="View in source">`Benchmark.Deferred#resolve`</a>
*(Unknown)*: Handles cycling/completing the deferred benchmark.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Deferred:timeStamp" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2489" title="View in source">`Benchmark.Deferred#timeStamp`</a>
*(Number)*: A timestamp of when the deferred benchmark started *(ms)*.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- div -->

## `benchmark`

<!-- div -->

### <a id="Benchmark.Deferred:benchmark" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2468" title="View in source">`benchmark`</a>
*(Object)*: The deferred benchmark instance.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Event`

<!-- div -->

### <a id="Benchmark.Event" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L183" title="View in source">`Event(type)`</a>
Event constructor.
[&#9650;][1]

#### Arguments
1. `type` *(String|Object)*: The event type.

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Event.prototype`
### <a id="Benchmark.Event" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L183" title="View in source">`Event(type)`</a>
Event constructor.
[&#9650;][1]

<!-- div -->

### <a id="Benchmark.Event:type" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2502" title="View in source">`Benchmark.Event#type`</a>
*(String)*: The event type.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Suite`

<!-- div -->

### <a id="Benchmark.Suite" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L224" title="View in source">`Suite(name [, options={}])`</a>
Suite constructor.
[&#9650;][1]

#### Arguments
1. `name` *(String)*: A name to identify the suite.
2. `[options={}]` *(Object)*: Options object.

#### Example
~~~ js
// basic usage
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
~~~

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Suite.prototype`
### <a id="Benchmark.Suite" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L224" title="View in source">`Suite(name [, options={}])`</a>
Suite constructor.
[&#9650;][1]

<!-- div -->

### <a id="Benchmark.Suite:aborted" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2344" title="View in source">`Benchmark.Suite#aborted`</a>
*(Boolean)*: A flag to indicate if the suite is aborted.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:length" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2337" title="View in source">`Benchmark.Suite#length`</a>
*(Number)*: The number of benchmarks in the suite.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:on" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2154" title="View in source">`Benchmark.Suite#on`</a>
*(Unknown)*: Alias of [`Benchmark#addListener`](#Benchmark:addListener).
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:running" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2351" title="View in source">`Benchmark.Suite#running`</a>
*(Boolean)*: A flag to indicate if the suite is running.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:abort" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1087" title="View in source">`Benchmark.Suite#abortSuite`</a>
Aborts all benchmarks in the suite.
[&#9650;][1]

#### Returns
*(Object)*: The suite instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:add" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1117" title="View in source">`Benchmark.Suite#add(name, fn [, options={}])`</a>
Adds a test to the benchmark suite.
[&#9650;][1]

#### Arguments
1. `name` *(String)*: A name to identify the benchmark.
2. `fn` *(Function)*: The test to benchmark.
3. `[options={}]` *(Object)*: Options object.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// basic usage
suite.add(fn);

// or using a name first
suite.add('foo', fn);

// or with options
suite.add('foo', fn, {
  'onCycle': onCycle,
  'onComplete': onComplete
});
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark:addListener" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1225" title="View in source">`Benchmark.Suite#addListener(type, listener)`</a>
Registers a single listener of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function called when the event occurs.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// basic usage
bench.addListener('cycle', listener);

// register a listener for multiple event types
bench.addListener('start cycle', listener);
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:clone" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1133" title="View in source">`Benchmark.Suite#cloneSuite(options)`</a>
Creates a new suite with cloned benchmarks.
[&#9650;][1]

#### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Object)*: The new suite instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:each" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2360" title="View in source">`Benchmark.Suite#each(callback)`</a>
A bare-bones `Array#forEach` solution.
[&#9650;][1]

#### Arguments
1. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Object)*: The suite iterated over.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:emit" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1241" title="View in source">`Benchmark.Suite#emit(type)`</a>
Executes all registered listeners of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String|Object)*: The event type or object.

#### Returns
*(Boolean)*: Returns `true` if all listeners were executed, else `false`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:filter" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1153" title="View in source">`Benchmark.Suite#filterSuite(callback)`</a>
A bare-bones `Array#filter` solution.
[&#9650;][1]

#### Arguments
1. `callback` *(Function|String)*: The function/alias called per iteration.

#### Returns
*(Object)*: A new suite of benchmarks that passed callback filter.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:indexOf" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2368" title="View in source">`Benchmark.Suite#indexOf(value)`</a>
A bare-bones `Array#indexOf` solution.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to search for.

#### Returns
*(Number)*: The index of the matched value or `-1`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:invoke" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2377" title="View in source">`Benchmark.Suite#invoke(name [, arg1, arg2, ...])`</a>
Invokes a method on all benchmarks in the suite.
[&#9650;][1]

#### Arguments
1. `name` *(String|Object)*: The name of the method to invoke OR options object.
2. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the method with.

#### Returns
*(Array)*: A new array of values returned from each method invoked.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:map" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2385" title="View in source">`Benchmark.Suite#map(callback)`</a>
A bare-bones `Array#map` solution.
[&#9650;][1]

#### Arguments
1. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Array)*: A new array of values returned by the callback.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:pluck" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2393" title="View in source">`Benchmark.Suite#pluck(property)`</a>
Retrieves the value of a specified property from all benchmarks in the suite.
[&#9650;][1]

#### Arguments
1. `property` *(String)*: The property to pluck.

#### Returns
*(Array)*: A new array of property values.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:reduce" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2402" title="View in source">`Benchmark.Suite#reduce(callback, accumulator)`</a>
A bare-bones `Array#reduce` solution.
[&#9650;][1]

#### Arguments
1. `callback` *(Function)*: The function called per iteration.
2. `accumulator` *(Mixed)*: Initial value of the accumulator.

#### Returns
*(Mixed)*: The accumulator.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:removeAllListeners" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1298" title="View in source">`Benchmark.Suite#removeAllListeners(type)`</a>
Unregisters all listeners of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// basic usage
bench.removeAllListeners('cycle');

// unregister all listeners for multiple event types
bench.removeListener('start cycle');
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark:removeListener" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1271" title="View in source">`Benchmark.Suite#removeListener(type, listener)`</a>
Unregisters a single listener of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// basic usage
bench.removeListener('cycle', listener);

// unregister a listener for multiple event types
bench.removeListener('start cycle', listener);
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:reset" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1167" title="View in source">`Benchmark.Suite#resetSuite`</a>
Resets all benchmarks in the suite.
[&#9650;][1]

#### Returns
*(Object)*: The suite instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:run" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1183" title="View in source">`Benchmark.Suite#runSuite([async=false, queued=false])`</a>
Runs the suite.
[&#9650;][1]

#### Arguments
1. `[async=false]` *(Boolean)*: Flag to cycle asynchronously.
2. `[queued=false]` *(Boolean)*: Flag to treat benchmarks as a queue.

#### Returns
*(Object)*: The suite instance.

<!-- /div -->


<!-- /div -->


<!-- div -->

## `options`

<!-- div -->

### <a id="Benchmark.Suite.options" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2318" title="View in source">`options`</a>
*(Object)*: The default options copied by suite instances.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite.options.name" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2325" title="View in source">`Benchmark.Suite.options.name`</a>
*(String, Null)*: The name of the suite.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #readme "Jump back to the TOC."