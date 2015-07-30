'use strict';

angular.module('com.ngnice.app').controller('LayoutFooterController', function LayoutFooterController() {
  var vm = this;

});
angular.module('com.ngnice.app').directive('layoutFooter', function LayoutFooter() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/layout/footer.html',
    controller: 'LayoutFooterController as vm'
  };
});
