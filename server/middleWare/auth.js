module.exports = options => {
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')

  return async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请提供jwt token')
    const {
      id
    } = jwt.verify(token, req.app.get('secret'), err => {
      console.log(err)
      switch (err.name) {
        case 'TokenExpiredError': // 当token超时时抛出。
        case 'NotBeforeError': // 当当前时间超过nbf的值时抛出该错误。
          let payload = jwt.decode(token)
          token = authenticate.getToken({
            _id: payload._id
          })
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.send({
            success: true,
            token: token,
            status: '已经刷新token'
          })
          break
        case 'JsonWebTokenError': // jwt错误
        default:
          res.statusCode = 401
          res.send({
            code: 401,
            data: {
              error: err
            },
            message: '无效的jwt token'
          })
          break
      }
    })
    assert(id, 401, '无效的jwt token')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    next()
  }
}