const express = require('express')
const expense = require('../../models/expense')
const router = express.Router()
const Expense = require('../../models/expense')

router.get('/', (req, res) => {
  Expense.find()
    .lean()
    .sort({ date: 1 })
    .then(expenses => {
      const categoryList = require('../../utils/categoryList')
      const categoryArr = Object.keys(categoryList)
      expenses.forEach(expense =>
        expense.categoryIcon = categoryList[expense.category]
      )
      res.render('home', { expenses, categoryArr })
    })
})

module.exports = router