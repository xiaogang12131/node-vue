const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          // 补全css前缀(解决兼容性)
          autoprefixer(),
          // 把px单位换算成rem单位
          pxtorem({
            rootValue: 37.5,
            exclude: /(node_module)/,
            propList: ['*']
          })
        ],
      },
    },
  },
}