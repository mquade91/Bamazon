var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require('console.table')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});
//Starting Prompt
var start = function() {
    inquirer.prompt({
        name: "buyPrompt",
        type: "rawlist",
        message: "Welcome to BAMAZON! Please choose from the following: Here to [BUY] an item or [ADMIN] access",
        choices: ["BUY", "ADMIN"]
    }).then(function(answer) {
        if (answer.buyPrompt.toUpperCase() == "BUY") {
            buyItem();
        }
        else {
            console.log("ADMIN ACCESS NOT SET UP YET");
        }
    })
};



var buyItem = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer.prompt([{
                name: "choice",
                type: "list",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        console.table(res[i]);
                        // console.log("Product ID: " + res[i].item_id + "\nProduct Name: " + res[i].product_name + " Price: " + res[i].price + " Department Name: " + res[i].department_name + " Stock Count: " + res[i].stock_quantity);
                        choiceArray.push(JSON.stringify(res[i].item_id));
                    }
                    console.log("Please choose your item by corresponding ID number:")
                    return choiceArray;
                },

                message: "What item would you like to buy?"
            },
            {
                name: "howMany",
                type: "input",
                message: "How many units would you like to buy?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
        }
            ]).then(function(answer) {

            var chosenItem;
            // find chosenItem in res array by comparing item_id to answer.choice
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(answer.choice)) {
                    chosenItem = res[i];
                }
            }
            console.log("Quantity before purchase: " + chosenItem.stock_quantity + "\n ");
            connection.query("SELECT stock_quantity FROM products WHERE item_id = '" + answer.choice + "'", function(err, res) {
                if (err) throw err;
                if (answer.howMany < chosenItem.stock_quantity) {
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: chosenItem.stock_quantity - parseInt(answer.howMany)
                    }, {
                        item_id: chosenItem.item_id
                    }], function(err, res) {
                        console.log("Customer Total: $" + answer.howMany * chosenItem.price);

                    });

                }
                else {
                    console.log("We're sorry but we cannot fullfill your order: Insufficient Quantity");
                    connection.end();
                    // buySomethingElse();
                }
            })
        });

    });

}
