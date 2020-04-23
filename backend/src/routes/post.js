const express = require('express')
const Route = express.Router()
const {admin, user} = require('../middleware/auth')

const {createPost, getPosts} = require('../controller/post')

Route
  .post('/', admin, createPost)
  .get('/', user, getPosts)
module.exports = Route