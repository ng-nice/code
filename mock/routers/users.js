'use strict';

var users = require('../resources/users');

module.exports = function (server, name) {
  server.resource(name, users);
};
