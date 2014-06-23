# Contributing to Benchmark.js

If you’d like to contribute a feature or bug fix, you can [fork](https://help.github.com/articles/fork-a-repo) Benchmark.js, commit your changes, and [send a pull request](https://help.github.com/articles/using-pull-requests).
Please make sure to [search the issue tracker](https://github.com/bestiejs/benchmark.js/issues) first; your issue may have already been discussed or fixed in `master`.

## Tests

Include updated unit tests in the `test` directory as part of your pull request.

You can run the tests from the command line via `node test/test`, or open `test/index.html` in a web browser.
The `test/run-test.sh` script attempts to run the tests in [Rhino](https://developer.mozilla.org/en-US/docs/Rhino), [RingoJS](http://ringojs.org/), [PhantomJS](http://phantomjs.org/), and [Node](http://nodejs.org/), before running them in your default browser.

## Coding Guidelines

In addition to the following guidelines, please follow the conventions already established in the code.

- **Spacing**:<br>
  Use two spaces for indentation. No tabs.

- **Naming**:<br>
  Keep variable and method names concise and descriptive.

- **Quotes**:<br>
  Single-quoted strings are preferred to double-quoted strings; however, please use a double-quoted string if the value contains a single-quote character to avoid unnecessary escaping.

- **Comments**:<br>
  Please use single-line comments to annotate significant additions, and [JSDoc-style](http://www.2ality.com/2011/08/jsdoc-intro.html) comments for new methods.
