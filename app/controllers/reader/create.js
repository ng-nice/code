'use strict';

angular.module('app').controller('ReaderCreateCtrl', function ReaderCreateCtrl(Reader) {
  var vm = this;
  vm.submit = function (form) {
    Reader.save(form,
      function (reader) {
        console.log(reader);
      },
      function (resp) {
        console.log(resp.data);
      }
    );
  };
});
