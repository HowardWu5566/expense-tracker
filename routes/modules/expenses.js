const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')


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
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Expense.findById(id)
    // .lean()
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
  return Expense.findById(id)
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router