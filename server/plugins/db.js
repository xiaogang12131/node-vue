module.exports = (app) => {
  const mongoose = require('mongoose')
  //当前的URL字符串解析器被弃用然后也提供了解决方案 让你在选项里面{useNewUrlParser: true}
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue', {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('Connection Successful')
    })
    .catch((err) => {
      console.log(err)
    })
}