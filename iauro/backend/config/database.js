const { Console } = require("console");
const mongoose = require("mongoose");


const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
    
    mongoose.connection.on("connected",()=>{
        console.log("connected to mongodb");
    });
}

module.exports = connectDatabase