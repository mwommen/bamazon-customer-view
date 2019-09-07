var mysql = require("mysql");
var inquirer = require("inquirer");

// Connects to the database.
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "cardinals1",
  database: "bamazon"
});

connection.connect(function(err) {
if(err) throw err;

managerSelection();
});

var managerSelection = function() {
    inquirer.prompt([
        {
        type:'list',
        name: 'action',
        message: 'what would you like to do',
        choices: ['View products for sale',
                    'View low Inventory',
                    'Add to Inventory',
                    'Add new Product' ]
},

console.log("We got here")
]).then (function(answer) {
    switch (answer.action) {
        case "View Products for Sale":
            viewProducts();
            break;

        case "View Low Inventory":
            viewLowInventory();
            break;

        case "Add to Inventory":
            addInventory(); 
            break;

        case "Add New Product":
            addProduct();
            break; 
    }
});
};
//After this I need to create a function for each of the cases to allow the manager to view products, add products, 
// view the inventory, and add to inventory. 