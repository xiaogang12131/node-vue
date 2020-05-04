module.exports = (app) => {
  const path = require('path')
  const express = require('express')
  const router = express.Router({
    mergeParams: true,
  })

  //models
  require('../../models/Category')
  require('../../models/Good')

  //中间件
  const authMiddleware = require('../../middleWare/auth')

  router.post('/create', authMiddleware(), async (req, res) => {
    const params = Object.assign({}, req.body)
    if (!params.parent) {
      params.parent = null
    }
    const model = await req.Model.create(params)
    res.send(model)
  })
  router.post('/update', authMiddleware(), async (req, res) => {
    const params = Object.assign({}, req.body)
    if (!params.parent) {
      params.parent = null
    }
    const model = await req.Model.findByIdAndUpdate(params._id, params)
    res.send(model)
  })
  router.post('/list', authMiddleware(), async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    } else if (req.Model.modelName === 'Hero') {
      // queryOptions.populate = [{
      //   path: 'category',
      //   select: 'name'
      // }, {
      //   path: 'items1'
      // }, {
      //   path: 'items2'
      // }]
      queryOptions.populate = 'category items1 items2'
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })
  router.get('/detail/:id', authMiddleware(), async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  router.delete('/delete/:id', authMiddleware(), async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send('删除成功')
  })
  router.get('/parentList', authMiddleware(), async (req, res) => {
    const model = await req.Model.find({
      parent: null,
    })
    res.send(model)
  })

  app.use('/rest/:resource', (req, res, next) => {
    const ModelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${ModelName}`)
    next()
  }, router)

  //图片上传
  const multer = require('multer')
  const upload = multer({
    dest: path.join(__dirname, '/../../uploads'),
  })
  app.post('/upload', authMiddleware(), upload.single('file'), (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}