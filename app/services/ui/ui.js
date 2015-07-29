'use strict';

angular.module('app').controller('UiPromptController', function UiPromptController($scope) {
  var vm = this;
  vm.submit = function () {
    if (vm.result) {
      $scope.$close(vm.result);
    }
  };
});
angular.module('app').service('ui', function Ui($modal, $rootScope) {
  this.prompt = function (message, defaultValue, title, secret) {
    var scope = $rootScope.$new(true);
    scope.title = title || '提问';
    scope.message = message;
    scope.secret = secret;
    var modal = $modal.open({
      templateUrl: 'services/ui/prompt.html',
      controller: 'UiPromptController as vm',
      size: 'sm',
      scope: scope
    });
    return modal.result;
  };
  this.promptPassword = function (message, defaultValue, title) {
    return this.prompt(message, defaultValue, title, true);
  };
});
