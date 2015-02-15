'use strict';

module.exports = function (config) {
  // 可以定义多条规则，后面的规则会覆盖前面的
  config.rules = [
    {
      url: /^\/api\/(.*)$/, // 要代理的url，可以是正则表达式，也可以是字符串，如果是字符串(假设为'/api')则将被处理成/^\/api\/(.*)$/的形式
      rewrite: '$1',  // 可选，默认把原来的url完全传过来，即：不重写
      proxy: 'http://localhost:8080/api/', // 反向代理设置
      cookie: {
        path: '/api',
        domain: 'localhost'
      },
      delay: 500  // 延迟毫秒数，可选
    },
    {
      url: '^/api/books',
      delay: 3000
    }
  ];
  // 用户自定义的middleware将优先于默认的
  config.middlewares = [
    function(req, res, next) {
      next();
    }
  ];
};
