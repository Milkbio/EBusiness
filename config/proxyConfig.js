module.exports = {
  proxyList: {
    '/api': {
      /* 处理跨域问题 */
      target: 'http://www.happymmall.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': ''
      }
    }
  }
}
