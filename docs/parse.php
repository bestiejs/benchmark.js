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
    $api = array();
    $openTag = "<!-- div -->";
    $closeTag = "<!-- /div -->";
    $result = array("# Benchmark.js API documentation", "");

    // load file and extract comment blocks
    $source = str_replace(PHP_EOL, "\n", file_get_contents($filepath));
    preg_match_all("#/\*(?![-!])[\s\S]*?\*/\s*[^=\n;]+#", $source, $entries);
    $entries = array_pop($entries);

    foreach($entries as $entry) {
      // parse flags
      $isCtor = strripos($entry, "@constructor") !== false;
      $isPrivate = strripos($entry, "@private") !== false;
      $isStatic = strripos($entry, "@static") !== false;

      // parse @member(s)
      preg_match("/@member ([^\n]+)/", $entry, $members);
      if ($members = array_pop($members)) {
        $members = preg_split("/,\s*/", $members);
      }
      if ($isCtor) {
        preg_match("#\*/\s*function ([^(]+)#", $entry, $name);
        $name = array_pop($name);
        if ($members) {
          $members = array($members[0] . '.' . $name);
        } else {
          $members = array($name);
        }
      }

      // skip private
      if ($isPrivate || !$members) {
        continue;
      }

      foreach($members as $member) {
        // find line number
        preg_match_all("/\n/", substr($source, 0, strrpos($source, $entry) + strlen($entry)), $lines);
        $lines = array_pop($lines);
        $ln = count($lines) + 1;

        // parse #{call}
        preg_match("@\*/\s*(?:function ([^(]*)|(?:". $member ."\.)?([^:=,]*))@", $entry, $call);
        if ($call = array_pop($call)) {
          $call = trim(trim($call), "'");
        }

        // parse #{name}
        preg_match("/@name ([^\n]+)/", $entry, $name);
        if (!($name = array_pop($name))) {
          $name = $call;
        }

        // set isStatic in cases where it isn't explicitly stated
        $oldStatic = $isStatic;
        if (!$isStatic && !$isCtor && preg_match("/[#.]/", $member)) {
          $parentMember = preg_replace("/[#.][^#.]+$/", "", $member);
          $parentAPI = $api[$parentMember]["plugin"];
          $ownMember = substr($member, strlen($parentMember) + 1);

          // if ownMember exits on its parent then its not a constructor and has static properties
          foreach ($parentAPI as $parentEntry) {
            if ($parentEntry["name"] == $ownMember) {
              $isStatic = true;
              break;
            }
          }
        }

        // parse #{type}
        preg_match("/@type ([^\n]+)/", $entry, $type);
        $type = array_pop($type);
        $type = $type ? $type : "Function";

        // parse #{desc}
        preg_match("#/\*\*([^@]+)#", $entry, $desc);
        if ($desc = array_pop($desc)) {
          $desc = preg_replace("/\n\s*\*\s*/", "\n", $desc);
          $desc = ($type == "Function" ? "" : "(" . $type . "): ") . trim($desc);
        }

        // parse @example
        preg_match("#@example([\s\S]*)?(?=\*\s\@[a-z]|\*/)#", $entry, $example);
        if ($example = array_pop($example)) {
          $example = "    " . trim(preg_replace("/\n\s*\* ?/", "\n    ", $example));
        }

        // parse @param
        preg_match_all("/@param \{([^}]+)\} (\[[^]]+\]|\w+) ([^\n]+)/", $entry, $args);
        array_shift($args);
        $args = array_filter($args);
        if (count($args)) {
          // compile "call"
          $call = array($call);
          // compile "args"
          foreach ($args as $arr) {
            foreach ($arr as $index => $value) {
              if (!is_array($args[0][$index])) {
                $args[0][$index] = array();
              }
              if (count($args[0][$index]) == 1) {
                $call[] = $value;
              }
              $args[0][$index][] = $value;
            }
          }
          // format "call"
          $call = array_shift($call) ."(". implode($call, ", ") .")";
          $call = str_replace(", [", " [, ", str_replace("], [", ", ", $call));

          // flatten "args"
          array_splice($args, 1);
          $args = array_pop($args);
        }

        // parse @returns
        preg_match("/@returns \{([^}]+)\} ([^*]+)/", $entry, $returns);
        array_shift($returns);
        if (count($returns)) {
          $returns = array_map("trim", $returns);
        }

        // define #{separator}
        if ($isCtor) {
          $separator = "";
        } else {
          $separator = !$isStatic && strpos($member, "#") === false ? "#" : ".";
        }

        // define #{hash}
        $hash = str_replace("#", ":", $member) . ($isCtor ? "" : ($isStatic ? "." : ":") . $name);

        // define #{link}
        $link = "https://github.com/mathiasbynens/benchmark.js/blob/master/benchmark.js#L" . $ln;

        // create entry
        $item = array(
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
          "returns"   => $returns,
          "type"      => $type
        );

        // create api category arrays
        if (!isset($api[$member]["ctor"])) {
          $api[$member]["ctor"] = array();
        }
        if (!isset($api[$member]["static"])) {
          $api[$member]["static"] = array();
        }
        if (!isset($api[$member]["plugin"])) {
          $api[$member]["plugin"] = array();
        }

        // append entry to api category
        if ($isCtor) {
          $api[$member]["ctor"] = array($item);
        } else if ($isStatic) {
          $api[$member]["static"][] = $item;
        } else {
          $api[$member]["plugin"][] = $item;
        }
        // reset isStatic
        $isStatic = $oldStatic;
      }
    }

    /*------------------------------------------------------------------------*/

    // sort classes
    ksort($api);
    foreach($api as &$object) {
      // make "plugin" the last type key
      ksort($object);
      $object["temp"] = $object["plugin"];
      unset($object["plugin"]);
      $object["plugin"] = $object["temp"];
      unset($object["temp"]);

      // sort entries
      foreach($object as &$entries) {
        $sortByA = array();
        $sortByB = array();
        $sortByC = array();
        foreach($entries as $entry) {
          // functions w/o ALL-CAPs names are last
          $sortByA[] = $entry["type"] == "Function" && !preg_match("/^[A-Z_]+$/", $entry["name"]) ? 1 : 0;
          // ALL-CAPs properties first
          $sortByB[] = preg_match("/^[A-Z_]+$/", $entry["name"]);
          // alphanumerically
          $sortByC[] = $entry["name"];
        }
        array_multisort($sortByA, SORT_ASC,  $sortByB, SORT_DESC, $sortByC, SORT_ASC, $entries);
        unset($entries);
      }
      unset($object);
    }

    /*------------------------------------------------------------------------*/

    // move object entries into the top of their own api category
    foreach($api as $member => &$object) {
      if (preg_match("/[#.]/", $member)) {
        $parentMember = preg_replace("/[#.][^#.]+$/", "", $member);
        $parentType = substr(substr($member, strlen($parentMember)), 0, 1) == "#" ? "plugin" : "static";
        $parentAPI = &$api[$parentMember];
        $ownMember = substr($member, strlen($parentMember) + 1);

        foreach ($parentAPI[$parentType] as $index => $parentEntry) {
          if ($parentEntry["name"] == $ownMember) {
            array_unshift($object["static"], $parentEntry);
            unset($parentAPI[$parentType][$index]);
          }
        }
      }
      unset($object, $parentAPI);
    }

    /*------------------------------------------------------------------------*/

    // compile TOC
    $started = false;
    $result[] = $openTag;

    foreach($api as $member => $object) {
      foreach($object as $type => $entries) {
        if (count($entries)) {
          if ($type == "ctor") {
            if ($started) {
              $result[] = $closeTag;
            }
            $started = true;
            array_push($result, $openTag, "## `" . $member . "`", interpolate("* [`#{member}`](##{hash})", $entries[0]));
          }
          else {
            if ($type == "plugin") {
              if ($started) {
                $result[] = $closeTag;
              }
              $started = true;
              array_push($result, $openTag, "## `" . $member . ".prototype`");
            }
            foreach($entries as $entry) {
              $result[] = interpolate("* [`#{member}#{separator}#{name}`](##{hash})", $entry);
            }
          }
        }
      }
    }
    array_push($result, $closeTag, $closeTag, "", "");

    /*------------------------------------------------------------------------*/

    // compile content
    $started = false;
    $result[] = $openTag;

    foreach($api as $member => $object) {
      foreach($object as $type => $entries) {
        // title
        if (count($entries)) {
          if ($type == "ctor") {
            if ($started) {
              array_pop($result);
              array_push($result, $closeTag, "", "");
            }
            $started = true;
            array_push($result, $openTag, "## `" . $member . "`");
          }
          else if ($type == "plugin") {
            if ($started) {
              array_pop($result);
              array_push($result, $closeTag, "", "");
            }
            $started = true;
            array_push($result, $openTag, "## `" . $member . ".prototype`");
          }
        }
        // body
        foreach($entries as $entry) {
          array_push($result, $openTag);

          // description
          if ($entry["name"]) {
            if ($type == "ctor") {
              // clip "call"
              $entry["call"] = substr($entry["call"], strpos($entry["call"], "("));
              $result[] = interpolate(
                "### <a id=\"#{hash}\" href=\"#{link}\" title=\"View in source\">`" .
                "#{member}#{call}`</a>\n#{desc}\n[&#9650;][1]", $entry);
            } else {
              $result[] = interpolate(
                "### <a id=\"#{hash}\" href=\"#{link}\" title=\"View in source\">`" .
                "#{member}#{separator}#{call}`</a>\n#{desc}\n[&#9650;][1]", $entry);
            }
          }
          // @param
          if (count($entry["args"])) {
            array_push($result, "", "#### Arguments");
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
          if (count($entry["returns"])) {
            array_push($result, "", "#### Returns", interpolate("(#{type}): #{desc}", array(
              "desc" => $entry["returns"][1],
              "type" => $entry["returns"][0]
            )));
          }
          // @example
          if ($entry["example"]) {
            array_push($result, "", "#### Example", $entry["example"]);
          }
          array_push($result, $closeTag, "");
        }
      }
    }

    // close tags add TOC link reference
    array_pop($result);
    array_push($result, $closeTag, $closeTag, "", "  [1]: #readme \"Jump back to the TOC.\"");

    // cleanup whitespace
    return trim(preg_replace("/ +\n/", "\n", join($result, "\n")));
  }

  /*--------------------------------------------------------------------------*/

  // cleanup requested filepath
  $_GET["f"] = @$_GET["f"] ? $_GET["f"] : "benchmark";
  $_GET["f"] = preg_replace("#(\.*[\/])+#", "", $_GET["f"]);
  $_GET["f"] = array_shift(preg_split("/\./", $_GET["f"]));

  // generate markdown
  $content = parse("../" . $_GET["f"] . ".js");

  // save it to a .md file
  file_put_contents(basename($_GET["f"]) . ".md", $content);

  // print
  echo $content . PHP_EOL;

?>