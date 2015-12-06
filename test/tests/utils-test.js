'use strict'

var tl = require('../test-lib.js')
var {namespace, assign} = tl.require('utils.js')


exports.test_namespace = function(test) {
  var obj = {}
  var x = namespace('a.b', obj)
  test.deepEqual(obj, {a:{b:{}}})
  test.strictEqual(obj.a.b, x)

  var y = namespace('a', obj)
  test.strictEqual(y, obj.a)

  var z = namespace('x.y', obj, true)
  test.deepEqual(obj, {a:{b:{}}})
  test.strictEqual(z, undefined)

  test.done()
}



exports.test_assign = function(test) {
    var obj = {};
    assign('a.b.c', 10, obj);
    test.equal(obj.a.b.c, 10);
    assign('a.b.c', 20, obj);
    test.equal(obj.a.b.c, 20);

    test.ok(!global.a);
    assign('a.b.c', 10);
    test.equal(global.a.b.c, 10);
    assign('a.b.c', 20);
    test.equal(global.a.b.c, 20);
    delete global['a'];

    test.done();
};

