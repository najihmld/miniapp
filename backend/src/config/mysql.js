const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'okanemo'
})

connection.connect(err => {
  if(err) throw err;
  console.log("You're now connected...")
})

module.exports = connection