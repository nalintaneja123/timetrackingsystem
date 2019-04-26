const mongoose = require('mongoose');

const bcrypt=require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName:String,
    userId:String,
    password:String
},{collection:'user'})

module.exports=UserSchema

