cd "$(dirname "$0")"

for cmd in phantomjs node; do
  echo "Testing in $cmd..."
  $cmd test.js
  echo ""
done

echo "Testing in a browser..."
open index.html
