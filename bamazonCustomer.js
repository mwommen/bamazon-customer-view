var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",
  password: "cardinals1",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });

  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    console.log(res);
    //Here
inquirer
  .prompt([

    {
    type: "input",
    name: "product_id",
    message: "Choose product ID."
    //validate method, which checks to se if user entered number
    },
    {
        type: "input",
        name: "quantity",
        message: "Choose the number of products."
        //validate method, which checks to se if user entered number
        }
  ])
  .then(answers => {
    console.log(answers);
    connection.query('SELECT * FROM products WHERE id=?',[answers.product_id], function (err, res) {
        if(err) throw(err);
        console.log(res);
        //If results are zero check here and return so it does not ref stock qty
        if(res[0].stock_quantity >= +answers.quantity){
            var newQty = res[0].stock_quantity - +answers.quantity;
            connection.query('UPDATE products SET stock_quantity=? WHERE id=?',[newQty, answers.product_id], function (err, res) {
                if (err)throw err;
                console.log(res);
            })
            //We can make a sale
            //Make another query to UPDATE what ever produxt at that id to the new stick QTY
            //Calculate users total cost and console log back
            //More advanced set up your app so you can re run the products so user coudl pruchase more
        }
        else {
            //Let user know in fact not enough QTY
        }
    })
  })
  .catch(err => {
      console.log(err);
  });

});

