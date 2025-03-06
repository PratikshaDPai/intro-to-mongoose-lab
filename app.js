const prompt = require("prompt-sync")();
const mongoose = require("mongoose");

const selection = prompt({
  ask: `What would you like to do?
  
1. Create a customer
2. View all customers
3. Update a customer
4. Delete a customer
5. quit

Number of action to run: `,
  value: "1",
});

console.log(selection);
