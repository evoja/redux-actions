'use strict'

var tl = require('../test-lib.js')
var {getActionNameSubtractor, getActionConstRegistrator, createSimpleAction,
    getSimpleActionsRegistrator
  } = tl.require('actions.js')

exports.test_getActionNameSubtractor = function(test) {
  var sb = getActionNameSubtractor('pre')
  test.equal(sb('preload'), 'load')
  test.throws(() => sb('opreload'), Error)
  test.done()
}

exports.test_getActionConstRegistrator = function(test) {
  var obj = {}
  var reg = getActionConstRegistrator('pre_', obj)
  reg('x')
  test.deepEqual(obj, {x: 'pre_x'})
  reg(['y', 'z'])
  test.deepEqual(obj, {x: 'pre_x', y: 'pre_y', z: 'pre_z'})
  test.done()
}

exports.test_createSimpleAction = function(test) {
  var actionCreator = createSimpleAction('a', ['x', 'payload.x', 'payload.y'])
  var actionObject = actionCreator(10, 20, 30, 40)
  test.deepEqual(actionObject, {type: 'a', x: 10, payload: {x: 20, y: 30}})
  test.done()
}

exports.test_getSimpleActionsRegistrator = function(test) {
  var obj = {}
  var rg = getSimpleActionsRegistrator(obj)
  rg({a: 'a', b: ['b', 'x', 'y']}, 'payload')
  test.equal(typeof obj.a, 'function')
  test.equal(typeof obj.b, 'function')
  test.deepEqual(obj.a(), {type: 'a'})
  test.deepEqual(obj.b(10, 20), {type: 'b', payload: {x: 10, y: 20}})

  var obj1 = {}
  var rg1 = getSimpleActionsRegistrator(obj1)
  rg1({a: 'a', b: ['b', 'x', 'y']})
  test.equal(typeof obj1.a, 'function')
  test.equal(typeof obj1.b, 'function')
  test.deepEqual(obj1.a(), {type: 'a'})
  test.deepEqual(obj1.b(10, 20), {type: 'b', x: 10, y: 20})

  test.done()
}
