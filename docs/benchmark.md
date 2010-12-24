# Benchmark
* [`Benchmark.CALIBRATIONS`](#static-CALIBRATIONS)
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
* [`Benchmark.isCalibrated`](#static-isCalibrated)
* [`Benchmark.isClassOf`](#static-isClassOf)
* [`Benchmark.isHostType`](#static-isHostType)
* [`Benchmark.join`](#static-join)
* [`Benchmark.map`](#static-map)
* [`Benchmark.noop`](#static-noop)
* [`Benchmark.reduce`](#static-reduce)
* [`Benchmark.trim`](#static-trim)

# Benchmark.prototype
* [`Benchmark#CALIBRATION_INDEX`](#CALIBRATION_INDEX)
* [`Benchmark#CYCLE_DELAY`](#CYCLE_DELAY)
* [`Benchmark#DEFAULT_ASYNC`](#DEFAULT_ASYNC)
* [`Benchmark#DETECT_INFINITY`](#DETECT_INFINITY)
* [`Benchmark#INIT_RUN_COUNT`](#INIT_RUN_COUNT)
* [`Benchmark#MAX_TIME_ELAPSED`](#MAX_TIME_ELAPSED)
* [`Benchmark#MIN_TIME`](#MIN_TIME)
* [`Benchmark#MoE`](#MoE)
* [`Benchmark#RME`](#RME)
* [`Benchmark#SD`](#SD)
* [`Benchmark#SEM`](#SEM)
* [`Benchmark#aborted`](#aborted)
* [`Benchmark#count`](#count)
* [`Benchmark#cycles`](#cycles)
* [`Benchmark#error`](#error)
* [`Benchmark#hz`](#hz)
* [`Benchmark#persist`](#persist)
* [`Benchmark#running`](#running)
* [`Benchmark#times`](#times)
* [`Benchmark#times.cycle`](#cycle)
* [`Benchmark#times.elapsed`](#elapsed)
* [`Benchmark#times.period`](#period)
* [`Benchmark#times.start`](#start)
* [`Benchmark#times.stop`](#stop)
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

# Benchmark
## <a name="static-CALIBRATIONS" href="../benchmark.js#L1433" title="View in source">Benchmark.CALIBRATIONS</a>
*(Array)*: Benchmarks to establish iteration overhead. <sup><code>[&#9650;][1]</code></sup>

## <a name="static-platform" href="../benchmark.js#L1289" title="View in source">Benchmark.platform</a>
*(Boolean)*: Platform object containing browser name, version, and operating system. <sup><code>[&#9650;][1]</code></sup>

## <a name="static-version" href="../benchmark.js#L1448" title="View in source">Benchmark.version</a>
*(String)*: The version number. <sup><code>[&#9650;][1]</code></sup>

## <a name="static-each" href="../benchmark.js#L407" title="View in source">Benchmark.each(array, callback)</a>
A generic bare-bones Array#forEach solution.
Callbacks may terminate the loop by explicitly returning false. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.

## <a name="static-extend" href="../benchmark.js#L426" title="View in source">Benchmark.extend(destination, source)</a>
Copies source properties to the destination object. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `destination` *(Object)*: The destination object.
2. `[source={}]` *(Object)*: The source object.

### Returns
*(Object)*: The destination object.

## <a name="static-filter" href="../benchmark.js#L441" title="View in source">Benchmark.filter(array, callback)</a>
A generic bare-bones Array#filter solution. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.

### Returns
*(Array)*: A new array of values that passed callback filter.

## <a name="static-forIn" href="../benchmark.js#L454" title="View in source">Benchmark.forIn(object, callback)</a>
A generic bare-bones for-in solution for an object's own properties. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `callback` *(Function)*: The function called per iteration.

## <a name="static-formatNumber" href="../benchmark.js#L469" title="View in source">Benchmark.formatNumber(number)</a>
Converts a number to a more readable comma separated string representation. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `number` *(Number)*: The number to convert.

### Returns
*(String)*: The more readable string representation.

## <a name="static-hasKey" href="../benchmark.js#L487" title="View in source">Benchmark.hasKey(object, key)</a>
Checks if an object has the specified key as a direct property. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `object` *(Object)*: The object to check.
2. `key` *(String)*: The key to check for.

### Returns
*(Boolean)*: Returns true if key is a direct property, else false.

## <a name="static-indexOf" href="../benchmark.js#L516" title="View in source">Benchmark.indexOf(array, value)</a>
A generic bare-bones Array#indexOf solution. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `value` *(Mixed)*: The value to search for.

### Returns
*(Number)*: The index of the matched value or `-1`.

## <a name="static-interpolate" href="../benchmark.js#L659" title="View in source">Benchmark.interpolate(string, object)</a>
Modify a string by replacing named tokens with matching object property values. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `string` *(String)*: The string to modify.
2. `object` *(Object)*: The template object.

### Returns
*(String)*: The modified string.

### Example
    Benchmark.interpolate("#{greet} #{who}!", {
      "greet": "Hello",
      "who": "world"
    }); // -> "Hello world!"

## <a name="static-invoke" href="../benchmark.js#L561" title="View in source">Benchmark.invoke(benches, methodName, args)</a>
Invokes a given method, with arguments, on all benchmarks in an array. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `benches` *(Array)*: Array of benchmarks to iterate over.
2. `methodName` *(String|Object)*: Name of method to invoke or options object.
3. `args` *(Mixed)*: Arguments to invoke the method with.

### Example
    // invoke `reset` on all benchmarks
    Benchmark.invoke(benches, "reset");

    // invoke `emit` with arguments
    Benchmark.invoke(benches, "emit", ["complete", b, c]);

    // invoke `run(true)`, treat benchmarks as a queue, and register invoke callbacks
    Benchmark.invoke(benches, {

      // invoke the `run` method
      "methodName": "run",

      // pass a single argument
      "args": true,

      // treat as queue, removing benchmarks from front of `benches` until empty
      "queued": true,

      // called between invoking benchmarks
      "onCycle": onCycle,

      // called after all benchmarks have been invoked.
      "onComplete": onComplete
    });

## <a name="static-isArray" href="../benchmark.js#L674" title="View in source">Benchmark.isArray(value)</a>
Determines if the given value is an array. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `value` *(Mixed)*: The value to check.

### Returns
*(Boolean)*: Returns true if value is an array, else false.

## <a name="static-isCalibrated" href="../benchmark.js#L684" title="View in source">Benchmark.isCalibrated()</a>
Checks if calibration benchmarks have completed. <sup><code>[&#9650;][1]</code></sup>

### Returns
*(Boolean)*: Returns true if calibrated, false if not.

## <a name="static-isClassOf" href="../benchmark.js#L697" title="View in source">Benchmark.isClassOf(object, name)</a>
Checks if an object is of the specified class. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `object` *(Object)*: The object.
2. `name` *(String)*: The name of the class.

### Returns
*(Boolean)*: Returns true if of the class, else false.

## <a name="static-isHostType" href="../benchmark.js#L711" title="View in source">Benchmark.isHostType(object, property)</a>
Host objects can return type values that are different from their actual
data type. The objects we are concerned with usually return non-primitive
types of object, function, or unknown. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `object` *(Mixed)*: The owner of the property.
2. `property` *(String)*: The property name to check.

### Returns
*(Boolean)*: Returns true if the property value is a non-primitive, else false.

## <a name="static-join" href="../benchmark.js#L725" title="View in source">Benchmark.join(object, separator1, separator2)</a>
Creates a string of joined array values or object key-value pairs. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `object` *(Array|Object)*: The object to operate on.
2. `[separator1=',']` *(String)*: The separator used between key-value pairs.
3. `[separator2=': ']` *(String)*: The separator used between keys and values.

### Returns
*(String)*: The joined result.

## <a name="static-map" href="../benchmark.js#L747" title="View in source">Benchmark.map(array, callback)</a>
A generic bare-bones Array#map solution. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.

### Returns
*(Array)*: A new array of values returned by the callback.

## <a name="static-noop" href="../benchmark.js#L759" title="View in source">Benchmark.noop()</a>
A no operation function. <sup><code>[&#9650;][1]</code></sup>

## <a name="static-reduce" href="../benchmark.js#L772" title="View in source">Benchmark.reduce(array, callback, accumulator)</a>
A generic bare-bones Array#reduce solution. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `accumulator` *(Mixed)*: Initial value of the accumulator.

### Returns
*(Mixed)*: The accumulator.

## <a name="static-trim" href="../benchmark.js#L786" title="View in source">Benchmark.trim(string)</a>
A generic bare-bones String#trim solution. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `string` *(String)*: The string to trim.

### Returns
*(String)*: The trimmed string.


# Benchmark.prototype
## <a name="CALIBRATION_INDEX" href="../benchmark.js#L1517" title="View in source">Benchmark#CALIBRATION_INDEX</a>
*(Number)*: The index of the calibration benchmark to use when computing results. <sup><code>[&#9650;][1]</code></sup>

## <a name="CYCLE_DELAY" href="../benchmark.js#L1524" title="View in source">Benchmark#CYCLE_DELAY</a>
*(Number)*: The delay between test cycles *(secs)*. <sup><code>[&#9650;][1]</code></sup>

## <a name="DEFAULT_ASYNC" href="../benchmark.js#L1531" title="View in source">Benchmark#DEFAULT_ASYNC</a>
*(Boolean)*: A flag to indicate methods will run asynchronously by default. <sup><code>[&#9650;][1]</code></sup>

## <a name="DETECT_INFINITY" href="../benchmark.js#L1538" title="View in source">Benchmark#DETECT_INFINITY</a>
*(Boolean)*: A flag to indicate protection against large run counts if Infinity ops/sec is detected. <sup><code>[&#9650;][1]</code></sup>

## <a name="INIT_RUN_COUNT" href="../benchmark.js#L1545" title="View in source">Benchmark#INIT_RUN_COUNT</a>
*(Number)*: The default number of times to execute a test on a benchmark's first cycle. <sup><code>[&#9650;][1]</code></sup>

## <a name="MAX_TIME_ELAPSED" href="../benchmark.js#L1552" title="View in source">Benchmark#MAX_TIME_ELAPSED</a>
*(Number)*: The maximum time a benchmark is allowed to run before finishing *(secs)*. <sup><code>[&#9650;][1]</code></sup>

## <a name="MIN_TIME" href="../benchmark.js#L1559" title="View in source">Benchmark#MIN_TIME</a>
*(Number)*: The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*. <sup><code>[&#9650;][1]</code></sup>

## <a name="MoE" href="../benchmark.js#L1566" title="View in source">Benchmark#MoE</a>
*(Number)*: The margin of error. <sup><code>[&#9650;][1]</code></sup>

## <a name="RME" href="../benchmark.js#L1573" title="View in source">Benchmark#RME</a>
*(Number)*: The relative margin of error *(expressed as a percentage of the mean)*. <sup><code>[&#9650;][1]</code></sup>

## <a name="SD" href="../benchmark.js#L1580" title="View in source">Benchmark#SD</a>
*(Number)*: The sample standard deviation. <sup><code>[&#9650;][1]</code></sup>

## <a name="SEM" href="../benchmark.js#L1587" title="View in source">Benchmark#SEM</a>
*(Number)*: The standard error of the mean. <sup><code>[&#9650;][1]</code></sup>

## <a name="aborted" href="../benchmark.js#L1622" title="View in source">Benchmark#aborted</a>
*(Boolean)*: A flag to indicate if the benchmark is aborted. <sup><code>[&#9650;][1]</code></sup>

## <a name="count" href="../benchmark.js#L1594" title="View in source">Benchmark#count</a>
*(Number)*: The number of times a test was executed. <sup><code>[&#9650;][1]</code></sup>

## <a name="cycles" href="../benchmark.js#L1601" title="View in source">Benchmark#cycles</a>
*(Number)*: The number of cycles performed while benchmarking. <sup><code>[&#9650;][1]</code></sup>

## <a name="error" href="../benchmark.js#L1608" title="View in source">Benchmark#error</a>
*(Object|Null)*: The error object if the test failed. <sup><code>[&#9650;][1]</code></sup>

## <a name="hz" href="../benchmark.js#L1615" title="View in source">Benchmark#hz</a>
*(Number)*: The number of executions per second. <sup><code>[&#9650;][1]</code></sup>

## <a name="persist" href="../benchmark.js#L1629" title="View in source">Benchmark#persist</a>
*(Boolean)*: A flag to indicate if results persist for the browser session. <sup><code>[&#9650;][1]</code></sup>

## <a name="running" href="../benchmark.js#L1636" title="View in source">Benchmark#running</a>
*(Boolean)*: A flag to indicate if the benchmark is running. <sup><code>[&#9650;][1]</code></sup>

## <a name="times" href="../benchmark.js#L1649" title="View in source">Benchmark#times</a>
*(Object)*: An object of timing data including cycle, elapsed, period, start, and stop. <sup><code>[&#9650;][1]</code></sup>

## <a name="cycle" href="../benchmark.js#L1656" title="View in source">Benchmark#times.cycle</a>
*(Number)*: The time taken to complete the last cycle *(secs)* <sup><code>[&#9650;][1]</code></sup>

## <a name="elapsed" href="../benchmark.js#L1663" title="View in source">Benchmark#times.elapsed</a>
*(Number)*: The time taken to complete the benchmark *(secs)*. <sup><code>[&#9650;][1]</code></sup>

## <a name="period" href="../benchmark.js#L1670" title="View in source">Benchmark#times.period</a>
*(Number)*: The time taken to execute the test once *(secs)*. <sup><code>[&#9650;][1]</code></sup>

## <a name="start" href="../benchmark.js#L1677" title="View in source">Benchmark#times.start</a>
*(Number)*: A timestamp of when the benchmark started *(ms)*. <sup><code>[&#9650;][1]</code></sup>

## <a name="stop" href="../benchmark.js#L1684" title="View in source">Benchmark#times.stop</a>
*(Number)*: A timestamp of when the benchmark finished *(ms)*. <sup><code>[&#9650;][1]</code></sup>

## <a name="abort" href="../benchmark.js#L869" title="View in source">Benchmark#abort()</a>
Aborts the benchmark as well as in progress calibrations without recording times. <sup><code>[&#9650;][1]</code></sup>

## <a name="addListener" href="../benchmark.js#L799" title="View in source">Benchmark#addListener(type, listener)</a>
Registers a single listener of a specified event type. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function called when the event occurs.

### Returns
*(Object)*: The benchmark instance.

## <a name="clone" href="../benchmark.js#L899" title="View in source">Benchmark#clone(options)</a>
Creates a cloned benchmark with the same test function and options. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `options` *(Object)*: Overwrite cloned options.

### Returns
*(Object)*: Cloned instance.

### Example
    var bizarro = bench.clone({
      "name": "doppelganger"
    });

## <a name="compare" href="../benchmark.js#L919" title="View in source">Benchmark#compare(other)</a>
Determines if the benchmark's hertz is higher than another. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `other` *(Object)*: The benchmark to compare.

### Returns
*(Number)*: Returns `1` if higher, `-1` if lower, and `0` if indeterminate.

## <a name="emit" href="../benchmark.js#L813" title="View in source">Benchmark#emit(type)</a>
Executes all registered listeners of a specified event type. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `type` *(String)*: The event type.

## <a name="on" href="../benchmark.js#L1642" title="View in source">Benchmark#on</a>
Alias of [`Benchmark#addListener`](#addListener). <sup><code>[&#9650;][1]</code></sup>

## <a name="removeAllListeners" href="../benchmark.js#L854" title="View in source">Benchmark#removeAllListeners(type)</a>
Unregisters all listeners of a specified event type. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `type` *(String)*: The event type.

### Returns
*(Object)*: The benchmark instance.

## <a name="removeListener" href="../benchmark.js#L836" title="View in source">Benchmark#removeListener(type, listener)</a>
Unregisters a single listener of a specified event type. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function to unregister.

### Returns
*(Object)*: The benchmark instance.

## <a name="reset" href="../benchmark.js#L930" title="View in source">Benchmark#reset()</a>
Reset properties and abort if running. <sup><code>[&#9650;][1]</code></sup>

## <a name="run" href="../benchmark.js#L1252" title="View in source">Benchmark#run(async)</a>
Starts running the benchmark. <sup><code>[&#9650;][1]</code></sup>

### Arguments
1. `[async=false]` *(Boolean)*: Flag to run asynchronously.

## <a name="toString" href="../benchmark.js#L967" title="View in source">Benchmark#toString()</a>
Displays relevant benchmark information when coerced to a string. <sup><code>[&#9650;][1]</code></sup>


  [1]: #readme "Jump back to the TOC."