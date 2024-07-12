const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.uniswap.org',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/v1',
      },
    })
  );
};