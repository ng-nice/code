'use strict';

var users = require('../resources/users');

module.exports = function (server, name) {
  server.resource('/users/:id', users, name);
};
