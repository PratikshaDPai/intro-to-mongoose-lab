require("dotenv").config(); //include .env variables

const prompt = require("prompt-sync")();
const mongoose = require("mongoose");
const Customer = require("./customer");

const uri = process.env.MONGODB_URI;

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Success: connected to mongo");
  } catch (error) {
    console.error(`Error: ${error}`);
  }

  let isRunning = true;
  while (isRunning) {
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

    switch (selection) {
      case "1": {
        const name = prompt({ ask: "What is the customer's name? " });
        const age = parseInt(prompt({ ask: "What is the customer's age? " }));
        const customer = new Customer({ name, age });
        await customer.save();
        break;
      }
      case "2": {
        const customers = await Customer.find({});

        console.log("\nBelow is a list of customers:\n");
        for (const customer of customers) {
          console.log(
            `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
          );
        }
        console.log(); // add an extra newline for formatting

        break;
      }
      case "3": {
        const id = prompt({
          ask: "Copy and paste the id of the customer you would like to update here: ",
        });
        const newName = prompt({ ask: "What is the customer's new name? " });
        const newAge = parseInt(
          prompt({ ask: "What is the customer's new age? " })
        );
        await Customer.findByIdAndUpdate(id, { name: newName, age: newAge });
        break;
      }
      case "4": {
        const id = prompt({
          ask: "Copy and paste the id of the customer you would like to update here: ",
        });
        await Customer.findByIdAndDelete(id);
        break;
      }
      case "5": {
        console.log("exiting...");
        isRunning = false;
        break;
      }
    }
  }

  await mongoose.disconnect();
}

run();
