/*!
 * benchmark.js for jsPerf.com
 * Copyright Mathias Bynens <http://mths.be/>
 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
 * Available under MIT license <http://mths.be/mit>
 */

/*jslint browser: true, forin: true, es5: false, onevar: true, eqeqeq: true, immed: true */
/*global window, benchmark, opera, init, _bTestResults, _bTestKey */

var _bTestResults; // For Browserscope; don’t rename

(function() {

	function formatNumber(h, b) {
		var l = isNaN(b) ? 0 : Math.abs(b),
		    k = '.',
		    g = ',',
		    a = (h < 0) ? '-' : '',
		    f = ~~(h = Math.abs(h).toFixed(l)) + '',
		    e = ((e = f.length) > 3) ? e % 3 : 0;
		return a + (e ? f.substr(0, e) + g : '') + f.substr(e).replace(/(\d{3})(?=\d)/g, '$1' + g) + (l ? k + Math.abs(h - f).toFixed(l).slice(2) : '');
	}

	// A smattering of methods that are needed to implement the benchmark testbed.
	var bnch = {

		// Get an element by ID.
		$: function(id) {
			return document.getElementById(id);
		},

		// Null function
		F: function() { },

		// Set the status shown in the UI
		status: function(msg) {
			var el = bnch.$('status');
			if (el) {
				el.innerHTML = msg || '';
			}
		},

		// Copy properties from src to dst
		extend: function(dst, src) {
			for (var k in src) {
				dst[k] = src[k];
			}
			return dst;
		},

		// Like Array.join(), but for the key-value pairs in an object
		join: function(o, delimit1, delimit2) {
			if (o.join) {
				return o.join(delimit1); // If it's an array
			}
			var pairs = [],
			    k;
			for (k in o) {
				pairs.push(k + delimit1 + o[k]);
			}
			return pairs.join(delimit2);
		},

		// Array#indexOf isn't supported in IE, so we use this as a cross-browser solution
		indexOf: function(arr, o) {
			if (arr.indexOf) {
				return arr.indexOf(o);
			}
			for (var i = 0; i < this.length; i++) {
				if (arr[i] === o) {
					return i;
				}
			}
			return -1;
		}

	},

	// Test manages a single test (created with benchmark.test())
	Test = function (name, id, f) {
		if (!f) {
			throw new Error('Undefined test function');
		}
		if (!/function[^\(]*\(([^,\)]*)/.test(f.toString())) {
			throw new Error('“' + name + '” test: Test is not a valid Function object');
		}
		this.loopArg = RegExp.$1;
		this.name = name;
		this.id = id;
		this.f = f;
	};

	bnch.extend(Test, {
		// Calibration tests for establishing iteration loop overhead
		CALIBRATIONS: [
			new Test('Calibrating loop', 'cl', function(count) { while (count--) { } }),
			new Test('Calibrating function', 'cf', bnch.F)
		],

		// Run calibration tests. Returns true if calibrations are not yet complete (in which case calling code should run the tests yet again).
		// onCalibrated - Callback to invoke when calibrations have finished
		calibrate: function(onCalibrated) {
			for (var i = 0, cal; i < Test.CALIBRATIONS.length; i++) {
				cal = Test.CALIBRATIONS[i];
				if (cal.running) {
					return true;
				}
				if (!cal.count) {
					cal.isCalibration = true;
					cal.onStop = onCalibrated;
					//cal.MIN_TIME = .1; // Do calibrations quickly
					cal.run(2e4);
					return true;
				}
			}
			return false;
		}
	});

	bnch.extend(Test.prototype, {
		// Initial number of iterations
		INIT_COUNT: 10,
		// Max iterations allowed (i.e. used to detect bad looping functions)
		MAX_COUNT: 1e9,
		// Minimum time a test should take to get valid results (secs)
		MIN_TIME: 0.5,

		// Callback invoked when test state changes
		onChange: bnch.F,

		// Callback invoked when test is finished
		onStop: bnch.F,

		// Reset test state
		reset: function() {
			delete this.count;
			delete this.error;
			delete this.period;
			delete this.running;
			delete this.time;
		},

		// Run the test (in a timeout). We use a timeout to make sure the browser has a chance to finish rendering any UI changes we’ve made, like updating the status message.
		run: function(count) {
			var me = this;
			count = count || me.INIT_COUNT;
			bnch.status(me.name + ' × ' + formatNumber(count));
			me.running = true;
			setTimeout(function() {
				me._run(count);
			}, 200);
		},

		// The nuts and bolts code that actually runs a test
		_run: function(count) {
			var me = this,
			    start,
			    f = me.f,
			    i = count,
			    x,
			    diff,
			    pow;

			// Make sure calibration tests have run
			if (!me.isCalibration && Test.calibrate(function() { me.run(count); })) {
				return;
			}

			me.error = null;

			if (window.init) {
				init();
			}

			try {

				start = new Date();
				while (i--) {
					f();
				}

				// Get time test took (in secs)
				diff = isNaN(Test.CALIBRATIONS[1].period) || isNaN(me.count) ? 0 : Test.CALIBRATIONS[1].period * me.count;
				me.time = Math.max(1, new Date() - start) / 1e3 - diff;

				// Store iteration count and per-operation time taken
				me.count = count;
				me.period = me.time / count;

				// Do we need to do another run?
				me.running = me.time <= me.MIN_TIME;

				// …if so, compute how many times we should iterate
				if (me.running) {
					// Bump the count to the nearest power of 2
					x = me.MIN_TIME / me.time;
					pow = Math.pow(2, Math.max(1, Math.ceil(Math.log(x) / Math.log(2))));
					count *= pow;
					if (count > me.MAX_COUNT) {
						throw new Error('Maximum count exceeded. If this test uses a looping function, make sure the iteration loop is working properly.');
					}
				}
			} catch (e) {
				// Exceptions are caught and displayed in the test UI
				me.reset();
				me.error = e;
			}

			me.onChange(me);

			// Figure out what to do next
			if (me.running) {
				me.run(count);
			} else {
				bnch.status('Done. Ready to run tests again');
				me.onStop(me);
			}

		}
	});

	// The public API for creating and running tests
	window.benchmark = {
		// The list of all tests that have been registered with benchmark.test
		_tests: [],
		// The queue of tests that need to run
		_queue: [],
		// The HTML elements that will hold the results
		elResults: [],

		// The parsed query parameters of the current page URL. This is provided as a convenience for test functions; it’s not used in the benchmarks */
		params: {},

		// Initialize
		_init: function() {
			// Parse query params into benchmark.params[] hash
			var hash,
			    hashes = location.href.slice(location.href.indexOf('#') + 1).split('&'),
			    i = hashes.length;
			this.params = {};
			if (hashes[0] !== location.href) {
				while (i--) {
					hash = hashes[i].split('=');
					this.params[hash[0]] = hash[1];
				}
			}
			return this;
		},

		// (Re)render all the test results
		renderAll: function() {
			for (var i = 0; i < benchmark._tests.length; i++) {
				benchmark.renderTest(benchmark._tests[i]);
			}
		},

		// (Re)render the results for a specific test
		renderTest: function(test) {

			var cell = bnch.$('results-' + test.id),
			    elError,
			    strError,
			    hz;

			if (test.error) {
				elError = bnch.$('error-info');
				strError = '<p>' + test.error + '.</p><ul><li>' + bnch.join(test.error, ': ', '</li><li>') + '</li></ul>';
				if (cell.className !== 'results error') {
					cell.className += ' error';
				}
				cell.innerHTML = 'Error';
				elError.className = 'show';
				// If this error message isn’t visible yet
				if (elError.innerHTML.indexOf(strError) === -1) {
					elError.innerHTML += strError;
				}
			} else {
				if (test.running) {
					cell.innerHTML = 'running…';
				} else if (bnch.indexOf(benchmark._queue, test) >= 0) {
					cell.innerHTML = 'pending…';
				} else if (test.count) {
					hz = Math.round(1 / test.period);
					cell.innerHTML = hz !== Infinity ? formatNumber(hz) : '∞';
					//arrHz.push({ i: test.id, o: hz });
					cell.title = 'Looped ' + formatNumber(test.count) + ' times in ' + test.time + ' seconds';
				} else {
					cell.innerHTML = 'ready';
				}
			}
		},

		// Create a new test
		test: function(name, id, f) {
			// Create the Test object
			var test = new Test(name, id, f),
			    elTitle = bnch.$('title-' + id);

			benchmark.elResults.push(bnch.$('results-' + id));
			benchmark._tests.push(test);

			elTitle.onclick = function() { benchmark._queueTest(test); };
			elTitle.onkeyup = function(e) {
				if (13 === e.keyCode) {
					e.preventDefault();
					elTitle.onclick.call(elTitle);
				}
			};
			elTitle.setAttribute('tabindex', 0);
			elTitle.title = 'Click to run this test again';

			// Re-render if the test state changes
			test.onChange = benchmark.renderTest;

			// Run the next test if this one finished
			test.onStop = function(test) {
				benchmark.currentTest = null;
				benchmark._nextTest();
			};

			// Render the new test
			this.renderTest(test);
		},

		// Add all tests to the run queue
		runAll: function(e) {
			e = e || window.event;
			bnch.$('run').innerHTML = 'Stop tests';
			var reverse = e && e.shiftKey,
			    len = benchmark._tests.length,
			    i;
			for (i = 0; i < len; i++) {
				benchmark._queueTest(benchmark._tests[!reverse ? i : (len - i - 1)]);
			}
		},

		// Remove all tests from the run queue. The current test has to finish on its own though
		stop: function() {
			bnch.$('run').innerHTML = 'Run tests';
			while (benchmark._queue.length) {
				var test = benchmark._queue.shift();
				benchmark.renderTest(test);
			}
		},

		// Run the next test in the run queue
		_nextTest: function() {
			if (!benchmark.currentTest) {
				var test = benchmark._queue.shift(),
				    i,
				    arrHz = [],
				    t,
				    el,
				    elSpan,
				    txt,
				    max,
				    ops;
				if (test) {
					benchmark.currentTest = test;
					test.run();
					benchmark.renderTest(test);
				} else {
					// All tests are finished
					bnch.$('run').innerHTML = 'Run tests again';
					i = benchmark._tests.length;
					_bTestResults = {};
					while (i--) {
						t = benchmark._tests[i];
						if (t.count) {
							ops = Math.round(1 / t.period);
							arrHz.push({ i: t.id, o: ops });
							_bTestResults[(t.name.match(/[a-z0-9]+/ig) || [t.id]).join(' ')] = ops;
						}
					}
					// Sort tests descending by number of operations (most ops / fastest first)
					arrHz.sort(function(a, b) {
						return b.o - a.o;
					});
					if (arrHz.length > 1) {
						max = arrHz[0].o;
						for (i = 0; i < arrHz.length; i++) {
							el = bnch.$('results-' + arrHz[i].i);
							t = (1 - arrHz[i].o / max) * 100;
							if (!i) { // i === 0
								el.className += ' fastest';
							} else if (i === arrHz.length - 1) {
								el.className += ' slowest';
							}
							txt = (t ? ~~t + '% slower' : 'fastest');
							elSpan = el.getElementsByTagName('span')[0];
							if (elSpan) {
								elSpan.innerHTML = txt;
							} else {
								el.innerHTML += ' <span>' + txt + '</span>';
							}
						}
						bnch.$('results-' + arrHz[0].i).className += ' fastest';
						bnch.$('results-' + arrHz[arrHz.length - 1].i).className += ' slowest';
						// Beacon the results to Browserscope.
						(function(d) {
							var _bScript = d.createElement('script');
							_bScript.src = 'http://www.browserscope.org/user/beacon/' + _bTestKey;
							_bScript.async = 1;
							d.body.appendChild(_bScript);
						}(document));
					}
				}
			}
		},

		// Add a test to the run queue
		_queueTest: function(test) {
			if (bnch.indexOf(benchmark._queue, test) >= 0) {
				return;
			}
			var elError = bnch.$('error-info'),
			    i = benchmark.elResults.length;
			elError.innerHTML = '';
			elError.className = '';
			while (i--) {
				if (benchmark.elResults[i].className !== 'results error') {
					benchmark.elResults[i].className = 'results';
				}
			}
			benchmark._queue.push(test);
			benchmark.renderTest(test);
			benchmark._nextTest();
		}

	};

	benchmark._init();

	window.onhashchange = function() {
		benchmark._init();
		if (window.init) {
			init();
		}
	};

}());

document.documentElement.className = 'js';
// Don’t let people alert / confirm / prompt / open new windows
window.alert = window.confirm = window.prompt = window.open = function() { };

window.onload = function() {

	// platformInfo() – see http://gist.github.com/465384
	function platformInfo() {
		var ua = navigator.userAgent,
		    os = 'Windows|iPhone OS|(Intel |PPC )?Mac OS X|Linux',
		    pOS = RegExp('((' + os + ') [^ );]*)').test(ua) ? RegExp.$1 : null,
		    pName = /(Chrome|MSIE|Safari|Opera|Firefox|Minefield)/.test(ua) ? RegExp.$1 : null,
		    pVersion = 'Opera' === pName ? opera.version() : (pName && RegExp('(Version|' + pName + ')[ \/]([^ ;]*)').test(ua)) ? RegExp.$2 : null;
		if (!pOS) {
			pOS = RegExp('((' + os + ')[^ );]*)').test(ua) ? RegExp.$1 : null;
		}
		return (pOS && pName && pVersion) ? pName + ' '	+ pVersion + ' on ' + pOS.replace(/_/g, '.') : 'unknown platform';
	}

	function id(x) {
		return document.getElementById(x);
	}

	var elRun = id('run'),
	    elError = document.createElement('div'),
	    elTable = id('test-table'),
	    elQuestion = id('question');

	if (elQuestion) {
		elQuestion.value = 'no';
	}

	elError.id = 'error-info';
	// Insert div#error-info after the test table
	elTable.parentNode.insertBefore(elError, elTable.nextSibling);

	// Show platform info
	id('user-agent').innerHTML = platformInfo();

	// Run button
	elRun.onclick = function(event) {
		if (this.innerHTML === 'Stop tests') {
			benchmark.stop();
		} else {
			benchmark.runAll(event);
		}
	};

	// Auto-run tests when the URL has #run appended
	if ('#run' === location.hash.substr(0, 4)) {
		elRun.onclick.call(elRun);
	}

	// Run init() if it’s defined
	if (window.init) {
		init();
	}

};

/*! Optimized asynchronous Google Analytics snippet: http://mathiasbynens.be/notes/async-analytics-snippet */
var _gaq = [['_setAccount', 'UA-6065217-40'], ['_trackPageview']];
(function(d, t) {
	var g = d.createElement(t),
	    s = d.getElementsByTagName(t)[0];
	g.async = 1;
	g.src = '//www.google-analytics.com/ga.js';
	s.parentNode.insertBefore(g, s);
}(document, 'script'));