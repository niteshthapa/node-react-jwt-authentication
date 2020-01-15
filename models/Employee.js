const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
      },
    email:{
        type:String,
        required:true,
        unique:true,
       },
    password:{
        type:String,
        required:true
       },
    createdOn:{
        type:Date,
        default:Date.now
    }
   })
module.exports = mongoose.model("employees",EmployeeSchema);