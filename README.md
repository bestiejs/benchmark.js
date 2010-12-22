# Benchmark.js

A robust benchmarking library that works on nearly all JavaScript platforms, supports high-resolution timers, and returns statistically significant results. As seen on [jsPerf](http://jsperf.com/).

## Project history

Benchmark.js started out as a heavily modified version of the excellent [JSLitmus](http://broofa.com/Tools/JSLitmus/) by Robert Kieffer ([GitHub](http://github.com/broofa/jslitmus)). It uses adaptive test cycles, meaning every test will roughly take the same amount of time, regardless of the operation. Thanks to this awesome feature, jsPerf tests can be run in any browser, on any device — including smartphones.

In October 2010, [John-David Dalton](http://allyoucanleet.com/) started collaborating on the project, providing some major contributions to Benchmark.js and its UI for jsPerf ([`ui.js`](https://github.com/mathiasbynens/benchmark.js/blob/master/examples/jsperf/ui.js)).

## Docs

The documentation for Benchmark.js can be viewed here: <http://benchmarkjs.com/docs>

## Installation

In the browser:

    <script src="benchmark.js"></script>

Via [npm](http://npmjs.org/):

    npm install benchmark

In [Node.js](http://nodejs.org/):

    var bench = require('benchmark');

## Cloning this repo

To clone this repository including all submodules, using git 1.6.5 or later:

    git clone --recursive git@github.com:mathiasbynens/benchmark.js.git

For older git versions, just use:

    git clone git@github.com:mathiasbynens/benchmark.js.git
    cd benchmark.js
    git submodule update --init

Feel free to fork if you see possible improvements!

_— [Mathias](http://mathiasbynens.be/)_