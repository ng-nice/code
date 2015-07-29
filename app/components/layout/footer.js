'use strict';

angular.module('app').controller('LayoutFooterController', function LayoutFooterController() {
  var vm = this;

});
angular.module('app').directive('layoutFooter', function LayoutFooter() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/layout/footer.html',
    controller: 'LayoutFooterController as vm'
  };
});
