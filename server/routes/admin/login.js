module.exports = (app) => {
  const assert = require('http-assert')

  //登录
  app.post('/login', async (req, res) => {
    const {
      username,
      password
    } = req.body
    //1.根据用户名查找用户
    const AdminUser = require('../../models/AdminUser')
    const user = await AdminUser.findOne({
      username,
    }).select('+password')
    assert(user, 422, '用户名不存在')

    //2.判断用户名和密码是否匹配
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码不正确')

    //3.设置token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))
    res.send({
      token
    })
  })

  // 错误处理
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}