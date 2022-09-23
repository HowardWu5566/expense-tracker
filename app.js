const express = require('express')
const exphbs = require('express-handlebars');

const app = express()
const PORT = process.env.PORT

require('./config/mongoose')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log('456')
})