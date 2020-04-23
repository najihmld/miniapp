const express = require('express')
const Route = express.Router()

const auth = require('./routes/auth')
const post = require('./routes/post')

Route
  .use('/auth', auth)
  .use('/post', post)

module.exports = Route