const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const categoryList = require('../../models/seeds/category.json')

router.get('/', (req, res) => {
  const userId = req.user._id
  Expense.find({ userId })
    .populate('categoryId')
    .lean()
    .sort({ date: 1 })
    .then(expenses => {
      console.log(expenses)
      res.render('home', { expenses, categoryList, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router