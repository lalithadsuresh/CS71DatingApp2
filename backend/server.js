const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const userRoutes = require('./Routes/AuthRoute');
const profileRoutes = require('./Routes/ProfileRoute');
const matchRoutes = require('./Routes/MatchRoute');
const cors = require('cors');


dotenv.config(); // load environment variables

const app = express();
const port = 5001;

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
// app.get() takes a callback function as an argument
// express registers this route, stores callback function
// and express listens (waits for requests) so when we visit
// localhost:5001, express calls function(req, res)
// req -> details about the request
// res -> data sent back to client

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
//app.use('/api/match', matchRoutes);


// route "/hello" testing for fun 
app.get ('/hello', function (req, res) {
    res.send('Hi');
})

// initialize listening port (endpoint in networking)
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
