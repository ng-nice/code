这里放自定义的动画，但是，只要浏览器支持，那么大多数简单动画都应该通过css去实现，避免通过这种方式实现自定义动画。这里可以用于引入第三方库或实现需要通过js计算参数后才能正常工作的动画。

样例：

```js

'use strict';

angular.module('app').animation('.ease', function () {
  return {
    // 创建节点时触发
    enter: function (element, done) {

    },
    // 删除节点时触发
    leave: function (element, done) {

    },
    // 节点上增加类时触发
    addClass: function (element, className, done) {

    },
    // 节点上移除类时触发
    removeClass: function (element, className, done) {

    }
  };
});

```
