'use strict'

var tl = require('../test-lib.js')
var {getActionNameSubtractor, getActionConstRegistrator, createSimpleAction,
    getSimpleActionsRegistrator, registerSimpleActions
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
  var actionCreator = createSimpleAction('a', ['x', 'pay.load.x', 'pay.load.y'])
  var actionObject = actionCreator(10, 20, 30, 40)
  test.deepEqual(actionObject, {type: 'a', x: 10, pay: {load: {x: 20, y: 30}}})
  test.done()
}

exports.test_getSimpleActionsRegistrator = function(test) {
  var obj = {}
  var rg = getSimpleActionsRegistrator(obj)
  rg({a: 'a', b: ['b', 'x', 'y']}, 'pay.load')
  test.equal(typeof obj.a, 'function')
  test.equal(typeof obj.b, 'function')
  test.deepEqual(obj.a(), {type: 'a'})
  test.deepEqual(obj.b(10, 20), {type: 'b', pay: {load: {x: 10, y: 20}}})

  var obj1 = {}
  var rg1 = getSimpleActionsRegistrator(obj1)
  rg1({a: 'a', b: ['b', 'x', 'y']})
  test.equal(typeof obj1.a, 'function')
  test.equal(typeof obj1.b, 'function')
  test.deepEqual(obj1.a(), {type: 'a'})
  test.deepEqual(obj1.b(10, 20), {type: 'b', x: 10, y: 20})

  test.done()
}


exports.test_registerSimpleActions = function(test) {
  var rg = registerSimpleActions({}, '', 'pay.load')
  const obj = rg({a: 'A', b: ['B', 'x', 'y']})
  test.equal(typeof obj.a, 'function', 'wrong type 1')
  test.equal(typeof obj.b, 'function', 'wrong type 2')
  test.deepEqual(obj.a(), {type: 'A'})
  test.deepEqual(obj.b(10, 20), {type: 'B', pay: {load: {x: 10, y: 20}}})
  test.equal(obj.A, 'A', 'wrong const value 1')
  test.equal(obj.B, 'B', 'wrong const value 2')

  var rg1 = registerSimpleActions({}, '')
  const obj1 = rg1({a: 'A1', b: ['B1', 'x', 'y']})
  test.equal(typeof obj1.a, 'function')
  test.equal(typeof obj1.b, 'function')
  test.deepEqual(obj1.a(), {type: 'A1'})
  test.deepEqual(obj1.b(10, 20), {type: 'B1', x: 10, y: 20})
  test.equal(obj1.A1, 'A1')
  test.equal(obj1.B1, 'B1')

  var rg2 = registerSimpleActions({}, 'P_', 'pay.load')
  const obj2 = rg2({a: 'A', b: ['B', 'x', 'y']})
  test.equal(typeof obj2.a, 'function')
  test.equal(typeof obj2.b, 'function')
  test.deepEqual(obj2.a(), {type: 'P_A'})
  test.deepEqual(obj2.b(10, 20), {type: 'P_B', pay: {load: {x: 10, y: 20}}})
  test.equal(obj2.A, 'P_A')
  test.equal(obj2.B, 'P_B')

  var rg3 = registerSimpleActions({}, 'P3_')
  const obj3 = rg3({a: 'A', b: ['B', 'x', 'y']})
  test.equal(typeof obj3.a, 'function')
  test.equal(typeof obj3.b, 'function')
  test.deepEqual(obj3.a(), {type: 'P3_A'})
  test.deepEqual(obj3.b(10, 20), {type: 'P3_B', x: 10, y: 20})
  test.equal(obj3.A, 'P3_A')
  test.equal(obj3.B, 'P3_B')

  test.done()
}
