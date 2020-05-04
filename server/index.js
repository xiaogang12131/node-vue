const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('secret', '1231s2rtu312sf')

app.use(require('cors')())
// app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
app.use(bodyParser.json())

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/admin/login')(app)

// 错误处理
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    message: err.message
  })
})
app.listen(3000, () => {
  console.log('http://localhost:3000')
})