const mysql = require("mysql");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "10As2000*",
  database: "employer",
});

module.exports = con;
