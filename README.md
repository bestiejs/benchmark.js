# `benchmark.js`

The benchmarking script used for [jsPerf](http://jsperf.com/).

`benchmark.js` started out as a heavily modified version of the excellent [JSLitmus](http://broofa.com/Tools/JSLitmus/) by Robert Kieffer ([GitHub](http://github.com/broofa/jslitmus)). It uses adaptive test cycles, meaning every test will roughly take the same amount of time, regardless of the operation. Thanks to this awesome feature, jsPerf tests can be run in any browser, on any device — including smartphones.

In October 2010, [John-David Dalton](http://allyoucanleet.com/) started collaborating on the project, providing some major contributions to `benchmark.js` and its UI for jsPerf (`ui.js`).

Feel free to fork if you see possible improvements!

To clone this repository including all submodules, using git 1.6.5 or later:

    git clone --recursive git@github.com:mathiasbynens/benchmark.js.git

For older git versions, just use:

    git clone git@github.com:mathiasbynens/benchmark.js.git
    git submodule update --init

_— [Mathias](http://mathiasbynens.be/)_