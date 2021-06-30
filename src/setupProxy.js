const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin:true
 //   target: 'https://pern-api-test.herokuapp.com',
   
  }));
}