const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter product name"]
    },
    description:{
        type:String,
        required:[true,"please Enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please Enter product price"],
        maxLength:[8,"Price can't exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        reqired:[true,"Please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter products stock"],
        maxLength:[4,"stocks can't exceed 4 charcters"],
        default:1
    },
    numofreviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
            type:Date,
            default:Date.now

    }
}) 


module.exports = mongoose.model("Product",productSchema);