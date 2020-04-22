const connection = require('../config/mysql')

module.exports = {
  createUser: setData => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', setData, (err, result) => {
        if(!err) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          delete newResult.password
          resolve(newResult)
          
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  loginUser: data => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT id, role, username, name FROM users WHERE username=? AND password=?', [data.username, data.password],
        (err, result) => {
          if(!err) {
            resolve(result[0])
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  }
}