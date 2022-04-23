// Type definitions for Benchmark v2.1.4
// Project: https://benchmarkjs.com
// Definitions by: Asana <https://asana.com>
//                 Charlie Fish <https://github.com/fishcharlie>
//                 Blair Zajac <https://github.com/blair>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

type AnyObject = { [key: string | number | symbol]: any; };

declare class Benchmark {

    /**
     * A generic `Array#filter` like method.
     *
     * @static
     * @memberOf Benchmark
     * @param {Array} arr The array to iterate over.
     * @param {Function|string} callback The function/alias called per iteration.
     * @returns {Array} A new array of values that passed callback filter.
     * @example
     *
     * // get odd numbers
     * Benchmark.filter([1, 2, 3, 4, 5], function(n) {
     *   return n % 2;
     * }); // -> [1, 3, 5];
     *
     * // get fastest benchmarks
     * Benchmark.filter(benches, 'fastest');
     *
     * // get slowest benchmarks
     * Benchmark.filter(benches, 'slowest');
     *
     * // get benchmarks that completed without erroring
     * Benchmark.filter(benches, 'successful');
     */
    static filter<T>(arr: T[], callback: (value: T) => any, thisArg?: any): T[];
    static filter<T>(arr: T[], filter: string, thisArg?: any): T[];

    /**
     * Converts a number to a more readable comma-separated string representation.
     *
     * @static
     * @param {number} number The number to convert.
     * @returns {string} The more readable string representation.
     */
    static formatNumber(number: number): string;

    /**
     * Creates a string of joined array values or object key-value pairs.
     *
     * @static
     * @param {Array|Object} object The object to operate on.
     * @param {string} [separator1=','] The separator used between key-value pairs.
     * @param {string} [separator2=': '] The separator used between keys and values.
     * @returns {string} The joined result.
     */
    static join(object: AnyObject | any[], separator1?: string, separator2?: string): string;

    /**
     * Invokes a method on all items in an array.
     *
     * @static
     * @param {Array} benches Array of benchmarks to iterate over.
     * @param {Benchmark.Options|string} name The name of the method to invoke OR options object.
     * @param {...*} [args] Arguments to invoke the method with.
     * @returns {Array} A new array of values returned from each method invoked.
     * @example
     *
     * // invoke `reset` on all benchmarks
     * Benchmark.invoke(benches, 'reset');
     *
     * // invoke `emit` with arguments
     * Benchmark.invoke(benches, 'emit', 'complete', listener);
     *
     * // invoke `run(true)`, treat benchmarks as a queue, and register invoke callbacks
     * Benchmark.invoke(benches, {
     *
     *   // invoke the `run` method
     *   'name': 'run',
     *
     *   // pass a single argument
     *   'args': true,
     *
     *   // treat as queue, removing benchmarks from front of `benches` until empty
     *   'queued': true,
     *
     *   // called before any benchmarks have been invoked.
     *   'onStart': onStart,
     *
     *   // called between invoking benchmarks
     *   'onCycle': onCycle,
     *
     *   // called after all benchmarks have been invoked.
     *   'onComplete': onComplete
     * });
     */
    static invoke(benches: Benchmark[], name: string | Benchmark.Options, ...args: any[]): any[];

    /**
     * Create a new `Benchmark` function using the given `context` object.
     *
     * @static
     * @param {Object} [context=root] The context object.
     * @returns {Function} Returns a new `Benchmark` function.
     */
    static runInContext(context: AnyObject): Function;

    static each(obj: AnyObject | any[], callback: Function, thisArg?: any): void;
    static forEach<T>(arr: T[], callback: (value: T) => any, thisArg?: any): void;
    static forOwn(obj: AnyObject, callback: Function, thisArg?: any): void;
    static has(obj: AnyObject, path: any[] | string): boolean;
    static indexOf<T>(arr: T[], value: T, fromIndex?: number): number;
    static map<T, K>(arr: T[], callback: (value: T) => K, thisArg?: any): K[];
    static reduce<T, K>(arr: T[], callback: (accumulator: K, value: T) => K, thisArg?: any): K;

