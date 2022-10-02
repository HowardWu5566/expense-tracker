const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const categoryList = require('../../models/seeds/category.json')


router.get('/new', (req, res) => {
  res.render('new', { categoryList })
})

router.post('/', (req, res) => {
  Category.findOne({ name: req.body.category })
    .lean()
    .then(category => {
      req.body.userId = req.user._id
      req.body.categoryId = category._id
      Record.create(req.body)
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(expense => res.render('edit', { expense, categoryList }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(expense => {
      expense.name = req.body.name
      expense.date = req.body.date
      expense.category = req.body.category
      expense.amount = req.body.amount
      return expense.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router