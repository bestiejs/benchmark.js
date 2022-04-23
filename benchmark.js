/*!
 * Benchmark.js
 * Copyright 2010-2016 Mathias Bynens
 * Based on JSLitmus.js, copyright Robert Kieffer
 * Modified by John-David Dalton
 * Available under MIT license
 */
; (function () {
  'use strict';

  var version = '2.1.4';

  /** Used as a safe reference for `undefined` in pre ES5 environments. */
  var undefined;

  var noop = function () { };

  /** Used as a reference to the global object. */
  var root = ((typeof window === 'function' || typeof window === 'object') && window) || this;

  /** Detect free variable `define`. */
  var freeDefine = typeof define === 'function' && typeof define.amd === 'object' && define.amd && define;

  /** Detect free variable `exports`. */
  var freeExports = (typeof exports === 'function' || typeof exports === 'object') && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = (typeof module === 'function' || typeof module === 'object') && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  var freeGlobal = freeExports && freeModule && typeof global === 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  /** Detect free variable `require`. */
  var freeRequire = typeof require === 'function' && require;

  /** Used to assign each benchmark an incremented id. */
  var counter = 0;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /** Used to detect primitive types. */
  var rePrimitive = /^(?:boolean|number|string|undefined)$/;

  /** Used to make every compiled test unique. */
  var uidCounter = 0;

  /** Used to assign default `context` object properties. */
  var contextProps = [
    'Array', 'Date', 'Function', 'Math', 'Object', 'RegExp', 'String',
    'clearTimeout', 'chrome', 'chromium', 'document', 'navigator',
    'process', 'runtime', 'setTimeout'
  ];

  /** Used to avoid hz of Infinity. */
  var divisors = {
    '1': 4096,
    '2': 512,
    '3': 64,
    '4': 8,
    '5': 0
  };

  /**
   * T-Distribution two-tailed critical values for 95% confidence.
   * For more info see 
   * - https://www.cliffsnotes.com/study-guides/statistics/principles-of-testing/one-and-twotailed-tests
   * - https://en.wikipedia.org/wiki/One-_and_two-tailed_tests
   * - https://en.wikipedia.org/wiki/Student%27s_t-distribution
   * - http://www.itl.nist.gov/div898/handbook/eda/section3/eda3672.htm (WARNING: the table listed there is for ONE-SIDED regions!)
   */
  var tTable = {
    "1": 12.71, "2": 4.303, "3": 3.182, "4": 2.776, "5": 2.571, "6": 2.447, "7": 2.365, "8": 2.306, "9": 2.262, "10": 2.228,
    "11": 2.201, "12": 2.179, "13": 2.16, "14": 2.145, "15": 2.131, "16": 2.12, "17": 2.11, "18": 2.101, "19": 2.093, "20": 2.086,
    "21": 2.08, "22": 2.074, "23": 2.069, "24": 2.064, "25": 2.06, "26": 2.056, "27": 2.052, "28": 2.048, "29": 2.045, "30": 2.042,
    "31": 2.0399, "32": 2.0378, "33": 2.0357, "34": 2.0336, "35": 2.0315, "36": 2.0294, "37": 2.0273, "38": 2.0252, "39": 2.0231, "40": 2.021,
    "41": 2.0198, "42": 2.0186, "43": 2.0174, "44": 2.0162, "45": 2.015, "46": 2.0138, "47": 2.0126, "48": 2.0114, "49": 2.0102, "50": 2.009,
    "51": 2.0081, "52": 2.0072, "53": 2.0063, "54": 2.0054, "55": 2.0045, "56": 2.0036, "57": 2.0027, "58": 2.0018, "59": 2.0009, "60": 2,
    "61": 1.9995, "62": 1.999, "63": 1.9985, "64": 1.998, "65": 1.9975, "66": 1.997, "67": 1.9965, "68": 1.996, "69": 1.9955, "70": 1.995,
    "71": 1.9945, "72": 1.994, "73": 1.9935, "74": 1.993, "75": 1.9925, "76": 1.9920, "77": 1.9915, "78": 1.991, "79": 1.9905, "80": 1.99,
    "81": 1.9897, "82": 1.9894, "83": 1.9891, "84": 1.9888, "85": 1.9885, "86": 1.9882, "87": 1.9879, "88": 1.9876, "89": 1.9873, "90": 1.987,
    "91": 1.9867, "92": 1.9864, "93": 1.9861, "94": 1.9858, "95": 1.9855, "96": 1.9852, "97": 1.9849, "98": 1.9846, "99": 1.9843, "100": 1.984,
    "101": 1.9838, "102": 1.9836, "103": 1.9834, "104": 1.9832, "105": 1.983, "106": 1.9828, "107": 1.9826, "108": 1.9824, "109": 1.9822, "110": 1.982,
    "111": 1.9818, "112": 1.9816, "113": 1.9814, "114": 1.9812, "115": 1.9819, "116": 1.9808, "117": 1.9806, "118": 1.9804, "119": 1.9802, "120": 1.98,
    "infinity": 1.96
  };

  /**
   * Critical Mann-Whitney U-values for 95% confidence.
   * For more info see http://www.saburchill.com/IBbiology/stats/003.html.
   */
  var uTable = {
    '5': [0, 1, 2],
    '6': [1, 2, 3, 5],
    '7': [1, 3, 5, 6, 8],
    '8': [2, 4, 6, 8, 10, 13],
    '9': [2, 4, 7, 10, 12, 15, 17],
    '10': [3, 5, 8, 11, 14, 17, 20, 23],
    '11': [3, 6, 9, 13, 16, 19, 23, 26, 30],
    '12': [4, 7, 11, 14, 18, 22, 26, 29, 33, 37],
    '13': [4, 8, 12, 16, 20, 24, 28, 33, 37, 41, 45],
    '14': [5, 9, 13, 17, 22, 26, 31, 36, 40, 45, 50, 55],
    '15': [5, 10, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64],
    '16': [6, 11, 15, 21, 26, 31, 37, 42, 47, 53, 59, 64, 70, 75],
    '17': [6, 11, 17, 22, 28, 34, 39, 45, 51, 57, 63, 67, 75, 81, 87],
    '18': [7, 12, 18, 24, 30, 36, 42, 48, 55, 61, 67, 74, 80, 86, 93, 99],
    '19': [7, 13, 19, 25, 32, 38, 45, 52, 58, 65, 72, 78, 85, 92, 99, 106, 113],
    '20': [8, 14, 20, 27, 34, 41, 48, 55, 62, 69, 76, 83, 90, 98, 105, 112, 119, 127],
    '21': [8, 15, 22, 29, 36, 43, 50, 58, 65, 73, 80, 88, 96, 103, 111, 119, 126, 134, 142],
    '22': [9, 16, 23, 30, 38, 45, 53, 61, 69, 77, 85, 93, 101, 109, 117, 125, 133, 141, 150, 158],
    '23': [9, 17, 24, 32, 40, 48, 56, 64, 73, 81, 89, 98, 106, 115, 123, 132, 140, 149, 157, 166, 175],
    '24': [10, 17, 25, 33, 42, 50, 59, 67, 76, 85, 94, 102, 111, 120, 129, 138, 147, 156, 165, 174, 183, 192],
    '25': [10, 18, 27, 35, 44, 53, 62, 71, 80, 89, 98, 107, 117, 126, 135, 145, 154, 163, 173, 182, 192, 201, 211],
    '26': [11, 19, 28, 37, 46, 55, 64, 74, 83, 93, 102, 112, 122, 132, 141, 151, 161, 171, 181, 191, 200, 210, 220, 230],
    '27': [11, 20, 29, 38, 48, 57, 67, 77, 87, 97, 107, 118, 125, 138, 147, 158, 168, 178, 188, 199, 209, 219, 230, 240, 250],
    '28': [12, 21, 30, 40, 50, 60, 70, 80, 90, 101, 111, 122, 132, 143, 154, 164, 175, 186, 196, 207, 218, 228, 239, 250, 261, 272],
    '29': [13, 22, 32, 42, 52, 62, 73, 83, 94, 105, 116, 127, 138, 149, 160, 171, 182, 193, 204, 215, 226, 238, 249, 260, 271, 282, 294],
    '30': [13, 23, 33, 43, 54, 65, 76, 87, 98, 109, 120, 131, 143, 154, 166, 177, 189, 200, 212, 223, 235, 247, 258, 270, 282, 293, 305, 317]
  };

  /*--------------------------------------------------------------------------*/

  /**
   * A specialized version of lodashs `cloneDeep` which only clones arrays and plain
   * objects assigning all other values by reference.
   */
  var cloneDeep = function (value) {
    if (Array.isArray(value)) {
      return cloneArray(value);
    }

    if (isPlainObject(value)) {
      return cloneObject(value);
    }

    return value;
  }

  function cloneObject(obj) {
    var ret = {};

    var key = '';
    var keys = Object.keys(obj);

    for (var i = 0, il = keys.length; i < il; ++i) {
      key = keys[i];
      ret[key] = cloneDeep(obj[key]);
    }

    return ret;
  }

  function cloneArray(arr) {
    var ret = new Array(arr.length);

    for (var i = 0, il = arr.length; i < il; ++i) {
      ret[i] = cloneDeep(arr[i]);
    }

    return ret;
  }

  function isArrayLikeObject(value) {
    return (
      typeof value === 'object' &&
      value !== null &&
      'length' in value &&
      typeof value.length === 'number' &&
      value.length > -1 &&
      value.length % 1 === 0 &&
      value.length <= Number.MAX_SAFE_INTEGER
    )
  }

  function toArray(value) {
    if (!value) {
      return [];
    }
    if (Array.isArray(value)) {
      return cloneArray(value);
    }
    if (isArrayLikeObject(value)) {
      var result = new Array(value.length);
      for (var i = 0, il = value.length; i < il; ++i) {
        result[i] = value[i];
      }
      return result;
    }
    throw new TypeError('Expected an ArrayLikeObject')
  }

  function pick(object, keys) {
    return keys.reduce(function (obj, key) {
      if (object && object.hasOwnProperty(key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  }

  function entries(obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i);
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };

  var objectCtorString = Object.prototype.toString.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * isPlainObject(new Foo);
   * // => false
   *
   * isPlainObject([1, 2, 3]);
   * // => false
   *
   * isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (typeof value !== 'object' || value === null) {
      return false;
    }
    var proto = Object.getPrototypeOf(value);
    if (proto === null) {
      return true;
    }
    var Ctor = Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor === 'function' && Ctor instanceof Ctor &&
      Object.prototype.toString.call(Ctor) === objectCtorString;
  }

  function each(collection, iteratee) {
    if (Array.isArray(collection)) {
      for (var i = 0, il = collection.length; i < il; ++i) {
        if (iteratee(collection[i], i, collection) === false) {
          break;
        };
      }
      return;
    }
    if (typeof collection === 'object' && collection !== null) {
      var keys = Object.keys(collection);
      for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        if (iteratee(collection[key], key, collection) === false) {
          break;
        };
      }
      return;
    }
  }

  function forOwn(object, iteratee) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        if (iteratee(object[key], key, object) === false) {
          break;
        }
      }
    }
  }

  function has(obj, key) {
    if (!obj) {
      return;
    }

    var keyParts = Array.isArray(key)
      ? key
      : key.indexOf('.') === -1 ? [key] : key.split('.');

    return !!obj && (
      keyParts.length > 1
        ? has(obj[keyParts[0]], keyParts.slice(1).join('.'))
        : obj.hasOwnProperty(key)
    );
  }

  function indexOf(arr, value, position) {
    return Array.prototype.indexOf.call(arr, value, position);
  }

  function map(collection, iteratee) {
    var result = [];

    if (typeof iteratee === 'string') {
      var keys = Object.keys(collection);
      for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        if (collection[key][iteratee] !== undefined) {
          result.push(collection[key][iteratee]);
        }
      }
      return result;
    }
    if (Array.isArray(collection)) {
      for (var i = 0, il = collection.length; i < il; ++i) {
        result.push(iteratee(collection[i], i, collection));
      }
      return result;
    }
    if (typeof collection === 'object' && collection !== null) {
      var keys = Object.keys(collection);
      for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        result.push(iteratee(collection[key], key, collection));
      }
      return result;
    }
  }

  function reduce(collection, iteratee, initialValue) {
    if (Array.isArray(collection)) {
      if (collection.length === 0) {
        return initialValue;
      }
      var value = initialValue || collection[0];

      for (var i = 1, il = collection.length; i < il; ++i) {
        value = iteratee(value, collection[i], i, collection);
      }
      return value;
    }

    if (typeof collection === 'object' && collection !== null) {
      var keys = Object.keys(collection);

      if (keys.length === 0) {
        return initialValue;
      }
      var value = initialValue || collection[keys[0]];

      for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        value = iteratee(value, collection[key], key, collection);
      }
      return value;
    }
  }
  /*--------------------------------------------------------------------------*/

  function runInContext(context) {
    // Avoid issues with some ES3 environments that attempt to use values, named
    // after built-in constructors like `Object`, for the creation of literals.
    // ES5 clears this up by stating that literals must use built-in constructors.
    // See http://es5.github.io/#x11.1.5.
    context = context ? Object.assign({}, root.Object(), context, pick(root, contextProps)) : root;

    /** Native constructor references. */
    var Array = context.Array,
      Date = context.Date,
      Function = context.Function,
      Math = context.Math,
      Object = context.Object,
      RegExp = context.RegExp,
      String = context.String;

    /** Used for `Array` and `Object` method references. */
    var arrayRef = [],
      objectProto = Object.prototype;

    /** Native method shortcuts. */
    var abs = Math.abs,
      clearTimeout = context.clearTimeout,
      floor = Math.floor,
      max = Math.max,
      min = Math.min,
      pow = Math.pow,
      push = arrayRef.push,
      setTimeout = context.setTimeout,
      shift = arrayRef.shift,
      slice = arrayRef.slice,
      sqrt = Math.sqrt,
      toString = objectProto.toString,
      unshift = arrayRef.unshift;

    /** Detect DOM document object. */
    var doc = isHostType(context, 'document') && context.document;

    /** Used to access Wade Simmons' Node.js `microtime` module. */
    var microtimeObject = req('microtime');

    /** Used to access Node.js's high resolution timer. */
    var processObject = isHostType(context, 'process') && context.process;

    /** Used to prevent a `removeChild` memory leak in IE < 9. */
    var trash = doc && doc.createElement('div');

    /** Used to integrity check compiled tests. */
    var uid = 'uid' + (+Date.now());

    /** Used to avoid infinite recursion when methods call each other. */
    var calledBy = {};

    var support = {};

    (function () {
      support.browser = doc && isHostType(context, 'navigator') && !isHostType(context, 'phantom');

      support.timeout = isHostType(context, 'setTimeout') && isHostType(context, 'clearTimeout');

      support.canInjectScript = freeDefine
        ? (root.define.amd !== undefined)
        : (root.Benchmark !== undefined);

      try {
        // Safari 2.x removes commas in object literals from `Function#toString` results.
        // See http://webk.it/11609 for more details.
        // Firefox 3.6 and Opera 9.25 strip grouping parentheses from `Function#toString` results.
        // See http://bugzil.la/559438 for more details.
        support.decompilation = Function(
          ('return (' + (function (x) { return { 'x': '' + (1 + x) + '', 'y': 0 }; }) + ')')
            // Avoid issues with code added by Istanbul.
            .replace(/__cov__[^;]+;/g, '')
        )()(0).x === '1';
      } catch (e) {
        support.decompilation = false;
      }
    }());

    /**
     * Timer object used by `clock()` and `Deferred#resolve`.
     */
    var timer = {

      /**
       * The timer namespace object or constructor.
       */
      'ns': Date,

      /**
       * Starts the deferred timer.
       */
      'start': null, // Lazy defined in `clock()`.

      /**
       * Stops the deferred timer.
       */
      'stop': null // Lazy defined in `clock()`.
    };

    function Benchmark(name, fn, options) {
      var bench = this;

      // Allow instance creation without the `new` operator.
      if (!(bench instanceof Benchmark)) {
        return new Benchmark(name, fn, options);
      }
      // Juggle arguments.
      if (isPlainObject(name)) {
        // 1 argument (options).
        options = name;
      }
      else if (typeof name === 'function') {
        // 2 arguments (fn, options).
        options = fn;
        fn = name;
      }
      else if (isPlainObject(fn)) {
        // 2 arguments (name, options).
        options = fn;
        fn = null;
        bench.name = name;
      }
      else {
        // 3 arguments (name, fn [, options]).
        bench.name = name;
      }
      setOptions(bench, options);

      bench.id || (bench.id = ++counter);
      bench.fn == null && (bench.fn = fn);

      bench.stats = cloneDeep(bench.stats);
      bench.times = cloneDeep(bench.times);
    }

    function Deferred(clone) {
      var deferred = this;
      if (!(deferred instanceof Deferred)) {
        return new Deferred(clone);
      }
      deferred.benchmark = clone;
      clock(deferred);
    }

    function Event(type) {
      var event = this;
      if (type instanceof Event) {
        return type;
      }
      return (event instanceof Event)
        ? Object.assign(event, { 'timeStamp': (+Date.now()) }, typeof type === 'string' ? { 'type': type } : type)
        : new Event(type);
    }

    function Suite(name, options) {
      var suite = this;

      // Allow instance creation without the `new` operator.
      if (!(suite instanceof Suite)) {
        return new Suite(name, options);
      }
      // Juggle arguments.
      if (isPlainObject(name)) {
        // 1 argument (options).
        options = name;
      } else {
        // 2 arguments (name [, options]).
        suite.name = name;
      }
      setOptions(suite, options);
    }

    /**
     * Creates a function from the given arguments string and body.
     */
    function createFunction() {
      // Lazy define.
      createFunction = function (args, body) {
        var result,
          anchor = freeDefine ? freeDefine.amd : Benchmark,
          prop = uid + 'createFunction';

        runScript((freeDefine ? 'define.amd.' : 'Benchmark.') + prop + '=function(' + args + '){' + body + '}');
        result = anchor[prop];
        delete anchor[prop];
        return result;
      };
      // Fix JaegerMonkey bug.
      // For more information see http://bugzil.la/639720.
      createFunction = support.browser && support.canInjectScript && (createFunction('', 'return"' + uid + '"') || noop)() === uid ? createFunction : Function;
      return createFunction.apply(null, arguments);
    }

    /**
     * Delay the execution of a function based on the benchmark's `delay` property.
     */
    function delay(bench, fn) {
      bench._timerId = setTimeout(fn, bench.delay * 1e3);
    }

    /**
     * Destroys the given element.
     */
    function destroyElement(element) {
      trash.appendChild(element);
      trash.innerHTML = '';
    }

    /**
     * Gets the name of the first argument from a function's source.
     */
    function getFirstArgument(fn) {
      return (
        typeof fn === 'function' &&
        !('toString' in fn) &&
        (/^[\s(]*function[^(]*\(([^\s,)]+)/.exec(fn) || 0)[1]) || '';
    }

    /**
     * Computes the arithmetic mean of a sample.
     */
    function getMean(sample) {
      if (sample.length === 0) {
        return 0;
      }

      var result = 0;

      for (var i = 0, il = sample.length; i < il; ++i) {
        result += sample[i];
      }
      return result / sample.length;
    }

    /**
     * Computes the variance of a sample.
     */
    function getVariance(sample, mean, size) {
      if (sample.length === 0) {
        return 0;
      }
      var result = 0;

      for (var i = 0, il = sample.length; i < il; ++i) {
        result += pow(sample[i] - mean, 2);
      }
      return result / (size - 1);
    }

    /**
     * Gets the source code of a function.
     */
    function getSource(fn) {
      var result = '';
      if (isStringable(fn)) {
        result = String(fn);
      } else if (support.decompilation) {
        // Escape the `{` for Firefox 1.
        result = /^[^{]+\{([\s\S]*)\}\s*$/.exec(fn)[1];
      }
      // Trim string.
      result = (result || '').replace(/^\s+|\s+$/g, '');

      // Detect strings containing only the "use strict" directive.
      return /^(?:\/\*[\w\W]*?\*\/|\/\/.*?[\n\r\u2028\u2029]|\s)*(["'])use strict\1;?$/.test(result)
        ? ''
        : result;
    }

    /**
     * Host objects can return type values that are different from their actual
     * data type. The objects we are concerned with usually return non-primitive
     * types of "object", "function", or "unknown".
     */
    function isHostType(object, property) {
      if (object == null) {
        return false;
      }
      var type = typeof object[property];
      return !rePrimitive.test(type) && (type != 'object' || !!object[property]);
    }

    /**
     * Checks if a value can be safely coerced to a string.
     */
    function isStringable(value) {
      return typeof value === 'string' || (!!value && value.hasOwnProperty('toString') && typeof value.toString === 'function');
    }

    /**
     * A wrapper around `require` to suppress `module missing` errors.
     * Used to avoid inclusion in Browserified bundles.
     */
    function req(id) {
      try {
        var result;
        if (freeExports && freeRequire) {
          /** Used to avoid inclusion in Browserified bundles. */
          // eg: microtime
          result = freeRequire(id);
        }
      } catch (e) { }
      return result || null;
    }

    /**
     * Runs a snippet of JavaScript via script injection.
     */
    function runScript(code) {
      var anchor = freeDefine ? define.amd : Benchmark,
        script = doc.createElement('script'),
        sibling = doc.getElementsByTagName('script')[0],
        parent = sibling.parentNode,
        prop = uid + 'runScript',
        prefix = '(' + (freeDefine ? 'define.amd.' : 'Benchmark.') + prop + '||function(){})();';

      // Firefox 2.0.0.2 cannot use script injection as intended because it executes
      // asynchronously, but that's OK because script injection is only used to avoid
      // the previously commented JaegerMonkey bug.
      try {
        // Remove the inserted script *before* running the code to avoid differences
        // in the expected script element count/order of the document.
        script.appendChild(doc.createTextNode(prefix + code));
        anchor[prop] = function () { destroyElement(script); };
      } catch (e) {
        parent = parent.cloneNode(false);
        sibling = null;
        script.text = code;
      }
      parent.insertBefore(script, sibling);
      delete anchor[prop];
    }

    var onEventRE = /^on[A-Z]/;

    /**
     * A helper function for setting options/event handlers.
     */
    function setOptions(object, options) {
      options = object.options = Object.assign({}, cloneDeep(object.constructor.options), cloneDeep(options));

      var keys = Object.keys(options);
      for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i],
          value = options[keys[i]];
        if (value != null) {
          // Add event listeners.
          if (onEventRE.test(key)) {
            (key.indexOf(' ') === -1 ? [key] : key.split(' ')).forEach(function (key) {
              object.on(key.slice(2).toLowerCase(), value);
            });
          } else if (!has(object, key)) {
            object[key] = cloneDeep(value);
          }
        }
      }
    }

    function resolve() {
      var deferred = this,
        clone = deferred.benchmark,
        bench = clone._original;

      if (bench.aborted) {
        // cycle() -> clone cycle/complete event -> compute()'s invoked bench.run() cycle/complete.
        deferred.teardown();
        clone.running = false;
        cycle(deferred);
      }
      else if (++deferred.cycles < clone.count) {
        clone.compiled.call(deferred, context, timer);
      }
      else {
        timer.stop(deferred);
        deferred.teardown();
        delay(clone, function () { cycle(deferred); });
      }
    }

    function reject(err) {
      // make sure error not a void like value
      var error = err || new Error(err);
      error.originError = err;

      var deferred = this,
        clone = deferred.benchmark;

      var event = Event('error');
      clone.error = error;
      clone.message = error && error.message;
      clone.emit(event);
    }

    function filter(array, callback) {
      if (callback === 'successful') {
        // Callback to exclude those that are errored, unrun, or have hz of Infinity.
        callback = function (bench) {
          return bench.cycles && Number.isFinite(bench.hz) && !bench.error;
        };
      }
      else if (callback === 'fastest' || callback === 'slowest') {
        // Get successful, sort by period + margin of error, and filter fastest/slowest.
        var result = filter(array, 'successful').sort(function (a, b) {
          a = a.stats; b = b.stats;
          return (a.mean + a.moe > b.mean + b.moe ? 1 : -1) * (callback === 'fastest' ? 1 : -1);
        });

        return result.filter(function (bench) {
          return result[0].compare(bench) === 0;
        });
      }
      if (Array.isArray(array)) {
        return array.filter(callback);
      } else if (isArrayLikeObject(array)) {
        var result = [];
        for (var i = 0, il = array.length; i < il; ++i) {
          if (callback(array[i], i, array)) {
            result.push(array[i]);
          }
        }
        return result;
      }
      throw new TypeError('Expected Array or Array-like-Object.');
    }

    var formatNumberRE = /(?=(?:\d{3})+$)(?!\b)/g;

    function formatNumber(number) {
      number = String(number).split('.');
      return number[0].replace(formatNumberRE, ',') +
        (number[1] ? '.' + number[1] : '');
    }

    function invoke(benches, name) {
      var args,
        bench,
        queued,
        index = -1,
        eventProps = { 'currentTarget': benches },
        options = { 'onStart': noop, 'onCycle': noop, 'onComplete': noop },
        result = toArray(benches);

      /**
       * Invokes the method of the current object and if synchronous, fetches the next.
       */
      function execute() {
        var listeners,
          async = isAsync(bench);

        if (async) {
          // Use `getNext` as the first listener.
          bench.on('complete', getNext);
          listeners = bench.events.complete;
          listeners.splice(0, 0, listeners.pop());
        }
        // Execute method.
        result[index] = typeof (bench && bench[name]) === 'function' ? bench[name].apply(bench, args) : undefined;
        // If synchronous return `true` until finished.
        return !async && getNext();
      }

      /**
       * Fetches the next bench or executes `onComplete` callback.
       */
      function getNext(event) {
        var cycleEvent,
          last = bench,
          async = isAsync(last);

        if (async) {
          last.off('complete', getNext);
          last.emit('complete');
        }
        // Emit "cycle" event.
        eventProps.type = 'cycle';
        eventProps.target = last;
        cycleEvent = Event(eventProps);
        options.onCycle.call(benches, cycleEvent);

        // Choose next benchmark if not exiting early.
        if (!cycleEvent.aborted && raiseIndex() !== false) {
          bench = queued ? benches[0] : result[index];
          if (isAsync(bench)) {
            delay(bench, execute);
          }
          else if (async) {
            // Resume execution if previously asynchronous but now synchronous.
            while (execute()) { }
          }
          else {
            // Continue synchronous execution.
            return true;
          }
        } else {
          // Emit "complete" event.
          eventProps.type = 'complete';
          options.onComplete.call(benches, Event(eventProps));
        }
        // When used as a listener `event.aborted = true` will cancel the rest of
        // the "complete" listeners because they were already called above and when
        // used as part of `getNext` the `return false` will exit the execution while-loop.
        if (event) {
          event.aborted = true;
        } else {
          return false;
        }
      }

      /**
       * Checks if invoking `Benchmark#run` with asynchronous cycles.
       */
      function isAsync(object) {
        // Avoid using `instanceof` here because of IE memory leak issues with host objects.
        var async = args[0] && args[0].async;
        return name === 'run' && (object instanceof Benchmark) &&
          ((async == null ? object.options.async : async) && support.timeout || object.defer);
      }

      /**
       * Raises `index` to the next defined index or returns `false`.
       */
      function raiseIndex() {
        index++;

        // If queued remove the previous bench.
        if (queued && index > 0) {
          shift.call(benches);
        }
        // If we reached the last index then return `false`.
        return (queued ? benches.length : index < result.length)
          ? index
          : (index = false);
      }
      // Juggle arguments.
      if (typeof name === 'string') {
        // 2 arguments (array, name).
        args = slice.call(arguments, 2);
      } else {
        // 2 arguments (array, options).
        options = Object.assign(options, name);
        name = options.name;
        args = Array.isArray(args = 'args' in options ? options.args : []) ? args : [args];
        queued = options.queued;
      }
      // Start iterating over the array.
      if (raiseIndex() !== false) {
        // Emit "start" event.
        bench = result[index];
        eventProps.type = 'start';
        eventProps.target = bench;
        options.onStart.call(benches, Event(eventProps));

        // End early if the suite was aborted in an "onStart" listener.
        if (name === 'run' && (benches instanceof Suite) && benches.aborted) {
          // Emit "cycle" event.
          eventProps.type = 'cycle';
          options.onCycle.call(benches, Event(eventProps));
          // Emit "complete" event.
          eventProps.type = 'complete';
          options.onComplete.call(benches, Event(eventProps));
        }
        // Start method execution.
        else {
          if (isAsync(bench)) {
            delay(bench, execute);
          } else {
            while (execute()) { }
          }
        }
      }
      return result;
    }

    function join(object, separator1, separator2) {
      var result = [],
        length = (object = Object(object)).length,
        arrayLike = length === length >>> 0;

      separator2 || (separator2 = ': ');

      if (Array.isArray(object)) {
        return object.join(separator1 || ',');
      } else if (isArrayLikeObject(object)) {
        for (var i = 0, il = object.length; i < il; ++i) {
          result.push(object[i]);
        }
        return result.join(separator1 || ',');
      } else {
        var keys = Object.keys(object);
        for (var i = 0, il = keys.length; i < il; ++i) {
          result.push(keys[i] + separator2 + object[keys[i]]);
        }
        return result.join(separator1 || ',');
      }
    }

    function abortSuite() {
      var event,
        suite = this,
        resetting = calledBy.resetSuite;

      if (suite.running) {
        event = Event('abort');
        suite.emit(event);
        if (!event.cancelled || resetting) {
          // Avoid infinite recursion.
          calledBy.abortSuite = true;
          suite.reset();
          delete calledBy.abortSuite;

          if (!resetting) {
            suite.aborted = true;
            invoke(suite, 'abort');
          }
        }
      }
      return suite;
    }

    function add(name, fn, options) {
      var suite = this,
        bench = new Benchmark(name, fn, options),
        event = Event({ 'type': 'add', 'target': bench });

      if (suite.emit(event), !event.cancelled) {
        suite.push(bench);
      }
      return suite;
    }

    function cloneSuite(options) {
      var suite = this,
        result = new suite.constructor(Object.assign({}, suite.options, options));

      // Copy own properties.
      var keys = Object.keys(suite);
      for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i],
          value = suite[keys[i]];
        if (!has(result, key)) {
          result[key] = typeof (value && value.clone) === 'function'
            ? value.clone()
            : cloneDeep(value);
        }
      }
      return result;
    }

    function filterSuite(callback) {
      var suite = this,
        result = new suite.constructor(suite.options);

      result.push.apply(result, filter(suite, callback));
      return result;
    }

    function resetSuite() {
      var event,
        suite = this,
        aborting = calledBy.abortSuite;

      if (suite.running && !aborting) {
        // No worries, `resetSuite()` is called within `abortSuite()`.
        calledBy.resetSuite = true;
        suite.abort();
        delete calledBy.resetSuite;
      }
      // Reset if the state has changed.
      else if ((suite.aborted || suite.running) &&
        (suite.emit(event = Event('reset')), !event.cancelled)) {
        suite.aborted = suite.running = false;
        if (!aborting) {
          invoke(suite, 'reset');
        }
      }
      return suite;
    }

    function runSuite(options) {
      var suite = this;

      suite.reset();
      suite.running = true;
      options || (options = {});

      invoke(suite, {
        'name': 'run',
        'args': options,
        'queued': options.queued,
        'onStart': function (event) {
          suite.emit(event);
        },
        'onCycle': function (event) {
          var bench = event.target;
          if (bench.error) {
            suite.emit({ 'type': 'error', 'target': bench });
          }
          suite.emit(event);
          event.aborted = suite.aborted;
        },
        'onComplete': function (event) {
          suite.running = false;
          suite.emit(event);
        }
      });
      return suite;
    }

    function emit(type) {
      var listeners,
        object = this,
        event = Event(type),
        events = object.events,
        args = (arguments[0] = event, arguments);

      event.currentTarget || (event.currentTarget = object);
      event.target || (event.target = object);
      delete event.result;

      if (events && (listeners = has(events, event.type) && events[event.type])) {
        var listenersClone = listeners.slice();

        for (var i = 0, il = listenersClone.length; i < il; ++i) {
          if ((event.result = listenersClone[i].apply(object, args)) === false) {
            event.cancelled = true;
          }
          if (event.aborted) {
            break;
          };
        }
      }
      return event.result;
    }

    function listeners(type) {
      var object = this,
        events = object.events || (object.events = {});

      return has(events, type) ? events[type] : (events[type] = []);
    }

    function off(type, listener) {
      var events = this.events;

      if (!events) {
        return this;
      }

      function callback(listeners, type) {
        var index;
        if (typeof listeners === 'string') {
          type = listeners;
          listeners = has(events, type) && events[type];
        }
        if (listeners) {
          if (listener) {
            index = listeners.indexOf(listener);
            if (index !== -1) {
              listeners.splice(index, 1);
            }
          } else {
            listeners.length = 0;
          }
        }
      }

      if (typeof type === 'string') {
        type.split(' ').forEach(callback);
        return this;
      }

      var keys = Object.keys(events);
      for (var i = 0, il = keys.length; i < il; ++i) {
        callback(events[keys[i]]);
      }

      return this;
    }

    function on(type, listener) {
      var object = this,
        events = object.events || (object.events = {});

      (type.indexOf(' ') === -1 ? [type] : type.split(' ')).forEach(function (type) {
        (has(events, type)
          ? events[type]
          : (events[type] = [])
        ).push(listener);
      });
      return object;
    }

    function abort() {
      var event,
        bench = this,
        resetting = calledBy.reset;

      if (bench.running) {
        event = Event('abort');
        bench.emit(event);
        if (!event.cancelled || resetting) {
          // Avoid infinite recursion.
          calledBy.abort = true;
          bench.reset();
          delete calledBy.abort;

          if (support.timeout) {
            clearTimeout(bench._timerId);
            delete bench._timerId;
          }
          if (!resetting) {
            bench.aborted = true;
            bench.running = false;
          }
        }
      }
      return bench;
    }

    function clone(options) {
      var bench = this,
        result = new bench.constructor(Object.assign({}, bench, options));

      // Correct the `options` object.
      result.options = Object.assign({}, cloneDeep(bench.options), cloneDeep(options));

      // Copy own custom properties.
      var keys = Object.keys(bench);
      for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i],
          value = bench[keys[i]];
        if (!has(result, key)) {
          result[key] = cloneDeep(value);
        }
      }

      return result;
    }

    function compare(other) {
      var bench = this;

      // Exit early if comparing the same benchmark.
      if (bench === other) {
        return 0;
      }
      var critical,
        zStat,
        sample1 = bench.stats.sample,
        sample2 = other.stats.sample,
        size1 = sample1.length,
        size2 = sample2.length,
        maxSize = max(size1, size2),
        minSize = min(size1, size2),
        u1 = getU(sample1, sample2),
        u2 = getU(sample2, sample1),
        u = min(u1, u2);

      function getScore(xA, sampleB) {
        var total = 0;
        for (var i = 0, il = sampleB.length; i < il; ++i) {
          total += (sampleB[i] > xA ? 0 : sampleB[i] < xA ? 1 : 0.5);
        }
        return total;
      }

      function getU(sampleA, sampleB) {
        var total = 0;
        for (var i = 0, il = sampleA.length; i < il; ++i) {
          total += getScore(sampleA[i], sampleB);
        }
        return total;
      }

      function getZ(u) {
        return (u - ((size1 * size2) / 2)) / sqrt((size1 * size2 * (size1 + size2 + 1)) / 12);
      }
      // Reject the null hypothesis the two samples come from the
      // same population (i.e. have the same median) if...
      if (size1 + size2 > 30) {
        // ...the z-stat is greater than 1.96 or less than -1.96
        // http://www.statisticslectures.com/topics/mannwhitneyu/
        zStat = getZ(u);
        return abs(zStat) > 1.96 ? (u === u1 ? 1 : -1) : 0;
      }
      // ...the U value is less than or equal the critical U value.
      critical = maxSize < 5 || minSize < 3 ? 0 : uTable[maxSize][minSize - 3];
      return u <= critical ? (u === u1 ? 1 : -1) : 0;
    }

    function reset() {
      var bench = this;
      if (bench.running && !calledBy.abort) {
        // No worries, `reset()` is called within `abort()`.
        calledBy.reset = true;
        bench.abort();
        delete calledBy.reset;
        return bench;
      }
      var event,
        index = 0,
        changes = [],
        queue = [];

      // A non-recursive solution to check if properties have changed.
      // For more information see http://www.jslab.dk/articles/non.recursive.preorder.traversal.part4.
      var data = {
        'destination': bench,
        'source': Object.assign({}, cloneDeep(bench.constructor.prototype), cloneDeep(bench.options))
      };

      do {
        each(entries(data.source), function (entry) {
          var key = entry[0];
          var value = entry[1];
          var changed,
            destination = data.destination,
            currValue = destination[key];

          // Skip pseudo private properties and event listeners.
          if (/^_|^events$|^on[A-Z]/.test(key)) {
            return;
          }
          if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
              // Check if an array value has changed to a non-array value.
              if (!Array.isArray(currValue)) {
                changed = true;
                currValue = [];
              }
              // Check if an array has changed its length.
              if (currValue.length != value.length) {
                changed = true;
                currValue = currValue.slice(0, value.length);
                currValue.length = value.length;
              }
            }
            // Check if an object has changed to a non-object value.
            else if (typeof currValue !== 'object' || currValue === null) {
              changed = true;
              currValue = {};
            }
            // Register a changed object.
            if (changed) {
              changes.push({ 'destination': destination, 'key': key, 'value': currValue });
            }
            queue.push({ 'destination': currValue, 'source': value });
          }
          // Register a changed primitive.
          else if (!(currValue === value || (currValue !== currValue && value !== value)) && value !== undefined) {
            changes.push({ 'destination': destination, 'key': key, 'value': value });
          }
        });
      }
      while ((data = queue[index++]));

      // If changed emit the `reset` event and if it isn't cancelled reset the benchmark.
      if (changes.length &&
        (bench.emit(event = Event('reset')), !event.cancelled)) {
        changes.forEach(function (data) {
          data.destination[data.key] = data.value;
        });
      }
      return bench;
    }

    function toStringBench() {
      var bench = this,
        error = bench.error,
        hz = bench.hz,
        id = bench.id,
        stats = bench.stats,
        size = stats.sample.length,
        pm = '\xb1',
        result = bench.name || (Number.isNaN(id) ? id : '<Test #' + id + '>');

      if (error) {
        var errorStr;
        if (typeof error !== 'object') {
          errorStr = String(error);
        } else if (!(error instanceof Error)) {
          errorStr = join(error);
        } else {
          // Error#name and Error#message properties are non-enumerable.
          errorStr = join(Object.assign({ 'name': error.name, 'message': error.message }, error));
        }
        result += ': ' + errorStr;
      }
      else {
        result += ' x ' + formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) + ' ops/sec ' + pm +
          stats.rme.toFixed(2) + '% (' + size + ' run' + (size === 1 ? '' : 's') + ' sampled)';
      }
      return result;
    }

    /**
     * Clocks the time taken to execute a test per cycle (secs).
     */
    function clock() {
      var options = Benchmark.options,
        templateData = {},
        timers = [{ 'ns': timer.ns, 'res': max(0.0015, getRes('ms')), 'unit': 'ms' }];

      // Lazy define for hi-res timers.
      clock = function (clone) {
        var deferred;

        if (clone instanceof Deferred) {
          deferred = clone;
          clone = deferred.benchmark;
        }
        var bench = clone._original,
          stringable = isStringable(bench.fn),
          count = bench.count = clone.count,
          decompilable = stringable || (support.decompilation && (clone.setup !== noop || clone.teardown !== noop)),
          id = bench.id,
          name = bench.name || (typeof id === 'number' ? '<Test #' + id + '>' : id),
          result = 0;

        // Init `minTime` if needed.
        clone.minTime = bench.minTime || (bench.minTime = bench.options.minTime = options.minTime);

        // Compile in setup/teardown functions and the test loop.
        // Create a new compiled test, instead of using the cached `bench.compiled`,
        // to avoid potential engine optimizations enabled over the life of the test.
        var funcBody = deferred
          ? 'var d#=this,${fnArg}=d#,m#=d#.benchmark._original,f#=m#.fn,su#=m#.setup,td#=m#.teardown;' +
          // When `deferred.cycles` is `0` then...
          'if(!d#.cycles){' +
          // set `deferred.fn`,
          'd#.fn=function(){var ${fnArg}=d#;if(typeof f#=="function"){try{${fn}\n}catch(e#){f#(d#)}}else{${fn}\n}};' +
          // set `deferred.teardown`,
          'd#.teardown=function(){d#.cycles=0;if(typeof td#=="function"){try{${teardown}\n}catch(e#){td#()}}else{${teardown}\n}};' +
          // execute the benchmark's `setup`,
          'if(typeof su#=="function"){try{${setup}\n}catch(e#){su#()}}else{${setup}\n};' +
          // start timer,
          't#.start(d#);' +
          // and then execute `deferred.fn` and return a dummy object.
          '}d#.fn();return{uid:"${uid}"}'

          : 'var r#,s#,m#=this,f#=m#.fn,i#=m#.count,n#=t#.ns;${setup}\n${begin};' +
          'while(i#--){${fn}\n}${end};${teardown}\nreturn{elapsed:r#,uid:"${uid}"}';

        var compiled = bench.compiled = clone.compiled = createCompiled(bench, decompilable, deferred, funcBody),
          isEmpty = !(templateData.fn || stringable);

        try {
          if (isEmpty) {
            // Firefox may remove dead code from `Function#toString` results.
            // For more information see http://bugzil.la/536085.
            throw new Error('The test "' + name + '" is empty. This may be the result of dead code removal.');
          }
          else if (!deferred) {
            // Pretest to determine if compiled code exits early, usually by a
            // rogue `return` statement, by checking for a return object with the uid.
            bench.count = 1;
            compiled = decompilable && (compiled.call(bench, context, timer) || {}).uid === templateData.uid && compiled;
            bench.count = count;
          }
        } catch (e) {
          compiled = null;
          clone.error = e || new Error(String(e));
          bench.count = count;
        }
        // Fallback when a test exits early or errors during pretest.
        if (!compiled && !deferred && !isEmpty) {
          funcBody = (
            stringable || (decompilable && !clone.error)
              ? 'function f#(){${fn}\n}var r#,s#,m#=this,i#=m#.count'
              : 'var r#,s#,m#=this,f#=m#.fn,i#=m#.count'
          ) +
            ',n#=t#.ns;${setup}\n${begin};m#.f#=f#;while(i#--){m#.f#()}${end};' +
            'delete m#.f#;${teardown}\nreturn{elapsed:r#}';

          compiled = createCompiled(bench, decompilable, deferred, funcBody);

          try {
            // Pretest one more time to check for errors.
            bench.count = 1;
            compiled.call(bench, context, timer);
            bench.count = count;
            delete clone.error;
          }
          catch (e) {
            bench.count = count;
            if (!clone.error) {
              clone.error = e || new Error(String(e));
            }
          }
        }
        // If no errors run the full test loop.
        if (!clone.error) {
          compiled = bench.compiled = clone.compiled = createCompiled(bench, decompilable, deferred, funcBody);
          result = compiled.call(deferred || bench, context, timer).elapsed;
        }
        return result;
      };

      /*----------------------------------------------------------------------*/

      /**
       * Creates a compiled function from the given function `body`.
       */
      function createCompiled(bench, decompilable, deferred, body) {
        var fn = bench.fn,
          fnArg = deferred ? getFirstArgument(fn) || 'deferred' : '';

        templateData.uid = uid + uidCounter++;

        Object.assign(templateData, {
          'setup': decompilable ? getSource(bench.setup) : interpolate('m#.setup()'),
          'fn': decompilable ? getSource(fn) : interpolate('m#.fn(' + fnArg + ')'),
          'fnArg': fnArg,
          'teardown': decompilable ? getSource(bench.teardown) : interpolate('m#.teardown()')
        });

        // Use API of chosen timer.
        if (timer.unit === 'ns') {
          Object.assign(templateData, {
            'begin': interpolate('s#=n#()'),
            'end': interpolate('r#=n#(s#);r#=r#[0]+(r#[1]/1e9)')
          });
        }
        else if (timer.unit === 'us') {
          if (timer.ns.stop) {
            Object.assign(templateData, {
              'begin': interpolate('s#=n#.start()'),
              'end': interpolate('r#=n#.microseconds()/1e6')
            });
          } else {
            Object.assign(templateData, {
              'begin': interpolate('s#=n#()'),
              'end': interpolate('r#=(n#()-s#)/1e6')
            });
          }
        }
        else if (timer.ns.now) {
          Object.assign(templateData, {
            'begin': interpolate('s#=(+n#.now())'),
            'end': interpolate('r#=((+n#.now())-s#)/1e3')
          });
        }
        else {
          Object.assign(templateData, {
            'begin': interpolate('s#=new n#().getTime()'),
            'end': interpolate('r#=(new n#().getTime()-s#)/1e3')
          });
        }
        // Define `timer` methods.
        timer.start = createFunction(
          interpolate('o#'),
          interpolate('var n#=this.ns,${begin};o#.elapsed=0;o#.timeStamp=s#')
        );

        timer.stop = createFunction(
          interpolate('o#'),
          interpolate('var n#=this.ns,s#=o#.timeStamp,${end};o#.elapsed=r#')
        );

        // Create compiled test.
        return createFunction(
          interpolate('window,t#'),
          'var global = window, clearTimeout = global.clearTimeout, setTimeout = global.setTimeout;\n' +
          interpolate(body)
        );
      }

      /**
       * Gets the current timer's minimum resolution (secs).
       */
      function getRes(unit) {
        var measured,
          begin,
          count = 30,
          divisor = 1e3,
          ns = timer.ns,
          sample = [];

        // Get average smallest measurable time.
        while (count--) {
          if (unit === 'us') {
            divisor = 1e6;
            if (ns.stop) {
              ns.start();
              while (!(measured = ns.microseconds())) { }
            } else {
              begin = ns();
              while (!(measured = ns() - begin)) { }
            }
          }
          else if (unit === 'ns') {
            divisor = 1e9;
            begin = (begin = ns())[0] + (begin[1] / divisor);
            while (!(measured = ((measured = ns())[0] + (measured[1] / divisor)) - begin)) { }
            divisor = 1;
          }
          else if (ns.now) {
            begin = (+ns.now());
            while (!(measured = (+ns.now()) - begin)) { }
          }
          else {
            begin = new ns().getTime();
            while (!(measured = new ns().getTime() - begin)) { }
          }
          // Check for broken timers.
          if (measured > 0) {
            sample.push(measured);
          } else {
            sample.push(Infinity);
            break;
          }
        }
        // Convert to seconds.
        return getMean(sample) / divisor;
      }

      var interpolationRegExp = {
      };
      /**
       * Interpolates a given template string.
       */
      function interpolate(string) {
        // Replaces all occurrences of `#` with a unique number and template tokens with content.
        var result = string.replace(/\#/g, /\d+/.exec(templateData.uid));
        var keys = Object.keys(templateData);
        for (var i = 0, il = keys.length; i < il; ++i) {
          if (result.indexOf('${' + keys[i] + '}') === -1) {
            continue;
          }

          result = result.replace(
            interpolationRegExp[keys[i]] || (interpolationRegExp[keys[i]] = new RegExp('\\$\\{' + keys[i] + '\\}', 'g')),
            templateData[keys[i]]
          );
        }
        return result;
      }

      /*----------------------------------------------------------------------*/

      // Detect Chrome's microsecond timer:
      // enable benchmarking via the --enable-benchmarking command
      // line switch in at least Chrome 7 to use chrome.Interval
      try {
        if ((timer.ns = new (context.chrome || context.chromium).Interval)) {
          timers.push({ 'ns': timer.ns, 'res': getRes('us'), 'unit': 'us' });
        }
      } catch (e) { }

      // Detect Node.js's nanosecond resolution timer available in Node.js >= 0.8.
      if (processObject && typeof (timer.ns = processObject.hrtime) === 'function') {
        timers.push({ 'ns': timer.ns, 'res': getRes('ns'), 'unit': 'ns' });
      }
      // Detect Wade Simmons' Node.js `microtime` module.
      if (microtimeObject && typeof (timer.ns = microtimeObject.now) === 'function') {
        timers.push({ 'ns': timer.ns, 'res': getRes('us'), 'unit': 'us' });
      }
      // Pick timer with highest resolution.
      timer = timers.reduce(function (a, b) { return a.res <= b.res ? a : b }, {});

      // Error if there are no working timers.
      if (timer.res === Infinity) {
        throw new Error('Benchmark.js was unable to find a working timer.');
      }
      // Resolve time span required to achieve a percent uncertainty of at most 1%.
      // For more information see http://spiff.rit.edu/classes/phys273/uncert/uncert.html.
      options.minTime || (options.minTime = max(timer.res / 2 / 0.01, 0.05));
      return clock.apply(null, arguments);
    }

    /**
     * Computes stats on benchmark results.
     */
    function compute(bench, options) {
      options || (options = {});

      var async = options.async,
        elapsed = 0,
        initCount = bench.initCount,
        minSamples = bench.minSamples,
        queue = [],
        sample = bench.stats.sample;

      /**
       * Adds a clone to the queue.
       */
      function enqueue() {
        queue.push(Object.assign(bench.clone(), {
          '_original': bench,
          'events': {
            'abort': [update],
            'cycle': [update],
            'error': [update],
            'start': [update]
          }
        }));
      }

      /**
       * Updates the clone/original benchmarks to keep their data in sync.
       */
      function update(event) {
        var clone = this,
          type = event.type;

        if (bench.running) {
          if (type === 'start') {
            // Note: `clone.minTime` prop is inited in `clock()`.
            clone.count = bench.initCount;
          }
          else {
            if (type === 'error') {
              bench.error = clone.error;
            }
            if (type === 'abort') {
              bench.abort();
              bench.emit('cycle');
            } else {
              event.currentTarget = event.target = bench;
              bench.emit(event);
            }
          }
        } else if (bench.aborted) {
          // Clear abort listeners to avoid triggering bench's abort/cycle again.
          clone.events.abort.length = 0;
          clone.abort();
        }
      }

      /**
       * Determines if more clones should be queued or if cycling should stop.
       */
      function evaluate(event) {
        var critical,
          df,
          mean,
          moe,
          rme,
          sd,
          sem,
          variance,
          clone = event.target,
          done = bench.aborted,
          now = (+Date.now()),
          size = sample.push(clone.times.period),
          maxedOut = size >= minSamples && (elapsed += now - clone.times.timeStamp) / 1e3 > bench.maxTime,
          times = bench.times;

        // Exit early for aborted or unclockable tests.
        if (done || clone.hz === Infinity) {
          maxedOut = !(size = sample.length = queue.length = 0);
        }

        if (!done) {
          // Compute the sample mean (estimate of the population mean).
          mean = getMean(sample);
          // Compute the sample variance (estimate of the population variance).
          variance = getVariance(sample, mean, size);
          // Compute the sample standard deviation (estimate of the population standard deviation).
          sd = sqrt(variance);
          // Compute the standard error of the mean (a.k.a. the standard deviation of the sampling distribution of the sample mean).
          sem = sd / sqrt(size);
          // Compute the degrees of freedom.
          df = size - 1;
          // Compute the critical value.
          critical = tTable[Math.round(df) || 1] || tTable.infinity;
          // Compute the margin of error.
          moe = sem * critical;
          // Compute the relative margin of error.
          rme = (moe / mean) * 100 || 0;

          Object.assign(bench.stats, {
            'deviation': sd,
            'mean': mean,
            'moe': moe,
            'rme': rme,
            'sem': sem,
            'variance': variance
          });

          // Abort the cycle loop when the minimum sample size has been collected
          // and the elapsed time exceeds the maximum time allowed per benchmark.
          // We don't count cycle delays toward the max time because delays may be
          // increased by browsers that clamp timeouts for inactive tabs. For more
          // information see https://developer.mozilla.org/en/window.setTimeout#Inactive_tabs.
          if (maxedOut) {
            // Reset the `initCount` in case the benchmark is rerun.
            bench.initCount = initCount;
            bench.running = false;
            done = true;
            times.elapsed = (now - times.timeStamp) / 1e3;
          }
          if (bench.hz != Infinity) {
            bench.hz = 1 / mean;
            times.cycle = mean * bench.count;
            times.period = mean;
          }
        }
        // If time permits, increase sample size to reduce the margin of error.
        if (queue.length < 2 && !maxedOut) {
          enqueue();
        }
        // Abort the `invoke` cycle when done.
        event.aborted = done;
      }

      // Init queue and begin.
      enqueue();
      invoke(queue, {
        'name': 'run',
        'args': { 'async': async },
        'queued': true,
        'onCycle': evaluate,
        'onComplete': function () { bench.emit('complete'); }
      });
    }

    /**
     * Cycles a benchmark until a run `count` can be established.
     */
    function cycle(clone, options) {
      options || (options = {});

      var deferred;
      if (clone instanceof Deferred) {
        deferred = clone;
        clone = clone.benchmark;
      }
      var clocked,
        cycles,
        divisor,
        event,
        minTime,
        period,
        async = options.async,
        bench = clone._original,
        count = clone.count,
        times = clone.times;

      // Continue, if not aborted between cycles.
      if (clone.running) {
        // `minTime` is set to `Benchmark.options.minTime` in `clock()`.
        cycles = ++clone.cycles;
        clocked = deferred ? deferred.elapsed : clock(clone);
        minTime = clone.minTime;

        if (cycles > bench.cycles) {
          bench.cycles = cycles;
        }
        if (clone.error) {
          event = Event('error');
          event.message = clone.error;
          clone.emit(event);
          if (!event.cancelled) {
            clone.abort();
          }
        }
      }
      // Continue, if not errored.
      if (clone.running) {
        // Compute the time taken to complete last test cycle.
        bench.times.cycle = times.cycle = clocked;
        // Compute the seconds per operation.
        period = bench.times.period = times.period = clocked / count;
        // Compute the ops per second.
        bench.hz = clone.hz = 1 / period;
        // Avoid working our way up to this next time.
        bench.initCount = clone.initCount = count;
        // Do we need to do another cycle?
        clone.running = clocked < minTime;

        if (clone.running) {
          // Tests may clock at `0` when `initCount` is a small number,
          // to avoid that we set its count to something a bit higher.
          if (!clocked && (divisor = divisors[clone.cycles]) != null) {
            count = floor(4e6 / divisor);
          }
          // Calculate how many more iterations it will take to achieve the `minTime`.
          if (count <= clone.count) {
            count += Math.ceil((minTime - clocked) / period);
          }
          clone.running = count != Infinity;
        }
      }
      // Should we exit early?
      event = Event('cycle');
      clone.emit(event);
      if (event.aborted) {
        clone.abort();
      }
      // Figure out what to do next.
      if (clone.running) {
        // Start a new cycle.
        clone.count = count;
        if (deferred) {
          clone.compiled.call(deferred, context, timer);
        } else if (async) {
          delay(clone, function () { cycle(clone, options); });
        } else {
          cycle(clone);
        }
      }
      else {
        // Fix TraceMonkey bug associated with clock fallbacks.
        // For more information see http://bugzil.la/509069.
        if (support.browser && support.canInjectScript) {
          runScript(uid + '=1;delete ' + uid);
        }
        // We're done.
        clone.emit('complete');
      }
    }

    function run(options) {
      var bench = this,
        event = Event('start');

      // Set `running` to `false` so `reset()` won't call `abort()`.
      bench.running = false;
      bench.reset();
      bench.running = true;

      bench.count = bench.initCount;
      bench.times.timeStamp = (+Date.now());
      bench.emit(event);

      if (!event.cancelled) {
        options = { 'async': ((options = options && options.async) == null ? bench.async : options) && support.timeout };

        // For clones created within `compute()`.
        if (bench._original) {
          if (bench.defer) {
            Deferred(bench);
          } else {
            cycle(bench, options);
          }
        }
        // For original benchmarks.
        else {
          compute(bench, options);
        }
      }
      return bench;
    }

    // Firefox 1 erroneously defines variable and argument names of functions on
    // the function itself as non-configurable properties with `undefined` values.
    // The bugginess continues as the `Benchmark` constructor has an argument
    // named `options` and Firefox 1 will not assign a value to `Benchmark.options`,
    // making it non-writable in the process, unless it is the first property
    // assigned by for-in loop of `Object.assign()`.
    Object.assign(Benchmark, {
      'options': {

        'async': false,
        'count': 0,
        'defer': false,
        'delay': 0.005,
        'id': undefined,
        'initCount': 1,
        'maxTime': 5,
        'minSamples': 5,
        'minTime': 0,
        'name': undefined,
        'onAbort': undefined,
        'onComplete': undefined,
        'onCycle': undefined,
        'onError': undefined,
        'onReset': undefined,
        'onStart': undefined
      },
      'version': version
    });

    Object.assign(Benchmark, {
      'filter': filter,
      'formatNumber': formatNumber,
      'invoke': invoke,
      'join': join,
      'runInContext': runInContext,
      'support': support
    });

    // Add lodash methods to Benchmark.
    Benchmark.each = each;
    Benchmark.forEach = each;
    Benchmark.forOwn = forOwn;
    Benchmark.has = has;
    Benchmark.indexOf = indexOf;
    Benchmark.map = map;
    Benchmark.reduce = reduce;

    Object.assign(Benchmark.prototype, {
      'count': 0,
      'cycles': 0,
      'hz': 0,
      'compiled': undefined,
      'error': undefined,
      'fn': undefined,
      'aborted': false,
      'running': false,
      'setup': noop,
      'teardown': noop,
      'stats': {
        'moe': 0,
        'rme': 0,
        'sem': 0,
        'deviation': 0,
        'mean': 0,
        'sample': [],
        'variance': 0
      },
      'times': {
        'cycle': 0,
        'elapsed': 0,
        'period': 0,
        'timeStamp': 0
      }
    });

    Object.assign(Benchmark.prototype, {
      'abort': abort,
      'clone': clone,
      'compare': compare,
      'emit': emit,
      'listeners': listeners,
      'off': off,
      'on': on,
      'reset': reset,
      'run': run,
      'toString': toStringBench
    });

    Object.assign(Deferred.prototype, {
      'benchmark': null,
      'cycles': 0,
      'elapsed': 0,
      'timeStamp': 0
    });

    Object.assign(Deferred.prototype, {
      'resolve': resolve,
      'reject': reject
    });

    Object.assign(Event.prototype, {
      'aborted': false,
      'cancelled': false,
      'currentTarget': undefined,
      'result': undefined,
      'target': undefined,
      'timeStamp': 0,
      'type': ''
    });

    Suite.options = {
      'name': undefined
    };

    Object.assign(Suite.prototype, {
      'length': 0,
      'aborted': false,
      'running': false
    });

    Object.assign(Suite.prototype, {
      'abort': abortSuite,
      'add': add,
      'clone': cloneSuite,
      'emit': emit,
      'filter': filterSuite,
      'join': arrayRef.join,
      'listeners': listeners,
      'off': off,
      'on': on,
      'pop': arrayRef.pop,
      'push': push,
      'reset': resetSuite,
      'run': runSuite,
      'reverse': arrayRef.reverse,
      'shift': shift,
      'slice': slice,
      'sort': arrayRef.sort,
      'splice': arrayRef.splice,
      'unshift': unshift,
      'each': function (iteratee) { return each(this, iteratee) },
      'forEach': function (iteratee) { return each(this, iteratee) },
      'indexOf': function (value, position) { return indexOf(this, value, position) },
      'map': function (var1) { return map(this, var1) },
      'reduce': function (iteratee, initialValue) { return reduce(this, iteratee, initialValue) }
    });

    // Expose Deferred, Event, and Suite.
    Object.assign(Benchmark, {
      'Deferred': Deferred,
      'Event': Event,
      'Suite': Suite
    });
    // Avoid array-like object bugs with `Array#shift` and `Array#splice`
    // in Firefox < 10 and IE < 9.
    ['pop', 'shift', 'splice'].forEach(function (methodName) {
      var func = arrayRef[methodName];

      Suite.prototype[methodName] = function () {
        var value = this,
          result = func.apply(value, arguments);

        if (value.length === 0) {
          delete value[0];
        }
        return result;
      };
    });

    // Avoid buggy `Array#unshift` in IE < 8 which doesn't return the new
    // length of the array.
    Suite.prototype.unshift = function () {
      var value = this;
      unshift.apply(value, arguments);
      return value.length;
    };

    return Benchmark;
  }

  /*--------------------------------------------------------------------------*/

  // Export Benchmark.
  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // Define as an anonymous module so, through path mapping, it can be aliased.
    define('benchmark', function () {
      return runInContext();
    });
  }
  else {
    var Benchmark = runInContext();

    // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
    if (freeExports && freeModule) {
      // Export for Node.js.
      if (moduleExports) {
        (freeModule.exports = Benchmark).Benchmark = Benchmark;
      }
      // Export for CommonJS support.
      freeExports.Benchmark = Benchmark;
    }
    else {
      // Export to the global object.
      root.Benchmark = Benchmark;
    }
  }
}.call(this));
