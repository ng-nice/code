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
    var setCheckState = function(node, checked) {
      node.$checked = checked;
      if (node.$hasChildren()) {
        angular.forEach(node[childrenName], function(subNode) {
          setCheckState(subNode, checked);
        });
      }
    };
    item.$check = function() {
      setCheckState(item, true);
    };
    item.$isChecked = function() {
      return this.$checked;
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
