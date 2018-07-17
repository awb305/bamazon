let mysql = require("mysql");
let inquirer = require("inquirer");

let currentItems = [];

let db = mysql.createConnection({
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("connected as item_id " + db.thread + "\n");
  displayItems();
});

function displayItems() {
  console.log("Viewing all products... \n");
  db.query("SELECT item_id, product_name, price FROM products", function(
    err,
    res
  ) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      let object = res[i];
      console.log(object.item_id, object.product_name, object.price);
      currentItems.push(object.item_id.toString());
    }

    purchase();
    console.log(currentItems);
  });
}

function purchase() {
  inquirer
    .prompt([
      {
        name: "item_id",
        message: "What is the ID of the product you'd like to purchase?",
        type: "list",
        choices: currentItems
      },
      {
        name: "units",
        message: "How many units would you like to purchase?"
      }
    ])
    .then(function(res) {
      let item_id = parseInt(res.item_id);
      let units = parseInt(res.units);

      db.query(
        "SELECT stock_quantity, price FROM products WHERE ?",
        {
          item_id: item_id
        },
        function(err, res) {
          if (err) throw err;
          console.log(res);

          let inventory = res[0].stock_quantity;
          let price = res[0].price; 

          if (units > inventory) {
            console.log("Insufficient Inventory! \n");
          } else {
            fullfillment(item_id, units, inventory, price);
          }

          db.end();
        }
      );
    });
}

function fullfillment(item_id, units, inventory, price) {
  let stock_quantity = inventory - units;
  console.log(item_id, inventory, units);

  db.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: stock_quantity
      },
      {
        item_id: item_id
      }
    ],
    function(err, res) {

        let purchasePrice = units*price;
      
        console.log("Purchase price: $" + purchasePrice);
    }
  );

  
}



