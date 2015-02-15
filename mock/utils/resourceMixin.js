'use strict';
var restify = require('restify');
var _ = require('underscore');

module.exports = function (server) {
  server.resource = function (uri, items, name) {
    server.get('/users', function (req, res, next) {
      var offset = +req.params.offset || 0;
      var size = +req.params.size || 200;
      if (size > 200) {
        next(new restify.InvalidArgumentError("Size parameter must be <= 200"));
      } else {
        res.send(200, items.slice(offset, size));
        next();
      }
    });
    server.head('/users', function (req, res, next) {
      res.send(200, '', {'X-Record-Count': items.length});
      next();
    });
    server.get('/users/:id', function (req, res, next) {
      var item = _.findWhere(items, {id: req.params.id});
      if (!item) {
        next(new restify.NotFoundError('Object with ' + req.params.id + ' not found!'))
      } else {
        res.send(200, item);
        next();
      }
    });
    server.post('/users', function (req, res, next) {
      var item = _.extend({}, req.body, {id: (items.length + 1).toString()});
      items.push(item);
      res.header('Location', '/users/' + item.id);
      res.send(201);
      next();
    });
    server.put('/users/:id', function (req, res, next) {
      var item = _.findWhere(items, {id: req.params.id});
      if (!item) {
        next(new restify.NotFoundError('Object with ' + req.params.id + ' not found!'))
      } else {
        _.extend(item, req.body);
        res.header('Location', '/users/' + item.id);
        res.send(200);
        next();
      }
    });
    server.del('/users/:id', function (req, res, next) {
      var item = _.findWhere(items, {id: req.params.id});
      if (!item) {
        next(new restify.NotFoundError('Object with ' + req.params.id + ' not found!'))
      } else {
        var index = items.indexOf(item);
        console.log('index', index);
        items.splice(index, 1);
        res.send(204);
        next();
      }
    });
  };
};
