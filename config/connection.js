const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3001,
  user: "root",
  password: "",
  database: "employees_DB"
});

module.exports = connection;