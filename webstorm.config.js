'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  context: path.resolve(__dirname, './'),
  publicPath: 'https://fangsblog.oss-cn-shanghai.aliyuncs.com/blogview/', // 文件加载设置为相对路径
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  }
}
