<?php

  // cleanup requested file path
  $filePath = isset($_GET['f']) ? $_GET['f'] : 'benchmark';
  $filePath = preg_replace('#(\.*[\/])+#', '', $filePath);
  $filePath .= preg_match('/\.[a-z]+$/', $filePath) ? '' : '.js';

  // output filename
  if (isset($_GET['o'])) {
    $outputName = $_GET['o'];
  } else if (isset($_SERVER['argv'][1])) {
    $outputName = $_SERVER['argv'][1];
  } else {
    $outputName = basename($filePath);
  }

  /*--------------------------------------------------------------------------*/

  require('../vendor/docdown/docdown.php');

  // get package version
  $version = json_decode(file_get_contents('../package.json'))->version;

  // generate Markdown
  $markdown = docdown(array(
    'path'  => '../' . $filePath,
    'title' => '<a href="http://benchmarkjs.com/">Benchmark.js</a> <sup>v' . $version . '</sup>',
    'url'   => 'https://github.com/bestiejs/benchmark.js/blob/master/benchmark.js'
  ));

  // save to a .md file
  file_put_contents($outputName . '.md', $markdown);

  // print
  header('Content-Type: text/plain;charset=utf-8');
  echo $markdown . PHP_EOL;

?>
