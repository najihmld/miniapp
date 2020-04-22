const express = require('express')
const Route = express.Router()
// const {admin} = require('../middleware/auth')

const {createUser, loginUser, permissioneUser} = require('../controller/auth')

Route
  .post('/register', createUser )
  .post('/login', loginUser)
  // .put('/:id', admin, permissionUser)
module.exports = Route