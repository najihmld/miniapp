const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routerNavigation = require('./src')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
  res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.listen(3003, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/', routerNavigation)