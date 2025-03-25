const mongoose = require('mongoose')
const Schema = mongoose.Schema


const todoSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[],
    },
    userId:{
        type:String,
    },
    fileUrl:{
        type:String,
        
    },
    imageUrl:{
        type:String,
    },
},{timestamps:true})




const Todo = mongoose.model('todo',todoSchema)

module.exports=Todo