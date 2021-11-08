const { createProxyMiddleware } = require('http-proxy-middleware');

const URL = 'http://54.180.139.91:4000';
// const URL = 'http://localhost:4000';

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: URL,
          changeOrigin: true
      })
  )
};