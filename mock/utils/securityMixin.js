var tokens = require('./utils/tokens');

module.exports = function (users, roles, token, requestmap) {
  this.login = function (username, password) {
    var user = _.findWhere(users, {username: username, password: password});
    return tokens.add(user);
  };
  this.logout = function (token) {
    tokens.remove(token);
  };
  this.currentUser = function (token) {
    return tokens.lookup(token);
  };
  this.needAuthorize = function (url, method, user) {
    return true;
  };
  this.isAccessible = function (url, method) {
    return true;
  };
};
