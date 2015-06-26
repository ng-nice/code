var requireDir = require('require-dir');
var _ = require('lodash');

module.exports = function (server) {
  var routers = requireDir('./routers', {recurse: true});
  _.each(routers, function(router, name) {
    router(server, name);
  });
};