    /**
     * The default options the benchmark instances.
     *
     * @static
     * @memberOf Benchmark
     * @type {Object}
     */
    static options: Benchmark.Options;
    static support: Benchmark.Support;

    /**
     * The semantic version number.
     *
     * @static
     * @type {string}
     */
    static version: string;

    /**
     * The Benchmark constructor.
     *
     * Note: The Benchmark constructor exposes a handful of lodash methods to
     * make working with arrays, collections, and objects easier. The lodash
     * methods are:
     * [`each/forEach`](https://lodash.com/docs#forEach), [`forOwn`](https://lodash.com/docs#forOwn),
     * [`has`](https://lodash.com/docs#has), [`indexOf`](https://lodash.com/docs#indexOf),
     * [`map`](https://lodash.com/docs#map), and [`reduce`](https://lodash.com/docs#reduce)
     *
     * @constructor
     * @param {string} name A name to identify the benchmark.
     * @param {Function|string} fn The test to benchmark.
     * @param {Benchmark.Options} [options={}] Options object.
     * @example
     *
     * // basic usage (the `new` operator is optional)
     * var bench = new Benchmark(fn);
     *
     * // or using a name first
     * var bench = new Benchmark('foo', fn);
     *
     * // or with options
     * var bench = new Benchmark('foo', fn, {
     *
     *   // displayed by `Benchmark#toString` if `name` is not available
     *   'id': 'xyz',
     *
     *   // called when the benchmark starts running
     *   'onStart': onStart,
     *
     *   // called after each run cycle
     *   'onCycle': onCycle,
     *
     *   // called when aborted
     *   'onAbort': onAbort,
     *
     *   // called when a test errors
     *   'onError': onError,
     *
     *   // called when reset
     *   'onReset': onReset,
     *
     *   // called when the benchmark completes running
     *   'onComplete': onComplete,
     *
     *   // compiled/called before the test loop
     *   'setup': setup,
     *
     *   // compiled/called after the test loop
     *   'teardown': teardown
     * });
     *
     * // or name and options
     * var bench = new Benchmark('foo', {
     *
     *   // a flag to indicate the benchmark is deferred
     *   'defer': true,
     *
     *   // benchmark test function
     *   'fn': function(deferred) {
     *     // call `Deferred#resolve` when the deferred test is finished
     *     deferred.resolve();
     *   }
     * });
     *
     * // or options only
     * var bench = new Benchmark({
     *
     *   // benchmark name
     *   'name': 'foo',
     *
     *   // benchmark test as a string
     *   'fn': '[1,2,3,4].sort()'
     * });
     *
     * // a test's `this` binding is set to the benchmark instance
     * var bench = new Benchmark('foo', function() {
     *   'My name is '.concat(this.name); // "My name is foo"
     * });
     */
    constructor(name: string, fn: Function | (ThisBenchmarkFunction) | string, options?: Benchmark.Options);
    constructor(name: string, options?: Benchmark.Options);
    constructor(fn: Function | (ThisBenchmarkFunction) | string, options?: Benchmark.Options);
    constructor(options: Benchmark.Options);

    id: number;
    name: string;

    /**
     * The number of times a test was executed.
     *
     * @memberOf Benchmark
     * @type {number}
     */
    count: number;

    /**
     * The number of cycles performed while benchmarking.
     *
     * @type {number}
     */
    cycles: number;

    /**
     * The number of executions per second.
     *
     * @type {number}
     */
    hz: number;

    /**
     * The compiled test function.
     *
     * @type {Function|string}
     */
    compiled: Function | string;

    /**
     * The error object if the test failed.
     *
     * @type {Object}
     */
    error: Error;

    /**
     * The test to benchmark.
     *
     * @type {Function|string}
     */
    fn: Function | string;

    /**
     * A flag to indicate if the benchmark is aborted.
     *
     * @type {boolean}
     */
    aborted: boolean;

    /**
     * A flag to indicate if the benchmark is running.
     *
     * @type {boolean}
     */
    running: boolean;

