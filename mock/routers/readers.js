'use strict';

var readers = require('../resources/readers');

module.exports = function (server, name) {
  server.resource(name, readers);
};
