const Todo = require('../models/todoModel')
const jwt = require('jsonwebtoken')
const createError = require('../utils/createError')


const addTodo = async (req,res,next)=>{
 const {title,content,tags} = req.body
//  const { image} = req
 const {user} = req.user
 const userInfo=user.user

// console.log("image",image);


 if(!title){
    return next(createError(400,"Title is required"))
 }

 if(!content){
    return next(createError(400,"Content is required"))
 }


 try {
    const todo = new Todo({
        title,
        content,
        tags:tags || [],
        userId:userInfo._id,
        imageUrl: req.file && req.file.location
    })

    await todo.save()

    res.json({
        todo,
        message:"Todo added!"
    })
 } catch (error) {
    console.log("error",error);
    
 }

}

const editTodo = async (req,res,next)=>{
    const todoId = req.params.todoId
    const {title,content,tags} = req.body
    // const { image, file } = req
    const {user}=req.user
    const userInfo=user.user


    if(!title && !content && !tags){
        return next(createError(400,"No changes"))
    }

    try {
        const todo = await Todo.findOne({_id:todoId,userId:userInfo._id})

        if(!todo){
            return next(createError(404,"Todo not found"))
        }


        if(title) todo.title = title
        if(content) todo.content = content
        if(tags) todo.tags=tags
        // if(file) todo.fileUrl=file.location
        if(req.file) todo.imageUrl=req.file && req.file.location

        await todo.save()

        return res.json({
            todo,
            message:"Todo Updated"
        })
    } catch (error) {
        next(500,"Internal Server Error")
    }

}

const getAllTodos = async (req,res,next)=>{
    const {user} = req.user
    const userInfo=user.user
    
    

    try {
        const todos = await Todo.find({userId:userInfo._id})
        return res.json({
            todos
        })
    } catch (error) {
        next(createError(500,"Internal Server Error"))
    }

}

const deleteTodo = async (req,res,next)=>{
    const todoId = req.params.todoId
    const {user} = req.user
    const userInfo=user.user


    try {
        const todo = await Todo.findOne({_id:todoId,userId:userInfo._id})
        if(!todo) {
            return next(createError(404,"Todo  not found"))
        }
        
        await Todo.deleteOne({_id:todoId,userId:userInfo._id})

        return res.json({
            message:"Todo deleted",
            success:true
        })
    } catch (error) {
         next(createError(500,"Internal Server Error"))
    }
}


module.exports = {
    addTodo,
    editTodo,
    getAllTodos,
    deleteTodo
}