const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        
    },
},{timestamps:true})




const User = mongoose.model('user',userSchema)

module.exports=User