    /**
     * Compiled into the test and executed immediately **before** the test loop.
     *
     * @type {Function|string}
     * @example
     *
     * // basic usage
     * var bench = Benchmark({
     *   'setup': function() {
     *     var c = this.count,
     *         element = document.getElementById('container');
     *     while (c--) {
     *       element.appendChild(document.createElement('div'));
     *     }
     *   },
     *   'fn': function() {
     *     element.removeChild(element.lastChild);
     *   }
     * });
     *
     * // compiles to something like:
     * var c = this.count,
     *     element = document.getElementById('container');
     * while (c--) {
     *   element.appendChild(document.createElement('div'));
     * }
     * var start = new Date;
     * while (count--) {
     *   element.removeChild(element.lastChild);
     * }
     * var end = new Date - start;
     *
     * // or using strings
     * var bench = Benchmark({
     *   'setup': '\
     *     var a = 0;\n\
     *     (function() {\n\
     *       (function() {\n\
     *         (function() {',
     *   'fn': 'a += 1;',
     *   'teardown': '\
     *          }())\n\
     *        }())\n\
     *      }())'
     * });
     *
     * // compiles to something like:
     * var a = 0;
     * (function() {
     *   (function() {
     *     (function() {
     *       var start = new Date;
     *       while (count--) {
     *         a += 1;
     *       }
     *       var end = new Date - start;
     *     }())
     *   }())
     * }())
     */
    setup: ThisBenchmarkFunction | string;

    /**
     * Compiled into the test and executed immediately **after** the test loop.
     * 
     * @type {Function|string}
     */
    teardown: ThisBenchmarkFunction  | string;

    /**
     * An object of stats including mean, margin or error, and standard deviation.
     *
     * @type {Object}
     */
    stats: Benchmark.Stats;

    /**
     * An object of timing data including cycle, elapsed, period, start, and stop.
     *
     * @type {Object}
     */
    times: Benchmark.Times;

    /**
     * Aborts the benchmark without recording times.
     *
     * @returns {Benchmark} The benchmark instance.
     */
    abort(): Benchmark;

    /**
     * Creates a new benchmark using the same test and options.
     *
     * @param {Benchmark.Options} options Options object to overwrite cloned options.
     * @returns {Benchmark} The new benchmark instance.
     * @example
     *
     * var bizarro = bench.clone({
     *   'name': 'doppelganger'
     * });
     */
    clone(options: Benchmark.Options): Benchmark;

    /**
     * Determines if a benchmark is faster than another.
     *
     * @param {Benchmark} benchmark The benchmark to compare.
     * @returns {number} Returns `-1` if slower, `1` if faster, and `0` if indeterminate.
     */
    compare(benchmark: Benchmark): number;

    /**
     * Executes all registered listeners of the specified event type.
     *
     * @param {Object|string} type The event type or object.
     * @param {...*} [args] Arguments to invoke the listener with.
     * @returns {*} Returns the return value of the last listener executed.
     */
    emit(type: string | Object, ...args: any[]): any;

    /**
     * Returns an array of event listeners for a given type that can be manipulated
     * to add or remove listeners.
     *
     * @param {string} type The event type.
     * @returns {Array} The listeners array.
     */
    listeners(type: string): Function[];

    /**
     * Unregisters a listener for the specified event type(s),
     * or unregisters all listeners for the specified event type(s),
     * or unregisters all listeners for all event types.
     *
     * @param {string} type The event type.
     * @param {Function} fn The function to unregister.
     * @returns {Benchmark} The current instance.
     * @example
     *
     * // unregister a listener for an event type
     * bench.off('cycle', listener);
     *
     * // unregister a listener for multiple event types
     * bench.off('start cycle', listener);
     *
     * // unregister all listeners for an event type
     * bench.off('cycle');
     *
     * // unregister all listeners for multiple event types
     * bench.off('start cycle complete');
     *
     * // unregister all listeners for all event types
     * bench.off();
     */
    off(type?: string, fn?: Function): Benchmark;
    off(types: string[]): Benchmark;

