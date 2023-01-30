const mongoose = require("mongoose");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
var jwt = require("jsonwebtoken");
const User = require("../models/User");

const loginUser = asyncHandler(async (req, res, next) => {
  // const privateKey = process.env.PRIVATE_KEY
  let user = await User.findOne({ accountAddress: req.body.accountAddress });
  // console.log(user);
  if (!user) {
    user = await new User(req.body).save();
  }
  // const token = jwt.sign({
  //     adminName : admin.name,
  //     adminEmail : admin.email
  // },privateKey,{expiresIn:'1h'})
  // const date = new Date();
  // let expiryTime = date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
  res.status(200).json({
    success: true,
    data: "Successfully Logged In"
    // data: admin,
    // token : token,
    // tokenExpiry : expiryTime
  });
  // } else {
  //   return next(new ErrorResponse("Invalid Login Details", 401));
  // }
});

const updateUserData = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  await User.findOneAndUpdate({ accountAddress: req.body.accountAddress},req.body);
  res.status(200).json({
    success: true,
    data: "User Data Successfully updated"
  });
});

const addTransaction = async (accountAddress, transaction) => {
  try{
    // const transaction = {};
    let user = await User.findOne({ accountAddress });
    await user.transactions.push(transaction);
    await user.save();
    return {success: true}
  }
  catch(err){
    return {success: false, error: err}
  }
};

module.exports = { loginUser, updateUserData, addTransaction };
