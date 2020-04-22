const {createUser, loginUser, updateUser} = require('../model/auth')
const helper = require('../helper')
const jwt = require('jsonwebtoken')

module.exports = {
  createUser: async (req, res) => {
    try {
      const setData = {
        role: 'user',
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
      }
      const result = await createUser(setData)
      return helper.response(res, 200, result)
    } catch (err) {
      return helper.response(res, 404, err)
    }
  },
  loginUser: async (req, res) => {
    try {
      const data = {
        username: req.body.username,
        password: req.body.password
      }
      const result = await loginUser(data)
      const token = jwt.sign({result}, 'OKANEMO2204', {expiresIn: '1h'})
      return helper.response(res, 200, {token})
    } catch (err) {
      return helper.response(res, 404, err)
    }
  }
}