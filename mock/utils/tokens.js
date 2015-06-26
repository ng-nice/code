var crypto = require('crypto');

var tokens = {};

module.exports = {
  add: function(data) {
    var token = crypto.randomBytes(16).toString('base64');
    tokens[token] = data;
    return token;
  },
  remove: function(token) {
    delete tokens[token];
  },
  lookup: function(token) {
    return tokens[token];
  }
};
