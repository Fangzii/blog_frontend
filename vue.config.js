const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const oss = require('./oss.config')
const WebpackAliyunOss = require('webpack-aliyun-oss')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const baseAPI = 'http://3.114.86.155/api/'

// vue.config.js
module.exports = {
  outputDir: 'dist',
  publicPath: oss.buildPath, // 文件加载设置为相对路径
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463

   */
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new WebpackAliyunOss({
        from: ['./dist/**'], // 上传那个文件或文件夹  可以是字符串或数组
        dist: '/blogview', // 需要上传到oss上的给定文件目录
        region: oss.region,
        accessKeyId: oss.accessKeyId,
        accessKeySecret: oss.accessKeySecret,
        bucket: oss.bucket,

        // test: true,
        // 上面一行，可以在进行测试看上传路径是否正确, 打开后只会显示上传路径并不会真正上传;

        // 因为文件标识符 "\"  和 "/" 的区别 不进行 setOssPath配置,上传的文件夹就会拼到文件名上, 丢失了文件目录,所以需要对setOssPath 配置。
        setOssPath: filePath => {
          // some operations to filePath
          const index = filePath.lastIndexOf('dist')
          const Path = filePath.substring(index + 4, filePath.length)
          return Path.replace(/\\/g, '/')
        },
        setHeaders: filePath => {
          // some operations to filePath
          // return false to use default header
          return {
            'Cache-Control': 'max-age=31536000'
          }
        }
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true // 清除console
            }
          }
        })
      ]
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    /* svgRule.oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    */
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'font-family': [
            'Monaco',
            'Consolas',
            'Chinese Quote',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'PingFang SC',
            'Hiragino Sans GB',
            'Microsoft YaHei',
            'Helvetica Neue',
            'Helvetica',
            'Arial',
            'sans-serif',
            'Apple Color Emoji',
            'Segoe UI Emoji',
            'Segoe UI Symbol'
          ]
          /* less 变量覆盖，用于自定义 ant design 主题 */

          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    proxy: {
      '/api': {
        target: baseAPI, // 开发环境地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
    // https: true
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: ['vue-clamp', 'resize-detector']
}
