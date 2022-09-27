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
      let totalAmount = 0
      expenses.forEach(expense => {
        totalAmount += expense.amount
      })
      res.render('home', { expenses, categoryList, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router