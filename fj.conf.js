'use strict';

module.exports = function (config) {
  config.name = 'com.ngnice.app';
  config.rules = [
    {
      url: /^\/api\/(.*)$/, // 要代理的url，可以是正则表达式，也可以是字符串，如果是字符串(假设为'/api')则将被处理成/^\/api\/(.*)$/的形式
      rewrite: '/$1',  // 可选，默认把原来的url完全传过来，即：不重写
      proxy: 'http://localhost:5050/', // 反向代理设置
      cookie: {
        path: '/api',  // 覆盖原服务器的cookie path设置（如果有）
        domain: 'localhost' // 覆盖原服务器的cookie domain设置（如果有）
      },
      delay: 100 // 延迟毫秒数，可选
    }
  ];
  // 用户自定义的middleware将优先于默认的
  config.middlewares = [
    function(req, res, next) {
      next();
    }
  ];
};
