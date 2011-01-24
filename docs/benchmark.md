# Benchmark
* [`Benchmark`](#Benchmark)
* [`Benchmark.platform`](#static-platform)
* [`Benchmark.version`](#static-version)
* [`Benchmark.each`](#static-each)
* [`Benchmark.extend`](#static-extend)
* [`Benchmark.filter`](#static-filter)
* [`Benchmark.forIn`](#static-forIn)
* [`Benchmark.formatNumber`](#static-formatNumber)
* [`Benchmark.hasKey`](#static-hasKey)
* [`Benchmark.indexOf`](#static-indexOf)
* [`Benchmark.interpolate`](#static-interpolate)
* [`Benchmark.invoke`](#static-invoke)
* [`Benchmark.isArray`](#static-isArray)
* [`Benchmark.isClassOf`](#static-isClassOf)
* [`Benchmark.isHostType`](#static-isHostType)
* [`Benchmark.join`](#static-join)
* [`Benchmark.map`](#static-map)
* [`Benchmark.noop`](#static-noop)
* [`Benchmark.pluck`](#static-pluck)
* [`Benchmark.reduce`](#static-reduce)
* [`Benchmark.trim`](#static-trim)

# Benchmark.prototype
* [`Benchmark#CYCLE_DELAY`](#CYCLE_DELAY)
* [`Benchmark#DEFAULT_ASYNC`](#DEFAULT_ASYNC)
* [`Benchmark#INIT_RUN_COUNT`](#INIT_RUN_COUNT)
* [`Benchmark#MAX_TIME_ELAPSED`](#MAX_TIME_ELAPSED)
* [`Benchmark#ME`](#ME)
* [`Benchmark#MIN_SAMPLE_SIZE`](#MIN_SAMPLE_SIZE)
* [`Benchmark#MIN_TIME`](#MIN_TIME)
* [`Benchmark#RME`](#RME)
* [`Benchmark#SEM`](#SEM)
* [`Benchmark#aborted`](#aborted)
* [`Benchmark#count`](#count)
* [`Benchmark#created`](#created)
* [`Benchmark#cycle`](#cycle)
* [`Benchmark#cycles`](#cycles)
* [`Benchmark#deviation`](#deviation)
* [`Benchmark#elapsed`](#elapsed)
* [`Benchmark#error`](#error)
* [`Benchmark#hz`](#hz)
* [`Benchmark#mean`](#mean)
* [`Benchmark#period`](#period)
* [`Benchmark#running`](#running)
* [`Benchmark#size`](#size)
* [`Benchmark#start`](#start)
* [`Benchmark#stats`](#stats)
* [`Benchmark#stop`](#stop)
* [`Benchmark#times`](#times)
* [`Benchmark#variance`](#variance)
* [`Benchmark#abort`](#abort)
* [`Benchmark#addListener`](#addListener)
* [`Benchmark#clone`](#clone)
* [`Benchmark#compare`](#compare)
* [`Benchmark#emit`](#emit)
* [`Benchmark#on`](#on)
* [`Benchmark#removeAllListeners`](#removeAllListeners)
* [`Benchmark#removeListener`](#removeListener)
* [`Benchmark#reset`](#reset)
* [`Benchmark#run`](#run)
* [`Benchmark#toString`](#toString)

# Benchmark.Suite
* [`Benchmark.Suite`](#Suite)

# Benchmark.Suite.prototype
* [`Benchmark.Suite#aborted`](#aborted)
* [`Benchmark.Suite#length`](#length)
* [`Benchmark.Suite#running`](#running)
* [`Benchmark.Suite#abort`](#abort)
* [`Benchmark.Suite#add`](#add)
* [`Benchmark.Suite#addListener`](#addListener)
* [`Benchmark.Suite#clone`](#clone)
* [`Benchmark.Suite#each`](#each)
* [`Benchmark.Suite#emit`](#emit)
* [`Benchmark.Suite#filter`](#filter)
* [`Benchmark.Suite#indexOf`](#indexOf)
* [`Benchmark.Suite#invoke`](#invoke)
* [`Benchmark.Suite#map`](#map)
* [`Benchmark.Suite#on`](#on)
* [`Benchmark.Suite#pluck`](#pluck)
* [`Benchmark.Suite#reduce`](#reduce)
* [`Benchmark.Suite#removeAllListeners`](#removeAllListeners)
* [`Benchmark.Suite#removeListener`](#removeListener)
* [`Benchmark.Suite#reset`](#reset)
* [`Benchmark.Suite#run`](#run)

# Benchmark
## <a name="Benchmark" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L117" title="View in source">Benchmark(name, fn, options)</a>
Benchmark constructor.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `name` *(String)*: A name to identify the benchmark.
2. `fn` *(Function)*: The test to benchmark.
3. `[options={}]` *(Object)*: Options object.

### Example
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

## <a name="static-platform" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1449" title="View in source">Benchmark.platform</a>
*(Boolean)*: Platform object containing browser name, version, and operating system.
<sup><code>[&#9650;][1]</code></sup>

## <a name="static-version" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1622" title="View in source">Benchmark.version</a>
*(String)*: The version number.
<sup><code>[&#9650;][1]</code></sup>

## <a name="static-each" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L447" title="View in source">Benchmark.each(array, callback)</a>
A generic bare-bones `Array#forEach` solution.
Callbacks may terminate the loop by explicitly returning `false`.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.

### Returns
*(Array)*: The array iterated over.

## <a name="static-extend" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L467" title="View in source">Benchmark.extend(destination, source)</a>
Copies own/inherited properties of a source object to the destination object.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `destination` *(Object)*: The destination object.
2. `[source={}]` *(Object)*: The source object.

### Returns
*(Object)*: The destination object.

## <a name="static-filter" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L498" title="View in source">Benchmark.filter(array, callback)</a>
A generic bare-bones `Array#filter` solution.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function|String)*: The function/alias called per iteration.

### Returns
*(Array)*: A new array of values that passed callback filter.

### Example
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

## <a name="static-forIn" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L528" title="View in source">Benchmark.forIn(object, callback)</a>
A generic bare-bones for-in solution for an object's own properties.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `callback` *(Function)*: The function called per iteration.

### Returns
*(Object)*: The object iterated over.

## <a name="static-formatNumber" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L544" title="View in source">Benchmark.formatNumber(number)</a>
Converts a number to a more readable comma-separated string representation.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `number` *(Number)*: The number to convert.

### Returns
*(String)*: The more readable string representation.

## <a name="static-hasKey" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L562" title="View in source">Benchmark.hasKey(object, key)</a>
Checks if an object has the specified key as a direct property.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `object` *(Object)*: The object to check.
2. `key` *(String)*: The key to check for.

### Returns
*(Boolean)*: Returns `true` if key is a direct property, else `false`.

## <a name="static-indexOf" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L591" title="View in source">Benchmark.indexOf(array, value)</a>
A generic bare-bones `Array#indexOf` solution.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `value` *(Mixed)*: The value to search for.

### Returns
*(Number)*: The index of the matched value or `-1`.

## <a name="static-interpolate" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L737" title="View in source">Benchmark.interpolate(string, object)</a>
Modify a string by replacing named tokens with matching object property values.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `string` *(String)*: The string to modify.
2. `object` *(Object)*: The template object.

### Returns
*(String)*: The modified string.

### Example
    Benchmark.interpolate('#{greet} #{who}!', {
      'greet': 'Hello',
      'who': 'world'
    }); // -> 'Hello world!'

## <a name="static-invoke" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L640" title="View in source">Benchmark.invoke(benches, name)</a>
Invokes a method on all items in an array.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `benches` *(Array)*: Array of benchmarks to iterate over.
2. `name` *(String|Object)*: The name of the method to invoke OR options object.
3. `[, arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the method with.

### Returns
*(Array)*: A new array of values returned from each method invoked.

### Example
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

## <a name="static-isArray" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L752" title="View in source">Benchmark.isArray(value)</a>
Determines if the given value is an array.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `value` *(Mixed)*: The value to check.

### Returns
*(Boolean)*: Returns true if value is an array, else false.

## <a name="static-isClassOf" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L764" title="View in source">Benchmark.isClassOf(object, name)</a>
Checks if an object is of the specified class.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `object` *(Object)*: The object.
2. `name` *(String)*: The name of the class.

### Returns
*(Boolean)*: Returns true if of the class, else false.

## <a name="static-isHostType" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L778" title="View in source">Benchmark.isHostType(object, property)</a>
Host objects can return type values that are different from their actual
data type. The objects we are concerned with usually return non-primitive
types of object, function, or unknown.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `object` *(Mixed)*: The owner of the property.
2. `property` *(String)*: The property name to check.

### Returns
*(Boolean)*: Returns true if the property value is a non-primitive, else false.

## <a name="static-join" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L792" title="View in source">Benchmark.join(object, separator1, separator2)</a>
Creates a string of joined array values or object key-value pairs.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `object` *(Array|Object)*: The object to operate on.
2. `[separator1=',']` *(String)*: The separator used between key-value pairs.
3. `[separator2=': ']` *(String)*: The separator used between keys and values.

### Returns
*(String)*: The joined result.

## <a name="static-map" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L814" title="View in source">Benchmark.map(array, callback)</a>
A generic bare-bones `Array#map` solution.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.

### Returns
*(Array)*: A new array of values returned by the callback.

## <a name="static-noop" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L826" title="View in source">Benchmark.noop()</a>
A no-operation function.
<sup><code>[&#9650;][1]</code></sup>

## <a name="static-pluck" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L838" title="View in source">Benchmark.pluck(array, property)</a>
Retrieves the value of a specified property from all items in an array.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `property` *(String)*: The property to pluck.

### Returns
*(Array)*: A new array of property values.

## <a name="static-reduce" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L853" title="View in source">Benchmark.reduce(array, callback, accumulator)</a>
A generic bare-bones `Array#reduce` solution.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `accumulator` *(Mixed)*: Initial value of the accumulator.

### Returns
*(Mixed)*: The accumulator.

## <a name="static-trim" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L867" title="View in source">Benchmark.trim(string)</a>
A generic bare-bones `String#trim` solution.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `string` *(String)*: The string to trim.

### Returns
*(String)*: The trimmed string.


# Benchmark.prototype
## <a name="CYCLE_DELAY" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1691" title="View in source">Benchmark#CYCLE_DELAY</a>
*(Number)*: The delay between test cycles *(secs)*.
<sup><code>[&#9650;][1]</code></sup>

## <a name="DEFAULT_ASYNC" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1698" title="View in source">Benchmark#DEFAULT_ASYNC</a>
*(Boolean)*: A flag to indicate methods will run asynchronously by default.
<sup><code>[&#9650;][1]</code></sup>

## <a name="INIT_RUN_COUNT" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1705" title="View in source">Benchmark#INIT_RUN_COUNT</a>
*(Number)*: The default number of times to execute a test on a benchmark's first cycle.
<sup><code>[&#9650;][1]</code></sup>

## <a name="MAX_TIME_ELAPSED" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1712" title="View in source">Benchmark#MAX_TIME_ELAPSED</a>
*(Number)*: The maximum time a benchmark is allowed to run before finishing *(secs)*.
<sup><code>[&#9650;][1]</code></sup>

## <a name="ME" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1795" title="View in source">Benchmark#ME</a>
*(Number)*: The margin of error.
<sup><code>[&#9650;][1]</code></sup>

## <a name="MIN_SAMPLE_SIZE" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1719" title="View in source">Benchmark#MIN_SAMPLE_SIZE</a>
*(Number)*: The minimum sample size required to perform statistical analysis.
<sup><code>[&#9650;][1]</code></sup>

## <a name="MIN_TIME" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1726" title="View in source">Benchmark#MIN_TIME</a>
*(Number)*: The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*.
<sup><code>[&#9650;][1]</code></sup>

## <a name="RME" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1802" title="View in source">Benchmark#RME</a>
*(Number)*: The relative margin of error *(expressed as a percentage of the mean)*.
<sup><code>[&#9650;][1]</code></sup>

## <a name="SEM" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1809" title="View in source">Benchmark#SEM</a>
*(Number)*: The standard error of the mean.
<sup><code>[&#9650;][1]</code></sup>

## <a name="aborted" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1768" title="View in source">Benchmark#aborted</a>
*(Boolean)*: A flag to indicate if the benchmark is aborted.
<sup><code>[&#9650;][1]</code></sup>

## <a name="count" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1733" title="View in source">Benchmark#count</a>
*(Number)*: The number of times a test was executed.
<sup><code>[&#9650;][1]</code></sup>

## <a name="created" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1740" title="View in source">Benchmark#created</a>
*(Number)*: A timestamp of when the benchmark was created.
<sup><code>[&#9650;][1]</code></sup>

## <a name="cycle" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1852" title="View in source">Benchmark#cycle</a>
*(Number)*: The time taken to complete the last cycle *(secs)*
<sup><code>[&#9650;][1]</code></sup>

## <a name="cycles" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1747" title="View in source">Benchmark#cycles</a>
*(Number)*: The number of cycles performed while benchmarking.
<sup><code>[&#9650;][1]</code></sup>

## <a name="deviation" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1816" title="View in source">Benchmark#deviation</a>
*(Number)*: The sample standard deviation.
<sup><code>[&#9650;][1]</code></sup>

## <a name="elapsed" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1859" title="View in source">Benchmark#elapsed</a>
*(Number)*: The time taken to complete the benchmark *(secs)*.
<sup><code>[&#9650;][1]</code></sup>

## <a name="error" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1754" title="View in source">Benchmark#error</a>
*(Object|Null)*: The error object if the test failed.
<sup><code>[&#9650;][1]</code></sup>

## <a name="hz" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1761" title="View in source">Benchmark#hz</a>
*(Number)*: The number of executions per second.
<sup><code>[&#9650;][1]</code></sup>

## <a name="mean" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1823" title="View in source">Benchmark#mean</a>
*(Number)*: The sample arithmetic mean.
<sup><code>[&#9650;][1]</code></sup>

## <a name="period" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1866" title="View in source">Benchmark#period</a>
*(Number)*: The time taken to execute the test once *(secs)*.
<sup><code>[&#9650;][1]</code></sup>

## <a name="running" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1775" title="View in source">Benchmark#running</a>
*(Boolean)*: A flag to indicate if the benchmark is running.
<sup><code>[&#9650;][1]</code></sup>

## <a name="size" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1830" title="View in source">Benchmark#size</a>
*(Number)*: The sample size.
<sup><code>[&#9650;][1]</code></sup>

## <a name="start" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1873" title="View in source">Benchmark#start</a>
*(Number)*: A timestamp of when the benchmark started *(ms)*.
<sup><code>[&#9650;][1]</code></sup>

## <a name="stats" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1788" title="View in source">Benchmark#stats</a>
*(Object)*: An object of stats including mean, margin or error, and standard deviation.
<sup><code>[&#9650;][1]</code></sup>

## <a name="stop" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1880" title="View in source">Benchmark#stop</a>
*(Number)*: A timestamp of when the benchmark finished *(ms)*.
<sup><code>[&#9650;][1]</code></sup>

## <a name="times" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1845" title="View in source">Benchmark#times</a>
*(Object)*: An object of timing data including cycle, elapsed, period, start, and stop.
<sup><code>[&#9650;][1]</code></sup>

## <a name="variance" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1837" title="View in source">Benchmark#variance</a>
*(Number)*: The sample variance.
<sup><code>[&#9650;][1]</code></sup>

## <a name="abort" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1105" title="View in source">Benchmark#abort()</a>
Aborts the benchmark without recording times.
<sup><code>[&#9650;][1]</code></sup>

### Returns
*(Object)*: The benchmark instance.

## <a name="addListener" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1016" title="View in source">Benchmark#addListener(type, listener)</a>
Registers a single listener of a specified event type.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function called when the event occurs.

### Returns
*(Object)*: The benchmark instance.

### Example
    // basic usage
    bench.addListener('cycle', listener);

    // register a listener for multiple event types
    bench.addListener('start cycle', listener);

## <a name="clone" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1133" title="View in source">Benchmark#clone(options)</a>
Creates a new benchmark using the same test and options.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

### Returns
*(Object)*: The new benchmark instance.

### Example
    var bizarro = bench.clone({
      'name': 'doppelganger'
    });

## <a name="compare" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1151" title="View in source">Benchmark#compare(other)</a>
Determines if the benchmark's period is smaller than another.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `other` *(Object)*: The benchmark to compare.

### Returns
*(Number)*: Returns `1` if smaller, `-1` if larger, and `0` if indeterminate.

## <a name="emit" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1031" title="View in source">Benchmark#emit(type)</a>
Executes all registered listeners of a specified event type.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `type` *(String)*: The event type.

## <a name="on" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1781" title="View in source">Benchmark#on</a>
Alias of [`Benchmark#addListener`](#addListener).
<sup><code>[&#9650;][1]</code></sup>

## <a name="removeAllListeners" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1088" title="View in source">Benchmark#removeAllListeners(type)</a>
Unregisters all listeners of a specified event type.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `type` *(String)*: The event type.

### Returns
*(Object)*: The benchmark instance.

### Example
    // basic usage
    bench.removeAllListeners('cycle');

    // unregister all listeners for multiple event types
    bench.removeListener('start cycle');

## <a name="removeListener" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1061" title="View in source">Benchmark#removeListener(type, listener)</a>
Unregisters a single listener of a specified event type.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function to unregister.

### Returns
*(Object)*: The benchmark instance.

### Example
    // basic usage
    bench.removeListener('cycle', listener);

    // unregister a listener for multiple event types
    bench.removeListener('start cycle', listener);

## <a name="reset" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1171" title="View in source">Benchmark#reset()</a>
Reset properties and abort if running.
<sup><code>[&#9650;][1]</code></sup>

### Returns
*(Object)*: The benchmark instance.

## <a name="run" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1355" title="View in source">Benchmark#run(async)</a>
Runs the benchmark.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `[async=false]` *(Boolean)*: Flag to run asynchronously.

### Returns
*(Object)*: The benchmark instance.

## <a name="toString" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1212" title="View in source">Benchmark#toString()</a>
Displays relevant benchmark information when coerced to a string.
<sup><code>[&#9650;][1]</code></sup>


# Benchmark.Suite
## <a name="Suite" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L170" title="View in source">Benchmark.Suite(options)</a>
Suite constructor.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `[options={}]` *(Object)*: Options object.

### Example
    // basic usage
    var suite = new Benchmark.Suite;

    // or with options
    var suite = new Benchmark.Suite({

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


# Benchmark.Suite.prototype
## <a name="aborted" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1933" title="View in source">Benchmark.Suite#aborted</a>
*(Boolean)*: A flag to indicate if the suite is aborted.
<sup><code>[&#9650;][1]</code></sup>

## <a name="length" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1926" title="View in source">Benchmark.Suite#length</a>
*(Number)*: The number of benchmarks in the suite.
<sup><code>[&#9650;][1]</code></sup>

## <a name="running" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1940" title="View in source">Benchmark.Suite#running</a>
*(Boolean)*: A flag to indicate if the suite is running.
<sup><code>[&#9650;][1]</code></sup>

## <a name="abort" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L879" title="View in source">Benchmark.Suite#abortSuite()</a>
Aborts all benchmarks in the suite.
<sup><code>[&#9650;][1]</code></sup>

### Returns
*(Object)*: The suite instance.

## <a name="add" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L909" title="View in source">Benchmark.Suite#add(name, fn, options)</a>
Adds a test to the benchmark suite.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `name` *(String)*: A name to identify the benchmark.
2. `fn` *(Function)*: The test to benchmark.
3. `[options={}]` *(Object)*: Options object.

### Returns
*(Object)*: The benchmark instance.

### Example
    // basic usage
    suite.add(fn);

    // or using a name first
    suite.add('foo', fn);

    // or with options
    suite.add('foo', fn, {
      'onCycle': onCycle,
      'onComplete': onComplete
    });

## <a name="addListener" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1016" title="View in source">Benchmark.Suite#addListener(type, listener)</a>
Registers a single listener of a specified event type.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function called when the event occurs.

### Returns
*(Object)*: The benchmark instance.

### Example
    // basic usage
    bench.addListener('cycle', listener);

    // register a listener for multiple event types
    bench.addListener('start cycle', listener);

## <a name="clone" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L926" title="View in source">Benchmark.Suite#cloneSuite(options)</a>
Creates a new suite with cloned benchmarks.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

### Returns
*(Object)*: The new suite instance.

## <a name="each" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1949" title="View in source">Benchmark.Suite#each</a>
A bare-bones `Array#forEach` solution.
Callbacks may terminate the loop by explicitly returning `false`.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `callback` *(Function)*: The function called per iteration.

### Returns
*(Object)*: The suite iterated over.

## <a name="emit" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1031" title="View in source">Benchmark.Suite#emit(type)</a>
Executes all registered listeners of a specified event type.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `type` *(String)*: The event type.

## <a name="filter" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L945" title="View in source">Benchmark.Suite#filterSuite(callback)</a>
A bare-bones `Array#filter` solution.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `callback` *(Function|String)*: The function/alias called per iteration.

### Returns
*(Object)*: A new suite of benchmarks that passed callback filter.

## <a name="indexOf" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1957" title="View in source">Benchmark.Suite#indexOf</a>
A bare-bones `Array#indexOf` solution.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `value` *(Mixed)*: The value to search for.

### Returns
*(Number)*: The index of the matched value or `-1`.

## <a name="invoke" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1966" title="View in source">Benchmark.Suite#invoke</a>
Invokes a method on all benchmarks in the suite.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `name` *(String|Object)*: The name of the method to invoke OR options object.
2. `[, arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the method with.

### Returns
*(Array)*: A new array of values returned from each method invoked.

## <a name="map" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1974" title="View in source">Benchmark.Suite#map</a>
A bare-bones `Array#map` solution.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `callback` *(Function)*: The function called per iteration.

### Returns
*(Array)*: A new array of values returned by the callback.

## <a name="on" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1781" title="View in source">Benchmark.Suite#on</a>
Alias of [`Benchmark#addListener`](#addListener).
<sup><code>[&#9650;][1]</code></sup>

## <a name="pluck" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1982" title="View in source">Benchmark.Suite#pluck</a>
Retrieves the value of a specified property from all benchmarks in the suite.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `property` *(String)*: The property to pluck.

### Returns
*(Array)*: A new array of property values.

## <a name="reduce" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1991" title="View in source">Benchmark.Suite#reduce</a>
A bare-bones `Array#reduce` solution.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `callback` *(Function)*: The function called per iteration.
2. `accumulator` *(Mixed)*: Initial value of the accumulator.

### Returns
*(Mixed)*: The accumulator.

## <a name="removeAllListeners" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1088" title="View in source">Benchmark.Suite#removeAllListeners(type)</a>
Unregisters all listeners of a specified event type.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `type` *(String)*: The event type.

### Returns
*(Object)*: The benchmark instance.

### Example
    // basic usage
    bench.removeAllListeners('cycle');

    // unregister all listeners for multiple event types
    bench.removeListener('start cycle');

## <a name="removeListener" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L1061" title="View in source">Benchmark.Suite#removeListener(type, listener)</a>
Unregisters a single listener of a specified event type.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function to unregister.

### Returns
*(Object)*: The benchmark instance.

### Example
    // basic usage
    bench.removeListener('cycle', listener);

    // unregister a listener for multiple event types
    bench.removeListener('start cycle', listener);

## <a name="reset" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L959" title="View in source">Benchmark.Suite#resetSuite()</a>
Resets all benchmarks in the suite.
<sup><code>[&#9650;][1]</code></sup>

### Returns
*(Object)*: The suite instance.

## <a name="run" href="https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L975" title="View in source">Benchmark.Suite#runSuite(async, queued)</a>
Runs the suite.
<sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `[async=false]` *(Boolean)*: Flag to run asynchronously.
2. `[queued=false]` *(Boolean)*: Flag to treat benchmarks as a queue.

### Returns
*(Object)*: The suite instance.


  [1]: #readme "Jump back to the TOC."