const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
const Record = require('../../models/record')
const categoryList = require('../../models/seeds/category.json')

router.get('/', (req, res) => {
  const userId = req.user._id
  const { category, startDate, endDate } = req.query
  Record.find({ userId })
    .populate('categoryId')
    .lean()
    .sort({ date: 1 })
    .then(expenses => {
      // 依類別篩選
      if (category && category !== 'All') {
        expenses = expenses.filter(expense => expense.categoryId.name === category)
      }
      // 依日期篩選
      if (startDate || endDate) {
        dayjs.extend(isSameOrAfter)
        dayjs.extend(isSameOrBefore)
        expenses = expenses.filter(expense => dayjs(expense.date).isSameOrAfter(startDate))
        expenses = expenses.filter(expense => dayjs(expense.date).isSameOrBefore(endDate))
      }
      // 計算總費用及自訂日期格式
      let totalAmount = 0
      expenses.forEach((expense, index) => {
        if (index % 2 === 0) expense.background = true
        totalAmount += expense.amount
        expense.date = dayjs(expense.date).format('YYYY/MM/DD')
      })
      res.render('home', { expenses, categoryList, category, startDate, endDate, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router