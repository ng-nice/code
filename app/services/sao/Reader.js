'use strict';

angular.module('com.ngnice.app').factory('Reader', function ReaderFactory($resource) {
  return $resource('/api/readers/:id');
});
