const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3001,
  user: "root",
  password: "!Dancinginthework43",
  database: "employees"
});

module.exports = connection;