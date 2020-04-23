const jwt = require('jsonwebtoken')
const helper = require('../helper')

module.exports = {
  admin: (request, response, next) => {
    const token = request.headers.authorization

    jwt.verify(token, 'OKANEMO2204', (err, result) => {
      if (
        (err && err.name === 'TokenExpiredError') ||
        (err && err.name === 'JsonWebTokenError')
      ) {
        const result = {message: err.message}
        return helper.response(response, 403, result)
      } else if (result.result.role !== 'admin'){
        const result = {message:"You don't have permission"}
        return helper.response(response, 403, result)
      } else {
        request.token = result
        next()
      }
    })
  },
  user: (request, response, next) => {
    const token = request.headers.authorization

    jwt.verify(token, 'OKANEMO2204', (err, result) => {
      if (
        (err && err.name === 'TokenExpiredError') ||
        (err && err.name === 'JsonWebTokenError')
      ) {
        const result = {message: err.message}
        return helper.response(response, 403, result)
      } else {
        request.token = result
        next()
      }
    })
  }
}