const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const categoryList = require('../../models/seeds/category.json')

router.get('/', (req, res) => {
  const userId = req.user._id
  const categoryName = req.query.category
  // console.log(req.query)
  Expense.find({ userId })
    .populate('categoryId')
    .lean()
    .sort({ date: 1 })
    .then(expenses => {
      if (categoryName && categoryName !== 'All') {
        expenses = expenses.filter(expense => expense.categoryId.name === categoryName)
      }
      let totalAmount = 0
      expenses.forEach(expense => {
        totalAmount += expense.amount
      })
      res.render('home', { expenses, categoryList, categoryName, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router