    /**
     * Registers a listener for the specified event type(s).
     *
     * @param {string} type The event type.
     * @param {Function} fn The function to register.
     * @returns {Benchmark} The current instance.
     * @example
     *
     * // register a listener for an event type
     * bench.on('cycle', listener);
     *
     * // register a listener for multiple event types
     * bench.on('start cycle', listener);
     */
    on(type?: string, fn?: Function): Benchmark;
    on(types: string[]): Benchmark;

    /**
     * Reset properties and abort if running.
     *
     * @returns {Benchmark} The benchmark instance.
     */
    reset(): Benchmark;

    /**
     * Runs the benchmark.
     *
     * @memberOf Benchmark
     * @param {Benchmark.Options} [options={}] Options object.
     * @returns {Benchmark} The benchmark instance.
     * @example
     *
     * // basic usage
     * bench.run();
     *
     * // or with options
     * bench.run({ 'async': true });
     */
    run(options?: Benchmark.Options): Benchmark;

    /**
     * Displays relevant benchmark information when coerced to a string.
     *
     * @name toString
     * @returns {string} A string representation of the benchmark instance.
     */
    toString(): string;
}

type ThisBenchmarkFunction = (this: Benchmark) => void;

declare namespace Benchmark {
    export interface Options {
        args?: any | any[];
        /**
         * A flag to indicate that benchmark cycles will execute asynchronously
         * by default.
         *
         * @type {boolean}
         */
        async?: boolean | undefined;

        /**
         * A flag to indicate that the benchmark clock is deferred.
         *
         * @type {boolean}
         * @default false
         */
        defer?: boolean | undefined;

        /**
         * The delay between test cycles (secs).
         *
         * @type {number}
         * @default 0.005
         */
        delay?: number | undefined;

        /**
         * Displayed by `Benchmark#toString` when a `name` is not available
         * (auto-generated if absent).
         *
         * @type {string}
         */
        id?: string | undefined;

        /**
         * The default number of times to execute a test on a benchmark's first cycle.
         *
         * @type {number}
         */
        initCount?: number | undefined;

        /**
         * The maximum time a benchmark is allowed to run before finishing (secs).
         *
         * Note: Cycle delays aren't counted toward the maximum time.
         *
         * @type {number}
         * @default 5
         */
        maxTime?: number | undefined;

        /**
         * The minimum sample size required to perform statistical analysis.
         *
         * @type {number}
         * @default 5
         */
        minSamples?: number | undefined;

        /**
         * The time needed to reduce the percent uncertainty of measurement to 1% (secs).
         *
         * @type {number}
         * @default 0
         */
        minTime?: number | undefined;

        /**
         * The name of the benchmark.
         *
         * @type {string}
         */
        name?: string | undefined;

        /**
         * An event listener called when the benchmark is aborted.
         *
         * @type Function
         */
        onAbort?: Function | undefined;

        /**
         * An event listener called when the benchmark completes running.
         *
         * @type Function
         */
        onComplete?: Function | undefined;

        /**
         * An event listener called after each run cycle.
         *
         * @type Function
         */
        onCycle?: Function | undefined;

        /**
         * An event listener called when a test errors.
         *
         * @type Function
         */
        onError?: Function | undefined;

        /**
         * An event listener called when the benchmark is reset.
         *
         * @type Function
         */
        onReset?: Function | undefined;

        /**
         * An event listener called when the benchmark starts running.
         *
         * @type Function
         */
        onStart?: Function | undefined;

        setup?: ThisBenchmarkFunction | string | undefined;
        teardown?: ThisBenchmarkFunction | string | undefined;
        fn?: Function | string | undefined;
        queued?: boolean | undefined;
    }

    /**
     * An object used to flag environments/features.
     *
     * @type {Object}
     */
    export interface Support {

        /**
         * Detect if running in a browser environment.
         *
         * @type {boolean}
         */
        browser: boolean;

        /**
         * Test if able to run a snippet of JavaScript via script injection.
         *
         * @type {boolean}
         */
        canInjectScript: boolean;
        /**
         * Detect if the Timers API exists.
         *
         * @type {boolean}
         */
        timeout: boolean;

