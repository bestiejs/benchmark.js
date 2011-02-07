# Benchmark.js API documentation

<!-- div -->
<!-- div -->
## `Benchmark`
* [`Benchmark`](#Benchmark)
* [`Benchmark.platform`](#Benchmark.platform)
* [`Benchmark.version`](#Benchmark.version)
* [`Benchmark.each`](#Benchmark.each)
* [`Benchmark.extend`](#Benchmark.extend)
* [`Benchmark.filter`](#Benchmark.filter)
* [`Benchmark.forIn`](#Benchmark.forIn)
* [`Benchmark.formatNumber`](#Benchmark.formatNumber)
* [`Benchmark.hasKey`](#Benchmark.hasKey)
* [`Benchmark.indexOf`](#Benchmark.indexOf)
* [`Benchmark.interpolate`](#Benchmark.interpolate)
* [`Benchmark.invoke`](#Benchmark.invoke)
* [`Benchmark.isArray`](#Benchmark.isArray)
* [`Benchmark.isClassOf`](#Benchmark.isClassOf)
* [`Benchmark.isHostType`](#Benchmark.isHostType)
* [`Benchmark.join`](#Benchmark.join)
* [`Benchmark.map`](#Benchmark.map)
* [`Benchmark.noop`](#Benchmark.noop)
* [`Benchmark.pluck`](#Benchmark.pluck)
* [`Benchmark.reduce`](#Benchmark.reduce)
* [`Benchmark.trim`](#Benchmark.trim)
<!-- /div -->
<!-- div -->
## `Benchmark.prototype`
* [`Benchmark#CYCLE_DELAY`](#Benchmark:CYCLE_DELAY)
* [`Benchmark#DEFAULT_ASYNC`](#Benchmark:DEFAULT_ASYNC)
* [`Benchmark#INIT_RUN_COUNT`](#Benchmark:INIT_RUN_COUNT)
* [`Benchmark#MAX_TIME_ELAPSED`](#Benchmark:MAX_TIME_ELAPSED)
* [`Benchmark#MIN_SAMPLE_SIZE`](#Benchmark:MIN_SAMPLE_SIZE)
* [`Benchmark#MIN_TIME`](#Benchmark:MIN_TIME)
* [`Benchmark#aborted`](#Benchmark:aborted)
* [`Benchmark#count`](#Benchmark:count)
* [`Benchmark#created`](#Benchmark:created)
* [`Benchmark#cycles`](#Benchmark:cycles)
* [`Benchmark#error`](#Benchmark:error)
* [`Benchmark#hz`](#Benchmark:hz)
* [`Benchmark#running`](#Benchmark:running)
* [`Benchmark#abort`](#Benchmark:abort)
* [`Benchmark#addListener`](#Benchmark:addListener)
* [`Benchmark#clone`](#Benchmark:clone)
* [`Benchmark#compare`](#Benchmark:compare)
* [`Benchmark#emit`](#Benchmark:emit)
* [`Benchmark#on`](#Benchmark:on)
* [`Benchmark#removeAllListeners`](#Benchmark:removeAllListeners)
* [`Benchmark#removeListener`](#Benchmark:removeListener)
* [`Benchmark#reset`](#Benchmark:reset)
* [`Benchmark#run`](#Benchmark:run)
* [`Benchmark#toString`](#Benchmark:toString)
* [`Benchmark#stats`](#Benchmark:stats)
* [`Benchmark#stats.ME`](#Benchmark:stats.ME)
* [`Benchmark#stats.RME`](#Benchmark:stats.RME)
* [`Benchmark#stats.SEM`](#Benchmark:stats.SEM)
* [`Benchmark#stats.deviation`](#Benchmark:stats.deviation)
* [`Benchmark#stats.mean`](#Benchmark:stats.mean)
* [`Benchmark#stats.size`](#Benchmark:stats.size)
* [`Benchmark#stats.variance`](#Benchmark:stats.variance)
* [`Benchmark#times`](#Benchmark:times)
* [`Benchmark#times.cycle`](#Benchmark:times.cycle)
* [`Benchmark#times.elapsed`](#Benchmark:times.elapsed)
* [`Benchmark#times.period`](#Benchmark:times.period)
* [`Benchmark#times.start`](#Benchmark:times.start)
* [`Benchmark#times.stop`](#Benchmark:times.stop)
<!-- /div -->
<!-- div -->
## `Benchmark.Suite`
* [`Benchmark.Suite`](#Benchmark.Suite)
<!-- /div -->
<!-- div -->
## `Benchmark.Suite.prototype`
* [`Benchmark.Suite#aborted`](#Benchmark.Suite:aborted)
* [`Benchmark.Suite#length`](#Benchmark.Suite:length)
* [`Benchmark.Suite#running`](#Benchmark.Suite:running)
* [`Benchmark.Suite#abort`](#Benchmark.Suite:abort)
* [`Benchmark.Suite#add`](#Benchmark.Suite:add)
* [`Benchmark.Suite#addListener`](#Benchmark.Suite:addListener)
* [`Benchmark.Suite#clone`](#Benchmark.Suite:clone)
* [`Benchmark.Suite#each`](#Benchmark.Suite:each)
* [`Benchmark.Suite#emit`](#Benchmark.Suite:emit)
* [`Benchmark.Suite#filter`](#Benchmark.Suite:filter)
* [`Benchmark.Suite#indexOf`](#Benchmark.Suite:indexOf)
* [`Benchmark.Suite#invoke`](#Benchmark.Suite:invoke)
* [`Benchmark.Suite#map`](#Benchmark.Suite:map)
* [`Benchmark.Suite#on`](#Benchmark.Suite:on)
* [`Benchmark.Suite#pluck`](#Benchmark.Suite:pluck)
* [`Benchmark.Suite#reduce`](#Benchmark.Suite:reduce)
* [`Benchmark.Suite#removeAllListeners`](#Benchmark.Suite:removeAllListeners)
* [`Benchmark.Suite#removeListener`](#Benchmark.Suite:removeListener)
* [`Benchmark.Suite#reset`](#Benchmark.Suite:reset)
* [`Benchmark.Suite#run`](#Benchmark.Suite:run)
<!-- /div -->
<!-- /div -->


<!-- div -->
<!-- div -->
## `Benchmark`
<!-- div -->
### <a id="Benchmark" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L116" title="View in source">`Benchmark(name, fn [, options={}])`</a>
Benchmark constructor.
[&#9650;][1]

#### Arguments
1. `name` *(String)*: A name to identify the benchmark.
2. `fn` *(Function)*: The test to benchmark.
3. `[options={}]` *(Object)*: Options object.

#### Example
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
<!-- /div -->

<!-- div -->
### <a id="Benchmark.platform" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1484" title="View in source">`Benchmark.platform`</a>
*(Object)*: Platform object containing browser name, version, and operating system.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark.version" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1671" title="View in source">`Benchmark.version`</a>
*(String)*: The version number.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark.each" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L482" title="View in source">`Benchmark.each(array, callback)`</a>
A generic bare-bones `Array#forEach` solution.
Callbacks may terminate the loop by explicitly returning `false`.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Array)*: The array iterated over.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.extend" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L502" title="View in source">`Benchmark.extend(destination [, source={}])`</a>
Copies own/inherited properties of a source object to the destination object.
[&#9650;][1]

#### Arguments
1. `destination` *(Object)*: The destination object.
2. `[source={}]` *(Object)*: The source object.

#### Returns
*(Object)*: The destination object.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.filter" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L533" title="View in source">`Benchmark.filter(array, callback)`</a>
A generic bare-bones `Array#filter` solution.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function|String)*: The function/alias called per iteration.

#### Returns
*(Array)*: A new array of values that passed callback filter.

#### Example
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
<!-- /div -->

<!-- div -->
### <a id="Benchmark.forIn" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L563" title="View in source">`Benchmark.forIn(object, callback)`</a>
A generic bare-bones for-in solution for an object's own properties.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Object)*: The object iterated over.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.formatNumber" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L579" title="View in source">`Benchmark.formatNumber(number)`</a>
Converts a number to a more readable comma-separated string representation.
[&#9650;][1]

#### Arguments
1. `number` *(Number)*: The number to convert.

#### Returns
*(String)*: The more readable string representation.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.hasKey" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L597" title="View in source">`Benchmark.hasKey(object, key)`</a>
Checks if an object has the specified key as a direct property.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object to check.
2. `key` *(String)*: The key to check for.

#### Returns
*(Boolean)*: Returns `true` if key is a direct property, else `false`.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.indexOf" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L626" title="View in source">`Benchmark.indexOf(array, value)`</a>
A generic bare-bones `Array#indexOf` solution.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `value` *(Mixed)*: The value to search for.

#### Returns
*(Number)*: The index of the matched value or `-1`.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.interpolate" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L772" title="View in source">`Benchmark.interpolate(string, object)`</a>
Modify a string by replacing named tokens with matching object property values.
[&#9650;][1]

#### Arguments
1. `string` *(String)*: The string to modify.
2. `object` *(Object)*: The template object.

#### Returns
*(String)*: The modified string.

#### Example
    Benchmark.interpolate('#{greet} #{who}!', {
      'greet': 'Hello',
      'who': 'world'
    }); // -> 'Hello world!'
<!-- /div -->

<!-- div -->
### <a id="Benchmark.invoke" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L675" title="View in source">`Benchmark.invoke(benches, name [, arg1, arg2, ...])`</a>
Invokes a method on all items in an array.
[&#9650;][1]

#### Arguments
1. `benches` *(Array)*: Array of benchmarks to iterate over.
2. `name` *(String|Object)*: The name of the method to invoke OR options object.
3. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the method with.

#### Returns
*(Array)*: A new array of values returned from each method invoked.

#### Example
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
<!-- /div -->

<!-- div -->
### <a id="Benchmark.isArray" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L787" title="View in source">`Benchmark.isArray(value)`</a>
Determines if the given value is an array.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns true if value is an array, else false.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.isClassOf" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L799" title="View in source">`Benchmark.isClassOf(object, name)`</a>
Checks if an object is of the specified class.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object.
2. `name` *(String)*: The name of the class.

#### Returns
*(Boolean)*: Returns true if of the class, else false.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.isHostType" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L813" title="View in source">`Benchmark.isHostType(object, property)`</a>
Host objects can return type values that are different from their actual
data type. The objects we are concerned with usually return non-primitive
types of object, function, or unknown.
[&#9650;][1]

#### Arguments
1. `object` *(Mixed)*: The owner of the property.
2. `property` *(String)*: The property to check.

#### Returns
*(Boolean)*: Returns true if the property value is a non-primitive, else false.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.join" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L827" title="View in source">`Benchmark.join(object [, separator1=',', separator2=': '])`</a>
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
### <a id="Benchmark.map" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L849" title="View in source">`Benchmark.map(array, callback)`</a>
A generic bare-bones `Array#map` solution.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Array)*: A new array of values returned by the callback.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.noop" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L861" title="View in source">`Benchmark.noop`</a>
A no-operation function.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark.pluck" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L873" title="View in source">`Benchmark.pluck(array, property)`</a>
Retrieves the value of a specified property from all items in an array.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `property` *(String)*: The property to pluck.

#### Returns
*(Array)*: A new array of property values.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.reduce" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L888" title="View in source">`Benchmark.reduce(array, callback, accumulator)`</a>
A generic bare-bones `Array#reduce` solution.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `accumulator` *(Mixed)*: Initial value of the accumulator.

#### Returns
*(Mixed)*: The accumulator.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.trim" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L902" title="View in source">`Benchmark.trim(string)`</a>
A generic bare-bones `String#trim` solution.
[&#9650;][1]

#### Arguments
1. `string` *(String)*: The string to trim.

#### Returns
*(String)*: The trimmed string.
<!-- /div -->
<!-- /div -->


<!-- div -->
## `Benchmark.prototype`
<!-- div -->
### <a id="Benchmark:CYCLE_DELAY" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1740" title="View in source">`Benchmark#CYCLE_DELAY`</a>
*(Number)*: The delay between test cycles *(secs)*.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:DEFAULT_ASYNC" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1747" title="View in source">`Benchmark#DEFAULT_ASYNC`</a>
*(Boolean)*: A flag to indicate methods will run asynchronously by default.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:INIT_RUN_COUNT" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1754" title="View in source">`Benchmark#INIT_RUN_COUNT`</a>
*(Number)*: The default number of times to execute a test on a benchmark's first cycle.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:MAX_TIME_ELAPSED" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1761" title="View in source">`Benchmark#MAX_TIME_ELAPSED`</a>
*(Number)*: The maximum time a benchmark is allowed to run before finishing *(secs)*.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:MIN_SAMPLE_SIZE" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1768" title="View in source">`Benchmark#MIN_SAMPLE_SIZE`</a>
*(Number)*: The minimum sample size required to perform statistical analysis.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:MIN_TIME" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1775" title="View in source">`Benchmark#MIN_TIME`</a>
*(Number)*: The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:aborted" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1817" title="View in source">`Benchmark#aborted`</a>
*(Boolean)*: A flag to indicate if the benchmark is aborted.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:count" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1782" title="View in source">`Benchmark#count`</a>
*(Number)*: The number of times a test was executed.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:created" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1789" title="View in source">`Benchmark#created`</a>
*(Number)*: A timestamp of when the benchmark was created.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:cycles" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1796" title="View in source">`Benchmark#cycles`</a>
*(Number)*: The number of cycles performed while benchmarking.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:error" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1803" title="View in source">`Benchmark#error`</a>
*(Object|Null)*: The error object if the test failed.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:hz" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1810" title="View in source">`Benchmark#hz`</a>
*(Number)*: The number of executions per second.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:running" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1824" title="View in source">`Benchmark#running`</a>
*(Boolean)*: A flag to indicate if the benchmark is running.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:abort" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1140" title="View in source">`Benchmark#abort`</a>
Aborts the benchmark without recording times.
[&#9650;][1]

#### Returns
*(Object)*: The benchmark instance.
<!-- /div -->

<!-- div -->
### <a id="Benchmark:addListener" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1051" title="View in source">`Benchmark#addListener(type, listener)`</a>
Registers a single listener of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function called when the event occurs.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    bench.addListener('cycle', listener);

    // register a listener for multiple event types
    bench.addListener('start cycle', listener);
<!-- /div -->

<!-- div -->
### <a id="Benchmark:clone" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1168" title="View in source">`Benchmark#clone(options)`</a>
Creates a new benchmark using the same test and options.
[&#9650;][1]

#### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Object)*: The new benchmark instance.

#### Example
    var bizarro = bench.clone({
      'name': 'doppelganger'
    });
<!-- /div -->

<!-- div -->
### <a id="Benchmark:compare" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1186" title="View in source">`Benchmark#compare(other)`</a>
Determines if the benchmark's period is smaller than another.
[&#9650;][1]

#### Arguments
1. `other` *(Object)*: The benchmark to compare.

#### Returns
*(Number)*: Returns `1` if smaller, `-1` if larger, and `0` if indeterminate.
<!-- /div -->

<!-- div -->
### <a id="Benchmark:emit" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1066" title="View in source">`Benchmark#emit(type)`</a>
Executes all registered listeners of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
<!-- /div -->

<!-- div -->
### <a id="Benchmark:on" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1830" title="View in source">`Benchmark#on`</a>
Alias of [`Benchmark#addListener`](#Benchmark:addListener).
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:removeAllListeners" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1123" title="View in source">`Benchmark#removeAllListeners(type)`</a>
Unregisters all listeners of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    bench.removeAllListeners('cycle');

    // unregister all listeners for multiple event types
    bench.removeListener('start cycle');
<!-- /div -->

<!-- div -->
### <a id="Benchmark:removeListener" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1096" title="View in source">`Benchmark#removeListener(type, listener)`</a>
Unregisters a single listener of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    bench.removeListener('cycle', listener);

    // unregister a listener for multiple event types
    bench.removeListener('start cycle', listener);
<!-- /div -->

<!-- div -->
### <a id="Benchmark:reset" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1206" title="View in source">`Benchmark#reset`</a>
Reset properties and abort if running.
[&#9650;][1]

#### Returns
*(Object)*: The benchmark instance.
<!-- /div -->

<!-- div -->
### <a id="Benchmark:run" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1390" title="View in source">`Benchmark#run([async=false])`</a>
Runs the benchmark.
[&#9650;][1]

#### Arguments
1. `[async=false]` *(Boolean)*: Flag to run asynchronously.

#### Returns
*(Object)*: The benchmark instance.
<!-- /div -->

<!-- div -->
### <a id="Benchmark:toString" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1248" title="View in source">`Benchmark#toString`</a>
Displays relevant benchmark information when coerced to a string.
[&#9650;][1]

#### Returns
*(String)*: A string representation of the benchmark instance.
<!-- /div -->

<!-- div -->
### <a id="Benchmark:stats" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1837" title="View in source">`Benchmark#stats`</a>
*(Object)*: An object of stats including mean, margin or error, and standard deviation.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:stats.ME" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1844" title="View in source">`Benchmark#stats.ME`</a>
*(Number)*: The margin of error.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:stats.RME" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1851" title="View in source">`Benchmark#stats.RME`</a>
*(Number)*: The relative margin of error *(expressed as a percentage of the mean)*.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:stats.SEM" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1858" title="View in source">`Benchmark#stats.SEM`</a>
*(Number)*: The standard error of the mean.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:stats.deviation" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1865" title="View in source">`Benchmark#stats.deviation`</a>
*(Number)*: The sample standard deviation.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:stats.mean" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1872" title="View in source">`Benchmark#stats.mean`</a>
*(Number)*: The sample arithmetic mean.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:stats.size" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1879" title="View in source">`Benchmark#stats.size`</a>
*(Number)*: The sample size.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:stats.variance" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1886" title="View in source">`Benchmark#stats.variance`</a>
*(Number)*: The sample variance.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:times" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1894" title="View in source">`Benchmark#times`</a>
*(Object)*: An object of timing data including cycle, elapsed, period, start, and stop.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:times.cycle" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1901" title="View in source">`Benchmark#times.cycle`</a>
*(Number)*: The time taken to complete the last cycle *(secs)*
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:times.elapsed" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1908" title="View in source">`Benchmark#times.elapsed`</a>
*(Number)*: The time taken to complete the benchmark *(secs)*.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:times.period" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1915" title="View in source">`Benchmark#times.period`</a>
*(Number)*: The time taken to execute the test once *(secs)*.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:times.start" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1922" title="View in source">`Benchmark#times.start`</a>
*(Number)*: A timestamp of when the benchmark started *(ms)*.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark:times.stop" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1929" title="View in source">`Benchmark#times.stop`</a>
*(Number)*: A timestamp of when the benchmark finished *(ms)*.
[&#9650;][1]
<!-- /div -->
<!-- /div -->


<!-- div -->
## `Benchmark.Suite`
<!-- div -->
### <a id="Benchmark.Suite" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L173" title="View in source">`Benchmark.Suite(name [, options={}])`</a>
Suite constructor.
[&#9650;][1]

#### Arguments
1. `name` *(String)*: A name to identify the suite.
2. `[options={}]` *(Object)*: Options object.

#### Example
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
<!-- /div -->
<!-- /div -->


<!-- div -->
## `Benchmark.Suite.prototype`
<!-- div -->
### <a id="Benchmark.Suite:aborted" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1982" title="View in source">`Benchmark.Suite#aborted`</a>
*(Boolean)*: A flag to indicate if the suite is aborted.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:length" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1975" title="View in source">`Benchmark.Suite#length`</a>
*(Number)*: The number of benchmarks in the suite.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:running" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1989" title="View in source">`Benchmark.Suite#running`</a>
*(Boolean)*: A flag to indicate if the suite is running.
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:abort" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L914" title="View in source">`Benchmark.Suite#abortSuite`</a>
Aborts all benchmarks in the suite.
[&#9650;][1]

#### Returns
*(Object)*: The suite instance.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:add" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L944" title="View in source">`Benchmark.Suite#add(name, fn [, options={}])`</a>
Adds a test to the benchmark suite.
[&#9650;][1]

#### Arguments
1. `name` *(String)*: A name to identify the benchmark.
2. `fn` *(Function)*: The test to benchmark.
3. `[options={}]` *(Object)*: Options object.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    suite.add(fn);

    // or using a name first
    suite.add('foo', fn);

    // or with options
    suite.add('foo', fn, {
      'onCycle': onCycle,
      'onComplete': onComplete
    });
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:addListener" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1051" title="View in source">`Benchmark.Suite#addListener(type, listener)`</a>
Registers a single listener of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function called when the event occurs.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    bench.addListener('cycle', listener);

    // register a listener for multiple event types
    bench.addListener('start cycle', listener);
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:clone" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L961" title="View in source">`Benchmark.Suite#cloneSuite(options)`</a>
Creates a new suite with cloned benchmarks.
[&#9650;][1]

#### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Object)*: The new suite instance.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:each" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1998" title="View in source">`Benchmark.Suite#each(callback)`</a>
A bare-bones `Array#forEach` solution.
Callbacks may terminate the loop by explicitly returning `false`.
[&#9650;][1]

#### Arguments
1. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Object)*: The suite iterated over.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:emit" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1066" title="View in source">`Benchmark.Suite#emit(type)`</a>
Executes all registered listeners of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:filter" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L980" title="View in source">`Benchmark.Suite#filterSuite(callback)`</a>
A bare-bones `Array#filter` solution.
[&#9650;][1]

#### Arguments
1. `callback` *(Function|String)*: The function/alias called per iteration.

#### Returns
*(Object)*: A new suite of benchmarks that passed callback filter.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:indexOf" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2006" title="View in source">`Benchmark.Suite#indexOf(value)`</a>
A bare-bones `Array#indexOf` solution.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to search for.

#### Returns
*(Number)*: The index of the matched value or `-1`.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:invoke" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2015" title="View in source">`Benchmark.Suite#invoke(name [, arg1, arg2, ...])`</a>
Invokes a method on all benchmarks in the suite.
[&#9650;][1]

#### Arguments
1. `name` *(String|Object)*: The name of the method to invoke OR options object.
2. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the method with.

#### Returns
*(Array)*: A new array of values returned from each method invoked.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:map" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2023" title="View in source">`Benchmark.Suite#map(callback)`</a>
A bare-bones `Array#map` solution.
[&#9650;][1]

#### Arguments
1. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Array)*: A new array of values returned by the callback.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:on" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1830" title="View in source">`Benchmark.Suite#on`</a>
Alias of [`Benchmark#addListener`](#Benchmark:addListener).
[&#9650;][1]
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:pluck" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2031" title="View in source">`Benchmark.Suite#pluck(property)`</a>
Retrieves the value of a specified property from all benchmarks in the suite.
[&#9650;][1]

#### Arguments
1. `property` *(String)*: The property to pluck.

#### Returns
*(Array)*: A new array of property values.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:reduce" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L2040" title="View in source">`Benchmark.Suite#reduce(callback, accumulator)`</a>
A bare-bones `Array#reduce` solution.
[&#9650;][1]

#### Arguments
1. `callback` *(Function)*: The function called per iteration.
2. `accumulator` *(Mixed)*: Initial value of the accumulator.

#### Returns
*(Mixed)*: The accumulator.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:removeAllListeners" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1123" title="View in source">`Benchmark.Suite#removeAllListeners(type)`</a>
Unregisters all listeners of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    bench.removeAllListeners('cycle');

    // unregister all listeners for multiple event types
    bench.removeListener('start cycle');
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:removeListener" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1096" title="View in source">`Benchmark.Suite#removeListener(type, listener)`</a>
Unregisters a single listener of a specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The benchmark instance.

#### Example
    // basic usage
    bench.removeListener('cycle', listener);

    // unregister a listener for multiple event types
    bench.removeListener('start cycle', listener);
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:reset" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L994" title="View in source">`Benchmark.Suite#resetSuite`</a>
Resets all benchmarks in the suite.
[&#9650;][1]

#### Returns
*(Object)*: The suite instance.
<!-- /div -->

<!-- div -->
### <a id="Benchmark.Suite:run" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1010" title="View in source">`Benchmark.Suite#runSuite([async=false, queued=false])`</a>
Runs the suite.
[&#9650;][1]

#### Arguments
1. `[async=false]` *(Boolean)*: Flag to run asynchronously.
2. `[queued=false]` *(Boolean)*: Flag to treat benchmarks as a queue.

#### Returns
*(Object)*: The suite instance.
<!-- /div -->
<!-- /div -->
<!-- /div -->

  [1]: #readme "Jump back to the TOC."