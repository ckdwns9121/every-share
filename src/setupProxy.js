const { createProxyMiddleware } = require('http-proxy-middleware');

const URL = 'http://13.125.94.243:4000';

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: URL,
      changeOrigin: true,
    })
  );
};
