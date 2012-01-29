# Benchmark.js API documentation

<!-- div -->


<!-- div -->

## `Benchmark`
* [`Benchmark`](#Benchmark)
* [`Benchmark.version`](#Benchmark.version)
* [`Benchmark.deepClone`](#Benchmark.deepClone)
* [`Benchmark.each`](#Benchmark.each)
* [`Benchmark.extend`](#Benchmark.extend)
* [`Benchmark.filter`](#Benchmark.filter)
* [`Benchmark.forEach`](#Benchmark.forEach)
* [`Benchmark.formatNumber`](#Benchmark.formatNumber)
* [`Benchmark.forOwn`](#Benchmark.forOwn)
* [`Benchmark.hasKey`](#Benchmark.hasKey)
* [`Benchmark.indexOf`](#Benchmark.indexOf)
* [`Benchmark.interpolate`](#Benchmark.interpolate)
* [`Benchmark.invoke`](#Benchmark.invoke)
* [`Benchmark.join`](#Benchmark.join)
* [`Benchmark.map`](#Benchmark.map)
* [`Benchmark.pluck`](#Benchmark.pluck)
* [`Benchmark.reduce`](#Benchmark.reduce)

<!-- /div -->


<!-- div -->

## `Benchmark.prototype`
* [`Benchmark#aborted`](#Benchmark:aborted)
* [`Benchmark#compiled`](#Benchmark:compiled)
* [`Benchmark#count`](#Benchmark:count)
* [`Benchmark#cycles`](#Benchmark:cycles)
* [`Benchmark#error`](#Benchmark:error)
* [`Benchmark#fn`](#Benchmark:fn)
* [`Benchmark#hz`](#Benchmark:hz)
* [`Benchmark#running`](#Benchmark:running)
* [`Benchmark#setup`](#Benchmark:setup)
* [`Benchmark#teardown`](#Benchmark:teardown)
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
* [`Benchmark.platform.manufacturer`](#Benchmark.platform.manufacturer)
* [`Benchmark.platform.name`](#Benchmark.platform.name)
* [`Benchmark.platform.os`](#Benchmark.platform.os)
* [`Benchmark.platform.prerelease`](#Benchmark.platform.prerelease)
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
* [`Benchmark.Deferred#benchmark`](#Benchmark.Deferred:benchmark)
* [`Benchmark.Deferred#cycles`](#Benchmark.Deferred:cycles)
* [`Benchmark.Deferred#elapsed`](#Benchmark.Deferred:elapsed)
* [`Benchmark.Deferred#resolve`](#Benchmark.Deferred:resolve)
* [`Benchmark.Deferred#timeStamp`](#Benchmark.Deferred:timeStamp)

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
* [`Benchmark.Suite#running`](#Benchmark.Suite:running)
* [`Benchmark.Suite#abort`](#Benchmark.Suite:abort)
* [`Benchmark.Suite#add`](#Benchmark.Suite:add)
* [`Benchmark.Suite#addListener`](#Benchmark:addListener)
* [`Benchmark.Suite#clone`](#Benchmark.Suite:clone)
* [`Benchmark.Suite#emit`](#Benchmark:emit)
* [`Benchmark.Suite#filter`](#Benchmark.Suite:filter)
* [`Benchmark.Suite#forEach`](#Benchmark.Suite:forEach)
* [`Benchmark.Suite#indexOf`](#Benchmark.Suite:indexOf)
* [`Benchmark.Suite#invoke`](#Benchmark.Suite:invoke)
* [`Benchmark.Suite#join`](#Benchmark.Suite:join)
* [`Benchmark.Suite#map`](#Benchmark.Suite:map)
* [`Benchmark.Suite#on`](#Benchmark:on)
* [`Benchmark.Suite#pluck`](#Benchmark.Suite:pluck)
* [`Benchmark.Suite#pop`](#Benchmark.Suite:pop)
* [`Benchmark.Suite#push`](#Benchmark.Suite:push)
* [`Benchmark.Suite#reduce`](#Benchmark.Suite:reduce)
* [`Benchmark.Suite#removeAllListeners`](#Benchmark:removeAllListeners)
* [`Benchmark.Suite#removeListener`](#Benchmark:removeListener)
* [`Benchmark.Suite#reset`](#Benchmark.Suite:reset)
* [`Benchmark.Suite#reverse`](#Benchmark.Suite:reverse)
* [`Benchmark.Suite#run`](#Benchmark.Suite:run)
* [`Benchmark.Suite#shift`](#Benchmark.Suite:shift)
* [`Benchmark.Suite#slice`](#Benchmark.Suite:slice)
* [`Benchmark.Suite#sort`](#Benchmark.Suite:sort)
* [`Benchmark.Suite#splice`](#Benchmark.Suite:splice)
* [`Benchmark.Suite#unshift`](#Benchmark.Suite:unshift)

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

### <a id="Benchmark" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L253" title="View in source">`Benchmark(name, fn [, options={}])`</a>
Benchmark constructor.
[&#9650;][1]

#### Arguments
1. `name` *(String)*: A name to identify the benchmark.
2. `fn` *(Function|String)*: The test to benchmark.
3. `[options={}]` *(Object)*: Options object.

#### Example
~~~ js
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
  'deferred': true,

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
~~~

<!-- /div -->


<!-- div -->

## `Benchmark`
### <a id="Benchmark" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L253" title="View in source">`Benchmark(name, fn [, options={}])`</a>
Benchmark constructor.
[&#9650;][1]

<!-- div -->

### <a id="Benchmark.version" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2722" title="View in source">`Benchmark.version`</a>
*(String)*: The version number.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.deepClone" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1008" title="View in source">`Benchmark.deepClone(value)`</a>
A deep clone utility.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to clone.

#### Returns
*(Mixed)*: The cloned value.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.each" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1178" title="View in source">`Benchmark.each(object, callback, thisArg)`</a>
An iteration utility for arrays and objects. Callbacks may terminate the loop by explicitly returning `false`.
[&#9650;][1]

#### Arguments
1. `object` *(Array|Object)*: The object to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `thisArg` *(Object)*: The `this` binding for the callback function.

#### Returns
*(Array, Object)*: Returns the object iterated over.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.extend" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1221" title="View in source">`Benchmark.extend(destination [, source={}])`</a>
Copies own/inherited properties of a source object to the destination object.
[&#9650;][1]

#### Arguments
1. `destination` *(Object)*: The destination object.
2. `[source={}]` *(Object)*: The source object.

#### Returns
*(Object)*: The destination object.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.filter" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1257" title="View in source">`Benchmark.filter(array, callback, thisArg)`</a>
A generic `Array#filter` like method.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function|String)*: The function/alias called per iteration.
3. `thisArg` *(Object)*: The `this` binding for the callback function.

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

### <a id="Benchmark.forEach" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1289" title="View in source">`Benchmark.forEach(array, callback, thisArg)`</a>
A generic `Array#forEach` like method. Callbacks may terminate the loop by explicitly returning `false`.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `thisArg` *(Object)*: The `this` binding for the callback function.

#### Returns
*(Array)*: Returns the array iterated over.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.formatNumber" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1329" title="View in source">`Benchmark.formatNumber(number)`</a>
Converts a number to a more readable comma-separated string representation.
[&#9650;][1]

#### Arguments
1. `number` *(Number)*: The number to convert.

#### Returns
*(String)*: The more readable string representation.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.forOwn" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1318" title="View in source">`Benchmark.forOwn(object, callback, thisArg)`</a>
Iterates over an object's own properties, executing the `callback` for each. Callbacks may terminate the loop by explicitly returning `false`.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `callback` *(Function)*: The function executed per own property.
3. `thisArg` *(Object)*: The `this` binding for the callback function.

#### Returns
*(Object)*: Returns the object iterated over.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.hasKey" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1343" title="View in source">`Benchmark.hasKey(object, key)`</a>
Checks if an object has the specified key as a direct property.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object to check.
2. `key` *(String)*: The key to check for.

#### Returns
*(Boolean)*: Returns `true` if key is a direct property, else `false`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.indexOf" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1378" title="View in source">`Benchmark.indexOf(array, value [, fromIndex=0])`</a>
A generic `Array#indexOf` like method.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `value` *(Mixed)*: The value to search for.
3. `[fromIndex=0]` *(Number)*: The index to start searching from.

#### Returns
*(Number)*: The index of the matched value or `-1`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.interpolate" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1399" title="View in source">`Benchmark.interpolate(string, object)`</a>
Modify a string by replacing named tokens with matching object property values.
[&#9650;][1]

#### Arguments
1. `string` *(String)*: The string to modify.
2. `object` *(Object)*: The template object.

#### Returns
*(String)*: The modified string.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.invoke" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1444" title="View in source">`Benchmark.invoke(benches, name [, arg1, arg2, ...])`</a>
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

### <a id="Benchmark.join" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1589" title="View in source">`Benchmark.join(object [, separator1=',', separator2=': '])`</a>
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

### <a id="Benchmark.map" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1610" title="View in source">`Benchmark.map(array, callback, thisArg)`</a>
A generic `Array#map` like method.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `thisArg` *(Object)*: The `this` binding for the callback function.

#### Returns
*(Array)*: A new array of values returned by the callback.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.pluck" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1625" title="View in source">`Benchmark.pluck(array, property)`</a>
Retrieves the value of a specified property from all items in an array.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `property` *(String)*: The property to pluck.

#### Returns
*(Array)*: A new array of property values.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.reduce" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1640" title="View in source">`Benchmark.reduce(array, callback, accumulator)`</a>
A generic `Array#reduce` like method.
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
### <a id="Benchmark" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L253" title="View in source">`Benchmark(name, fn [, options={}])`</a>
Benchmark constructor.
[&#9650;][1]

<!-- div -->

### <a id="Benchmark:aborted" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2822" title="View in source">`Benchmark#aborted`</a>
*(Boolean)*: A flag to indicate if the benchmark is aborted.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:compiled" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2801" title="View in source">`Benchmark#compiled`</a>
*(Function, String)*: The compiled test function.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:count" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2780" title="View in source">`Benchmark#count`</a>
*(Number)*: The number of times a test was executed.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:cycles" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2787" title="View in source">`Benchmark#cycles`</a>
*(Number)*: The number of cycles performed while benchmarking.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:error" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2808" title="View in source">`Benchmark#error`</a>
*(Object, Null)*: The error object if the test failed.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:fn" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2815" title="View in source">`Benchmark#fn`</a>
*(Function, String)*: The test to benchmark.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:hz" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2794" title="View in source">`Benchmark#hz`</a>
*(Number)*: The number of executions per second.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:running" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2829" title="View in source">`Benchmark#running`</a>
*(Boolean)*: A flag to indicate if the benchmark is running.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:setup" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2898" title="View in source">`Benchmark#setup`</a>
*(Function, String)*: Compiled into the test and executed immediately **before** the test loop.
[&#9650;][1]

#### Example
~~~ js
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
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark:teardown" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2905" title="View in source">`Benchmark#teardown`</a>
*(Function, String)*: Compiled into the test and executed immediately **after** the test loop.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:abort" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1912" title="View in source">`Benchmark#abort()`</a>
Aborts the benchmark without recording times.
[&#9650;][1]

#### Returns
*(Object)*: The benchmark instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:addListener" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1821" title="View in source">`Benchmark.Suite#addListener(type, listener)`</a>
Registers a single listener for the specified event type(s).
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function called when the event occurs.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// register a listener for an event type
bench.addListener('cycle', listener);

// register a listener for multiple event types
bench.addListener('start cycle', listener);
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark:clone" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1942" title="View in source">`Benchmark#clone(options)`</a>
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

### <a id="Benchmark:compare" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1964" title="View in source">`Benchmark#compare(other)`</a>
Determines if a benchmark is faster than another.
[&#9650;][1]

#### Arguments
1. `other` *(Object)*: The benchmark to compare.

#### Returns
*(Number)*: Returns `-1` if slower, `1` if faster, and `0` if indeterminate.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:emit" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1837" title="View in source">`Benchmark.Suite#emit(type)`</a>
Executes all registered listeners of the specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String|Object)*: The event type or object.

#### Returns
*(Boolean)*: Returns `true` if all listeners were executed, else `false`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:on" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2836" title="View in source">`Benchmark.Suite#on`</a>
Alias of [`Benchmark#addListener`](#Benchmark:addListener).
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:removeAllListeners" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1895" title="View in source">`Benchmark.Suite#removeAllListeners(type)`</a>
Unregisters all listeners or those for the specified event type(s).
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// unregister all listeners
bench.removeAllListeners();

// unregister all listeners for an event type
bench.removeAllListeners('cycle');

// unregister all listeners for multiple event types
bench.removeAllListeners('start cycle complete');
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark:removeListener" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1865" title="View in source">`Benchmark.Suite#removeListener(type, listener)`</a>
Unregisters a single listener for the specified event type(s).
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// unregister a listener for an event type
bench.removeListener('cycle', listener);

// unregister a listener for multiple event types
bench.removeListener('start cycle', listener);
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark:reset" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1985" title="View in source">`Benchmark#reset()`</a>
Reset properties and abort if running.
[&#9650;][1]

#### Returns
*(Object)*: The benchmark instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:run" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2532" title="View in source">`Benchmark#run([options={}])`</a>
Runs the benchmark.
[&#9650;][1]

#### Arguments
1. `[options={}]` *(Object)*: Options object.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// basic usage
bench.run();

// or with options
bench.run({ 'async': true });
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark:toString" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2025" title="View in source">`Benchmark#toString()`</a>
Displays relevant benchmark information when coerced to a string.
[&#9650;][1]

#### Returns
*(String)*: A string representation of the benchmark instance.

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.options`

<!-- div -->

### <a id="Benchmark.options" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2573" title="View in source">`Benchmark.options`</a>
*(Object)*: The default options copied by benchmark instances.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.async" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2580" title="View in source">`Benchmark.options.async`</a>
*(Boolean)*: A flag to indicate that benchmark cycles will execute asynchronously by default.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.defer" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2587" title="View in source">`Benchmark.options.defer`</a>
*(Boolean)*: A flag to indicate that the benchmark clock is deferred.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.delay" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2594" title="View in source">`Benchmark.options.delay`</a>
*(Number)*: The delay between test cycles *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.id" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2601" title="View in source">`Benchmark.options.id`</a>
*(String, Null)*: Displayed by Benchmark#toString when a `name` is not available *(auto-generated if `null`)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.initCount" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2608" title="View in source">`Benchmark.options.initCount`</a>
*(Number)*: The default number of times to execute a test on a benchmark's first cycle.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.maxTime" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2616" title="View in source">`Benchmark.options.maxTime`</a>
*(Number)*: The maximum time a benchmark is allowed to run before finishing *(secs)*. Note: Cycle delays aren't counted toward the maximum time.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.minSamples" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2623" title="View in source">`Benchmark.options.minSamples`</a>
*(Number)*: The minimum sample size required to perform statistical analysis.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.minTime" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2630" title="View in source">`Benchmark.options.minTime`</a>
*(Number)*: The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.options.name" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2637" title="View in source">`Benchmark.options.name`</a>
*(String, Null)*: The name of the benchmark.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.platform`

<!-- div -->

### <a id="Benchmark.platform" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2647" title="View in source">`Benchmark.platform`</a>
*(Object)*: Platform object with properties describing things like browser name, version, and operating system.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.description" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2654" title="View in source">`Benchmark.platform.description`</a>
*(String)*: The platform description.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.layout" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2661" title="View in source">`Benchmark.platform.layout`</a>
*(String, Null)*: The name of the browser layout engine.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.manufacturer" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2682" title="View in source">`Benchmark.platform.manufacturer`</a>
*(String, Null)*: The name of the product's manufacturer.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.name" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2675" title="View in source">`Benchmark.platform.name`</a>
*(String, Null)*: The name of the browser/environment.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.os" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2689" title="View in source">`Benchmark.platform.os`</a>
*(String, Null)*: The name of the operating system.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.prerelease" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2696" title="View in source">`Benchmark.platform.prerelease`</a>
*(String, Null)*: The alpha/beta release indicator.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.product" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2668" title="View in source">`Benchmark.platform.product`</a>
*(String, Null)*: The name of the product hosting the browser.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.version" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2703" title="View in source">`Benchmark.platform.version`</a>
*(String, Null)*: The browser/environment version.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.platform.toString" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2711" title="View in source">`Benchmark.platform.toString()`</a>
Return platform description when the platform object is coerced to a string.
[&#9650;][1]

#### Returns
*(String)*: The platform description.

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark#stats`

<!-- div -->

### <a id="Benchmark:stats" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2912" title="View in source">`Benchmark#stats`</a>
*(Object)*: An object of stats including mean, margin or error, and standard deviation.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.deviation" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2940" title="View in source">`Benchmark#stats.deviation`</a>
*(Number)*: The sample standard deviation.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.mean" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2947" title="View in source">`Benchmark#stats.mean`</a>
*(Number)*: The sample arithmetic mean.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.moe" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2919" title="View in source">`Benchmark#stats.moe`</a>
*(Number)*: The margin of error.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.rme" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2926" title="View in source">`Benchmark#stats.rme`</a>
*(Number)*: The relative margin of error *(expressed as a percentage of the mean)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.sem" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2933" title="View in source">`Benchmark#stats.sem`</a>
*(Number)*: The standard error of the mean.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.size" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2954" title="View in source">`Benchmark#stats.size`</a>
*(Number)*: The sample size.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:stats.variance" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2961" title="View in source">`Benchmark#stats.variance`</a>
*(Number)*: The sample variance.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark#times`

<!-- div -->

### <a id="Benchmark:times" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2969" title="View in source">`Benchmark#times`</a>
*(Object)*: An object of timing data including cycle, elapsed, period, start, and stop.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times.cycle" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2976" title="View in source">`Benchmark#times.cycle`</a>
*(Number)*: The time taken to complete the last cycle *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times.elapsed" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2983" title="View in source">`Benchmark#times.elapsed`</a>
*(Number)*: The time taken to complete the benchmark *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times.period" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2990" title="View in source">`Benchmark#times.period`</a>
*(Number)*: The time taken to execute the test once *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark:times.timeStamp" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2997" title="View in source">`Benchmark#times.timeStamp`</a>
*(Number)*: A timestamp of when the benchmark started *(ms)*.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Deferred`

<!-- div -->

### <a id="Benchmark.Deferred" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L293" title="View in source">`Benchmark.Deferred(bench)`</a>
Deferred constructor.
[&#9650;][1]

#### Arguments
1. `bench` *(Object)*: The benchmark instance.

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Deferred.prototype`
### <a id="Benchmark.Deferred" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L293" title="View in source">`Benchmark.Deferred(bench)`</a>
Deferred constructor.
[&#9650;][1]

<!-- div -->

### <a id="Benchmark.Deferred:benchmark" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3211" title="View in source">`Benchmark.Deferred#benchmark`</a>
*(Object)*: The deferred benchmark instance.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Deferred:cycles" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3218" title="View in source">`Benchmark.Deferred#cycles`</a>
*(Number)*: The number of deferred cycles performed while benchmarking.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Deferred:elapsed" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3225" title="View in source">`Benchmark.Deferred#elapsed`</a>
*(Number)*: The time taken to complete the deferred benchmark *(secs)*.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Deferred:resolve" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L980" title="View in source">`Benchmark.Deferred#resolve`</a>
*(Unknown)*: Handles cycling/completing the deferred benchmark.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Deferred:timeStamp" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3232" title="View in source">`Benchmark.Deferred#timeStamp`</a>
*(Number)*: A timestamp of when the deferred benchmark started *(ms)*.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Event`

<!-- div -->

### <a id="Benchmark.Event" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L308" title="View in source">`Benchmark.Event(type)`</a>
Event constructor.
[&#9650;][1]

#### Arguments
1. `type` *(String|Object)*: The event type.

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Event.prototype`
### <a id="Benchmark.Event" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L308" title="View in source">`Benchmark.Event(type)`</a>
Event constructor.
[&#9650;][1]

<!-- div -->

### <a id="Benchmark.Event:type" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3245" title="View in source">`Benchmark.Event#type`</a>
*(String)*: The event type.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Suite`

<!-- div -->

### <a id="Benchmark.Suite" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L353" title="View in source">`Benchmark.Suite(name [, options={}])`</a>
Suite constructor.
[&#9650;][1]

#### Arguments
1. `name` *(String)*: A name to identify the suite.
2. `[options={}]` *(Object)*: Options object.

#### Example
~~~ js
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
~~~

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Suite.prototype`
### <a id="Benchmark.Suite" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L353" title="View in source">`Benchmark.Suite(name [, options={}])`</a>
Suite constructor.
[&#9650;][1]

<!-- div -->

### <a id="Benchmark.Suite:aborted" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3065" title="View in source">`Benchmark.Suite#aborted`</a>
*(Boolean)*: A flag to indicate if the suite is aborted.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:length" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3058" title="View in source">`Benchmark.Suite#length`</a>
*(Number)*: The number of benchmarks in the suite.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:running" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3072" title="View in source">`Benchmark.Suite#running`</a>
*(Boolean)*: A flag to indicate if the suite is running.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:abort" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1656" title="View in source">`Benchmark.Suite#abort()`</a>
Aborts all benchmarks in the suite.
[&#9650;][1]

#### Returns
*(Object)*: The suite instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:add" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1692" title="View in source">`Benchmark.Suite#add(name, fn [, options={}])`</a>
Adds a test to the benchmark suite.
[&#9650;][1]

#### Arguments
1. `name` *(String)*: A name to identify the benchmark.
2. `fn` *(Function|String)*: The test to benchmark.
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

### <a id="Benchmark:addListener" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1821" title="View in source">`Benchmark.Suite#addListener(type, listener)`</a>
Registers a single listener for the specified event type(s).
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function called when the event occurs.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// register a listener for an event type
bench.addListener('cycle', listener);

// register a listener for multiple event types
bench.addListener('start cycle', listener);
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:clone" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1708" title="View in source">`Benchmark.Suite#clone(options)`</a>
Creates a new suite with cloned benchmarks.
[&#9650;][1]

#### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Object)*: The new suite instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:emit" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1837" title="View in source">`Benchmark.Suite#emit(type)`</a>
Executes all registered listeners of the specified event type.
[&#9650;][1]

#### Arguments
1. `type` *(String|Object)*: The event type or object.

#### Returns
*(Boolean)*: Returns `true` if all listeners were executed, else `false`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:filter" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1728" title="View in source">`Benchmark.Suite#filter(callback)`</a>
An `Array#filter` like method.
[&#9650;][1]

#### Arguments
1. `callback` *(Function|String)*: The function/alias called per iteration.

#### Returns
*(Object)*: A new suite of benchmarks that passed callback filter.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:forEach" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3081" title="View in source">`Benchmark.Suite#forEach(callback)`</a>
An `Array#forEach` like method. Callbacks may terminate the loop by explicitly returning `false`.
[&#9650;][1]

#### Arguments
1. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Object)*: The suite iterated over.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:indexOf" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3089" title="View in source">`Benchmark.Suite#indexOf(value)`</a>
An `Array#indexOf` like method.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to search for.

#### Returns
*(Number)*: The index of the matched value or `-1`.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:invoke" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3098" title="View in source">`Benchmark.Suite#invoke(name [, arg1, arg2, ...])`</a>
Invokes a method on all benchmarks in the suite.
[&#9650;][1]

#### Arguments
1. `name` *(String|Object)*: The name of the method to invoke OR options object.
2. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the method with.

#### Returns
*(Array)*: A new array of values returned from each method invoked.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:join" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3106" title="View in source">`Benchmark.Suite#join([separator=','])`</a>
Converts the array to a string.
[&#9650;][1]

#### Arguments
1. `[separator=',']` *(String)*: A string to separate each element of the array.

#### Returns
*(String)*: The removed element.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:map" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3114" title="View in source">`Benchmark.Suite#map(callback)`</a>
An `Array#map` like method.
[&#9650;][1]

#### Arguments
1. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Array)*: A new array of values returned by the callback.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:on" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2836" title="View in source">`Benchmark.Suite#on`</a>
Alias of [`Benchmark#addListener`](#Benchmark:addListener).
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:pluck" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3122" title="View in source">`Benchmark.Suite#pluck(property)`</a>
Retrieves the value of a specified property from all benchmarks in the suite.
[&#9650;][1]

#### Arguments
1. `property` *(String)*: The property to pluck.

#### Returns
*(Array)*: A new array of property values.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:pop" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3129" title="View in source">`Benchmark.Suite#pop()`</a>
Removes the last element of the host array and returns it.
[&#9650;][1]

#### Returns
*(Mixed)*: The removed element.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:push" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3136" title="View in source">`Benchmark.Suite#push()`</a>
Appends arguments to the end of the array.
[&#9650;][1]

#### Returns
*(Number)*: The array length.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:reduce" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3153" title="View in source">`Benchmark.Suite#reduce(callback, accumulator)`</a>
An `Array#reduce` like method.
[&#9650;][1]

#### Arguments
1. `callback` *(Function)*: The function called per iteration.
2. `accumulator` *(Mixed)*: Initial value of the accumulator.

#### Returns
*(Mixed)*: The accumulator.

<!-- /div -->


<!-- div -->

### <a id="Benchmark:removeAllListeners" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1895" title="View in source">`Benchmark.Suite#removeAllListeners(type)`</a>
Unregisters all listeners or those for the specified event type(s).
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// unregister all listeners
bench.removeAllListeners();

// unregister all listeners for an event type
bench.removeAllListeners('cycle');

// unregister all listeners for multiple event types
bench.removeAllListeners('start cycle complete');
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark:removeListener" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1865" title="View in source">`Benchmark.Suite#removeListener(type, listener)`</a>
Unregisters a single listener for the specified event type(s).
[&#9650;][1]

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// unregister a listener for an event type
bench.removeListener('cycle', listener);

// unregister a listener for multiple event types
bench.removeListener('start cycle', listener);
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:reset" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1742" title="View in source">`Benchmark.Suite#reset()`</a>
Resets all benchmarks in the suite.
[&#9650;][1]

#### Returns
*(Object)*: The suite instance.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:reverse" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L476" title="View in source">`Benchmark.Suite#reverse()`</a>
Rearrange the host array's elements in reverse order.
[&#9650;][1]

#### Returns
*(Array)*: The reversed array.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:run" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1774" title="View in source">`Benchmark.Suite#run([options={}])`</a>
Runs the suite.
[&#9650;][1]

#### Arguments
1. `[options={}]` *(Object)*: Options object.

#### Returns
*(Object)*: The suite instance.

#### Example
~~~ js
// basic usage
suite.run();

// or with options
suite.run({ 'async': true, 'queued': true });
~~~

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:shift" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L508" title="View in source">`Benchmark.Suite#shift()`</a>
Removes the first element of the host array and returns it.
[&#9650;][1]

#### Returns
*(Mixed)*: The first element of the array.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:slice" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L518" title="View in source">`Benchmark.Suite#slice()`</a>
Creates an array of the host array's elements from the start index up to, but not including, the end index.
[&#9650;][1]

#### Returns
*(Array)*: The new array.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:sort" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3144" title="View in source">`Benchmark.Suite#sort([compareFn=null])`</a>
Sorts the elements of the host array.
[&#9650;][1]

#### Arguments
1. `[compareFn=null]` *(Function)*: A function that defines the sort order.

#### Returns
*(Array)*: The sorted host array.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:splice" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L543" title="View in source">`Benchmark.Suite#splice()`</a>
Allows removing a range of elements and/or inserting elements into the host array.
[&#9650;][1]

#### Returns
*(Array)*: An array of removed elements.

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite:unshift" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L569" title="View in source">`Benchmark.Suite#unshift()`</a>
Appends arguments to the host array.
[&#9650;][1]

#### Returns
*(Number)*: The new length.

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Suite.options`

<!-- div -->

### <a id="Benchmark.Suite.options" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3039" title="View in source">`Benchmark.Suite.options`</a>
*(Object)*: The default options copied by suite instances.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="Benchmark.Suite.options.name" href="https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3046" title="View in source">`Benchmark.Suite.options.name`</a>
*(String, Null)*: The name of the suite.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #readme "Jump back to the TOC."