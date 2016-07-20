# Benchmark.js v2.1.1

A [robust](https://mathiasbynens.be/notes/javascript-benchmarking "Bulletproof JavaScript benchmarks") benchmarking library that supports high-resolution timers & returns statistically significant results. As seen on [jsPerf](https://jsperf.com/).

## Documentation

* [API Documentation](https://benchmarkjs.com/docs)

## Download

 * [Development source](https://raw.githubusercontent.com/bestiejs/benchmark.js/2.1.1/benchmark.js)

## Installation

Benchmark.js’ only hard dependency is [lodash](https://lodash.com/).
Include [platform.js](https://mths.be/platform) to populate [Benchmark.platform](https://benchmarkjs.com/docs#platform).

In a browser:

```html
<script src="lodash.js"></script>
<script src="platform.js"></script>
<script src="benchmark.js"></script>
```

In an AMD loader:

```js
require({
  'paths': {
    'benchmark': 'path/to/benchmark',
    'lodash': 'path/to/lodash',
    'platform': 'path/to/platform'
  }
},
['benchmark'], function(Benchmark) {/*…*/});
```

Using npm:

```bash
$ npm i --save benchmark
```

In Node.js:

```js
var Benchmark = require('benchmark');
```

Optionally, use the [microtime module](https://github.com/wadey/node-microtime) by Wade Simmons:

```bash
npm i --save microtime
```

Usage example:

```js
var suite = new Benchmark.Suite;

// add tests
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });

// logs:
// => RegExp#test x 4,161,532 +-0.99% (59 cycles)
// => String#indexOf x 6,139,623 +-1.00% (131 cycles)
// => Fastest is String#indexOf
```

## Support

Tested in Chrome 46-47, Firefox 42-43, IE 9-11, Edge 13, Safari 8-9, Node.js 0.10-6, & PhantomJS 1.9.8.

## BestieJS

Benchmark.js is part of the BestieJS *“Best in Class”* module collection. This means we promote solid browser/environment support, ES5+ precedents, unit testing, & plenty of documentation.
