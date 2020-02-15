module.exports = {
  proxyList: {
    '/api': {
      /* 处理跨域问题 */
      target: 'http://localhost:3333',
      changeOrigin: true
    }
  }
}
