const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')
const Record = require('../../models/record')
const categoryList = require('../../models/seeds/category.json')

router.get('/', (req, res) => {
  const userId = req.user._id
  const categoryName = req.query.category
  Record.find({ userId })
    .populate('categoryId')
    .lean()
    .sort({ date: 1 })
    .then(expenses => {
      // 依類別篩選
      if (categoryName && categoryName !== 'All') {
        expenses = expenses.filter(expense => expense.categoryId.name === categoryName)
      }
      // 計算總費用及修改日期格式
      let totalAmount = 0
      expenses.forEach((expense, index) => {
        if (index % 2 === 0) expense.background = true
        totalAmount += expense.amount
        expense.date = dayjs(expense.date).format('YYYY/MM/DD')
      })
      res.render('home', { expenses, categoryList, categoryName, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router