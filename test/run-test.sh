cd "$(dirname "$0")"
for cmd in rhino narwhal ringo phantomjs node; do
	echo ""
	echo "Testing in $cmd..."
	$cmd test.js
done
echo ""
echo "Testing in a browser..."
open index.html
