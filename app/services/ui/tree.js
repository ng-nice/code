'use strict';

angular.module('app').service('tree', function Tree() {
  var enhanceItem = function (item, childrenName, parent) {
    if (parent) {
      item.$parent = parent;
    }
    item.$hasChildren = function () {
      var subItems = this.$children();
      return angular.isArray(subItems) && subItems.length;
    };
    item.$children = function () {
      return this[childrenName] || [];
    };
    var getFlattenData = function (items) {
      var result = items || [];
      angular.forEach(items, function (item) {
        result = result.concat(getFlattenData(item.items));
      });
      return result;
    };

    item.$allChildren = function() {
      return getFlattenData(this.$children());
    };

    item.$foldToggle = function () {
      this.$folded = !this.$folded;
    };
    item.$isFolded = function () {
      return this.$folded;
    };
    var hasCheckedNode = function (node) {
      return _.find(node.$allChildren(), function(subNode) {
        return subNode.$checked;
      });
    };
    var hasUncheckedNode = function (node) {
      return _.find(node.$allChildren(), function(subNode) {
        return !subNode.$checked;
      });
    };
    var updateAncestorsState = function(node) {
      var parent = node.$parent;
      while(parent) {
        // 只有选中的子节点，没有未选中的子节点时，当前节点才设置为选中状态
        parent.$checked = hasCheckedNode(parent) && !hasUncheckedNode(parent);
        // 同时有选中的子节点和未选中的子节点时视为待定状态
        parent.$indeterminate = hasCheckedNode(parent) && hasUncheckedNode(parent);
        parent = parent.$parent;
      }
    };
    var setCheckState = function (node, checked) {
      node.$checked = checked;
      if (node.$hasChildren()) {
        angular.forEach(node.$children(), function (subNode) {
          setCheckState(subNode, checked);
        });
      }
      updateAncestorsState(node);
    };
    item.$check = function () {
      setCheckState(this, true);
    };
    item.$unCheck = function () {
      setCheckState(this, false);
    };
    item.$setCheckState = function(checked) {
      setCheckState(this, checked)
    };
    item.$isChecked = function () {
      return this.$checked;
    };
    item.$checkToggle = function () {
      if (this.$isChecked()) {
        this.$unCheck();
      } else {
        this.$check();
      }
    };
    item.$isIndeterminate = function () {
      return this.$indeterminate;
    };
    angular.forEach(item.$children(), function (subItem) {
      enhanceItem(subItem, childrenName, item);
    });
  };
  this.enhance = function (items, childrenName) {
    if (angular.isUndefined(childrenName)) {
      childrenName = 'items';
    }
    angular.forEach(items, function (item) {
      enhanceItem(item, childrenName);
    });
    return items;
  };
});
