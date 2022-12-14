const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
require('dotenv').config()
require('./config/mongoose')
const handlebarsHelpers = require('./utils/handlebars-helper')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', helpers: handlebarsHelpers }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
const flash = require('connect-flash')
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})