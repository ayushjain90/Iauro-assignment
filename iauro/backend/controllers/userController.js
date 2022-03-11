const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken")
exports.registerUser = catchAsyncErrors(async(req,res,next) => {
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password
    });
    
    sendToken(user,201,res);
}); 

exports.signinUser = catchAsyncErrors(async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please Enter email and password",400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email and password",401));
    }

    const ispasswordMatched = await user.comparePassword(password);
    if(!ispasswordMatched){
        return next(new ErrorHandler("Invalid email and password",401));
    }

    sendToken(user,200,res);
    
});

exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true,    
    });

    res.status(200).json({
        success: true,
        message:"logged out"
    });
})