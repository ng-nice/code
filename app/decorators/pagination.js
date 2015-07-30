'use strict';

angular.module('com.ngnice.app').directive('bfPagination', function bfPagination(Pagination) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      // 选项变化时重新生成
      scope.$watch(function () {
        return scope.$eval(attrs.bfPagination);
      }, function (options) {
        // 装饰器型指令只是让我们可以从视图中访问Pagination服务的一个桥梁
        scope.$pager = new Pagination(options);
      }, true /* 这个true参数表示比较对象内容而不是对象引用 */);
      // 当分页标签的激活页码变化时更新ngModel
      scope.$watch(function () {
        return scope.$pager.activeIndex;
      }, function (index) {
        ngModel.$setViewValue(index);
      });
      // 当ngModel变化时更新分页标签的激活页码
      ngModel.$render = function () {
        if (scope.$pager) {
          scope.$pager.activeIndex = ngModel.$modelValue;
        }
      };
    }
  };
});
