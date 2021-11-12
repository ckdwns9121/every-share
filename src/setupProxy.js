const {API_PATH} = require('./core/utils/path');
const { createProxyMiddleware } = require('http-proxy-middleware');



module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: API_PATH,
          changeOrigin: true
      })
  )
};