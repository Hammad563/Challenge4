const env = require('dotenv');
const express = require("express");
const bodyParser = require('body-parser')
const app  = express();
const connect = require('./src/config/db');

const router = require('./src/routes/userRoutes')
const postRoutes = require('./src/routes/postRoutes')

// environment variable
env.config();

// connect MongoDB Database
connect();
app.use(bodyParser.json());


app.get('/', (req,res) => {
    res.send('Hello')
})
app.listen(process.env.PORT, () => {
    console.log("Your app is running")
});


// routes
app.use("/", router);
app.use('/', postRoutes);