<?php

  header('Content-Type: text/plain;charset=utf-8');

  /**
   * Modify a string by replacing named tokens with matching assoc. array values.
   * @param {String} string The string to modify.
   * @param {Array} assoc The template assoc. array.
   * @returns {String} The modified string.
   */
  function interpolate($string, $assoc) {
    foreach($assoc as $key=>$value) {
      $string = preg_replace("/#\{" . $key . "\}/", trim((string) $value), $string);
    }
    return format($string);
  }

  /**
   * Performs common string formatting operations.
   * @param {String} $string The string to format.
   * @returns {String} The formatted string.
   */
  function format($string) {
    // mark numbers as code and italicize parentheses
    return trim(preg_replace("/(^|\s)(\([^)]+\))/", "$1*$2*",
      preg_replace("/ (-?\d+(?:.\d+)?)(?!\.[^\n])/", " `$1`", $string)));
  }

  /**
   * Parses the jsdoc comments into a markdown file.
   * @param {String} $filepath The relative path to the .js file.
   * @returns {String} The generated markdown.
   */
  function parse($filepath) {
    $result  = array();
    $statics = array();
    $plugins = array();

    // load file and extract comment blocks
    $source = str_replace(PHP_EOL, "\n", file_get_contents($filepath));
    preg_match_all("#/\*(?![-!])[\s\S]*?\*/\s*[^=\n;]+#", $source, $entries);
    $entries = array_pop($entries);

    foreach($entries as $entry) {
      // parse flags
      $isPrivate = strripos($entry, "@private") !== false;
      $isStatic = strripos($entry, "@static") !== false;

      // parse @member
      preg_match("/@member ([^\n]+)/", $entry, $member);
      $member = array_pop($member);

      // skip private
      if ($isPrivate || !$member) {
        continue;
      }

      // find line number
      preg_match_all("/\n/", substr($source, 0, strrpos($source, $entry) + strlen($entry)), $lines);
      $lines = array_pop($lines);
      $ln = count($lines) + 1;

      // parse #{call}
      preg_match("#\*/\s*(?:function ([^{]*)|(?:Benchmark\.)?([^:=,]*))#", $entry, $call);
      $call = array_pop($call);
      if ($call) {
        $call = trim(trim($call), "'");
      }

      // parse #{name}
      preg_match("/^[^(]+/", (string) $call, $name);
      $name = array_pop($name);
      if ($name) {
        $name = trim($name);
      }

      // parse #{type}
      preg_match("/@type ([^\n]+)/", $entry, $type);
      $type = array_pop($type);
      $type = $type ? $type : "Function";

      // parse #{desc}
      preg_match("#/\*\*([^@]+)#", $entry, $desc);
      $desc = array_pop($desc);
      if ($desc) {
        $desc = preg_replace("/\n\s*\*\s*/", "\n", $desc);
        $desc = ($type == "Function" ? "" : "(" . $type . "): ") . trim($desc);
      }

      // parse @example
      preg_match("#@example([\s\S]*)?(?=\*\s\@[a-z]|\*/)#", $entry, $example);
      $example = array_pop($example);
      if ($example) {
        $example = "    " . trim(preg_replace("/\n\s*\* ?/", "\n    ", $example));
      }

      // parse @param
      preg_match_all("/@param \{([^}]+)\} (\[[^]]+\]|\w+) ([^\n]+)/", $entry, $args);
      array_shift($args);
      $args = array_filter($args);
      if (!empty($args)) {
        foreach ($args as $arr) {
          foreach ($arr as $index => $value) {
            if (!is_array($args[0][$index])) {
              $args[0][$index] = array();
            }
            $args[0][$index][] = $value;
          }
        }
        array_splice($args, 1);
        $args = array_pop($args);
      }

      // parse @returns
      preg_match("/@returns \{([^}]+)\} ([^*]+)/", $entry, $returns);
      array_shift($returns);
      if (!empty($returns)) {
        $returns = array_map("trim", $returns);
      }

      // define #{hash}
      $hash = ($isStatic ? "static-" : "") . $name;

      // define #{link}
      $link = "https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L" . $ln;

      // define #{separator}
      $separator = !$isStatic && strpos($member, "#") === false ? "#" : ".";

      // append entry to api collection
      $entry = array(
        "args"      => $args,
        "call"      => $call,
        "desc"      => $desc,
        "example"   => $example,
        "hash"      => $hash,
        "link"      => $link,
        "ln"        => $ln,
        "name"      => $name,
        "member"    => $member,
        "separator" => $separator,
        "static"    => $isStatic,
        "returns"   => $returns,
        "type"      => $type
      );
      if ($isStatic) {
        $statics[] = $entry;
      } else {
        $plugins[] = $entry;
      }
    }

    /*------------------------------------------------------------------------*/

    $apis = array(&$statics, &$plugins);

    // sort
    foreach($apis as &$api) {
      $sortByA = array();
      $sortByB = array();
      $sortByC = array();
      foreach($api as $entry) {
        $sub = array_pop(preg_split("/#/", $entry["member"]));
        // functions last
        $sortByA[] = $entry["type"] == "Function" ? 1 : 0;
        // group sub-object properties together
        $sortByB[] = ($sub != $entry["member"] ? $sub : "") . $entry["name"];
        // capitalized / ALL-CAPS properties first
        $sortByC[] = preg_match("/^[A-Z]/", $entry["name"]);
      }
      array_multisort($sortByA, SORT_ASC,  $sortByB, SORT_ASC, $sortByC, SORT_DESC, $api);
      unset($api);
    }

    /*------------------------------------------------------------------------*/

    // compile TOC
    foreach($apis as $api) {
      // title
      $result[] = "";
      $result[] = "# " . $api[0]["member"] . ($api[0]["static"] ? "" : ".prototype");

      // push to output
      foreach($api as $entry) {
        $result[] = interpolate("* [`#{member}#{separator}#{name}`](##{hash})", $entry);
      }
    }

    /*------------------------------------------------------------------------*/

    // compile content
    foreach($apis as $api) {
      // title
      $result[] = "";
      $result[] = "# " . $api[0]["member"] . ($api[0]["static"] ? "" : ".prototype");

      // push to output
      foreach($api as $entry) {
        // description
        if ($entry["name"]) {
          $result[] = interpolate(
            "## <a name=\"#{hash}\" href=\"#{link}\" title=\"View in source\">" .
            "#{member}#{separator}#{call}</a>\n#{desc}\n<sup><code>[&#9650;][1]</code></sup>", $entry);
        }
        // @param
        if (!empty($entry["args"])) {
          $result[] = "";
          $result[] = "### Arguments";
          foreach ($entry["args"] as $index => $arr) {
            $result[] = interpolate("#{num}. `#{name}` (#{type}): #{desc}", array(
              "desc" => $arr[2],
              "name" => $arr[1],
              "num"  => $index + 1,
              "type" => $arr[0]
            ));
          }
        }
        // @returns
        if (!empty($entry["returns"])) {
          $result[] = "";
          $result[] = "### Returns";
          $result[] = interpolate("(#{type}): #{desc}", array(
            "desc" => $entry["returns"][1],
            "type" => $entry["returns"][0]
          ));
        }
        // @example
        if ($entry["example"]) {
          $result[] = "";
          $result[] = "### Example";
          $result[] = $entry["example"];
        }
        $result[] = "";
      }
    }
    // add TOC link reference
    $result[] = "";
    $result[] = "  [1]: #readme \"Jump back to the TOC.\"";

    return trim(preg_replace("/ +\n/", "\n", join($result, "\n")));
  }

  /*--------------------------------------------------------------------------*/

  // cleanup requested filepath
  $_GET["f"] = @$_GET["f"] ? $_GET["f"] : "benchmark";
  $_GET["f"] = preg_replace("#^(\.*[\/])+#", "", $_GET["f"]);
  $_GET["f"] = array_shift(preg_split("/\./", $_GET["f"]));

  // generate markdown
  $content = parse($_GET["f"] . ".js");

  // save it to a .md file
  file_put_contents("docs/" . basename($_GET["f"]) . ".md", $content);

  // print
  echo $content . PHP_EOL;

?>