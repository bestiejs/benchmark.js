module("getPlatform()");

test("user agent detection", function() {

  var getPlatform = (function() {
    var reduce = Benchmark.reduce,
        toString = {}.toString,
        compiled = Function('reduce,toString,ua,external,mode,opera',
                   String(Benchmark.getPlatform)
                   .replace(/ua\s*=[^,]+,/,'')
                   .replace(/version\s*=[^,]+,/,'version=opera,')
                   .replace(/window\.external/g,'external')
                   .replace(/doc\.documentMode/g, 'mode') +
                   'return getPlatform()');

    return function(options) {
      return compiled(reduce, toString, options.ua, options.external, options.mode, options.opera);
    };
  }());

  var Tests = {
    'Firefox 3.6.11 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.11) Gecko/20101012 Firefox/3.6.11 (.NET CLR 3.5.30729)',
    },

    'IE 8.0 on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
    },

    'IE 8.0 (running as IE 7.0) on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0)',
      'mode': 7
    },

    'IE 9.0 (running as IE 8.0) on Windows 7': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/5.0)',
      'desc': 'IE 9.0 (running as IE 8.0) on Windows 7',
      'mode': 8
    },

    'IE 9.0 (platform preview running as IE 5.0) on Windows 7': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 5.0; Windows NT 6.1; Trident/5.0)',
      'external': null,
      'mode': 5
    },

    'Opera 11.00 on Windows XP': {
      'ua': 'Opera/9.80 (Windows NT 5.1; U; en) Presto/2.6.37 Version/11.00',
      'opera': '11.00'
    }
  };

  for (var i in Tests) {
    equals(String(getPlatform(Tests[i])), i, i);
  }
});
