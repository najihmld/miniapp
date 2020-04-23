const express = require('express')
const Route = express.Router()
const {admin} = require('../middleware/auth')

const {createUser, loginUser, getUsers, setPermissionUser} = require('../controller/auth')

Route
  .post('/register', createUser )
  .post('/login', loginUser)
  .get('/users', admin, getUsers)
  .put('/:id', admin, setPermissionUser)
module.exports = Route