        /**
         * Detect if function decompilation is support.
         *
         * @type {boolean}
         */
        decompilation: boolean;
    }

    /**
     * An object of stats including mean, margin or error, and standard deviation.
     *
     * @type {Object}
     */
    export interface Stats {
        /**
         * The margin of error.
         *
         * @type {number}
         */
        moe: number;

        /**
         * The relative margin of error (expressed as a percentage of the mean).
         *
         * @type {number}
         */
        rme: number;

        /**
         * The standard error of the mean.
         *
         * @type {number}
         */
        sem: number;

        /**
         * The sample standard deviation.
         *
         * @type {number}
         */
        deviation: number;

        /**
         * The sample arithmetic mean (secs).
         *
         * @type {number}
         */
        mean: number;
        /**
         * The array of sampled periods.
         *
         * @type Array
         */
        sample: any[];

        /**
         * The sample variance.
         *
         * @memberOf Benchmark#stats
         * @type {number}
         */
        variance: number;
    }

    /**
     * An object of timing data including cycle, elapsed, period, start, and stop.
     *
     * @type {Object}
     */
    export interface Times {

        /**
         * The time taken to complete the last cycle (secs).
         *
         * @type {number}
         */
        cycle: number;

        /**
         * The time taken to complete the benchmark (secs).
         *
         * @type {number}
         */
        elapsed: number;

        /**
         * The time taken to execute the test once (secs).
         *
         * @type {number}
         */
        period: number;

        /**
         * A timestamp of when the benchmark started (ms).
         *
         * @type {number}
         */
        timeStamp: number;
    }

    export class Deferred {

        /**
         * The Deferred constructor.
         *
         * @constructor
         * @param {Benchmark} clone The cloned benchmark instance.
         */
        constructor(clone: Benchmark);

        /**
         * The deferred benchmark instance.
         *
         * @type {Benchmark}
         */
        benchmark: Benchmark;

        /**
         * The number of deferred cycles performed while benchmarking.
         *
         * @type {number}
         */
        cycles: number;

        /**
         * The time taken to complete the benchmark (secs).
         *
         * @type {number}
         */
        elapsed: number;

        /**
         * A timestamp of when the deferred benchmark started (ms).
         *
         * @type {number}
         */
        timeStamp: number;

        /**
         * Handles cycling/completing the deferred benchmark.
         */
        resolve(): void;

        /**
         * Trigger error for deferred benchmark.
         *
         * @param {Error} [err]
         */
        reject(err: Error): void;
    }

    export interface Target {
        options: Options;
        async?: boolean | undefined;
        defer?: boolean | undefined;
        delay?: number | undefined;
        initCount?: number | undefined;
        maxTime?: number | undefined;
        minSamples?: number | undefined;
        minTime?: number | undefined;
        name?: string | undefined;

        /**
         * The test to benchmark.
         *
         * @memberOf Benchmark
         * @type {Function|string}
         */
        fn?: Function | string | undefined;
        id: number;
        /**
         * An object of stats including mean, margin or error, and standard deviation.
         *
         * @type {Object}
         */
        stats?: Stats | undefined;

        /**
         * An object of timing data including cycle, elapsed, period, start, and stop.
         *
         * @type {Object}
         */
        times?: Times | undefined;

        /**
         * A flag to indicate if the benchmark is running.
         *
         * @type {boolean}
         */
        running: boolean;

        /**
         * The number of cycles performed while benchmarking.
         *
         * @type {number}
         */
        count?: number | undefined;

        /**
         * The compiled test function.
         *
         * @memberOf Benchmark
         * @type {Function|string}
         */
        compiled?: Function | undefined;

        /**
         * The number of times a test was executed.
         *
         * @type {number}
         */
        cycles?: number | undefined;

        /**
         * The number of executions per second.
         *
         * @memberOf Benchmark
         * @type {number}
         */
        hz?: number | undefined;
    }

    export class Event {
        /**
         * The Event constructor.
         *
         * @constructor
         * @param {Object|string} type The event type.
         */
        constructor(type: string | Object);

