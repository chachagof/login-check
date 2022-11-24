const express = require('express')
const exphbs = require('express-handlebars')
const cookieParse = require('cookie-parser')
const app = express()

const users = require('./public/password/userPassword')
const checking = require('./public/javascript/checking')
const cookieParser = require('cookie-parser')
const port = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('123456789'))

// main page
app.get('/', (req, res) => {
  let isLogin = false
  const name = req.cookies.name
  console.log(name)
  if (name) {
    isLogin = true
    return res.render('success', { name })
  }
  return res.render('index')
})

//login page 
app.post('/checkpage', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const afterCheck = checking(users, email, password)
  if (afterCheck === undefined) {
    return res.render('wrong')
  } else {
    res.cookie('name', afterCheck.firstName,)
    return res.render('success', { afterCheck })
  }
})

// logout
app.get('/logout', (req, res) => {
  res.clearCookie('name')
  return res.redirect('/')
})

app.listen(port, () => {
  console.log('app.js is working')
})