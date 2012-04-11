(function(window, document) {

  /**
   * Shortcut for document.getElementById().
   * @private
   * @param {Element|String} id The id of the element to retrieve.
   * @returns {Element} The element, if found, or null.
   */
  function $(id) {
    return typeof id == 'string' ? document.getElementById(id) : id;
  }

  /**
   * Registers an event listener.
   * @private
   * @param {Element} element The element.
   * @param {String} eventName The name of the event to listen to.
   * @param {Function} handler The event handler.
   * @returns {Element} The element.
   */
  function addListener(element, eventName, handler) {
    if ((element = $(element))) {
      if (typeof element.addEventListener != 'undefined') {
        element.addEventListener(eventName, handler, false);
      } else if (typeof element.attachEvent != 'undefined') {
        element.attachEvent('on' + eventName, handler);
      }
    }
    return element;
  }

  function escape2(s) {
    s = s.replace(/,/g, '\\,');
    s = querystring ? querystring.escape(s) : escape(s);
    s = s.replace(/\+/g, '%2b');
    s = s.replace(/ /g, '+');
    return s;
  }

  // Convert x to a readable string version
  function humanize(x, sd) {
    var ax = Math.abs(x), res;
    sd = sd | 4;  // significant digits
    if (ax == Infinity) {
      res = ax > 0 ? 'Infinity' : '-Infinity';
    } else if (ax > 1e9) {
      res = sig(x/1e9, sd) + 'G';
    } else if (ax > 1e6) {
      res = sig(x/1e6, sd) + 'M';
    } else if (ax > 1e3) {
      res = sig(x/1e3, sd) + 'k';
    } else if (ax > .01) {
      res = sig(x, sd);
    } else if (ax > 1e-3) {
      res = sig(x/1e-3, sd) + 'm';
    } else if (ax > 1e-6) {
      res = sig(x/1e-6, sd) + '\u00b5'; // Greek mu
    } else if (ax > 1e-9) {
      res = sig(x/1e-9, sd) + 'n';
    } else {
      res = x ? sig(x, sd) : 0;
    }
    // Turn values like "1.1000000000005" -> "1.1"
    res = (res + '').replace(/0{5,}\d*/, '');

    return res;
  }

    /**
    * Generate a Google Chart URL that shows the data for all tests
    */
  function getGoogleChart(normalize) {
    var title = 'ops/sec on ' + Benchmark.platform.
    var n = tests.length, markers = [], data = [];
    var d, min = 0, max = -1e10;

    // Gather test data

    var markers = map(tests, function(test, i) {
      if (test.count) {
        var hz = test.getHz();
        var v = hz != Infinity ? hz : 0;
        data.push(v);
        var label = test.name + '(' + humanize(hz)+ ')';
        var marker = 't' + escape2(label) + ',000000,0,' + i + ',10';
        max = Math.max(v, max);

        return marker;
      }
    });

    if (markers.length <= 0) return null;

    // Build labels
    var labels = [humanize(min), humanize(max)];

    var w = 250, bw = 15;
    var bs = 5;
    var h = markers.length*(bw + bs) + 30 + chart_title.length*20;

    var params = {
      chtt: escape(chart_title.join('|')),
      chts: '000000,10',
      cht: 'bhg',                     // chart type
      chd: 't:' + data.join(','),     // data set
      chds: min + ',' + max,          // max/min of data
      chxt: 'x',                      // label axes
      chxl: '0:|' + labels.join('|'), // labels
      chsp: '0,1',
      chm: markers.join('|'),         // test names
      chbh: [bw, 0, bs].join(','),    // bar widths
      // chf: 'bg,lg,0,eeeeee,0,eeeeee,.5,ffffff,1', // gradient
      chs: w + 'x' + h
    };

    var url = 'http://chart.apis.google.com/chart?' + join(params);

    return url;
  }



    /**
     * (Re)render all the test results
     */
    renderAll: function() {
      for (var i = 0; i < JSLitmus._tests.length; i++)
        JSLitmus.renderTest(JSLitmus._tests[i]);
      JSLitmus.renderChart();
    },

    /**
     * (Re)render the chart graphics
     */
    renderChart: function() {
      var url = getGoogleChart();
      $('jsl-chart-link').href = url;
      $('jsl-chart-image').src = url;
      $('jsl-chart').style.display = '';
      $('jsl-tinyurl').src = 'http://tinyurl.com/api-create.php?url=' + escape(url);
    },

    /**
     * (Re)render the results for a specific test
     */
    renderTest: function(test) {
      // Make a new row if needed
      if (!test._row) {
        var trow = jsl.$('test_row_template');
        if (!trow) return;

        test._row = trow.cloneNode(true);
        test._row.style.display = '';
        test._row.id = '';
        test._row.onclick = function() {JSLitmus._queueTest(test);};
        test._row.title = 'Run ' + test.name + ' test';
        trow.parentNode.appendChild(test._row);
        test._row.cells[0].innerHTML = test.name;
      }

      var cell = test._row.cells[1];
      var cns = [test.loopArg ? 'test_looping' : 'test_nonlooping'];

      if (test.error) {
        cns.push('test_error');
        cell.innerHTML =
        '<div class="error_head">' + test.error + '</div>' +
        '<ul class="error_body"><li>' +
          jsl.join(test.error, ': ', '</li><li>') +
          '</li></ul>';
      } else {
        if (test.running) {
          cns.push('test_running');
          cell.innerHTML = 'running';
        } else if (jsl.indexOf(JSLitmus._queue, test) >= 0) {
          cns.push('test_pending');
          cell.innerHTML = 'pending';
        } else if (test.count) {
          cns.push('test_done');
          var hz = test.getHz(jsl.$('test_normalize').checked);
          cell.innerHTML = hz != Infinity ? hz : '&infin;';
          cell.title = 'Looped ' + test.count + ' times in ' + test.time + ' seconds';
        } else {
          cell.innerHTML = 'ready';
        }
      }
      cell.className = cns.join(' ');
    },

    function test(name, fn) {
      var bench = Benchmark({
        'fn': fn,
        'name': name,
        'onCycle': renderTest
      });
      suit.add(bench);
      renderTest(bench);
    }

    function runAll(event) {
      event || (event = window.event);
      suite.abort();
      suite.length = 0;

      var benchmarks = suite.benchmarks;
      ui.push.apply(ui, filter(event.shiftKey ? benchmarks.reverse() : benchmarks, function(bench) {
          return !bench.error && bench.reset();
        }));
        ui.run(runOptions);
      }

    }

    function stop() {
      suite.abort();
    }


  /*--------------------------------------------------------------------------*/

  addListener(window, 'load', function() {
    var container = $('jslitmus_container') || document.body.appendChild(document.createElement('div'));
    container.innerHTML =
      '\uFEFF' +
      '<style>' +
        '#jsl{font-family:sans-serif;font-size:12px}' +
        '#jsl a{text-decoration:none}' +
        '#jsl a:hover{text-decoration:underline}' +
        '#jsl a img{border:none}' +
        '#jsl-chart{margin:10px 0;width:250px}' +
        '#jsl-chart img {border:solid 1px #ccc;margin-bottom:5px}' +
        '#jsl-credit{font-size:10px;color:#888;margin-top:8px}' +
        '#jsl-platform{color:#444;text-align:center}' +
        '#jsl-results{margin-top:10px;font-size:12px;font-family:sans-serif;border-collapse:collapse;border-spacing:0}' +
        '#jsl-results th,#jsl-results td{border:solid 1px #ccc;vertical-align:top;padding:3px}' +
        '#jsl-results th{vertical-align:bottom;background-color:#ccc;padding:1px;font-size:10px}' +
        '#jsl-results .jsl-test-done{text-align:right;font-family:monospace}' +
        '#jsl-results .jsl-test-error{color:#600}' +
        '#jsl-results .jsl-test-error-head{font-weight:bold}' +
        '#jsl-results .jsl-test-error-body{font-size:85%}' +
        '#jsl-results .jsl-test-name{white-space:nowrap}' +
        '#jsl-results .jsl-test-row{color:#006;cursor:pointer}' +
        '#jsl-results .jsl-test-row:hover td{background-color:#ffc;text-decoration:underline}' +
        '#jsl-results .jsl-test-running{font-style:italic}' +
        '#jsl-status{margin-top:10px;font-size:10px;color:#888}' +
        '#jsl-tinyurl{height:40px;width:250px}' +
      '</style>' +
      '<div id="jsl">' +
        '<button>Run Tests</button>' +
        '<button disabled="disabled">Stop Tests</button>' +
        '<br><br>' +
        '<table id="jsl-results">' +
          '<colgroup><col><col width="100"></colgroup>' +
          '<tr><th id="jsl-platform" colspan="2">' + platform + '</th></tr>' +
          '<tr><th>Test</th><th>Ops/sec</th></tr>' +
          '<tr id="jsl-row-template" class="jsl-test-row" style="display:none">' +
            '<td class="jsl-test-name"></td><td class="jsl-test-result">Ready</td>' +
          '</tr>' +
        '</table>' +
        '<div id="jsl-status"></div>' +
        '<div id="jsl-chart" style="display:none">' +
        '<a id="jsl-chart-link" target="_blank"><img id="jsl-chart-image"></a>' +
        'bit.ly (for chart): ' +
        '<iframe id="jsl-tinyurl" frameBorder="0" scrolling="no" src=""></iframe>' +
        '</div>' +
        '<a id="jsl-credit" title="benchmarkjs.com" href="http://benchmarkjs.com" target="_blank">Powered by Benchmark.js</a>' +
      '</div>';

    addListener(container, '');
  });

  /*--------------------------------------------------------------------------*/

  // expose
  extend(window.jslitmus = { }, {
    'Test': Benchmark,
    'platform': platform,
    'test': test,
    'runAll': runAll,
    'getGoogleChart': getGoogleChart
  });

  if (document) {
    extend(window.JSLitmus = { }, {
      'renderAll': renderAll,
      'renderChart': renderChart,
      'renderTest': renderTest,
      'test': test,
      'runAll': runAll,
      'stop': stop,
      'chartUrl': getGoogleChart
    });
  }

  /*--------------------------------------------------------------------------*/

  // expose Deferred, Event and Suite
  extend(Benchmark, {
    'Deferred': Deferred,
    'Event': Event,
    'Suite': Suite
  });

  // expose Benchmark
  if (freeExports) {
    // in Node.js or RingoJS v0.8.0+
    if (typeof module == 'object' && module && module.exports == freeExports) {
      (module.exports = Benchmark).Benchmark = Benchmark;
    }
    // in Narwhal or RingoJS v0.7.0-
    else {
      freeExports.Benchmark = Benchmark;
    }
  }
  // via curl.js or RequireJS
  else if (freeDefine) {
    define('benchmark', function() {
      return Benchmark;
    });
  }
  // in a browser or Rhino
  else {
    // use square bracket notation so Closure Compiler won't munge `Benchmark`
    // http://code.google.com/closure/compiler/docs/api-tutorial3.html#export
    window['Benchmark'] = Benchmark;
  }

}(this, this.document));