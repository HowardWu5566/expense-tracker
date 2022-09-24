const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  // userId: {
  //   type: String,
  //   required: true
  // },
  category: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Expense', expenseSchema)