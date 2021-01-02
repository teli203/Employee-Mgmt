// Dependencies //
const mysql = require("mysql");

// MySQL connection //
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "hardworkeR/1",
  database: "employee_mgmt_db" 
});

module.exports = connection;
