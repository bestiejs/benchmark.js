((window, undefined_) ->
  Benchmark = (name, fn, options) ->
    me = this
    return new Benchmark(name, fn, options)  if me and me.constructor isnt Benchmark
    if isClassOf(name, "Object")
      options = name
    else if isClassOf(name, "Function")
      options = fn
      fn = name
    else if isClassOf(fn, "Object")
      options = fn
      fn = null
      me.name = name
    else
      me.name = name
    setOptions me, options
    me.id or (me.id = ++counter)
    not me.fn? and (me.fn = fn)
    me.stats = extend({}, me.stats)
    me.times = extend({}, me.times)
  Deferred = (bench) ->
    me = this
    return new Deferred(bench)  if me and me.constructor isnt Deferred
    me.benchmark = bench
    clock me
  Event = (type) ->
    me = this
    (if (me and me.constructor isnt Event) then new Event(type) else (if (type instanceof Event) then type else extend(me, (if typeof type is "string" then type: type else type))))
  Suite = (name, options) ->
    me = this
    return new Suite(name, options)  if me and me.constructor isnt Suite
    if isClassOf(name, "Object")
      options = name
    else
      me.name = name
    setOptions me, options
  concat = ->
    value = undefined
    j = -1
    length = arguments.length
    result = slice.call(this)
    index = result.length
    while ++j < length
      value = arguments[j]
      if isClassOf(value, "Array")
        k = 0
        l = value.length

        while k < l
          result[index] = value[k]  if k of value
          k++
          index++
      else
        result[index] = value
    result
  insert = (start, deleteCount, elements) ->
    deleteEnd = start + deleteCount
    elementCount = (if elements then elements.length else 0)
    index = start - 1
    length = start + elementCount
    object = this
    result = []
    tail = slice.call(object, deleteEnd)
    while ++index < deleteEnd
      if index of object
        result[index - start] = object[index]
        delete object[index]
    index = start - 1
    object[index] = elements[index - start]  while ++index < length
    start = index--
    length = (object.length >>> 0) - deleteCount + elementCount
    while ++index < length
      if (index - start) of tail
        object[index] = tail[index - start]
      else
        delete object[index]
    deleteCount = (if deleteCount > elementCount then deleteCount - elementCount else 0)
    delete object[length + deleteCount]  while deleteCount--
    object.length = length
    result
  reverse = ->
    upperIndex = undefined
    value = undefined
    index = -1
    object = Object(this)
    length = object.length >>> 0
    middle = floor(length / 2)
    if length > 1
      while ++index < middle
        upperIndex = length - index - 1
        value = (if upperIndex of object then object[upperIndex] else uid)
        if index of object
          object[upperIndex] = object[index]
        else
          delete object[upperIndex]
        unless value is uid
          object[index] = value
        else
          delete object[index]
    object
  shift = ->
    insert.call(this, 0, 1)[0]
  slice = (start, end) ->
    index = -1
    object = Object(this)
    length = object.length >>> 0
    result = []
    start = toInteger(start)
    start = (if start < 0 then max(length + start, 0) else min(start, length))
    start--
    end = (if not end? then length else toInteger(end))
    end = (if end < 0 then max(length + end, 0) else min(end, length))
    result[index] = object[start]  if start of object  while (++index
    ++start
    ) < end
    result
  splice = (start, deleteCount) ->
    object = Object(this)
    length = object.length >>> 0
    start = toInteger(start)
    start = (if start < 0 then max(length + start, 0) else min(start, length))
    deleteCount = min(max(toInteger(deleteCount), 0), length - start)
    insert.call object, start, deleteCount, slice.call(arguments, 2)
  toInteger = (value) ->
    value = +value
    (if value is 0 or not isFinite(value) then value or 0 else value - (value % 1))
  unshift = ->
    object = Object(this)
    insert.call object, 0, 0, arguments
    object.length
  call = (options) ->
    options or (options = {})
    fn = options.fn
    (not options.async and fn or ->
      bench = options.benchmark
      ids = bench._timerIds or (bench._timerIds = [])
      index = ids.length
      ids.push setTimeout(->
        ids.splice index, 1
        ids.length or delete bench._timerIds

        fn()
      , bench.delay * 1e3)
    )()
  createFunction = ->
    createFunction = (args, body) ->
      anchor = (if freeDefine then define.amd else Benchmark)
      prop = uid + "createFunction"
      runScript (if freeDefine then "define.amd." else "Benchmark.") + prop + "=function(" + args + "){" + body + "}"
      [anchor[prop], delete anchor[prop]][0]

    createFunction = (if has.browser and (createFunction("", "return\"" + uid + "\"") or noop)() is uid then createFunction else Function)
    createFunction.apply null, arguments
  forProps = ->
    forShadowed = undefined
    skipSeen = undefined
    forArgs = true
    shadowed = [ "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf" ]
    ((enumFlag, key) ->
      Klass = ->
        @valueOf = 0
      Klass::valueOf = 0
      for key of new Klass
        enumFlag += (if key is "valueOf" then 1 else 0)
      for key of arguments
        key is "0" and (forArgs = false)
      skipSeen = enumFlag is 2
      forShadowed = not enumFlag
    ) 0
    forProps = (object, callback, options) ->
      options or (options = {})
      ctor = undefined
      key = undefined
      keys = undefined
      skipCtor = undefined
      done = not object
      result = [ object, object = Object(object) ][0]
      which = options.which
      allFlag = which is "all"
      fn = callback
      index = -1
      iteratee = object
      length = object.length
      ownFlag = allFlag or which is "own"
      seen = {}
      skipProto = isClassOf(object, "Function")
      thisArg = options.bind
      object = Object(object)
      if thisArg isnt `undefined`
        callback = (value, key, object) ->
          fn.call thisArg, value, key, object
      if allFlag and has.getAllKeys
        index = 0
        keys = getAllKeys(object)
        length = keys.length

        while index < length
          key = keys[index]
          break  if callback(object[key], key, object) is false
          index++
      else
        for key of object
          break  if done = not (skipProto and key is "prototype") and not (skipSeen and (hasKey(seen, key) or not (seen[key] = true))) and (not ownFlag or ownFlag and hasKey(object, key)) and callback(object[key], key, object) is false
        break  if done = callback(iteratee[index], String(index), object) is false  while ++index < length  if not done and (forArgs and isArguments(object) or (noCharByIndex or noCharByOwnIndex) and isClassOf(object, "String") and (iteratee = (if noCharByIndex then object.split("") else object)))
        if not done and forShadowed
          ctor = object.constructor
          skipCtor = ctor and ctor:: and ctor::constructor is ctor
          index = 0
          while index < 7
            key = shadowed[index]
            break  if not (skipCtor and key is "constructor") and hasKey(object, key) and callback(object[key], key, object) is false
            index++
      result

    forProps.apply null, arguments
  getCriticalValue = (df) ->
    distribution[Math.round(df) or 1] or distribution.infinity
  getFirstArgument = (fn, altName) ->
    (not hasKey(fn, "toString") and (/^[\s(]*function[^(]*\(([^\s,)]+)/.exec(fn) or 0)[1]) or altName or ""
  getMean = (sample) ->
    reduce(sample, (sum, x) ->
      sum + x
    ) / sample.length or 0
  getSource = (fn, altSource) ->
    result = altSource
    if isStringable(fn)
      result = String(fn)
    else result = (/^[^{]+\{([\s\S]*)}\s*$/.exec(fn) or 0)[1]  if has.decompilation
    (result or "").replace /^\s+|\s+$/g, ""
  isArguments = ->
    isArguments = (value) ->
      toString.call(value) is "[object Arguments]"

    if noArgumentsClass
      isArguments = (value) ->
        hasKey(value, "callee") and not (propertyIsEnumerable and propertyIsEnumerable.call(value, "callee"))
    isArguments arguments[0]
  isClassOf = (value, name) ->
    value? and toString.call(value) is "[object " + name + "]"
  isHostType = (object, property) ->
    type = (if object? then typeof object[property] else "number")
    not /^(?:boolean|number|string|undefined)$/.test(type) and (if type is "object" then !!object[property] else true)
  isObject = (value) ->
    ctor = undefined
    result = !!value and toString.call(value) is "[object Object]"
    result = not isArguments(value)  if result and noArgumentsClass
    if result
      ctor = value.constructor
      if result = isClassOf(ctor, "Function") and ctor instanceof ctor
        forProps value, (subValue, subKey) ->
          result = subKey

        result = result is true or hasKey(value, result)
    result
  isStringable = (value) ->
    hasKey(value, "toString") or isClassOf(value, "String")
  methodize = (fn) ->
    ->
      args = [ this ]
      args.push.apply args, arguments
      fn.apply null, args
  noop = ->
  req = (id) ->
    try
      return freeExports and freeRequire(id)
    null
  runScript = (code) ->
    anchor = (if freeDefine then define.amd else Benchmark)
    script = document.createElement("script")
    sibling = document.getElementsByTagName("script")[0]
    parent = sibling.parentNode
    prop = uid + "runScript"
    prefix = "(" + (if freeDefine then "define.amd." else "Benchmark.") + prop + "||function(){})();"
    try
      script.appendChild document.createTextNode(prefix + code)
      anchor[prop] = ->
        parent.removeChild script
    catch e
      parent = parent.cloneNode(false)
      sibling = null
      script.text = code
    parent.insertBefore script, sibling
    delete anchor[prop]
  setOptions = (bench, options) ->
    options = extend({}, bench.constructor.options, options)
    bench.options = forOwn(options, (value, key) ->
      if value?
        if /^on[A-Z]/.test(key)
          forEach key.split(" "), (key) ->
            bench.on key.slice(2).toLowerCase(), value
        else
          bench[key] = deepClone(value)
    )
  resolve = ->
    me = this
    bench = me.benchmark
    if ++me.cycles < bench.count
      (bench._host or bench).compiled.call me, timer
    else
      timer.stop me
      call
        async: true
        benchmark: bench
        fn: ->
          cycle
            benchmark: bench
            deferred: me
  deepClone = (value) ->
    Marker = (object) ->
      @raw = object
    getMarkerKey = (object) ->
      result = uid
      result += 1  while object[result] and object[result].constructor isnt Marker
      result
    propCallback = (subValue, subKey) ->
      return  if subValue and subValue.constructor is Marker
      if subValue is Object(subValue)
        queue[queue.length++] =
          key: subKey
          parent: clone
          source: value
      else
        clone[subKey] = subValue
    accessor = undefined
    circular = undefined
    clone = undefined
    ctor = undefined
    descriptor = undefined
    extensible = undefined
    key = undefined
    length = undefined
    markerKey = undefined
    parent = undefined
    result = undefined
    source = undefined
    subIndex = undefined
    data = value: value
    index = 0
    marked = []
    queue = length: 0
    unmarked = []
    loop
      key = data.key
      parent = data.parent
      source = data.source
      clone = value = (if source then source[key] else data.value)
      accessor = circular = descriptor = false
      if value is Object(value)
        if isClassOf(value.deepClone, "Function")
          clone = value.deepClone()
        else
          ctor = value.constructor
          switch toString.call(value)
            when "[object Array]"
              clone = new ctor(value.length)
            when "[object Boolean]"
              clone = new ctor(value is true)
            when "[object Date]"
              clone = new ctor(+value)
            when "[object Object]"
              isObject(value) and (clone = new ctor)
            when "[object Number]", "[object String]"
              clone = new ctor(value)
            when "[object RegExp]"
              clone = ctor(value.source, (if value.global then "g" else "") + (if value.ignoreCase then "i" else "") + (if value.multiline then "m" else ""))
        if clone and clone isnt value and not (descriptor = source and has.descriptors and getDescriptor(source, key)
        accessor = descriptor and (descriptor.get or descriptor.set)
        )
          if extensible = isExtensible(value)
            markerKey = getMarkerKey(value)
            circular = clone = value[markerKey].raw  if value[markerKey]
          else
            subIndex = 0
            length = unmarked.length

            while subIndex < length
              data = unmarked[subIndex]
              if data.object is value
                circular = clone = data.clone
                break
              subIndex++
          unless circular
            if extensible
              value[markerKey] = new Marker(clone)
              marked.push
                key: markerKey
                object: value
            else
              unmarked.push
                clone: clone
                object: value
            forProps value, propCallback,
              which: "all"
      if parent
        if accessor or (descriptor and not (descriptor.configurable and descriptor.enumerable and descriptor.writable))
          descriptor.value and (descriptor.value = clone)
          setDescriptor parent, key, descriptor
        else
          parent[key] = clone
      else
        result = clone
      break unless (data = queue[index++])
    index = 0
    length = marked.length

    while index < length
      data = marked[index]
      delete data.object[data.key]
      index++
    result
  each = (object, callback, thisArg) ->
    fn = callback
    index = -1
    result = [ object, object = Object(object) ][0]
    origObject = object
    length = object.length
    isSnapshot = !!(object.snapshotItem and (length = object.snapshotLength))
    isSplittable = (noCharByIndex or noCharByOwnIndex) and isClassOf(object, "String")
    isConvertable = isSnapshot or isSplittable or "item" of object
    if length is length >>> 0
      if isConvertable
        callback = (value, index) ->
          fn.call this, value, index, origObject

        if isSplittable
          object = object.split("")
        else
          object = []
          object[index] = (if isSnapshot then result.snapshotItem(index) else result[index])  while ++index < length
      forEach object, callback, thisArg
    else
      forOwn object, callback, thisArg
    result
  extend = (destination, source) ->
    destination = [destination, delete arguments[0]][0]
    forEach arguments, (source) ->
      forProps source, (value, key) ->
        destination[key] = value

    destination
  filter = (array, callback, thisArg) ->
    result = undefined
    if callback is "successful"
      callback = (bench) ->
        bench.cycles and isFinite(bench.hz)
    else if callback is "fastest" or callback is "slowest"
      result = filter(array, "successful").sort((a, b) ->
        a = a.stats
        b = b.stats
        (if a.mean + a.moe > b.mean + b.moe then 1 else -1) * (if callback is "fastest" then 1 else -1)
      )
      result = filter(result, (bench) ->
        result[0].compare(bench) is 0
      )
    result or reduce(array, (result, value, index) ->
      (if callback.call(thisArg, value, index, array) then (result.push(value)
      result
      ) else result)
    , [])
  forEach = (array, callback, thisArg) ->
    fn = callback
    index = -1
    length = (array = Object(array)).length >>> 0
    if thisArg isnt `undefined`
      callback = (value, index, array) ->
        fn.call thisArg, value, index, array
    break  if index of array and callback(array[index], index, array) is false  while ++index < length
    array
  forOwn = (object, callback, thisArg) ->
    forProps object, callback,
      bind: thisArg
      which: "own"
  formatNumber = (number) ->
    number = String(number).split(".")
    number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ",") + (if number[1] then "." + number[1] else "")
  hasKey = ->
    hasKey = (object, key) ->
      parent = object? and (object.constructor or Object)::
      !!parent and key of Object(object) and not (key of parent and object[key] is parent[key])

    if isClassOf(hasOwnProperty, "Function")
      hasKey = (object, key) ->
        object? and hasOwnProperty.call(object, key)
    else if {}.__proto__ is Object::
      hasKey = (object, key) ->
        result = false
        if object?
          object = Object(object)
          object.__proto__ = [ object.__proto__, object.__proto__ = null, result = key of object ][0]
        result
    hasKey.apply this, arguments
  indexOf = (array, value, fromIndex) ->
    index = toInteger(fromIndex)
    length = (array = Object(array)).length >>> 0
    index = (if index < 0 then max(0, length + index) else index) - 1
    return index  if index of array and value is array[index]  while ++index < length
    -1
  interpolate = (string, object) ->
    forOwn object, (value, key) ->
      string = string.replace(RegExp("#\\{" + key + "\\}", "g"), value)

    string
  invoke = (benches, name) ->
    isAsync = (object) ->
      async = args[0] and args[0].async
      isRun(object) and (if not async? then object.options.async else async) and has.timeout
    isRun = (object) ->
      Object(object).constructor is Benchmark and name is "run"
    isSync = (object) ->
      not isAsync(object) and not (isRun(object) and object.defer)
    execute = ->
      listeners = undefined
      sync = isSync(bench)
      unless sync
        bench.on "complete", getNext
        listeners = bench.events.complete
        listeners.splice 0, 0, listeners.pop()
      result[index] = (if isClassOf(bench and bench[name], "Function") then bench[name].apply(bench, args) else `undefined`)
      sync and getNext()
    getNext = ->
      last = bench
      sync = isSync(last)
      unless sync
        last.removeListener "complete", getNext
        last.emit "complete"
      if options.onCycle.call(benches, Event("cycle"), last) isnt false and raiseIndex() isnt false
        bench = (if queued then benches[0] else result[index])
        unless isSync(bench)
          call
            async: isAsync(bench)
            benchmark: bench
            fn: execute
        else unless sync
          continue  while execute()
        else
          return true
      else
        options.onComplete.call benches, Event("complete"), last
      false
    raiseIndex = ->
      length = result.length
      if queued
        loop
          ++index > 0 and shift.call(benches)
          break unless (length = benches.length) and ("0" of benches)
      else
        continue  while ++index < length and (index not of result)
      (if (if queued then length else index < length) then index else (index = false))
    args = undefined
    bench = undefined
    queued = undefined
    index = -1
    options =
      onStart: noop
      onCycle: noop
      onComplete: noop

    result = map(benches, (bench) ->
      bench
    )
    if isClassOf(name, "String")
      args = slice.call(arguments, 2)
    else
      options = extend(options, name)
      name = options.name
      args = (if isClassOf(args = (if "args" of options then options.args else []), "Array") then args else [ args ])
      queued = options.queued
    if raiseIndex() isnt false
      bench = result[index]
      options.onStart.call benches, Event("start"), bench
      if benches.aborted and benches.constructor is Suite and name is "run"
        options.onCycle.call benches, Event("cycle"), bench
        options.onComplete.call benches, Event("complete"), bench
      else
        if isAsync(bench)
          call
            async: true
            benchmark: bench
            fn: execute
        else
          continue  while execute()
    result
  join = (object, separator1, separator2) ->
    result = []
    length = (object = Object(object)).length
    arrayLike = length is length >>> 0
    separator2 or (separator2 = ": ")
    each object, (value, key) ->
      result.push (if arrayLike then value else key + separator2 + value)

    result.join separator1 or ","
  map = (array, callback, thisArg) ->
    reduce array, ((result, value, index) ->
      result[index] = callback.call(thisArg, value, index, array)
      result
    ), Array(Object(array).length >>> 0)
  pluck = (array, property) ->
    map array, (object) ->
      (if not object? then `undefined` else object[property])
  reduce = (array, callback, accumulator) ->
    noaccum = arguments.length < 3
    forEach array, (value, index) ->
      accumulator = (if noaccum then (noaccum = 0
      value
      ) else callback(accumulator, value, index, array))

    accumulator
  abortSuite = ->
    me = this
    if me.running
      calledBy.abortSuite = true
      me.reset()
      delete calledBy.abortSuite

      me.aborted = true
      not calledBy.resetSuite and invoke(me, "abort")
      me.emit "abort"
    me
  add = (name, fn, options) ->
    me = this
    bench = Benchmark(name, fn, options)
    me.push bench
    me.emit "add", bench
    me
  cloneSuite = (options) ->
    me = this
    result = new me.constructor(extend({}, me.options, options))
    forOwn me, (value, key) ->
      result[key] = (if value and isClassOf(value.clone, "Function") then value.clone() else deepClone(value))  unless hasKey(result, key)

    result
  filterSuite = (callback) ->
    me = this
    result = new me.constructor
    result.push.apply result, filter(me, callback)
    result
  resetSuite = ->
    me = this
    notAborting = not calledBy.abortSuite
    if me.running and notAborting
      calledBy.resetSuite = true
      me.abort()
      delete calledBy.resetSuite

      me.aborted = false
    else if me.aborted isnt false or me.running isnt false
      me.aborted = me.running = false
      notAborting and invoke(me, "reset")
      me.emit "reset"
    me
  runSuite = (options) ->
    me = this
    benches = []
    me.reset()
    me.running = true
    options or (options = {})
    invoke me,
      name: "run"
      args: options
      queued: options.queued
      onStart: (event, bench) ->
        me.emit "start", bench

      onCycle: (event, bench) ->
        if bench.error
          me.emit "error", bench
        else benches.push bench  if bench.cycles
        not me.aborted and me.emit("cycle", bench)

      onComplete: (event, bench) ->
        me.running = false
        me.emit "complete", bench

    me
  addListener = (type, listener) ->
    me = this
    events = me.events or (me.events = {})
    forEach type.split(" "), (type) ->
      (events[type] or (events[type] = [])).push listener

    me
  emit = (type) ->
    me = this
    event = Event(type)
    args = (arguments[0] = event
    arguments
    )
    events = me.events
    listeners = events and events[event.type] or []
    result = true
    forEach listeners.slice(), (listener) ->
      result = listener.apply(me, args) isnt false

    result
  removeListener = (type, listener) ->
    me = this
    events = me.events
    forEach type.split(" "), (type) ->
      listeners = events and events[type] or []
      index = indexOf(listeners, listener)
      listeners.splice index, 1  if index > -1

    me
  removeAllListeners = (type) ->
    me = this
    events = me.events
    forEach (if type then type.split(" ") else events), (type) ->
      (events and events[type] or []).length = 0

    me
  abort = ->
    me = this
    if me.running
      if has.timeout
        forEach me._timerIds or [], clearTimeout
        delete me._timerIds
      calledBy.abort = true
      me.reset()
      delete calledBy.abort

      me.aborted = true
      me.emit "abort"
    me
  clone = (options) ->
    me = this
    result = new me.constructor(extend({}, me, options))
    result.options = extend({}, me.options, options)
    forOwn me, (value, key) ->
      result[key] = deepClone(value)  unless hasKey(result, key)

    result
  compare = (other) ->
    a = @stats
    b = other.stats
    df = a.size + b.size - 2
    pooled = ((a.size - 1) * a.variance) + ((b.size - 1) * b.variance) / df
    tstat = (a.mean - b.mean) / sqrt(pooled * (1 / a.size + 1 / b.size))
    near = abs(1 - a.mean / b.mean) < 0.055 and a.rme < 3 and b.rme < 3
    (if not near and abs(tstat) > getCriticalValue(df) then (if tstat > 0 then -1 else 1) else 0)
  reset = ->
    changed = undefined
    pair = undefined
    me = this
    source = extend({}, me.constructor::, me.options)
    pairs = [ [ source, me ] ]
    if me.running and not calledBy.abort
      me.abort()
      me.aborted = source.aborted
    else
      while (pair = pairs.pop())
        forOwn pair[0], (value, key) ->
          other = pair[1][key]
          if value and isClassOf(value, "Object")
            pairs.push [ value, other ]
          else if value isnt other and not (not value? or isClassOf(value, "Function"))
            pair[1][key] = value
            changed = true
      me.emit "reset"  if changed
    me
  toStringBench = ->
    me = this
    error = me.error
    hz = me.hz
    id = me.id
    stats = me.stats
    size = stats.size
    pm = (if has.java then "+/-" else "±")
    result = me.name or (if typeof id is "number" then "<Test #" + id + ">" else id)
    if error
      result += ": " + join(error)
    else
      result += " x " + formatNumber(hz.toFixed((if hz < 100 then 2 else 0))) + " ops/sec " + pm + stats.rme.toFixed(2) + "% (" + size + " run" + (if size is 1 then "" else "s") + " sampled)"
    result
  clock = ->
    getRes = (unit) ->
      measured = undefined
      begin = undefined
      count = 30
      divisor = 1e3
      ns = timer.ns
      sample = []
      while count--
        if unit is "us"
          divisor = 1e6
          if ns.stop
            ns.start()
            continue  until (measured = ns.microseconds())
          else
            begin = timer.ns()
            continue  until (measured = ns() - begin)
        else if unit is "ns"
          divisor = 1e9
          begin = ns.nanoTime()
          continue  until (measured = ns.nanoTime() - begin)
        else
          begin = new ns
          continue  until (measured = new ns - begin)
        if measured > 0
          sample.push measured
        else
          sample.push Infinity
          break
      getMean(sample) / divisor
    preprocess = (code) ->
      interpolate(code, template).replace /\$/g, /\d+/.exec(uid)
    applet = undefined
    options = Benchmark.options
    template =
      begin: "s$=new n$"
      end: "r$=(new n$-s$)/1e3"
      uid: uid

    timers = [
      ns: timer.ns
      res: max(0.0015, getRes("ms"))
      unit: "ms"
     ]
    clock = (bench) ->
      deferred = bench instanceof Deferred and [ bench, bench = bench.benchmark ][0]
      host = bench._host or bench
      fn = host.fn
      fnArg = (if deferred then getFirstArgument(fn, "deferred") else "")
      stringable = isStringable(fn)
      decompilable = has.decompilation or stringable
      source =
        setup: getSource(host.setup, preprocess("m$.setup()"))
        fn: getSource(fn, preprocess("f$(" + fnArg + ")"))
        fnArg: fnArg
        teardown: getSource(host.teardown, preprocess("m$.teardown()"))

      compiled = host.compiled
      count = host.count = bench.count
      id = host.id
      isEmpty = not (source.fn or stringable)
      name = host.name or (if typeof id is "number" then "<Test #" + id + ">" else id)
      ns = timer.ns
      result = 0
      bench.minTime = host.minTime or (host.minTime = host.options.minTime = options.minTime)
      if applet
        try
          ns.nanoTime()
        catch e
          ns = timer.ns = new applet.Packages.nano
      unless compiled
        compiled = host.compiled = createFunction(preprocess("t$"), interpolate(preprocess((if deferred then "var d$=this,#{fnArg}=d$,r$=d$.resolve,m$=(m$=d$.benchmark)._host||m$,f$=m$.fn;" + "if(!d$.cycles){d$.resolve=function(){d$.resolve=r$;r$.call(d$);" + "if(d$.cycles==m$.count){#{teardown}\n}};#{setup}\nt$.start(d$);}#{fn}\nreturn{}" else "var r$,s$,m$=this,f$=m$.fn,i$=m$.count,n$=t$.ns;#{setup}\n#{begin};" + "while(i$--){#{fn}\n}#{end};#{teardown}\nreturn{elapsed:r$,uid:\"#{uid}\"}")), source))
        try
          if isEmpty
            throw new Error("The test, " + name + ", is empty. This may be the result of dead code removal.")
          else unless deferred
            host.count = 1
            compiled = (compiled.call(host, timer) or {}).uid is uid and compiled
            host.count = count
        catch e
          compiled = false
          bench.error = e or new Error(String(e))
          host.count = count
        if decompilable and not compiled and not deferred and not isEmpty
          compiled = createFunction(preprocess("t$"), interpolate(preprocess((if bench.error and not stringable then "var r$,s$,m$=this,f$=m$.fn,i$=m$.count" else "function f$(){#{fn}\n}var r$,s$,i$=this.count") + ",n$=t$.ns;#{setup}\n#{begin};while(i$--){f$()}#{end};#{teardown}\nreturn{elapsed:r$}"), source))
          try
            host.count = 1
            compiled.call host, timer
            host.compiled = compiled
            host.count = count
            delete bench.error
          catch e
            host.count = count
            unless bench.error
              host.compiled = compiled
              bench.error = e or new Error(String(e))
      result = compiled.call(deferred or host, timer).elapsed  unless bench.error
      result

    each window.document and document.applets or [], (element) ->
      not (timer.ns = applet = "nanoTime" of element and element)

    try
      if typeof timer.ns.nanoTime() is "number"
        timers.push
          ns: timer.ns
          res: getRes("ns")
          unit: "ns"
    try
      if timer.ns = new (window.chrome or window.chromium).Interval
        timers.push
          ns: timer.ns
          res: getRes("us")
          unit: "us"
    if timer.ns = (req("microtime") or now: 0).now
      timers.push
        ns: timer.ns
        res: getRes("us")
        unit: "us"
    timer = reduce(timers, (timer, other) ->
      (if other.res < timer.res then other else timer)
    )
    if timer.unit isnt "ns" and applet
      applet = (applet.parentNode.removeChild(applet)
      null
      )
    throw new Error("Benchmark.js was unable to find a working timer.")  if timer.res is Infinity
    if timer.unit is "ns"
      extend template,
        begin: "s$=n$.nanoTime()"
        end: "r$=(n$.nanoTime()-s$)/1e9"
    else if timer.unit is "us"
      extend template, (if timer.ns.stop then {
        begin: "s$=n$.start()"
        end: "r$=n$.microseconds()/1e6"
      } else {
        begin: "s$=n$()"
        end: "r$=(n$()-s$)/1e6"
      })
    timer.start = createFunction(preprocess("o$"), preprocess("var n$=this.ns,#{begin};o$.timeStamp=s$"))
    timer.stop = createFunction(preprocess("o$"), preprocess("var n$=this.ns,s$=o$.timeStamp,#{end};o$.elapsed=r$"))
    options.minTime or (options.minTime = max(timer.res / 2 / 0.01, 0.05))
    clock.apply null, arguments
  compute = (options) ->
    enqueue = (count) ->
      while count--
        queue.push bench.clone(
          _host: bench
          events:
            start: [ update ]
            cycle: [ update ]
        )
    update = (event) ->
      clone = this
      cycles = clone.cycles
      type = event.type
      if bench.running
        if type is "cycle"
          if clone.error
            bench.abort()
            bench.error = clone.error
            bench.emit "error"
          else
            bench.hz = clone.hz
            bench.initCount = clone.initCount
            bench.times.period = clone.times.period
            bench.cycles = cycles  if cycles > bench.cycles
          bench.emit type
        else
          clone.count = bench.initCount
      else clone.abort()  if bench.aborted
    evaluate = (event, clone) ->
      mean = undefined
      moe = undefined
      rme = undefined
      sd = undefined
      sem = undefined
      variance = undefined
      now = +new Date
      times = bench.times
      done = bench.aborted
      maxedOut = (elapsed += now - clone.times.timeStamp) / 1e3 > bench.maxTime
      size = sample.push(clone.times.period)
      varOf = (sum, x) ->
        sum + pow(x - mean, 2)

      maxedOut = not (size = sample.length = queue.length = 0)  if done or clone.hz is Infinity
      unless done
        mean = getMean(sample)
        variance = reduce(sample, varOf, 0) / (size - 1) or 0
        sd = sqrt(variance)
        sem = sd / sqrt(size)
        moe = sem * getCriticalValue(size - 1)
        rme = (moe / mean) * 100 or 0
        extend bench.stats,
          moe: moe
          rme: rme
          sem: sem
          deviation: sd
          mean: mean
          size: size
          variance: variance

        if maxedOut
          done = true
          bench.running = false
          bench.initCount = initCount
          times.elapsed = (now - times.timeStamp) / 1e3
        unless bench.hz is Infinity
          times.period = mean
          times.cycle = mean * bench.count
          bench.hz = 1 / mean
      enqueue 1  if queue.length < 2 and not maxedOut
      not done
    options or (options = {})
    async = options.async
    bench = options.benchmark
    elapsed = 0
    queue = []
    sample = []
    initCount = bench.initCount
    enqueue bench.minSamples
    invoke queue,
      name: "run"
      args:
        async: async

      queued: true
      onCycle: evaluate
      onComplete: ->
        bench.emit "complete"
  cycle = (options) ->
    options or (options = {})
    clocked = undefined
    divisor = undefined
    minTime = undefined
    period = undefined
    async = options.async
    bench = options.benchmark
    count = bench.count
    deferred = options.deferred
    times = bench.times
    if bench.running
      bench.cycles++
      clocked = (if deferred then deferred.elapsed else clock(bench))
      minTime = bench.minTime
      if bench.error
        bench.abort()
        bench.emit "error"
    if bench.running
      times.cycle = clocked
      period = times.period = clocked / count
      bench.hz = 1 / period
      bench.running = clocked < minTime
      bench.initCount = count
      if bench.running
        count = floor(4e6 / divisor)  if not clocked and (divisor = divisors[bench.cycles])?
        count += Math.ceil((minTime - clocked) / period)  if count <= bench.count
        bench.running = count isnt Infinity
    bench.abort()  if bench.emit("cycle") is false
    if bench.running
      bench.count = count
      if deferred
        (bench._host or bench).compiled.call deferred, timer
      else
        call
          async: async
          benchmark: bench
          fn: ->
            cycle
              async: async
              benchmark: bench
    else
      runScript uid + "=1;delete " + uid  if has.browser
      bench.emit "complete"
  run = (options) ->
    me = this
    async = (if not (async = options and options.async)? then me.async else async) and has.timeout
    me.running = false
    me.reset()
    me.running = true
    me.count = me.initCount
    me.times.timeStamp = +new Date
    me.emit "start"
    if me._host
      if me.defer
        Deferred me
      else
        cycle
          async: async
          benchmark: me
    else
      compute
        async: async
        benchmark: me
    me
  freeDefine = typeof define is "function" and typeof define.amd is "object" and define.amd and define
  freeExports = typeof exports is "object" and exports and (typeof global is "object" and global and global is global.global and (window = global)
  exports
  )
  freeRequire = typeof require is "function" and require
  counter = 0
  getAllKeys = Object.getOwnPropertyNames
  getDescriptor = Object.getOwnPropertyDescriptor
  hasOwnProperty = {}.hasOwnProperty
  isExtensible = Object.isExtensible or ->
    true

  propertyIsEnumerable = {}.propertyIsEnumerable
  setDescriptor = Object.defineProperty
  toString = {}.toString
  uid = "uid" + (+new Date)
  calledBy = {}
  divisors =
    1: 4096
    2: 512
    3: 64
    4: 8
    5: 0

  distribution =
    1: 12.706
    2: 4.303
    3: 3.182
    4: 2.776
    5: 2.571
    6: 2.447
    7: 2.365
    8: 2.306
    9: 2.262
    10: 2.228
    11: 2.201
    12: 2.179
    13: 2.16
    14: 2.145
    15: 2.131
    16: 2.12
    17: 2.11
    18: 2.101
    19: 2.093
    20: 2.086
    21: 2.08
    22: 2.074
    23: 2.069
    24: 2.064
    25: 2.06
    26: 2.056
    27: 2.052
    28: 2.048
    29: 2.045
    30: 2.042
    infinity: 1.96

  has =
    air: isClassOf(window.runtime, "ScriptBridgingProxyObject")
    argumentsClass: isClassOf(arguments, "Arguments")
    browser: isHostType(window, "document") and isHostType(window, "navigator")
    charByIndex: ("x"[0] + Object("x")[0]) is "xx"
    charByOwnIndex: "x"[0] is "x" and hasKey("x", "0")
    decompilation: !!(do ->
      try
        return Function("return (" + ((x) ->
          x: "" + (1 + x) + ""
          y: 0
        ) + ")")()(0).x is "1"
    )
    descriptors: !!(do ->
      try
        o = {}
        return (setDescriptor(o, o, o)
        "value" of getDescriptor(o, o)
        )
    )
    getAllKeys: !!(do ->
      try
        return /\bvalueOf\b/.test(getAllKeys(Object::))
    )
    java: isClassOf(window.java, "JavaPackage")
    timeout: isHostType(window, "setTimeout") and isHostType(window, "clearTimeout")

  timer =
    ns: Date
    start: null
    stop: null

  noArgumentsClass = not has.argumentsClass
  noCharByIndex = not has.charByIndex
  noCharByOwnIndex = not has.charByOwnIndex
  abs = Math.abs
  floor = Math.floor
  max = Math.max
  min = Math.min
  pow = Math.pow
  sqrt = Math.sqrt
  extend Benchmark,
    options:
      async: false
      defer: false
      delay: 0.005
      id: null
      initCount: 1
      maxTime: 5
      minSamples: 5
      minTime: 0
      name: null

    platform: req("platform") or window.platform or {
      description: window.navigator and navigator.userAgent or null
      layout: null
      product: null
      name: null
      manufacturer: null
      os: null
      prerelease: null
      version: null
      toString: ->
        @description or ""
    }

    version: "0.3.0"
    deepClone: deepClone
    each: each
    extend: extend
    filter: filter
    forEach: forEach
    forOwn: forOwn
    formatNumber: formatNumber
    hasKey: (hasKey(Benchmark, "")
    hasKey
    )
    indexOf: indexOf
    interpolate: interpolate
    invoke: invoke
    join: join
    map: map
    pluck: pluck
    reduce: reduce

  extend Benchmark::,
    count: 0
    cycles: 0
    hz: 0
    compiled: null
    error: null
    fn: null
    aborted: false
    running: false
    on: addListener
    setup: noop
    teardown: noop
    stats:
      moe: 0
      rme: 0
      sem: 0
      deviation: 0
      mean: 0
      size: 0
      variance: 0

    times:
      cycle: 0
      elapsed: 0
      period: 0
      timeStamp: 0

    abort: abort
    addListener: addListener
    clone: clone
    compare: compare
    emit: emit
    removeAllListeners: removeAllListeners
    removeListener: removeListener
    reset: reset
    run: run
    toString: toStringBench

  Suite.options = name: null
  extend Suite::,
    length: 0
    aborted: false
    running: false
    forEach: methodize(forEach)
    indexOf: methodize(indexOf)
    invoke: methodize(invoke)
    join: [].join
    map: methodize(map)
    pluck: methodize(pluck)
    pop: [].pop
    push: [].push
    sort: [].sort
    reduce: methodize(reduce)
    abort: abortSuite
    add: add
    addListener: addListener
    clone: cloneSuite
    emit: emit
    filter: filterSuite
    on: addListener
    removeAllListeners: removeAllListeners
    removeListener: removeListener
    reset: resetSuite
    run: runSuite
    concat: concat
    reverse: reverse
    shift: shift
    slice: slice
    splice: splice
    unshift: unshift

  extend Deferred::,
    benchmark: null
    cycles: 0
    elapsed: 0
    timeStamp: 0
    resolve: resolve

  Event::type = ""
  extend Benchmark,
    Deferred: Deferred
    Event: Event
    Suite: Suite

  if freeExports
    if typeof module is "object" and module and module.exports is freeExports
      (module.exports = Benchmark).Benchmark = Benchmark
    else
      freeExports.Benchmark = Benchmark
  else if freeDefine
    define "benchmark", ->
      Benchmark
  else
    window["Benchmark"] = Benchmark
  if has.air
    clock
      fn: noop
      count: 1
      options: {}
) this