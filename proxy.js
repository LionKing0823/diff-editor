const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://hjdata.webank.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/', // rewrite path
    },
  }),
);
app.listen(3000); //这个端口号就是proxy运行的端口号
