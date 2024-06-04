const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

app.use('/api/users', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true }));
app.use('/api/pomodoros', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));

app.listen(3000, () => {
    console.log('API Gateway running on port 3000');
})