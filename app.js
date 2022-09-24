const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
require('dotenv').config()
require('./config/mongoose')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, () => {
  console.log('456')
})