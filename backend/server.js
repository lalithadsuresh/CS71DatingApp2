const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');

dotenv.config(); // load environment variables

const app = express();
const port = 5000;

// extract mongoDB database URI (string identifier) from
// environment variables
const MONGO_URI = process.env.MONGO_URI;

// connect mongoDB database cluster

async function startServer () {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected!");
    } catch (error) {
        console.log(error.message);

    }
};

startServer();

// get request to '/' route to specified path
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// route "/hello" testing for fun 
app.get ('/hello', function (req, res) {
    res.send('Hi');
})

// initialize listening port (endpoint in networking)
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
