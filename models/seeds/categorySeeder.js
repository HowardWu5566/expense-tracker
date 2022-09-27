const Category = require('../category')
const categoryList = require('./category.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(categoryList)
    .then(() => {
      console.log('Categories are created.')
      process.exit()
    })
})