        /**
         * A flag to indicate if the emitters listener iteration is aborted.
         *
         * @type {boolean}
         */
        aborted: boolean;

        /**
         * A flag to indicate if the default action is cancelled.
         *
         * @type {boolean}
         */
        cancelled: boolean;

        /**
         * The object whose listeners are currently being processed.
         *
         * @type {(Suite|Benchmark)}
         */
        currentTarget: Suite | Benchmark;

        /**
         * The return value of the last executed listener.
         *
         * @type {Mixed}
         */
        result: any;

        /**
         * The object to which the event was originally emitted.
         *
         * @type {Target}
         */
        target: Target;

        /**
         * A timestamp of when the event was created (ms).
         *
         * @type {number}
         */
        timeStamp: number;

        /**
         * The event type.
         *
         * @type {string}
         */
        type: string;
    }

    export class Suite {
        /**
         * The options of the suite.
         *
         * @static
         * @type {Object}
         */
        static options: {
            /**
             * The name of the suite.
             *
             * @type {string}
             */
            name: string;
        };

        /**
         * The Suite constructor.
         *
         * Note: Each Suite instance has a handful of wrapped lodash methods to
         * make working with Suites easier. The wrapped lodash methods are:
         * [`each/forEach`](https://lodash.com/docs#forEach), [`indexOf`](https://lodash.com/docs#indexOf),
         * [`map`](https://lodash.com/docs#map), and [`reduce`](https://lodash.com/docs#reduce)
         *
         * @constructor
         * @param {string} name A name to identify the suite.
         * @param {Benchmark.Options} [options={}] Options object.
         * @example
         *
         * // basic usage (the `new` operator is optional)
         * var suite = new Suite;
         *
         * // or using a name first
         * var suite = new Suite('foo');
         *
         * // or with options
         * var suite = new Suite('foo', {
         *
         *   // called when the suite starts running
         *   'onStart': onStart,
         *
         *   // called between running benchmarks
         *   'onCycle': onCycle,
         *
         *   // called when aborted
         *   'onAbort': onAbort,
         *
         *   // called when a test errors
         *   'onError': onError,
         *
         *   // called when reset
         *   'onReset': onReset,
         *
         *   // called when the suite completes running
         *   'onComplete': onComplete
         * });
         */
        constructor(name?: string, options?: Options);

        /**
         * The number of benchmarks in the suite.
         *
         * @type {number}
         */
        length: number;

        /**
         * A flag to indicate if the suite is aborted.
         *
         * @type {boolean}
         */
        aborted: boolean;

        /**
         * A flag to indicate if the suite is running.
         *
         * @memberOf Benchmark.Suite
         * @type {boolean}
         */
        running: boolean;

        /**
         * Aborts all benchmarks in the suite.
         *
         * @name abort
         * @returns {Suite} The suite instance.
         */
        abort(): Suite;

        /**
         * Adds a test to the benchmark suite.
         *
         * @param {string} name A name to identify the benchmark.
         * @param {Function|string} fn The test to benchmark.
         * @param {Benchmark.Options} [options={}] Options object.
         * @returns {Suite} The suite instance.
         * @example
         *
         * // basic usage
         * suite.add(fn);
         *
         * // or using a name first
         * suite.add('foo', fn);
         *
         * // or with options
         * suite.add('foo', fn, {
         *   'onCycle': onCycle,
         *   'onComplete': onComplete
         * });
         *
         * // or name and options
         * suite.add('foo', {
         *   'fn': fn,
         *   'onCycle': onCycle,
         *   'onComplete': onComplete
         * });
         *
         * // or options only
         * suite.add({
         *   'name': 'foo',
         *   'fn': fn,
         *   'onCycle': onCycle,
         *   'onComplete': onComplete
         * });
         */
        add(name: string, fn: Function | string, options?: Options): Suite;
        add(fn: Function | string, options?: Options): Suite;
        add(name: string, options?: Options): Suite;
        add(options: Options): Suite;

