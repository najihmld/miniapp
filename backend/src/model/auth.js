const connection = require('../config/mysql')
const helper = require('../helper')

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
        'SELECT * FROM users WHERE username=? AND password=?', [data.username, data.password],
        (err, result) => {
          if(result[0] === undefined) {
            reject(new Error(err))
          }
          else if(!err) {
            resolve(result[0])
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  getUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
          console.log(result)
        }
      })
    })
  },
  setPermissionUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE users SET role=? WHERE id=?', [setData.role, id],
        (err, result) => {
          if(!err) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  }
}