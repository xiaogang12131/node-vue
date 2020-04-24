module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')

  router.post('/create', async (req, res) => {
    const params = Object.assign({}, req.body);
    if (!params.parent) {
      params.parent = null
    }
    const model = await Category.create(params)
    res.send(model)
  })
  router.post('/update', async (req, res) => {
    const params = Object.assign({}, req.body);
    if (!params.parent) {
      params.parent = null
    }
    const model = await Category.findByIdAndUpdate(params._id, params)
    res.send(model)
  })
  router.post('/list', async (req, res) => {
    const model = await Category.find().populate('parent');
    res.send(model)
  })
  router.get('/detail/:id', async (req, res) => {
    const model = await Category.findById(req.params.id);
    res.send(model)
  })
  router.delete('/delete/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.send("删除成功")
  })
  router.get('/parentList', async (req, res) => {
    const model = await Category.find({
      "parent": null
    });
    res.send(model)
  })

  app.use('/category', router)
}