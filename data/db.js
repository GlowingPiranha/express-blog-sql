const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "blog_db"
})

connection.connect((err) => {
  if (err) {
    console.log(err)
  }
  else {
    console.log("Connected to mysql")
  }
})

module.exports = connection;