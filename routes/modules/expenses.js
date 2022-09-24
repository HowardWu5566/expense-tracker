const express = require('express')
const Expense = require('../../models/expense')
const router = express.Router()

router.get('/new', (req, res) => {
  const categoryList = require('../../utils/categoryList')
  const categoryArr = Object.keys(categoryList)
  res.render('new', { categoryArr })
})

router.post('/', (req, res) => {

  Expense.create(req.body)
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router