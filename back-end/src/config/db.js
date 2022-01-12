const mongoose = require("mongoose");
const env = require('dotenv');

env.config();

module.exports =  connect =  async () => {
    
    try{
        const response = await mongoose.connect(process.env.URL);
        console.log("connection success")
    } catch (error){
        console.log(error)
    }
}

