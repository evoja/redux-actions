# redux-actions [![npm version](https://badge.fury.io/js/%40evoja%2Fredux-actions.svg)](https://badge.fury.io/js/%40evoja%2Fredux-actions) [![Build Status](https://travis-ci.org/evoja/redux-actions.png)](https://travis-ci.org/evoja/redux-actions)


### registerSimpleActions
The function returns a registrator that allows to create
action constants and action creators.

```js
var obj = {}
registerSimpleActions(obj, 'PREFIX_')({
  creator1: 'TYPE1',
  creator2: ['TYPE2', 'param1', 'p.ar.am2']
})

var action1 = obj.creator1()
// => {type: 'PREFIX_TYPE1'}

var action2 = obj.creator2(10, 20)
// => {
//      type: 'PREFIX_TYPE2',
//      param1: 10,
//      p: {ar: {am2: 20}}
//    }
```

It allows state prefix as a third parameter:

```js
var obj = {}
registerSimpleActions(obj, 'PREFIX_', 'pre.fix')({
  creator3: ['TYPE3', 'x', 'y']
})

var action3 = obj.creator3(10, 20)
// => {
//      type: 'PREFIX_TYPE3',
//      pre: {
//        fix: {
//          x: 10,
//          y: 20
//        }
//      }
//    }
```

It returns obj with actions. It modifies the object passed as a parameter
and returns the same object.

```js
var obj = registerSimpleActions({}, 'PREFIX_')({
  creator3: 'TYPE3'
})
obj.creator3()
```

## Deprecated?
### getActionConstRegistrator
The function allows to register action type constants easily

```js
var obj = {}
var reg = getActionConstRegistrator('PREFIX_', obj)
// `obj`:
// {
//   TYPE1: 'PREFIX_TYPE1'
// }

reg(['TYPE2', 'TYPE3'])
// `obj`:
// {
//   TYPE1: 'PREFIX_TYPE1',
//   TYPE2: 'PREFIX_TYPE2',
//   TYPE3: 'PREFIX_TYPE3'
// }
```

### getSimpleActionsRegistrator
The function allows to create and register action creators.

```js
var obj = {}
var reg = getSimpleActionsRegistrator(obj)

reg({
  creator1: 'TYPE1',
  creator2: ['TYPE2', 'param1', 'p.ar.am2']
})

var action1 = obj.creator1()
// => {type: 'TYPE1'}

var action2 = obj.creator2(10, 20)
// => {
//      type: 'TYPE2',
//      param1: 10,
//      p: {ar: {am2: 20}}
//    }
```

It also allows prefix as a second parameter:

```js
reg({
  creator3: ['TYPE3', 'x', 'y']
}, 'pre.fix')

var action3 = obj.creator3(10, 20)
// => {
//      type: 'TYPE3',
//      pre: {
//        fix: {
//          x: 10,
//          y: 20
//        }
//      }
//    }
```
