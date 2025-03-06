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
        break;
      }
      case "5": {
        isRunning = false;
        break;
      }
    }
  }

  await mongoose.disconnect();
}

run();
