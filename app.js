const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const users = require('./public/password/userPassword')
const checking = require('./public/javascript/checking')
const port = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

// main page
app.get('/', (req, res) => {
  res.render('index')
})

//login page 
app.post('/checkpage', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const afterCheck = checking(users, email, password)
  if (afterCheck === undefined) {
    return res.render('wrong')
  }
  return res.render('success', { afterCheck })
})

app.listen(port, () => {
  console.log('app.js is working')
})