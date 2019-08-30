var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "bamazon",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "cardinals1",
  database: "bamazon"
});

