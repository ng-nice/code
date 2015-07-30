'use strict';

angular.module('com.ngnice.app').filter('tree', function (tree) {
  return function (items, childrenName) {
    tree.enhance(items, childrenName);
    return items;
  };
});
