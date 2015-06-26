var users = require('./resources/users');
var tokens = require('./utils/tokens');

var roles = {
  zhangsan: ['ROLE_Admin', 'Guest'],
  lisi: 'ROLE_Admin'
};
var permissions = {
  ROLE_Admin: ['GET /users/?.*', 'ALL /users/?.*', 'GET /readers'],
  Guest: 'GET /readers/.*'
};

var needAuthorize = function(req) {
  return tokens.get(req.header.access_token);
};

var isAccessible = function(req) {
  return false;
};

module.exports = {
  preFilter: function (req, res, next) {
    if (needAuthorize(req)) {
      res.writeHead(401, {
        'Content-Type': 'text/plain;charset=utf-8'
      });
      return res.end('请先登录');
    }
    if (!isAccessible(req)) {
      res.writeHead(403, {
        'Content-Type': 'text/plain;charset=utf-8'
      });
      return res.end('没有权限访问此地址');
    }
    next();
  },
  login: function(req, res) {
    var user = _.findWhere(users, {username: req.body.username, password: req.body.password});
    var token = tokens.add(user);
    res.send(201, {accessToken: token});
  },
  logout: function(req, res) {
    tokens.remove(req.headers.authorization.access_token);
    res.send(204);
  },
  createClient: function(req, res) {
    var user = _.findWhere(users, {username: req.body.username, password: req.body.password});
    var token = tokens.add(user);
    res.send(201, {accessToken: token});
  },
  removeClient: function(req, res) {
    tokens.remove(req.headers.authorization.access_token);
    res.send(204);
  }
};
