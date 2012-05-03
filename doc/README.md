# Benchmark.js <sup>v1.0.0-pre</sup>

<!-- div -->


<!-- div -->

## `Benchmark`
* [`Benchmark`](#benchmarkname-fn--options)
* [`Benchmark.version`](#benchmarkversion)
* [`Benchmark.deepClone`](#benchmarkdeepclonevalue)
* [`Benchmark.each`](#benchmarkeachobject-callback-thisarg)
* [`Benchmark.extend`](#benchmarkextenddestination--source)
* [`Benchmark.filter`](#benchmarkfilterarray-callback-thisarg)
* [`Benchmark.forEach`](#benchmarkforeacharray-callback-thisarg)
* [`Benchmark.formatNumber`](#benchmarkformatnumbernumber)
* [`Benchmark.forOwn`](#benchmarkforownobject-callback-thisarg)
* [`Benchmark.hasKey`](#benchmarkhaskeyobject-key)
* [`Benchmark.indexOf`](#benchmarkindexofarray-value--fromindex0)
* [`Benchmark.interpolate`](#benchmarkinterpolatestring-object)
* [`Benchmark.invoke`](#benchmarkinvokebenches-name--arg1-arg2-)
* [`Benchmark.join`](#benchmarkjoinobject--separator1--separator2:)
* [`Benchmark.map`](#benchmarkmaparray-callback-thisarg)
* [`Benchmark.pluck`](#benchmarkpluckarray-property)
* [`Benchmark.reduce`](#benchmarkreducearray-callback-accumulator)

<!-- /div -->


<!-- div -->

## `Benchmark.prototype`
* [`Benchmark.prototype.aborted`](#benchmarkprototypeaborted)
* [`Benchmark.prototype.compiled`](#benchmarkprototypecompiled)
* [`Benchmark.prototype.count`](#benchmarkprototypecount)
* [`Benchmark.prototype.cycles`](#benchmarkprototypecycles)
* [`Benchmark.prototype.fn`](#benchmarkprototypefn)
* [`Benchmark.prototype.hz`](#benchmarkprototypehz)
* [`Benchmark.prototype.running`](#benchmarkprototyperunning)
* [`Benchmark.prototype.setup`](#benchmarkprototypesetup)
* [`Benchmark.prototype.teardown`](#benchmarkprototypeteardown)
* [`Benchmark.prototype.abort`](#benchmarkprototypeabort)
* [`Benchmark.prototype.clone`](#benchmarkprototypecloneoptions)
* [`Benchmark.prototype.compare`](#benchmarkprototypecompareother)
* [`Benchmark.prototype.emit`](#benchmarkprototypeemittype)
* [`Benchmark.prototype.listeners`](#benchmarkprototypelistenerstype)
* [`Benchmark.prototype.off`](#benchmarkprototypeofftype-listener)
* [`Benchmark.prototype.on`](#benchmarkprototypeontype-listener)
* [`Benchmark.prototype.reset`](#benchmarkprototypereset)
* [`Benchmark.prototype.run`](#benchmarkprototyperunoptions)
* [`Benchmark.prototype.toString`](#benchmarkprototypetostring)

<!-- /div -->


<!-- div -->

## `Benchmark.options`
* [`Benchmark.options`](#benchmarkoptions)
* [`Benchmark.options.async`](#benchmarkoptionsasync)
* [`Benchmark.options.defer`](#benchmarkoptionsdefer)
* [`Benchmark.options.delay`](#benchmarkoptionsdelay)
* [`Benchmark.options.id`](#benchmarkoptionsid)
* [`Benchmark.options.initCount`](#benchmarkoptionsinitcount)
* [`Benchmark.options.maxTime`](#benchmarkoptionsmaxtime)
* [`Benchmark.options.minSamples`](#benchmarkoptionsminsamples)
* [`Benchmark.options.minTime`](#benchmarkoptionsmintime)
* [`Benchmark.options.name`](#benchmarkoptionsname)
* [`Benchmark.options.onAbort`](#benchmarkoptionsonabort)
* [`Benchmark.options.onComplete`](#benchmarkoptionsoncomplete)
* [`Benchmark.options.onCycle`](#benchmarkoptionsoncycle)
* [`Benchmark.options.onError`](#benchmarkoptionsonerror)
* [`Benchmark.options.onReset`](#benchmarkoptionsonreset)
* [`Benchmark.options.onStart`](#benchmarkoptionsonstart)

<!-- /div -->


<!-- div -->

## `Benchmark.platform`
* [`Benchmark.platform`](#benchmarkplatform)
* [`Benchmark.platform.description`](#benchmarkplatformdescription)
* [`Benchmark.platform.layout`](#benchmarkplatformlayout)
* [`Benchmark.platform.manufacturer`](#benchmarkplatformmanufacturer)
* [`Benchmark.platform.name`](#benchmarkplatformname)
* [`Benchmark.platform.os`](#benchmarkplatformos)
* [`Benchmark.platform.prerelease`](#benchmarkplatformprerelease)
* [`Benchmark.platform.product`](#benchmarkplatformproduct)
* [`Benchmark.platform.version`](#benchmarkplatformversion)
* [`Benchmark.platform.toString`](#benchmarkplatformtostring)

<!-- /div -->


<!-- div -->

## `Benchmark.support`
* [`Benchmark.support`](#benchmarksupport)
* [`Benchmark.support.air`](#benchmarksupportair)
* [`Benchmark.support.argumentsClass`](#benchmarksupportargumentsclass)
* [`Benchmark.support.browser`](#benchmarksupportbrowser)
* [`Benchmark.support.charByIndex`](#benchmarksupportcharbyindex)
* [`Benchmark.support.charByOwnIndex`](#benchmarksupportcharbyownindex)
* [`Benchmark.support.decompilation`](#benchmarksupportdecompilation)
* [`Benchmark.support.descriptors`](#benchmarksupportdescriptors)
* [`Benchmark.support.getAllKeys`](#benchmarksupportgetallkeys)
* [`Benchmark.support.java`](#benchmarksupportjava)
* [`Benchmark.support.timeout`](#benchmarksupporttimeout)

<!-- /div -->


<!-- div -->

## `Benchmark.prototype.error`
* [`Benchmark.prototype.error`](#benchmarkprototypeerror)

<!-- /div -->


<!-- div -->

## `Benchmark.prototype.stats`
* [`Benchmark.prototype.stats`](#benchmarkprototypestats)
* [`Benchmark.prototype.stats.deviation`](#benchmark-statsdeviation)
* [`Benchmark.prototype.stats.mean`](#benchmark-statsmean)
* [`Benchmark.prototype.stats.moe`](#benchmark-statsmoe)
* [`Benchmark.prototype.stats.rme`](#benchmark-statsrme)
* [`Benchmark.prototype.stats.sample`](#benchmark-statssample)
* [`Benchmark.prototype.stats.sem`](#benchmark-statssem)
* [`Benchmark.prototype.stats.variance`](#benchmark-statsvariance)

<!-- /div -->


<!-- div -->

## `Benchmark.prototype.times`
* [`Benchmark.prototype.times`](#benchmarkprototypetimes)
* [`Benchmark.prototype.times.cycle`](#benchmark-timescycle)
* [`Benchmark.prototype.times.elapsed`](#benchmark-timeselapsed)
* [`Benchmark.prototype.times.period`](#benchmark-timesperiod)
* [`Benchmark.prototype.times.timeStamp`](#benchmark-timestimestamp)

<!-- /div -->


<!-- div -->

## `Benchmark.Deferred`
* [`Benchmark.Deferred`](#benchmarkdeferredclone)

<!-- /div -->


<!-- div -->

## `Benchmark.Deferred.prototype`
* [`Benchmark.Deferred.prototype.benchmark`](#benchmarkdeferredprototypebenchmark)
* [`Benchmark.Deferred.prototype.cycles`](#benchmarkdeferredprototypecycles)
* [`Benchmark.Deferred.prototype.elapsed`](#benchmarkdeferredprototypeelapsed)
* [`Benchmark.Deferred.prototype.resolve`](#benchmarkdeferredprototyperesolve)
* [`Benchmark.Deferred.prototype.timeStamp`](#benchmarkdeferredprototypetimestamp)

<!-- /div -->


<!-- div -->

## `Benchmark.Event`
* [`Benchmark.Event`](#benchmarkeventtype)

<!-- /div -->


<!-- div -->

## `Benchmark.Event.prototype`
* [`Benchmark.Event.prototype.aborted`](#benchmarkeventprototypeaborted)
* [`Benchmark.Event.prototype.cancelled`](#benchmarkeventprototypecancelled)
* [`Benchmark.Event.prototype.result`](#benchmarkeventprototyperesult)
* [`Benchmark.Event.prototype.timeStamp`](#benchmarkeventprototypetimestamp)
* [`Benchmark.Event.prototype.type`](#benchmarkeventprototypetype)

<!-- /div -->


<!-- div -->

## `Benchmark.Event.prototype.currentTarget`
* [`Benchmark.Event.prototype.currentTarget`](#benchmarkeventprototypecurrenttarget)

<!-- /div -->


<!-- div -->

## `Benchmark.Event.prototype.target`
* [`Benchmark.Event.prototype.target`](#benchmarkeventprototypetarget)

<!-- /div -->


<!-- div -->

## `Benchmark.Suite`
* [`Benchmark.Suite`](#benchmarksuitename--options)

<!-- /div -->


<!-- div -->

## `Benchmark.Suite.prototype`
* [`Benchmark.Suite.prototype.aborted`](#benchmarksuiteprototypeaborted)
* [`Benchmark.Suite.prototype.length`](#benchmarksuiteprototypelength)
* [`Benchmark.Suite.prototype.running`](#benchmarksuiteprototyperunning)
* [`Benchmark.Suite.prototype.abort`](#benchmarksuiteprototypeabort)
* [`Benchmark.Suite.prototype.add`](#benchmarksuiteprototypeaddname-fn--options)
* [`Benchmark.Suite.prototype.clone`](#benchmarksuiteprototypecloneoptions)
* [`Benchmark.Suite.prototype.emit`](#benchmarkprototypeemittype)
* [`Benchmark.Suite.prototype.filter`](#benchmarksuiteprototypefiltercallback)
* [`Benchmark.Suite.prototype.forEach`](#benchmarksuiteprototypeforeachcallback)
* [`Benchmark.Suite.prototype.indexOf`](#benchmarksuiteprototypeindexofvalue)
* [`Benchmark.Suite.prototype.invoke`](#benchmarksuiteprototypeinvokename--arg1-arg2-)
* [`Benchmark.Suite.prototype.join`](#benchmarksuiteprototypejoinseparator-)
* [`Benchmark.Suite.prototype.listeners`](#benchmarkprototypelistenerstype)
* [`Benchmark.Suite.prototype.map`](#benchmarksuiteprototypemapcallback)
* [`Benchmark.Suite.prototype.off`](#benchmarkprototypeofftype-listener)
* [`Benchmark.Suite.prototype.on`](#benchmarkprototypeontype-listener)
* [`Benchmark.Suite.prototype.pluck`](#benchmarksuiteprototypepluckproperty)
* [`Benchmark.Suite.prototype.pop`](#benchmarksuiteprototypepop)
* [`Benchmark.Suite.prototype.push`](#benchmarksuiteprototypepush)
* [`Benchmark.Suite.prototype.reduce`](#benchmarksuiteprototypereducecallback-accumulator)
* [`Benchmark.Suite.prototype.reset`](#benchmarksuiteprototypereset)
* [`Benchmark.Suite.prototype.reverse`](#benchmarksuiteprototypereverse)
* [`Benchmark.Suite.prototype.run`](#benchmarksuiteprototyperunoptions)
* [`Benchmark.Suite.prototype.shift`](#benchmarksuiteprototypeshift)
* [`Benchmark.Suite.prototype.slice`](#benchmarksuiteprototypeslicestart-end)
* [`Benchmark.Suite.prototype.sort`](#benchmarksuiteprototypesortcomparefnnull)
* [`Benchmark.Suite.prototype.splice`](#benchmarksuiteprototypesplicestart-deletecount--val1-val2-)
* [`Benchmark.Suite.prototype.unshift`](#benchmarksuiteprototypeunshift)

<!-- /div -->


<!-- div -->

## `Benchmark.Suite.options`
* [`Benchmark.Suite.options`](#benchmarksuiteoptions)
* [`Benchmark.Suite.options.name`](#benchmarksuiteoptionsname)

<!-- /div -->


<!-- /div -->


<!-- div -->


<!-- div -->

## `Benchmark`

<!-- div -->


<!-- div -->

### `Benchmark(name, fn [, options={}])`
<a id="benchmarkname-fn--options" href="#benchmarkname-fn--options">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L359 "View in source") [&#x24C9;][1]

The Benchmark constructor.

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
~~~

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.version`
<a id="benchmarkversion" href="#benchmarkversion">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3143 "View in source") [&#x24C9;][1]

*(String)*: The semantic version number.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.deepClone(value)`
<a id="benchmarkdeepclonevalue" href="#benchmarkdeepclonevalue">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1152 "View in source") [&#x24C9;][1]

A deep clone utility.

#### Arguments
1. `value` *(Mixed)*: The value to clone.

#### Returns
*(Mixed)*: The cloned value.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.each(object, callback, thisArg)`
<a id="benchmarkeachobject-callback-thisarg" href="#benchmarkeachobject-callback-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1327 "View in source") [&#x24C9;][1]

An iteration utility for arrays and objects. Callbacks may terminate the loop by explicitly returning `false`.

#### Arguments
1. `object` *(Array|Object)*: The object to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `thisArg` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array, Object)*: Returns the object iterated over.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.extend(destination [, source={}])`
<a id="benchmarkextenddestination--source" href="#benchmarkextenddestination--source">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1373 "View in source") [&#x24C9;][1]

Copies enumerable properties from the source(s) object to the destination object.

#### Arguments
1. `destination` *(Object)*: The destination object.
2. `[source={}]` *(Object)*: The source object.

#### Returns
*(Object)*: The destination object.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.filter(array, callback, thisArg)`
<a id="benchmarkfilterarray-callback-thisarg" href="#benchmarkfilterarray-callback-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1412 "View in source") [&#x24C9;][1]

A generic `Array#filter` like method.

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function|String)*: The function/alias called per iteration.
3. `thisArg` *(Mixed)*: The `this` binding for the callback.

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

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.forEach(array, callback, thisArg)`
<a id="benchmarkforeacharray-callback-thisarg" href="#benchmarkforeacharray-callback-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1445 "View in source") [&#x24C9;][1]

A generic `Array#forEach` like method. Callbacks may terminate the loop by explicitly returning `false`.

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `thisArg` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array)*: Returns the array iterated over.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.formatNumber(number)`
<a id="benchmarkformatnumbernumber" href="#benchmarkformatnumbernumber">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1484 "View in source") [&#x24C9;][1]

Converts a number to a more readable comma-separated string representation.

#### Arguments
1. `number` *(Number)*: The number to convert.

#### Returns
*(String)*: The more readable string representation.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.forOwn(object, callback, thisArg)`
<a id="benchmarkforownobject-callback-thisarg" href="#benchmarkforownobject-callback-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1472 "View in source") [&#x24C9;][1]

Iterates over an object's own properties, executing the `callback` for each. Callbacks may terminate the loop by explicitly returning `false`.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `callback` *(Function)*: The function executed per own property.
3. `thisArg` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Object)*: Returns the object iterated over.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.hasKey(object, key)`
<a id="benchmarkhaskeyobject-key" href="#benchmarkhaskeyobject-key">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1499 "View in source") [&#x24C9;][1]

Checks if an object has the specified key as a direct property.

#### Arguments
1. `object` *(Object)*: The object to check.
2. `key` *(String)*: The key to check for.

#### Returns
*(Boolean)*: Returns `true` if key is a direct property, else `false`.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.indexOf(array, value [, fromIndex=0])`
<a id="benchmarkindexofarray-value--fromindex0" href="#benchmarkindexofarray-value--fromindex0">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1535 "View in source") [&#x24C9;][1]

A generic `Array#indexOf` like method.

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `value` *(Mixed)*: The value to search for.
3. `[fromIndex=0]` *(Number)*: The index to start searching from.

#### Returns
*(Number)*: The index of the matched value or `-1`.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.interpolate(string, object)`
<a id="benchmarkinterpolatestring-object" href="#benchmarkinterpolatestring-object">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1557 "View in source") [&#x24C9;][1]

Modify a string by replacing named tokens with matching object property values.

#### Arguments
1. `string` *(String)*: The string to modify.
2. `object` *(Object)*: The template object.

#### Returns
*(String)*: The modified string.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.invoke(benches, name [, arg1, arg2, ...])`
<a id="benchmarkinvokebenches-name--arg1-arg2-" href="#benchmarkinvokebenches-name--arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1604 "View in source") [&#x24C9;][1]

Invokes a method on all items in an array.

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

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.join(object [, separator1=',', separator2=': '])`
<a id="benchmarkjoinobject--separator1--separator2:" href="#benchmarkjoinobject--separator1--separator2:">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1758 "View in source") [&#x24C9;][1]

Creates a string of joined array values or object key-value pairs.

#### Arguments
1. `object` *(Array|Object)*: The object to operate on.
2. `[separator1=',']` *(String)*: The separator used between key-value pairs.
3. `[separator2=': ']` *(String)*: The separator used between keys and values.

#### Returns
*(String)*: The joined result.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.map(array, callback, thisArg)`
<a id="benchmarkmaparray-callback-thisarg" href="#benchmarkmaparray-callback-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1780 "View in source") [&#x24C9;][1]

A generic `Array#map` like method.

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `thisArg` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array)*: A new array of values returned by the callback.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.pluck(array, property)`
<a id="benchmarkpluckarray-property" href="#benchmarkpluckarray-property">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1796 "View in source") [&#x24C9;][1]

Retrieves the value of a specified property from all items in an array.

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `property` *(String)*: The property to pluck.

#### Returns
*(Array)*: A new array of property values.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.reduce(array, callback, accumulator)`
<a id="benchmarkreducearray-callback-accumulator" href="#benchmarkreducearray-callback-accumulator">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1812 "View in source") [&#x24C9;][1]

A generic `Array#reduce` like method.

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `accumulator` *(Mixed)*: Initial value of the accumulator.

#### Returns
*(Mixed)*: The accumulator.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.prototype`

<!-- div -->


<!-- div -->

### `Benchmark.prototype.aborted`
<a id="benchmarkprototypeaborted" href="#benchmarkprototypeaborted">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3253 "View in source") [&#x24C9;][1]

*(Boolean)*: A flag to indicate if the benchmark is aborted.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.compiled`
<a id="benchmarkprototypecompiled" href="#benchmarkprototypecompiled">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3229 "View in source") [&#x24C9;][1]

*(Function, String)*: The compiled test function.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.count`
<a id="benchmarkprototypecount" href="#benchmarkprototypecount">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3205 "View in source") [&#x24C9;][1]

*(Number)*: The number of times a test was executed.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.cycles`
<a id="benchmarkprototypecycles" href="#benchmarkprototypecycles">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3213 "View in source") [&#x24C9;][1]

*(Number)*: The number of cycles performed while benchmarking.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.fn`
<a id="benchmarkprototypefn" href="#benchmarkprototypefn">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3245 "View in source") [&#x24C9;][1]

*(Function, String)*: The test to benchmark.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.hz`
<a id="benchmarkprototypehz" href="#benchmarkprototypehz">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3221 "View in source") [&#x24C9;][1]

*(Number)*: The number of executions per second.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.running`
<a id="benchmarkprototyperunning" href="#benchmarkprototyperunning">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3261 "View in source") [&#x24C9;][1]

*(Boolean)*: A flag to indicate if the benchmark is running.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.setup`
<a id="benchmarkprototypesetup" href="#benchmarkprototypesetup">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3324 "View in source") [&#x24C9;][1]

*(Function, String)*: Compiled into the test and executed immediately **before** the test loop.

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

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.teardown`
<a id="benchmarkprototypeteardown" href="#benchmarkprototypeteardown">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3332 "View in source") [&#x24C9;][1]

*(Function, String)*: Compiled into the test and executed immediately **after** the test loop.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.abort()`
<a id="benchmarkprototypeabort" href="#benchmarkprototypeabort">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2130 "View in source") [&#x24C9;][1]

Aborts the benchmark without recording times.

#### Returns
*(Object)*: The benchmark instance.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.clone(options)`
<a id="benchmarkprototypecloneoptions" href="#benchmarkprototypecloneoptions">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2169 "View in source") [&#x24C9;][1]

Creates a new benchmark using the same test and options.

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

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.compare(other)`
<a id="benchmarkprototypecompareother" href="#benchmarkprototypecompareother">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2192 "View in source") [&#x24C9;][1]

Determines if a benchmark is faster than another.

#### Arguments
1. `other` *(Object)*: The benchmark to compare.

#### Returns
*(Number)*: Returns `-1` if slower, `1` if faster, and `0` if indeterminate.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.emit(type)`
<a id="benchmarkprototypeemittype" href="#benchmarkprototypeemittype">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2007 "View in source") [&#x24C9;][1]

Executes all registered listeners of the specified event type.

#### Arguments
1. `type` *(String|Object)*: The event type or object.

#### Returns
*(Mixed)*: Returns the return value of the last listener executed.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.listeners(type)`
<a id="benchmarkprototypelistenerstype" href="#benchmarkprototypelistenerstype">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2037 "View in source") [&#x24C9;][1]

Returns an array of event listeners for a given type that can be manipulated to add or remove listeners.

#### Arguments
1. `type` *(String)*: The event type.

#### Returns
*(Array)*: The listeners array.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.off([type, listener])`
<a id="benchmarkprototypeofftype-listener" href="#benchmarkprototypeofftype-listener">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2070 "View in source") [&#x24C9;][1]

Unregisters a listener for the specified event type(s), or unregisters all listeners for the specified event type(s), or unregisters all listeners for all event types.

#### Arguments
1. `[type]` *(String)*: The event type.
2. `[listener]` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
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
~~~

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.on(type, listener)`
<a id="benchmarkprototypeontype-listener" href="#benchmarkprototypeontype-listener">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2109 "View in source") [&#x24C9;][1]

Registers a listener for the specified event type(s).

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function to register.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// register a listener for an event type
bench.on('cycle', listener);

// register a listener for multiple event types
bench.on('start cycle', listener);
~~~

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.reset()`
<a id="benchmarkprototypereset" href="#benchmarkprototypereset">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2246 "View in source") [&#x24C9;][1]

Reset properties and abort if running.

#### Returns
*(Object)*: The benchmark instance.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.run([options={}])`
<a id="benchmarkprototyperunoptions" href="#benchmarkprototyperunoptions">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2876 "View in source") [&#x24C9;][1]

Runs the benchmark.

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

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.toString()`
<a id="benchmarkprototypetostring" href="#benchmarkprototypetostring">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2317 "View in source") [&#x24C9;][1]

Displays relevant benchmark information when coerced to a string.

#### Returns
*(String)*: A string representation of the benchmark instance.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.options`

<!-- div -->


<!-- div -->

### `Benchmark.options`
<a id="benchmarkoptions" href="#benchmarkoptions">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2925 "View in source") [&#x24C9;][1]

*(Object)*: The default options copied by benchmark instances.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.async`
<a id="benchmarkoptionsasync" href="#benchmarkoptionsasync">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2934 "View in source") [&#x24C9;][1]

*(Boolean)*: A flag to indicate that benchmark cycles will execute asynchronously by default.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.defer`
<a id="benchmarkoptionsdefer" href="#benchmarkoptionsdefer">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2942 "View in source") [&#x24C9;][1]

*(Boolean)*: A flag to indicate that the benchmark clock is deferred.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.delay`
<a id="benchmarkoptionsdelay" href="#benchmarkoptionsdelay">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2949 "View in source") [&#x24C9;][1]

*(Number)*: The delay between test cycles *(secs)*.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.id`
<a id="benchmarkoptionsid" href="#benchmarkoptionsid">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2958 "View in source") [&#x24C9;][1]

*(String)*: Displayed by Benchmark#toString when a `name` is not available *(auto-generated if absent)*.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.initCount`
<a id="benchmarkoptionsinitcount" href="#benchmarkoptionsinitcount">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2966 "View in source") [&#x24C9;][1]

*(Number)*: The default number of times to execute a test on a benchmark's first cycle.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.maxTime`
<a id="benchmarkoptionsmaxtime" href="#benchmarkoptionsmaxtime">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2975 "View in source") [&#x24C9;][1]

*(Number)*: The maximum time a benchmark is allowed to run before finishing *(secs)*. Note: Cycle delays aren't counted toward the maximum time.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.minSamples`
<a id="benchmarkoptionsminsamples" href="#benchmarkoptionsminsamples">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2983 "View in source") [&#x24C9;][1]

*(Number)*: The minimum sample size required to perform statistical analysis.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.minTime`
<a id="benchmarkoptionsmintime" href="#benchmarkoptionsmintime">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2991 "View in source") [&#x24C9;][1]

*(Number)*: The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.name`
<a id="benchmarkoptionsname" href="#benchmarkoptionsname">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2999 "View in source") [&#x24C9;][1]

*(String)*: The name of the benchmark.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.onAbort`
<a id="benchmarkoptionsonabort" href="#benchmarkoptionsonabort">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3007 "View in source") [&#x24C9;][1]

An event listener called when the benchmark is aborted.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.onComplete`
<a id="benchmarkoptionsoncomplete" href="#benchmarkoptionsoncomplete">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3015 "View in source") [&#x24C9;][1]

An event listener called when the benchmark completes running.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.onCycle`
<a id="benchmarkoptionsoncycle" href="#benchmarkoptionsoncycle">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3023 "View in source") [&#x24C9;][1]

An event listener called after each run cycle.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.onError`
<a id="benchmarkoptionsonerror" href="#benchmarkoptionsonerror">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3031 "View in source") [&#x24C9;][1]

An event listener called when a test errors.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.onReset`
<a id="benchmarkoptionsonreset" href="#benchmarkoptionsonreset">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3039 "View in source") [&#x24C9;][1]

An event listener called when the benchmark is reset.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.options.onStart`
<a id="benchmarkoptionsonstart" href="#benchmarkoptionsonstart">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3047 "View in source") [&#x24C9;][1]

An event listener called when the benchmark starts running.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.platform`

<!-- div -->


<!-- div -->

### `Benchmark.platform`
<a id="benchmarkplatform" href="#benchmarkplatform">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3058 "View in source") [&#x24C9;][1]

*(Object)*: Platform object with properties describing things like browser name, version, and operating system.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.platform.description`
<a id="benchmarkplatformdescription" href="#benchmarkplatformdescription">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3066 "View in source") [&#x24C9;][1]

*(String)*: The platform description.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.platform.layout`
<a id="benchmarkplatformlayout" href="#benchmarkplatformlayout">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3074 "View in source") [&#x24C9;][1]

*(String, Null)*: The name of the browser layout engine.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.platform.manufacturer`
<a id="benchmarkplatformmanufacturer" href="#benchmarkplatformmanufacturer">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3098 "View in source") [&#x24C9;][1]

*(String, Null)*: The name of the product's manufacturer.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.platform.name`
<a id="benchmarkplatformname" href="#benchmarkplatformname">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3090 "View in source") [&#x24C9;][1]

*(String, Null)*: The name of the browser/environment.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.platform.os`
<a id="benchmarkplatformos" href="#benchmarkplatformos">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3106 "View in source") [&#x24C9;][1]

*(String, Null)*: The name of the operating system.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.platform.prerelease`
<a id="benchmarkplatformprerelease" href="#benchmarkplatformprerelease">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3114 "View in source") [&#x24C9;][1]

*(String, Null)*: The alpha/beta release indicator.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.platform.product`
<a id="benchmarkplatformproduct" href="#benchmarkplatformproduct">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3082 "View in source") [&#x24C9;][1]

*(String, Null)*: The name of the product hosting the browser.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.platform.version`
<a id="benchmarkplatformversion" href="#benchmarkplatformversion">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3122 "View in source") [&#x24C9;][1]

*(String, Null)*: The browser/environment version.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.platform.toString()`
<a id="benchmarkplatformtostring" href="#benchmarkplatformtostring">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3131 "View in source") [&#x24C9;][1]

Return platform description when the platform object is coerced to a string.

#### Returns
*(String)*: The platform description.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.support`

<!-- div -->


<!-- div -->

### `Benchmark.support`
<a id="benchmarksupport" href="#benchmarksupport">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L120 "View in source") [&#x24C9;][1]

*(Object)*: An object used to flag environments/features.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.support.air`
<a id="benchmarksupportair" href="#benchmarksupportair">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L130 "View in source") [&#x24C9;][1]

*(Boolean)*: Detect Adobe AIR.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.support.argumentsClass`
<a id="benchmarksupportargumentsclass" href="#benchmarksupportargumentsclass">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L138 "View in source") [&#x24C9;][1]

*(Boolean)*: Detect if `arguments` objects have the correct internal [[Class]] value.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.support.browser`
<a id="benchmarksupportbrowser" href="#benchmarksupportbrowser">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L146 "View in source") [&#x24C9;][1]

*(Boolean)*: Detect if in a browser environment.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.support.charByIndex`
<a id="benchmarksupportcharbyindex" href="#benchmarksupportcharbyindex">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L154 "View in source") [&#x24C9;][1]

*(Boolean)*: Detect if strings support accessing characters by index.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.support.charByOwnIndex`
<a id="benchmarksupportcharbyownindex" href="#benchmarksupportcharbyownindex">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L164 "View in source") [&#x24C9;][1]

*(Boolean)*: Detect if strings have indexes as own properties.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.support.decompilation`
<a id="benchmarksupportdecompilation" href="#benchmarksupportdecompilation">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L192 "View in source") [&#x24C9;][1]

*(Boolean)*: Detect if functions support decompilation.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.support.descriptors`
<a id="benchmarksupportdescriptors" href="#benchmarksupportdescriptors">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L213 "View in source") [&#x24C9;][1]

*(Boolean)*: Detect ES5+ property descriptor API.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.support.getAllKeys`
<a id="benchmarksupportgetallkeys" href="#benchmarksupportgetallkeys">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L227 "View in source") [&#x24C9;][1]

*(Boolean)*: Detect ES5+ Object.getOwnPropertyNames().

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.support.java`
<a id="benchmarksupportjava" href="#benchmarksupportjava">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L175 "View in source") [&#x24C9;][1]

*(Boolean)*: Detect if Java is enabled/exposed.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.support.timeout`
<a id="benchmarksupporttimeout" href="#benchmarksupporttimeout">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L183 "View in source") [&#x24C9;][1]

*(Boolean)*: Detect if the Timers API exists.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.prototype.error`

<!-- div -->


<!-- div -->

### `Benchmark.prototype.error`
<a id="benchmarkprototypeerror" href="#benchmarkprototypeerror">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3237 "View in source") [&#x24C9;][1]

*(Object)*: The error object if the test failed.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.prototype.stats`

<!-- div -->


<!-- div -->

### `Benchmark.prototype.stats`
<a id="benchmarkprototypestats" href="#benchmarkprototypestats">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3340 "View in source") [&#x24C9;][1]

*(Object)*: An object of stats including mean, margin or error, and standard deviation.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.stats.deviation`
<a id="benchmark-statsdeviation" href="#benchmark-statsdeviation">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3372 "View in source") [&#x24C9;][1]

*(Number)*: The sample standard deviation.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.stats.mean`
<a id="benchmark-statsmean" href="#benchmark-statsmean">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3380 "View in source") [&#x24C9;][1]

*(Number)*: The sample arithmetic mean.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.stats.moe`
<a id="benchmark-statsmoe" href="#benchmark-statsmoe">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3348 "View in source") [&#x24C9;][1]

*(Number)*: The margin of error.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.stats.rme`
<a id="benchmark-statsrme" href="#benchmark-statsrme">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3356 "View in source") [&#x24C9;][1]

*(Number)*: The relative margin of error *(expressed as a percentage of the mean)*.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.stats.sample`
<a id="benchmark-statssample" href="#benchmark-statssample">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3388 "View in source") [&#x24C9;][1]

*(Array)*: The array of sampled periods.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.stats.sem`
<a id="benchmark-statssem" href="#benchmark-statssem">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3364 "View in source") [&#x24C9;][1]

*(Number)*: The standard error of the mean.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.stats.variance`
<a id="benchmark-statsvariance" href="#benchmark-statsvariance">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3396 "View in source") [&#x24C9;][1]

*(Number)*: The sample variance.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.prototype.times`

<!-- div -->


<!-- div -->

### `Benchmark.prototype.times`
<a id="benchmarkprototypetimes" href="#benchmarkprototypetimes">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3405 "View in source") [&#x24C9;][1]

*(Object)*: An object of timing data including cycle, elapsed, period, start, and stop.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.times.cycle`
<a id="benchmark-timescycle" href="#benchmark-timescycle">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3413 "View in source") [&#x24C9;][1]

*(Number)*: The time taken to complete the last cycle *(secs)*.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.times.elapsed`
<a id="benchmark-timeselapsed" href="#benchmark-timeselapsed">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3421 "View in source") [&#x24C9;][1]

*(Number)*: The time taken to complete the benchmark *(secs)*.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.times.period`
<a id="benchmark-timesperiod" href="#benchmark-timesperiod">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3429 "View in source") [&#x24C9;][1]

*(Number)*: The time taken to execute the test once *(secs)*.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.prototype.times.timeStamp`
<a id="benchmark-timestimestamp" href="#benchmark-timestimestamp">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3437 "View in source") [&#x24C9;][1]

*(Number)*: A timestamp of when the benchmark started *(ms)*.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Deferred`

<!-- div -->


<!-- div -->

### `Benchmark.Deferred(clone)`
<a id="benchmarkdeferredclone" href="#benchmarkdeferredclone">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L400 "View in source") [&#x24C9;][1]

The Deferred constructor.

#### Arguments
1. `clone` *(Object)*: The cloned benchmark instance.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Deferred.prototype`

<!-- div -->


<!-- div -->

### `Benchmark.Deferred.prototype.benchmark`
<a id="benchmarkdeferredprototypebenchmark" href="#benchmarkdeferredprototypebenchmark">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3481 "View in source") [&#x24C9;][1]

*(Object)*: The deferred benchmark instance.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Deferred.prototype.cycles`
<a id="benchmarkdeferredprototypecycles" href="#benchmarkdeferredprototypecycles">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3489 "View in source") [&#x24C9;][1]

*(Number)*: The number of deferred cycles performed while benchmarking.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Deferred.prototype.elapsed`
<a id="benchmarkdeferredprototypeelapsed" href="#benchmarkdeferredprototypeelapsed">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3497 "View in source") [&#x24C9;][1]

*(Number)*: The time taken to complete the deferred benchmark *(secs)*.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Deferred.prototype.resolve`
<a id="benchmarkdeferredprototyperesolve" href="#benchmarkdeferredprototyperesolve">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1120 "View in source") [&#x24C9;][1]

*(Unknown)*: Handles cycling/completing the deferred benchmark.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Deferred.prototype.timeStamp`
<a id="benchmarkdeferredprototypetimestamp" href="#benchmarkdeferredprototypetimestamp">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3505 "View in source") [&#x24C9;][1]

*(Number)*: A timestamp of when the deferred benchmark started *(ms)*.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Event`

<!-- div -->


<!-- div -->

### `Benchmark.Event(type)`
<a id="benchmarkeventtype" href="#benchmarkeventtype">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L416 "View in source") [&#x24C9;][1]

The Event constructor.

#### Arguments
1. `type` *(String|Object)*: The event type.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Event.prototype`

<!-- div -->


<!-- div -->

### `Benchmark.Event.prototype.aborted`
<a id="benchmarkeventprototypeaborted" href="#benchmarkeventprototypeaborted">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3521 "View in source") [&#x24C9;][1]

*(Boolean)*: A flag to indicate if the emitters listener iteration is aborted.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Event.prototype.cancelled`
<a id="benchmarkeventprototypecancelled" href="#benchmarkeventprototypecancelled">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3529 "View in source") [&#x24C9;][1]

*(Boolean)*: A flag to indicate if the default action is cancelled.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Event.prototype.result`
<a id="benchmarkeventprototyperesult" href="#benchmarkeventprototyperesult">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3545 "View in source") [&#x24C9;][1]

*(Mixed)*: The return value of the last executed listener.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Event.prototype.timeStamp`
<a id="benchmarkeventprototypetimestamp" href="#benchmarkeventprototypetimestamp">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3561 "View in source") [&#x24C9;][1]

*(Number)*: A timestamp of when the event was created *(ms)*.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Event.prototype.type`
<a id="benchmarkeventprototypetype" href="#benchmarkeventprototypetype">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3569 "View in source") [&#x24C9;][1]

*(String)*: The event type.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Event.prototype.currentTarget`

<!-- div -->


<!-- div -->

### `Benchmark.Event.prototype.currentTarget`
<a id="benchmarkeventprototypecurrenttarget" href="#benchmarkeventprototypecurrenttarget">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3537 "View in source") [&#x24C9;][1]

*(Object)*: The object whose listeners are currently being processed.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Event.prototype.target`

<!-- div -->


<!-- div -->

### `Benchmark.Event.prototype.target`
<a id="benchmarkeventprototypetarget" href="#benchmarkeventprototypetarget">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3553 "View in source") [&#x24C9;][1]

*(Object)*: The object to which the event was originally emitted.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Suite`

<!-- div -->


<!-- div -->

### `Benchmark.Suite(name [, options={}])`
<a id="benchmarksuitename--options" href="#benchmarksuitename--options">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L462 "View in source") [&#x24C9;][1]

The Suite constructor.

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

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Suite.prototype`

<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.aborted`
<a id="benchmarksuiteprototypeaborted" href="#benchmarksuiteprototypeaborted">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3610 "View in source") [&#x24C9;][1]

*(Boolean)*: A flag to indicate if the suite is aborted.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.length`
<a id="benchmarksuiteprototypelength" href="#benchmarksuiteprototypelength">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3602 "View in source") [&#x24C9;][1]

*(Number)*: The number of benchmarks in the suite.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.running`
<a id="benchmarksuiteprototyperunning" href="#benchmarksuiteprototyperunning">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3618 "View in source") [&#x24C9;][1]

*(Boolean)*: A flag to indicate if the suite is running.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.abort()`
<a id="benchmarksuiteprototypeabort" href="#benchmarksuiteprototypeabort">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1829 "View in source") [&#x24C9;][1]

Aborts all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.add(name, fn [, options={}])`
<a id="benchmarksuiteprototypeaddname-fn--options" href="#benchmarksuiteprototypeaddname-fn--options">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1874 "View in source") [&#x24C9;][1]

Adds a test to the benchmark suite.

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

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.clone(options)`
<a id="benchmarksuiteprototypecloneoptions" href="#benchmarksuiteprototypecloneoptions">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1893 "View in source") [&#x24C9;][1]

Creates a new suite with cloned benchmarks.

#### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Object)*: The new suite instance.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.emit(type)`
<a id="benchmarkprototypeemittype" href="#benchmarkprototypeemittype">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2007 "View in source") [&#x24C9;][1]

Executes all registered listeners of the specified event type.

#### Arguments
1. `type` *(String|Object)*: The event type or object.

#### Returns
*(Mixed)*: Returns the return value of the last listener executed.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.filter(callback)`
<a id="benchmarksuiteprototypefiltercallback" href="#benchmarksuiteprototypefiltercallback">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1916 "View in source") [&#x24C9;][1]

An `Array#filter` like method.

#### Arguments
1. `callback` *(Function|String)*: The function/alias called per iteration.

#### Returns
*(Object)*: A new suite of benchmarks that passed callback filter.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.forEach(callback)`
<a id="benchmarksuiteprototypeforeachcallback" href="#benchmarksuiteprototypeforeachcallback">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3628 "View in source") [&#x24C9;][1]

An `Array#forEach` like method. Callbacks may terminate the loop by explicitly returning `false`.

#### Arguments
1. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Object)*: The suite iterated over.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.indexOf(value)`
<a id="benchmarksuiteprototypeindexofvalue" href="#benchmarksuiteprototypeindexofvalue">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3637 "View in source") [&#x24C9;][1]

An `Array#indexOf` like method.

#### Arguments
1. `value` *(Mixed)*: The value to search for.

#### Returns
*(Number)*: The index of the matched value or `-1`.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.invoke(name [, arg1, arg2, ...])`
<a id="benchmarksuiteprototypeinvokename--arg1-arg2-" href="#benchmarksuiteprototypeinvokename--arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3647 "View in source") [&#x24C9;][1]

Invokes a method on all benchmarks in the suite.

#### Arguments
1. `name` *(String|Object)*: The name of the method to invoke OR options object.
2. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the method with.

#### Returns
*(Array)*: A new array of values returned from each method invoked.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.join([separator=','])`
<a id="benchmarksuiteprototypejoinseparator-" href="#benchmarksuiteprototypejoinseparator-">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3656 "View in source") [&#x24C9;][1]

Converts the suite of benchmarks to a string.

#### Arguments
1. `[separator=',']` *(String)*: A string to separate each element of the array.

#### Returns
*(String)*: The string.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.listeners(type)`
<a id="benchmarkprototypelistenerstype" href="#benchmarkprototypelistenerstype">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2037 "View in source") [&#x24C9;][1]

Returns an array of event listeners for a given type that can be manipulated to add or remove listeners.

#### Arguments
1. `type` *(String)*: The event type.

#### Returns
*(Array)*: The listeners array.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.map(callback)`
<a id="benchmarksuiteprototypemapcallback" href="#benchmarksuiteprototypemapcallback">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3665 "View in source") [&#x24C9;][1]

An `Array#map` like method.

#### Arguments
1. `callback` *(Function)*: The function called per iteration.

#### Returns
*(Array)*: A new array of values returned by the callback.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.off([type, listener])`
<a id="benchmarkprototypeofftype-listener" href="#benchmarkprototypeofftype-listener">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2070 "View in source") [&#x24C9;][1]

Unregisters a listener for the specified event type(s), or unregisters all listeners for the specified event type(s), or unregisters all listeners for all event types.

#### Arguments
1. `[type]` *(String)*: The event type.
2. `[listener]` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
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
~~~

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.on(type, listener)`
<a id="benchmarkprototypeontype-listener" href="#benchmarkprototypeontype-listener">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L2109 "View in source") [&#x24C9;][1]

Registers a listener for the specified event type(s).

#### Arguments
1. `type` *(String)*: The event type.
2. `listener` *(Function)*: The function to register.

#### Returns
*(Object)*: The benchmark instance.

#### Example
~~~ js
// register a listener for an event type
bench.on('cycle', listener);

// register a listener for multiple event types
bench.on('start cycle', listener);
~~~

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.pluck(property)`
<a id="benchmarksuiteprototypepluckproperty" href="#benchmarksuiteprototypepluckproperty">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3674 "View in source") [&#x24C9;][1]

Retrieves the value of a specified property from all benchmarks in the suite.

#### Arguments
1. `property` *(String)*: The property to pluck.

#### Returns
*(Array)*: A new array of property values.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.pop()`
<a id="benchmarksuiteprototypepop" href="#benchmarksuiteprototypepop">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3682 "View in source") [&#x24C9;][1]

Removes the last benchmark from the suite and returns it.

#### Returns
*(Mixed)*: The removed benchmark.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.push()`
<a id="benchmarksuiteprototypepush" href="#benchmarksuiteprototypepush">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3690 "View in source") [&#x24C9;][1]

Appends benchmarks to the suite.

#### Returns
*(Number)*: The suite's new length.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.reduce(callback, accumulator)`
<a id="benchmarksuiteprototypereducecallback-accumulator" href="#benchmarksuiteprototypereducecallback-accumulator">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3709 "View in source") [&#x24C9;][1]

An `Array#reduce` like method.

#### Arguments
1. `callback` *(Function)*: The function called per iteration.
2. `accumulator` *(Mixed)*: Initial value of the accumulator.

#### Returns
*(Mixed)*: The accumulator.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.reset()`
<a id="benchmarksuiteprototypereset" href="#benchmarksuiteprototypereset">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1931 "View in source") [&#x24C9;][1]

Resets all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.reverse()`
<a id="benchmarksuiteprototypereverse" href="#benchmarksuiteprototypereverse">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L590 "View in source") [&#x24C9;][1]

Rearrange the host array's elements in reverse order.

#### Returns
*(Array)*: The reversed array.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.run([options={}])`
<a id="benchmarksuiteprototyperunoptions" href="#benchmarksuiteprototyperunoptions">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L1968 "View in source") [&#x24C9;][1]

Runs the suite.

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

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.shift()`
<a id="benchmarksuiteprototypeshift" href="#benchmarksuiteprototypeshift">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L623 "View in source") [&#x24C9;][1]

Removes the first element of the host array and returns it.

#### Returns
*(Mixed)*: The first element of the array.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.slice(start, end)`
<a id="benchmarksuiteprototypeslicestart-end" href="#benchmarksuiteprototypeslicestart-end">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L636 "View in source") [&#x24C9;][1]

Creates an array of the host array's elements from the start index up to, but not including, the end index.

#### Arguments
1. `start` *(Number)*: The starting index.
2. `end` *(Number)*: The end index.

#### Returns
*(Array)*: The new array.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.sort([compareFn=null])`
<a id="benchmarksuiteprototypesortcomparefnnull" href="#benchmarksuiteprototypesortcomparefnnull">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3699 "View in source") [&#x24C9;][1]

Sorts the benchmarks of the suite.

#### Arguments
1. `[compareFn=null]` *(Function)*: A function that defines the sort order.

#### Returns
*(Object)*: The sorted suite.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.splice(start, deleteCount [, val1, val2, ...])`
<a id="benchmarksuiteprototypesplicestart-deletecount--val1-val2-" href="#benchmarksuiteprototypesplicestart-deletecount--val1-val2-">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L666 "View in source") [&#x24C9;][1]

Allows removing a range of elements and/or inserting elements into the host array.

#### Arguments
1. `start` *(Number)*: The start index.
2. `deleteCount` *(Number)*: The number of elements to delete.
3. `[val1, val2, ...]` *(Mixed)*: values to insert at the `start` index.

#### Returns
*(Array)*: An array of removed elements.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.prototype.unshift()`
<a id="benchmarksuiteprototypeunshift" href="#benchmarksuiteprototypeunshift">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L694 "View in source") [&#x24C9;][1]

Appends arguments to the host array.

#### Returns
*(Number)*: The new length.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Benchmark.Suite.options`

<!-- div -->


<!-- div -->

### `Benchmark.Suite.options`
<a id="benchmarksuiteoptions" href="#benchmarksuiteoptions">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3581 "View in source") [&#x24C9;][1]

*(Object)*: The default options copied by suite instances.

* * *

<!-- /div -->


<!-- div -->


<!-- div -->

### `Benchmark.Suite.options.name`
<a id="benchmarksuiteoptionsname" href="#benchmarksuiteoptionsname">#</a> [&#x24C8;](https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js#L3589 "View in source") [&#x24C9;][1]

*(String)*: The name of the suite.

* * *

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #readme "Jump back to the TOC."