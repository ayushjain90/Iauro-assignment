const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[20,"name can't exceed 20 characters"],
        minLength:[4,"Name should have more than 4 chracter"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique: true,
        validate: [validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required: [true,"Please enter your passwor"],
        minLength:[8,"Name should have more than 8 chracter"],
        select:false
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordtoken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


module.exports = mongoose.model("user",userSchema)