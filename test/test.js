(function(window, undefined) {

  /** Use a single load function */
  var load = typeof require == 'function' ? require : window.load;

  /** The unit testing framework */
  var QUnit =
    window.QUnit || (
      window.setTimeout || (window.addEventListener = window.setTimeout = / /),
      window.QUnit = load('../vendor/qunit/qunit/qunit.js') || window.QUnit,
      load('../vendor/qunit-clib/qunit-clib.js'),
      (window.addEventListener || 0).test && delete window.addEventListener,
      window.QUnit
    );

  /** The `Benchmark` constructor to test */
  var Benchmark =
    window.Benchmark || (
      Benchmark = load('../benchmark.js') || window.Benchmark,
      Benchmark.Benchmark || Benchmark
    );

  /** API shortcut */
  var forOwn = Benchmark.forOwn;

  /** Used to get property descriptors */
  var getDescriptor = Object.getOwnPropertyDescriptor;

  /** Used to set property descriptors */
  var setDescriptor = Object.defineProperty;

  /** Shortcut used to convert array-like objects to arrays */
  var slice = [].slice;

  /** Used to resolve a value's internal [[Class]] */
  var toString = {}.toString;

  /** Used to flag environments/features */
  var support = {
    'descriptors': !!function() {
      try {
        var o = {};
        return (setDescriptor(o, o, o), 'value' in getDescriptor(o, o));
      } catch(e) { }
    }()
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Skips a given number of tests with a passing result.
   *
   * @private
   * @param {Number} count The number of tests to skip.
   */
  function skipTest(count) {
    while (count--) {
      ok(true, 'test skipped');
    }
  }

  /*--------------------------------------------------------------------------*/

  // init Benchmark.options.minTime
  Benchmark(function() { throw 0; }).run();

  // set a shorter max time
  Benchmark.options.maxTime = Benchmark.options.minTime * 5;

  // must explicitly use `QUnit.module` instead of `module()`
  // in case we are in a CLI environment
  QUnit.module('Benchmark');

  (function() {
    test('has the default `Benchmark.platform` value', function() {
      if (window.document) {
        equal(String(Benchmark.platform), navigator.userAgent);
      } else {
        skipTest(1)
      }
    });

    test('supports loading Benchmark.js as a module', function() {
      if (window.document && window.require) {
        equal((Benchmark2 || {}).version, Benchmark.version);
      } else {
        skipTest(1)
      }
    });

    test('supports loading Platform.js as a module', function() {
      if (window.document && window.require) {
        var platform = (Benchmark2 || {}).platform || {};
        equal(typeof platform.name, 'string');
      } else {
        skipTest(1)
      }
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark constructor');

  (function() {
    test('creates a new instance when called without the `new` operator', function() {
      ok(Benchmark() instanceof Benchmark);
    });

    test('supports passing an options object', function() {
      var bench = Benchmark({ 'name': 'foo', 'fn': function() { } });
      ok(bench.fn && bench.name == 'foo');
    });

    test('supports passing a "name" and "fn" argument', function() {
      var bench = Benchmark('foo', function() { });
      ok(bench.fn && bench.name == 'foo');
    });

    test('supports passing a "name" argument and an options object', function() {
      var bench = Benchmark('foo', { 'fn': function() { } });
      ok(bench.fn && bench.name == 'foo');
    });

    test('supports passing a "name" argument and an options object', function() {
      var bench = Benchmark('foo', function() { }, { 'id': 'bar' });
      ok(bench.fn && bench.name == 'foo' && bench.id == 'bar');
    });

    test('supports passing an empy string for the "fn" options property', function() {
      var bench = Benchmark({ 'fn': '' }).run();
      ok(!bench.error);
    });

    test('detects dead code', function() {
      var bench = Benchmark(function() { }).run();
      ok(/setup\(\)/.test(bench.compiled) ? !bench.error : bench.error);
    });
  }());

 /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark compilation');

  (function() {
    test('compiles using the default `Function#toString`', function() {
      var bench = Benchmark({
        'setup': function() { var a = 1; },
        'fn': function() { throw a; },
        'teardown': function() { a = 2; }
      }).run();

      var compiled = bench.compiled,
          result = /var a\s*=\s*1/.test(compiled) && /throw a/.test(compiled) && /a\s*=\s*2/.test(compiled);

      ok(/setup\(\)/.test(compiled) ? true : result);
    });

    test('compiles using a custom "toString" method', function() {
      var bench = Benchmark({
        'setup': function() { },
        'fn': function() { },
        'teardown': function() { }
      });

      bench.setup.toString = function() { return 'var a = 1;' };
      bench.fn.toString = function() { return 'throw a;' };
      bench.teardown.toString = function() { return 'a = 2;' };
      bench.run();

      var compiled = bench.compiled,
          result = /var a\s*=\s*1/.test(compiled) && /throw a/.test(compiled) && /a\s*=\s*2/.test(compiled);

      ok(/setup\(\)/.test(compiled) ? true : result);
    });

    test('compiles using a string value', function() {
      var bench = Benchmark({
        'setup': 'var a = 1;',
        'fn': 'throw a;',
        'teardown': 'a = 2;'
      }).run();

      var compiled = bench.compiled,
          result = /var a\s*=\s*1/.test(compiled) && /throw a/.test(compiled) && /a\s*=\s*2/.test(compiled);

      ok(/setup\(\)/.test(compiled) ? true : result);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.deepClone');

  (function() {
    function createCircularObject() {
      var result = {
        'foo': { 'b': { 'foo': { 'c': { } } } },
        'bar': { }
      };

      result.foo.b.foo.c.foo = result;
      result.bar.b = result.foo.b;
      return result;
    }

    function Klass() {
      // no-op
    }

    var notCloneable = {
      'an arguments object': arguments,
      'an element': window.document && document.body,
      'a function': Klass,
      'a Klass instance': new Klass
    };

    var objects = {
      'an array': ['a', 'b', 'c', ''],
      'an array-like-object': { '0': 'a', '1': 'b', '2': 'c',  '3': '', 'length': 5 },
      'boolean': false,
      'boolean object': Object(false),
      'an object': { 'a': 0, 'b': 1, 'c': 3 },
      'an object with object values': { 'a': /a/, 'b': ['B'], 'c': { 'C': 1 } },
      'null': null,
      'a number': 3,
      'a number object': Object(3),
      'a regexp': /x/gim,
      'a string': 'x',
      'a string object': Object('x'),
      'undefined': undefined
    };

    objects['an array'].length = 5;

    Klass.prototype = { 'x': 1 };

    forOwn(objects, function(object, key) {
      test('clones ' + key + ' correctly', function() {
        var kind = toString.call(object),
            clone = Benchmark.deepClone(object);

        if (object == null) {
          equal(clone, object);
        } else {
          deepEqual(clone.valueOf(), object.valueOf());
        }
        if (object === Object(object)) {
          ok(clone !== object);
        } else {
          skipTest(1);
        }
      });
    });

    forOwn(notCloneable, function(object, key) {
      test('does not clone ' + key, function() {
        ok(Benchmark.deepClone(object) === object);
      });
    });

    Klass.prototype.deepClone = function() { return new Klass; };

    test('clones using Klass#deepClone', function() {
      var object = new Klass,
          clone = Benchmark.deepClone(object);

      ok(clone !== object && clone instanceof Klass);
    });

    test('clones problem JScript properties', function() {
      var shadowed = {
        'constructor': 1,
        'hasOwnProperty': 2,
        'isPrototypeOf': 3,
        'propertyIsEnumerable': 4,
        'toLocaleString': 5,
        'toString': 6,
        'valueOf': 7
      };

      var clone = Benchmark.deepClone(shadowed);
      deepEqual(clone, shadowed);
    });

    test('clones string object with custom property', function() {
      var object = new String('x');
      object.x = 1;

      var clone = Benchmark.deepClone(object);
      ok(clone == 'x' && typeof clone == 'object' && clone.x === 1 && toString.call(clone) == '[object String]');
    });

    test('clones objects with circular references', function() {
      var object = createCircularObject(),
          clone = Benchmark.deepClone(object);

      ok(clone.bar.b === clone.foo.b && clone === clone.foo.b.foo.c.foo && clone !== object);
    });

    test('clones non-extensible objects with circular references', function() {
      if (Object.preventExtensions) {
        var object = Object.preventExtensions(createCircularObject());
        Object.preventExtensions(object.bar.b);

        var clone = Benchmark.deepClone(object);
        ok(clone.bar.b === clone.foo.b && clone === clone.foo.b.foo.c.foo && clone !== object);
      } else {
        skipTest(1)
      }
    });

    test('clones sealed objects with circular references', function() {
      if (Object.seal) {
        var object = Object.seal(createCircularObject());
        Object.seal(object.bar.b);

        var clone = Benchmark.deepClone(object);
        ok(clone.bar.b === clone.foo.b && clone === clone.foo.b.foo.c.foo && clone !== object);
      } else {
        skipTest(1)
      }
    });

    test('clones frozen objects with circular references', function() {
      if (Object.freeze) {
        var object = Object.freeze(createCircularObject());
        Object.freeze(object.bar.b);

        var clone = Benchmark.deepClone(object);
        ok(clone.bar.b === clone.foo.b && clone === clone.foo.b.foo.c.foo && clone !== object);
      } else {
        skipTest(1)
      }
    });

    test('clones objects with custom descriptors and circular references', function() {
      var accessor,
          descriptor;

      if (support.descriptors) {
        var object = setDescriptor({}, 'foo', {
          'configurable': true,
          'value': setDescriptor({}, 'b', {
            'writable': true,
            'value': setDescriptor({}, 'foo', {
              'get': function() { return accessor; },
              'set': function(value) { accessor = value; }
            })
          })
        });

        setDescriptor(object, 'bar', { 'value': {} });
        object.foo.b.foo = { 'c': object };
        object.bar.b = object.foo.b;

        var clone = Benchmark.deepClone(object);
        ok(clone !== object &&
          clone.bar.b === clone.foo.b &&
          clone !== clone.foo.b.foo.c.foo &&
          (descriptor = getDescriptor(clone, 'foo')) &&
          descriptor.configurable && !(descriptor.enumerable && descriptor.writable) &&
          (descriptor = getDescriptor(clone.foo, 'b')) &&
          descriptor.writable && !(descriptor.configurable && descriptor.enumerable) &&
          (descriptor = getDescriptor(clone.foo.b, 'foo')) &&
          descriptor.get && descriptor.set &&
          (descriptor = getDescriptor(clone.foo.b, 'foo')) &&
          !(descriptor.configurable && descriptor.enumerable && descriptor.writable) &&
          (descriptor = getDescriptor(clone, 'bar')) &&
          !(descriptor.configurable && descriptor.enumerable && descriptor.writable));
      }
      else {
        skipTest(1)
      }
    });

    test('avoids call stack limits', function() {
      var count = 0,
          object = {},
          recurse = function() { count++; recurse(); };

      if (toString.call(window.java) == '[object JavaPackage]') {
        // Java throws uncatchable errors on call stack overflows, so to avoid
        // them I chose a number higher than Rhino's call stack limit without
        // dynamically testing for the actual limit
        count = 3e3;
      } else {
        try { recurse(); } catch(e) { }
      }
      // exceed limit
      count++;
      for (var i = 0, sub = object; i <= count; i++) {
        sub = sub[i] = {};
      }
      try {
        for (var i = 0, sub = Benchmark.deepClone(object); sub = sub[i]; i++) { }
        result = --i == count;
      } catch(e) { }

      ok(result, 'avoids call stack limits (stack limit is ' + (count - 1) + ')');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.each');

  (function() {
    var objects = {
      'array': ['a', 'b', 'c', ''],
      'array-like-object': { '0': 'a', '1': 'b', '2': 'c',  '3': '', 'length': 5 }
    };

    if (window.document && document.evaluate) {
      var xpathResult = [document.documentElement, document.getElementsByTagName('head')[0], document.body];
      objects['xpath snapshot'] = document.evaluate('//*[self::html or self::head or self::body]', document, null, 7, null);
    }

    objects.array.length = 5;

    forOwn(objects, function(object, key) {
      test('passes the correct arguments when passing an ' + key, function() {
        if (object) {
          var args
          Benchmark.each(object, function() {
            args || (args = slice.call(arguments));
          });

          if (key == 'xpath snapshot') {
            ok(args[0] == xpathResult[0]);
          } else {
            equal(args[0], 'a');
          }
          equal(args[1], 0);
          ok(args[2] == object);
        }
        else {
          skipTest(3);
        }
      });

      test('returns the passed object when passing an ' + key, function() {
        if (object) {
          var result = Benchmark.each(object, function() { });
          ok(result == object);
        }
        else {
          skipTest(1);
        }
      });

      test('iterates over all indexes when passing an ' + key, function() {
        if (object) {
          var values = [];
          Benchmark.each(object, function(value) {
            values.push(value);
          });

          deepEqual(values, key == 'xpath snapshot' ? xpathResult : ['a', 'b', 'c', '']);
        }
        else {
          skipTest(1);
        }
      });

      test('exits early when returning `false` when passing an ' + key, function() {
        if (object) {
          var values = [];
          Benchmark.each(object, function(value) {
            values.push(value);
            return values.length < 2;
          });

          deepEqual(values, key == 'xpath snapshot' ? xpathResult.slice(0, 2) : ['a', 'b']);
        }
        else {
          skipTest(1);
        }
      });
    });

    test('passes the third callback argument as an object', function() {
      var thirdArg;
      Benchmark.each('hello', function(value, index, object) {
        thirdArg = object;
      });

      ok(thirdArg && typeof thirdArg == 'object');
    });

    test('iterates over strings by index', function() {
      var values = [];
      Benchmark.each('hello', function(value) {
        values.push(value)
      });

      deepEqual(values, ['h', 'e', 'l', 'l', 'o']);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.filter');

  (function() {
    var objects = {
      'array': ['a', 'b', 'c', ''],
      'array-like-object': { '0': 'a', '1': 'b', '2': 'c',  '3': '', 'length': 5 }
    };

    objects.array.length = 5;

    forOwn(objects, function(object, key) {
      test('passes the correct arguments when passing an ' + key, function() {
        var args;
        Benchmark.filter(object, function() {
          args || (args = slice.call(arguments));
        });

        deepEqual(args, ['a', 0, object]);
      });

      test('produces the correct result when passing an ' + key, function() {
        var result = Benchmark.filter(object, function(value, index) {
          return index > 0;
        });

        deepEqual(result, ['b', 'c', '']);
      });

      test('iterates over sparse ' + key + 's correctly', function() {
        var result = Benchmark.filter(object, function(value) {
          return value === undefined;
        });

        deepEqual(result, []);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.forOwn');

  (function() {
    function fn() {
      // no-op
    }

    function KlassA() {
      this.a = 1;
      this.b = 2;
      this.c = 3;
    }

    function KlassB() {
      this.a = 1;
      this.constructor = 2;
      this.hasOwnProperty = 3;
      this.isPrototypeOf = 4;
      this.propertyIsEnumerable = 5;
      this.toLocaleString = 6;
      this.toString = 7;
      this.valueOf = 8;
    }

    function KlassC() {
      // no-op
    }

    fn.a = 1;
    fn.b = 2;
    fn.c = 3;

    KlassC.prototype.a = 1;
    KlassC.prototype.b = 2;
    KlassC.prototype.c = 3;

    var objects = {
      'an arguments object': arguments,
      'a function': fn,
      'an object': new KlassA,
      'an object shadowing properties on Object.prototype': new KlassB,
      'a prototype object': KlassC.prototype,
      'a string': 'abc'
    };

    forOwn(objects, function(object, key) {
      test('passes the correct arguments when passing ' + key, function() {
        var args;
        Benchmark.forOwn(object, function() {
          args || (args = slice.call(arguments));
        });

        equal(typeof args[0], key == 'a string' ? 'string' : 'number');
        equal(typeof args[1], 'string');
        equal(args[2] && typeof args[2], key == 'a function' ? 'function' : 'object');
      });

      test('returns the passed object when passing ' + key, function() {
        var result = Benchmark.forOwn(object, function() { });
        deepEqual(result, object);
      });

      test('iterates over own properties when passing ' + key, function() {
        var values = [];
        Benchmark.forOwn(object, function(value) {
          values.push(value);
        });

        if (object instanceof KlassB) {
          deepEqual(values.sort(), [1, 2, 3, 4, 5, 6, 7, 8]);
        } else if (key == 'a string') {
          deepEqual(values, ['a', 'b', 'c']);
        } else {
          deepEqual(values.sort(), [1, 2, 3]);
        }
      });

      test('exits early when returning `false` when passing ' + key, function() {
        var values = [];
        Benchmark.forOwn(object, function(value) {
          values.push(value);
          return false;
        });

        equal(values.length, 1);
      });

      if (object instanceof KlassB) {
        test('exits correctly when transitioning to the JScript [[DontEnum]] fix', function() {
          var values = [];
          Benchmark.forOwn(object, function(value) {
            values.push(value);
            return values.length < 2;
          });

          equal(values.length, 2);
        });
      }
    });
  }(1, 2, 3));

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.formatNumber');

  (function() {
    test('formats a million correctly', function() {
      equal(Benchmark.formatNumber(1e6), '1,000,000');
    });

    test('formats less than 100 correctly', function() {
      equal(Benchmark.formatNumber(23), '23');
    });

    test('formats numbers with decimal values correctly', function() {
      equal(Benchmark.formatNumber(1234.56), '1,234.56');
    });

    test('formats negative numbers correctly', function() {
      equal(Benchmark.formatNumber(-1234.56), '-1,234.56');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.indexOf');

  (function() {
    var objects = {
      'array': ['a', 'b', 'c', ''],
      'array-like-object': { '0': 'a', '1': 'b', '2': 'c',  '3': '', 'length': 5 }
    };

    objects.array.length = 5;

    forOwn(objects, function(object, key) {
      test('produces the correct result when passing an ' + key, function() {
        equal(Benchmark.indexOf(object, 'b'), 1);
      });

      test('matches values by strict equality when passing an ' + key, function() {
        equal(Benchmark.indexOf(object, new String('b')), -1);
      });

      test('iterates over sparse ' + key + 's correctly', function() {
        equal(Benchmark.indexOf(object, undefined), -1);
      });
    });

    test('searches from the given `fromIndex`', function() {
      var array = ['a', 'b', 'c', 'a'];
      equal(Benchmark.indexOf(array, 'a', 1), 3);
    });

    test('handles extreme negative `fromIndex` values correctly', function() {
      var array = ['a'];
      array['-1'] = 'z';
      equal(Benchmark.indexOf(array, 'z', -2), -1);
    });

    test('handles extreme positive `fromIndex` values correctly', function() {
      var object = { '0': 'a', '1': 'b', '2': 'c', 'length': 2 };
      equal(Benchmark.indexOf(object, 'c', 2), -1);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.interpolate');

  (function() {
    test('replaces tokens correctly', function() {
      var actual = Benchmark.interpolate('#{greeting} #{location}.', {
        'greeting': 'Hello',
        'location': 'world'
      });

      equal(actual, 'Hello world.');
    });

    test('ignores inherited object properties', function() {
      var actual = Benchmark.interpolate('x#{toString}', {});
      equal(actual, 'x#{toString}');
    });

    test('allows for no template object', function() {
      var actual = Benchmark.interpolate('x');
      equal(actual, 'x');
    });

    test('replaces duplicate tokens', function() {
      var actual = Benchmark.interpolate('#{x}#{x}#{x}', { 'x': 'a' });
      equal(actual, 'aaa');
    });

    test('handles keys containing RegExp special characters', function() {
      var actual = Benchmark.interpolate('#{.*+?^=!:${}()|[]\\/}', { '.*+?^=!:${}()|[]\\/': 'x' });
      equal(actual, 'x');
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.invoke');

  (function() {
    var objects = {
      'array': ['a', ['b'], 'c', null],
      'array-like-object': { '0': 'a', '1': ['b'], '2': 'c',  '3': null, 'length': 5 }
    };

    objects.array.length = 5;

    forOwn(objects, function(object, key) {
      test('produces the correct result when passing an ' + key, function() {
        var result = Benchmark.invoke(object, 'concat');
        deepEqual(result, ['a', ['b'], 'c', undefined, undefined]);
        ok(!('4' in result));
      });

      test('passes the correct arguments to the invoked method when passing an ' + key, function() {
        var result = Benchmark.invoke(object, 'concat', 'x', 'y', 'z');
        deepEqual(result, ['axyz', ['b', 'x', 'y', 'z'], 'cxyz', undefined, undefined]);
        ok(!('4' in result));
      });

      test('handles options object with callbacks correctly when passing an ' + key, function() {
        function callback() {
          callbacks.push(slice.call(arguments));
        }

        var callbacks = [];
        var result = Benchmark.invoke(object, {
          'name': 'concat',
          'args': ['x', 'y', 'z'],
          'onStart': callback,
          'onCycle': callback,
          'onComplete': callback
        });

        deepEqual(result, ['axyz', ['b', 'x', 'y', 'z'], 'cxyz', undefined, undefined]);
        ok(!('4' in result));

        equal(callbacks[0].length, 1);
        equal(callbacks[0][0].target, 'a');
        deepEqual(callbacks[0][0].currentTarget, object);
        equal(callbacks[0][0].type, 'start');
        equal(callbacks[1][0].type, 'cycle');
        equal(callbacks[5][0].type, 'complete');
      });

      test('supports queuing when passing an ' + key, function() {
        var lengths = [];
        var result = Benchmark.invoke(object, {
          'name': 'concat',
          'queued': true,
          'args': 'x',
          'onCycle': function() {
            lengths.push(object.length);
          }
        });

        deepEqual(lengths, [5, 4, 3, 2]);
        deepEqual(result, ['ax', ['b', 'x'], 'cx', undefined, undefined]);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.join');

  (function() {
    var objects = {
      'array': ['a', 'b', ''],
      'array-like-object': { '0': 'a', '1': 'b', '2': '', 'length': 4 },
      'object': { 'a': '0', 'b': '1', '': '2' }
    };

    objects.array.length = 4;

    forOwn(objects, function(object, key) {
      test('joins correctly using the default separator when passing an ' + key, function() {
        equal(Benchmark.join(object), key == 'object' ? 'a: 0,b: 1,: 2' : 'a,b,');
      });

      test('joins correctly using a custom separator when passing an ' + key, function() {
        equal(Benchmark.join(object, '+', '@'), key == 'object' ? 'a@0+b@1+@2' :  'a+b+');
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.map');

  (function() {
    var objects = {
      'array': ['a', 'b', 'c', ''],
      'array-like-object': { '0': 'a', '1': 'b', '2': 'c',  '3': '', 'length': 5 }
    };

    objects.array.length = 5;

    forOwn(objects, function(object, key) {
      test('passes the correct arguments when passing an ' + key, function() {
        var args;
        Benchmark.map(object, function() {
          args || (args = slice.call(arguments));
        });

        deepEqual(args, ['a', 0, object]);
      });

      test('produces the correct result when passing an ' + key, function() {
        var result = Benchmark.map(object, function(value, index) {
          return value + index;
        });

        deepEqual(result, ['a0', 'b1', 'c2', '3', undefined]);
        ok(!('4' in result));
      });

      test('produces an array of the correct length for sparse ' + key + 's', function() {
        equal(Benchmark.map(object, function() { }).length, 5);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.pluck');

  (function() {
    var objects = {
      'array': [{ '_': 'a' }, { '_': 'b' }, { '_': 'c' }, null],
      'array-like-object': { '0': { '_': 'a' }, '1': { '_': 'b' }, '2': { '_': 'c' },  '3': null, 'length': 5 }
    };

    objects.array.length = 5;

    forOwn(objects, function(object, key) {
      test('produces the correct result when passing an ' + key, function() {
        var result = Benchmark.pluck(object, '_');
        deepEqual(result, ['a', 'b', 'c', undefined, undefined]);
        ok(!('4' in result));
      });

      test('produces the correct result for non-existent keys when passing an ' + key, function() {
        var result = Benchmark.pluck(object, 'non-existent');
        deepEqual(result, [undefined, undefined, undefined, undefined, undefined]);
        ok(!('4' in result));
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.reduce');

  (function() {
    var objects = {
      'array': ['b', 'c', ''],
      'array-like-object': { '0': 'b', '1': 'c',  '2': '', 'length': 4 }
    };

    objects.array.length = 4;

    forOwn(objects, function(object, key) {
      test('passes the correct arguments when passing an ' + key, function() {
        var args;
        Benchmark.reduce(object, function() {
          args || (args = slice.call(arguments));
        }, 'a');

        deepEqual(args, ['a', 'b', 0, object]);
      });

      test('accumulates correctly when passing an ' + key, function() {
        var result = Benchmark.reduce(object, function(string, value) {
          return string + value;
        }, 'a');

        deepEqual(result, 'abc');
      });

      test('handles arguments with no initial value correctly when passing an ' + key, function() {
        var args;
        Benchmark.reduce(object, function() {
          args || (args = slice.call(arguments));
        });

        deepEqual(args, ['b', 'c', 1, object]);
      });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark#clone');

  (function() {
    var bench = Benchmark(function() { this.count += 0; }).run();

    test('produces the correct result passing no arguments', function() {
      var clone = bench.clone();
      deepEqual(clone, bench);
      ok(clone.stats != bench.stats && clone.times != bench.times && clone.options != bench.options);
    });

    test('produces the correct result passing a data object', function() {
      var clone = bench.clone({ 'fn': '', 'name': 'foo' });
      ok(clone.fn === '' && clone.options.fn === '');
      ok(clone.name == 'foo' && clone.options.name == 'foo');
    });
  }());

  /*--------------------------------------------------------------------------*/

  forOwn({
    'Benchmark': Benchmark,
    'Benchmark.Suite': Benchmark.Suite
  },
  function(Constructor, namespace) {

    QUnit.module(namespace + '#emit');

    (function() {
      test('emits passed arguments', function() {
        var args,
            object = Constructor();

        object.on('args', function() { args = slice.call(arguments, 1); });
        object.emit('args', 'a', 'b', 'c');
        deepEqual(args, ['a', 'b', 'c']);
      });

      test('emits with no listeners', function() {
        var event = Benchmark.Event('empty'),
            object = Constructor();

        object.emit(event);
        ok(!event.cancelled);
      });

      test('emits with an event type of "toString"', function() {
        var event = Benchmark.Event('toString'),
            object = Constructor();

        object.emit(event);
        ok(!event.cancelled);
      });

      test('returns the last listeners returned value', function() {
        var event = Benchmark.Event('result'),
            object = Constructor();

        object.on('result', function() { return 'x'; });
        object.on('result', function() { return 'y'; });
        ok(object.emit(event) === 'y');
      });

      test('cancels the event if a listener explicitly returns `false`', function() {
        var event = Benchmark.Event('cancel'),
            object = Constructor();

        object.on('cancel', function() { return false; });
        object.on('cancel', function() { return true; });
        object.emit(event);
        ok(event.cancelled);
      });

      test('uses a shallow clone of the listeners when emitting', function() {
        var event,
            listener2 = function(eventObject) { eventObject.listener2 = true },
            object = Constructor();

        object.on('shallowclone', function(eventObject) {
          event = eventObject;
          object.off(event.type, listener2);
        })
        .on('shallowclone', listener2)
        .emit('shallowclone');

        ok(event.listener2);
      });

      test('emits a custom event object', function() {
        var event = Benchmark.Event('custom'),
            object = Constructor();

        object.on('custom', function(eventObject) { eventObject.touched = 1; });
        object.emit(event);
        ok(event.touched);
      });

      test('sets `event.result` correctly', function() {
        var event = Benchmark.Event('result'),
            object = Constructor();

        object.on('result', function() { return 'x'; });
        object.emit(event);
        equal(event.result, 'x');
      });

      test('sets `event.type` correctly', function() {
        var event,
            object = Constructor();

        object.on('type', function(eventObj) {
          event = eventObj;
        });

        object.emit('type');
        equal(event.type, 'type');
      });
    }());

    /*------------------------------------------------------------------------*/

    QUnit.module(namespace + '#listeners');

    (function() {
      test('returns the correct listeners', function() {
        var listener = function() { },
            object = Constructor();

        object.on('x', listener);
        deepEqual(object.listeners('x'), [listener]);
      });

      test('returns an array and initializes previously uninitialized listeners', function() {
        var object = Constructor();
        deepEqual(object.listeners('x'), []);
        deepEqual(object.events, { 'x': [] });
      });
    }());

    /*------------------------------------------------------------------------*/

    QUnit.module(namespace + '#off');

    (function() {
      test('returns the benchmark', function() {
        var listener = function() { },
            object = Constructor();

        object.on('x', listener);
        ok(object.off('x', listener) === object);
      });

      test('will ignore inherited properties of the event cache', function() {
        var Dummy = function() { },
            listener = function() { },
            object = Constructor();

        Dummy.prototype.x = [listener];
        object.events = new Dummy;

        object.off('x', listener);
        deepEqual(object.events.x, [listener]);
      });

      test('handles an event type and listener', function() {
        var listener = function() { },
            object = Constructor();

        object.on('x', listener);
        object.off('x', listener);
        deepEqual(object.events.x, []);
      });

      test('handles unregistering duplicate listeners', function() {
        var listener = function() { },
            object = Constructor();

        object.on('x', listener);
        object.on('x', listener);

        var events = object.events;
        object.off('x', listener);
        deepEqual(events.x, [listener]);

        object.off('x', listener);
        deepEqual(events.x, []);
      });

      test('handles a non-registered listener', function() {
        var object = Constructor();
        object.off('x', function() { });
        equal(object.events, undefined);
      });

      test('handles space separated event type and listener', function() {
        var listener = function() { },
            object = Constructor();

        object.on('x', listener);
        object.on('y', listener);

        var events = object.events;
        object.off('x y', listener);
        deepEqual(events.x, []);
        deepEqual(events.y, []);
      });

      test('handles space separated event type and no listener', function() {
        var listener1 = function() { },
            listener2 = function() { },
            object = Constructor();

        object.on('x', listener1);
        object.on('y', listener2);

        var events = object.events;
        object.off('x y');
        deepEqual(events.x, []);
        deepEqual(events.y, []);
      });

      test('handles no arguments', function() {
        var listener1 = function() { },
            listener2 = function() { },
            listener3 = function() { },
            object = Constructor();

        object.on('x', listener1);
        object.on('y', listener2);
        object.on('z', listener3);

        var events = object.events;
        object.off();
        deepEqual(events.x, []);
        deepEqual(events.y, []);
        deepEqual(events.z, []);
      });
    }());

    /*------------------------------------------------------------------------*/

    QUnit.module(namespace + '#on');

    (function() {
      test('returns the benchmark', function() {
        var listener = function() { },
            object = Constructor();

        ok(object.on('x', listener) === object);
      });

      test('will ignore inherited properties of the event cache', function() {
        var Dummy = function() { },
            listener1 = function() { },
            listener2 = function() { },
            object = Constructor();

        Dummy.prototype.x = [listener1];
        object.events = new Dummy;

        object.on('x', listener2);
        deepEqual(object.events.x, [listener2]);
      });

      test('handles an event type and listener', function() {
        var listener = function() { },
            object = Constructor();

        object.on('x', listener);
        deepEqual(object.events.x, [listener]);
      });

      test('handles registering duplicate listeners', function() {
        var listener = function() { },
            object = Constructor();

        object.on('x', listener);
        object.on('x', listener);
        deepEqual(object.events.x, [listener, listener]);
      });

      test('handles space separated event type and listener', function() {
        var listener = function() { },
            object = Constructor();

        object.on('x y', listener);

        var events = object.events;
        deepEqual(events.x, [listener]);
        deepEqual(events.y, [listener]);
      });
    }());
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite#abort');

  (function() {
    test('igores abort calls when the suite isn\'t running', function() {
      var fired = false;
      var suite = Benchmark.Suite('suite', {
        'onAbort': function() { fired = true; }
      });

      suite.add('foo', function() { });
      suite.abort();
      ok(fired == false);
    });

    test('ignores abort calls from `Benchmark.Suite#reset` when the suite isn\'t running', function() {
      var fired = false;
      var suite = Benchmark.Suite('suite', {
        'onAbort': function() { fired = true; }
      });

      suite.add('foo', function() { });
      suite.reset();
      ok(fired == false);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark event flow');

  (function() {
    var events = [],
        callback = function(event) { events.push(event); };

    var suite = Benchmark.Suite('suite', {
      'onAdd': callback,
      'onAbort': callback,
      'onClone': callback,
      'onError': callback,
      'onStart': callback,
      'onCycle': callback,
      'onComplete': callback,
      'onReset': callback
    })
    .add('foo', function() {
      throw null;
    }, {
      'onAbort': callback,
      'onClone': callback,
      'onError': callback,
      'onStart': callback,
      'onCycle': callback,
      'onComplete': callback,
      'onReset': callback
    })
    .run({ 'async': false });

    // first Suite#onAdd
    test('should emit the suite "add" event first', function() {
      var event = events[0];
      ok(event.type == 'add' && event.currentTarget.name == 'suite' && event.target.name == 'foo');
    });

    // next we start the Suite because no reset was needed
    test('should emit the suite "start" event', function() {
      var event = events[1];
      ok(event.type == 'start' && event.currentTarget.name == 'suite' && event.target.name == 'foo');
    });

    // and so start the first benchmark
    test('should emit the benchmark "start" event', function() {
      var event = events[2];
      ok(event.type == 'start' && event.currentTarget.name == 'foo');
    });

    // oh no! we abort because of an error
    test('should emit the benchmark "error" event', function() {
      var event = events[3];
      ok(event.type == 'error' && event.currentTarget.name == 'foo');
    });

    // benchmark error triggered
    test('should emit the benchmark "abort" event', function() {
      var event = events[4];
      ok(event.type == 'abort' && event.currentTarget.name == 'foo');
    });

    // we reset the benchmark as part of the abort
    test('should emit the benchmark "reset" event', function() {
      var event = events[5];
      ok(event.type == 'reset' && event.currentTarget.name == 'foo');
    });

    // benchmark is cycle is finished
    test('should emit the benchmark "cycle" event', function() {
      var event = events[6];
      ok(event.type == 'cycle' && event.currentTarget.name == 'foo');
    });

    // benchmark is complete
    test('should emit the benchmark "complete" event', function() {
      var event = events[7];
      ok(event.type == 'complete' && event.currentTarget.name == 'foo');
    });

    // the benchmark error triggers a Suite error
    test('should emit the suite "error" event', function() {
      var event = events[8];
      ok(event.type == 'error' && event.currentTarget.name == 'suite' && event.target.name == 'foo');
    });

    // the Suite cycle finishes
    test('should emit the suite "cycle" event', function() {
      var event = events[9];
      ok(event.type == 'cycle' && event.currentTarget.name == 'suite' && event.target.name == 'foo');
    });

    // the Suite completes
    test('finally it should emit the suite "complete" event', function() {
      var event = events[10];
      ok(event.type == 'complete' && event.currentTarget.name == 'suite' && event.target.name == 'foo');
    });

    test('emitted all expected events', function() {
      ok(events.length == 11);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Deferred benchmarks');

  (function() {
    asyncTest('should run a deferred benchmark correctly', function() {
      Benchmark(function(deferred) {
        setTimeout(function() { deferred.resolve(); }, 10);
      }, {
        'defer': true,
        'onComplete': function() {
          ok(this.cycles);
          QUnit.start();
        }
      })
      .run();
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Filter suite results on complete');

  (function() {
    var count = 0,
        suite = new Benchmark.Suite;

    suite.add('a', function() {
      count++;
    })
    .add('b', function() {
      for (var i = 0; i < 1e6; i++) {
        count++;
      }
    })
    .add('c', function() {
      throw new TypeError;
    });

    asyncTest('should filter by fastest', function() {
      suite.on('complete', function() {
        suite.off();
        deepEqual(this.filter('fastest').pluck('name'), ['a']);
        QUnit.start();
      })
      .run({ 'async': true });
    });

    asyncTest('should filter by slowest', function() {
      suite.on('complete', function() {
        suite.off();
        deepEqual(this.filter('slowest').pluck('name'), ['b']);
        QUnit.start();
      })
      .run({ 'async': true });
    });

    asyncTest('should filter by successful', function() {
      suite.on('complete', function() {
        suite.off();
        deepEqual(this.filter('successful').pluck('name'), ['a', 'b']);
        QUnit.start();
      })
      .run({ 'async': true });
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('Benchmark.Suite#abort while running');

  (function() {
    asyncTest('emits an abort event when running', function() {
      var fired = false;

      Benchmark.Suite('foo', {
        'onAbort': function() { fired = true; }
      })
      .add('a', function() {
        // empty
      })
      .on('start', function() {
        this.abort();
      })
      .on('complete', function() {
        ok(fired == true);
        QUnit.start();
      })
      .run({ 'async': true });
    });

    asyncTest('emits an abort event after calling `Benchmark.Suite#reset` when running', function() {
      var fired = false;

      Benchmark.Suite('foo', {
        'onAbort': function() { fired = true; }
      })
      .add('a', function() {
        // empty
      })
      .on('start', function() {
        this.reset();
      })
      .on('complete', function() {
        ok(fired == true);
        QUnit.start();
      })
      .run({ 'async': true });
    });
  }());

  /*--------------------------------------------------------------------------*/

  // explicitly call `QUnit.start()` in a CLI environment
  if (!window.document) {
    QUnit.start();
  }
}(typeof global == 'object' && global || this));