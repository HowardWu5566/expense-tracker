const express = require('express')
const Expense = require('../../models/expense')
const router = express.Router()

router.get('/new', (req, res) => {
  const categoryArr = Object.keys(require('../../utils/categoryList'))
  res.render('new', { categoryArr })
})

router.post('/', (req, res) => {
  Expense.create(req.body)
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const categoryArr = Object.keys(require('../../utils/categoryList'))
  return Expense.findById(id)
    .lean()
    .then(expense => res.render('edit', { expense, categoryArr }))
    .catch(error => console.log(error))
})

module.exports = router