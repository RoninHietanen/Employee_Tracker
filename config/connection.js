const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3001,
  user: "root",
  password: "",
  database: "employees"
});

module.exports = connection;