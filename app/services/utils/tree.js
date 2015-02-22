'use strict';

angular.module('app').service('tree', function Tree() {
  var self = this;
  var enhanceItem = function (item, childrenName) {
    item.$hasChildren = function() {
      var subItems = this[childrenName];
      return angular.isArray(subItems) && subItems.length;
    };
    item.$foldToggle = function () {
      this.$folded = !this.$folded;
    };
    item.$isFolded = function () {
      return this.$folded;
    };
  };
  this.enhance = function (items, childrenName) {
    if (angular.isUndefined(childrenName)) {
      childrenName = 'items';
    }
    angular.forEach(items, function (item) {
      enhanceItem(item, childrenName);
      if (item.$hasChildren()) {
        self.enhance(item[childrenName], childrenName);
      }
    });
    return items;
  };
});
