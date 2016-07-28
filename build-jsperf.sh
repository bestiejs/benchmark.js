#! /bin/bash
#

pushd .
cd $( dirname "$0" )
cd example/jsperf

ls *.json5 > test-catalog.txt

#    npm run server
#
# would start the live-server and when you browse to /example/jsperf/ then every test page
# should list the entire set of available tests at the bottom of the page.
#

popd
