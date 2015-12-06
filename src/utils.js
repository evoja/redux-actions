'use strict';
var me = module.exports;

function getGlobal() {
  return typeof window !== 'undefined' && window || global
}

me.namespace = function(name, context, doNotCreate) {
  var prevIndex = 0
  var nextIndex = name.indexOf('.', 0)
  var parent = context ||  getGlobal()

  do
  {
    if (!parent) {
      return undefined
    }

    nextIndex = name.indexOf('.', prevIndex)
    var key = nextIndex >= 0
      ? name.substring(prevIndex, nextIndex)
      : name.substring(prevIndex)

    if ((parent[key] === undefined || parent[key] === null) && !doNotCreate) {
      parent[key] = {}
    }
    parent = parent[key]
    prevIndex = nextIndex + 1
  } while(nextIndex >= 0)
  return parent
}

me.assign = function assign(name, val, context) {
  context = context || getGlobal()

  var index = name.lastIndexOf('.')
  if (index < 0) {
    context[name] = val
  } else {
    me.namespace(name.substring(0, index), context)[name.substring(index + 1)] = val
  }
}
