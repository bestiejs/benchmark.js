module.exports = function(grunt) {

  var commandOptions = {
    'stdout': true,
    'stderr': true,
    'failOnError': true
  };

  grunt.initConfig({
    'meta': {
      'testFile': 'test/test.js'
    },
    'shell': {
      'options': {
        'stdout': true,
        'stderr': true,
        'failOnError': true
      },
      'cover': {
        'command': 'istanbul cover --report "html" --verbose --dir "coverage" "<%= meta.testFile %>"'
      },
      'test-rhino': {
        'command': 'echo "Testing in Rhino..."; rhino -opt -1 "test.js"',
        'options': {
          'execOptions': {
            'cwd': 'test'
          }
        }
      },
      'test-rhino-require': {
        'command': 'echo "Testing in Rhino with -require..."; rhino -opt -1 -require "test.js"',
        'options': {
          'execOptions': {
            'cwd': 'test'
          }
        }
      },
      'test-ringo': {
        'command': 'echo "Testing in Ringo..."; ringo -o -1 "<%= meta.testFile %>"'
      },
      'test-phantomjs': {
        'command': 'echo "Testing in PhantomJS..."; phantomjs "<%= meta.testFile %>"'
      },
      'test-narwhal': {
        'command': 'echo "Testing in Narwhal..."; export NARWHAL_OPTIMIZATION=-1; narwhal "<%= meta.testFile %>"'
      },
      'test-node': {
        'command': 'echo "Testing in Node..."; node "<%= meta.testFile %>"'
      },
      'test-browser': {
        'command': 'echo "Testing in a browser..."; open "test/index.html"'
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('cover', 'shell:cover');
  grunt.registerTask('test', [
    'shell:test-rhino',
    'shell:test-rhino-require',
    'shell:test-ringo',
    'shell:test-phantomjs',
    'shell:test-narwhal',
    'shell:test-node',
    'shell:test-browser'
  ]);

  grunt.registerTask('default', [
    'shell:test-node',
    'cover'
  ]);

};