        /**
         * Creates a new suite with cloned benchmarks.
         *
         * @name clone
         * @param {Benchmark.Options} options Options object to overwrite cloned options.
         * @returns {Suite} The new suite instance.
         */
        clone(options: Benchmark.Options): Suite;

        /**
         * Executes all registered listeners of the specified event type.
         *
         * @param {Object|string} type The event type or object.
         * @param {...*} [args] Arguments to invoke the listener with.
         * @returns {*} Returns the return value of the last listener executed.
         */
        emit(type: string | Object, ...args: any[]): any;

        /**
         * An `Array#filter` like method.
         *
         * @name filter
         * @param {Function|string} callback The function/alias called per iteration.
         * @returns {Suite} A new suite of benchmarks that passed callback filter.
         */
        filter(callback: Function | string): Suite;
        join(separator?: string): string;

        /**
         * Returns an array of event listeners for a given type that can be manipulated
         * to add or remove listeners.
         *
         * @param {string} type The event type.
         * @returns {Array} The listeners array.
         */
        listeners(type: string): Function[];

        /**
         * Unregisters a listener for the specified event type(s),
         * or unregisters all listeners for the specified event type(s),
         * or unregisters all listeners for all event types.
         *
         * @param {string} type The event type.
         * @param {Function} callback The function to unregister.
         * @returns {Suite} The current instance.
         * @example
         *
         * // unregister a listener for an event type
         * bench.off('cycle', listener);
         *
         * // unregister a listener for multiple event types
         * bench.off('start cycle', listener);
         *
         * // unregister all listeners for an event type
         * bench.off('cycle');
         *
         * // unregister all listeners for multiple event types
         * bench.off('start cycle complete');
         *
         * // unregister all listeners for all event types
         * bench.off();
         */
        off(type?: string, callback?: Function): Suite;
        off(types: string[]): Suite;

        /**
         * Registers a listener for the specified event type(s).
         *
         * @param {string} type The event type.
         * @param {Function} fn The function to register.
         * @returns {Suite} The current instance.
         * @example
         *
         * // register a listener for an event type
         * bench.on('cycle', listener);
         *
         * // register a listener for multiple event types
         * bench.on('start cycle', listener);
         */
        on(type?: string, fn?: Function): Suite;
        on(types: string[]): Suite;
        push(benchmark: Benchmark): number;

        /**
         * Resets all benchmarks in the suite.
         *
         * @name reset
         * @returns {Suite} The suite instance.
         */
        reset(): Suite;

        /**
         * Runs the suite.
         *
         * @name run
         * @param {Benchmark.Options} [options={}] Options object.
         * @returns {Suite} The suite instance.
         * @example
         *
         * // basic usage
         * suite.run();
         *
         * // or with options
         * suite.run({ 'async': true, 'queued': true });
         */
        run(options?: Benchmark.Options): Suite;

        /**
         * Reverses the elements in an array in place.
         * This method mutates the array and returns a reference to the same array.
         */
        reverse(): any[];

        /**
         * Sorts an array in place.
         * This method mutates the array and returns a reference to the same array.
         * @param compareFn Function used to determine the order of the elements. It is expected to return
         * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
         * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
         * ```ts
         * [11,2,22,1].sort((a, b) => a - b)
         * ```
         */
        sort(compareFn: (a: any, b: any) => number): any[];

        /**
         * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
         * @param start The zero-based location in the array from which to start removing elements.
         * @param deleteCount The number of elements to remove.
         * @param items Elements to insert into the array in place of the deleted elements.
         * @returns An array containing the elements that were deleted.
         */
        splice(start: number, deleteCount?: number, items?: Suite): Suite[];
        unshift(benchmark: Benchmark): number;

        each(callback: Function): Suite;
        forEach(callback: Function): Suite;
        indexOf(value: any): number;
        map(callback: Function | string): any[];
        reduce<T>(callback: Function, accumulator: T): T;

        pop(): Function;
        shift(): Benchmark;
        slice(start: number, end: number): any[];
        slice(start: number, deleteCount: number, ...values: any[]): any[];
    }
}

export = Benchmark;