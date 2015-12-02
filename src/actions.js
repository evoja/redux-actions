'use strict';
//===== Actions ======
// I use this convention of action fields: https://github.com/acdlite/flux-standard-action
//
// What is action
// * Basic
//     * [en](http://rackt.org/redux/docs/basics/Actions.html)
//     * [ru](https://github.com/rajdee/redux-in-russian/blob/master/docs/basics/Actions.md)
// * Advanced
//     * [en](http://rackt.org/redux/docs/advanced/AsyncActions.html)
//     * [ru](https://github.com/rajdee/redux-in-russian/blob/master/docs/advanced/AsyncActions.md)

var me = module.exports;


/**
 * Returns a `function (type) -> constName`
 * that converts full action type to the name of the const.
 */
me.getActionNameSubtractor = (prefix) => (type) => {
  if (type.indexOf(prefix) != 0) {
    throw new Error('Incompatible action type. type=' + type + ', prefix=' + prefix)
  }
  return type.substring(prefix.length)
}

/**
 * Returns a function that registers consts in some namespace (`act` object)
 * and generates types of actions prefixed by `prefix`.
 *
 * Function may bulk register array of actions.
 */
me.getActionConstRegistrator = (prefix, act) =>
  function registerActionConst(name) {
    if (typeof name == 'string') {
      act[name] = prefix + name
      return
    }

    for (var i = 0; i < name.length; ++i) {
      act[name[i]] = prefix + name[i]
    }
  }

/**
 * Creates simple action
 *    * type - type
 *    * argNames - array of argument names which will be collected to action.payload object.
 *
 * Example:
 * Let's call
 *     var draw = createSimpleAction('DRAW', ['x', 'y'])
 * Then call:
 *     var action = draw(10, 20)
 * the `action` will be:
 *    {
 *        type: 'DRAW',
 *        payload: {x: 10, y: 20}
 *    }
 */
me.createSimpleAction = (type, argNames) => {
  if (!type) {
    throw new Error('`type` must not be empty or undefined');
  }
  argNames = argNames || []
  if (typeof argNames == 'string') {
    argNames = [argNames]
  }
  return (...args) => {
    if (args[0] == type) {
      console.error('Warning! Usually you should not pass actionType to arguments of a SimpleAction');
    }
    var payload = {};
    argNames.forEach((name, i) => {payload[name] = args[i]})
    return {
      type: type,
      payload: payload
    }
  }
}

/**
 * Bulk registrator of simple actions
 *
 * This call:
 *     var reg = getSimpleActionsRegistrator(obj)
 *     reg({
 *         draw: ['DRAW', 'x', 'y'],
 *         line: ['LINE', 'x1', 'y1', 'x2', 'y2']
 *     });
 * is equivalent to:
 *    obj.draw = createSimpleAction('DRAW', ['x', 'y'])
 *    obj.line = createSimpleAction('LINE', ['x1', 'y1', 'x2', 'y2'])
 */
me.getSimpleActionsRegistrator = (act) => (conf) => {
  for(var k in conf) {
    var confItem = conf[k]
    if (typeof confItem == 'string') {
        act[k] = me.createSimpleAction(confItem)
    } else {
        var type = confItem[0];
        var argNames = confItem.slice(1);
        act[k] = me.createSimpleAction(type, argNames)
    }
  }
}