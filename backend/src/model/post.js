const connection = require('../config/mysql')

module.exports = {
  createPost: setData => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO posts SET ?', setData, (err, result) => {
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
  getPosts: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM posts', (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
          console.log(result)
        }
      })
    })
  }
}