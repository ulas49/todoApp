const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const createError = require('../utils/createError')

const registerUser = async (req,res,next)=>{
    try {
        const {name,surname,email,password} = req.body;

        if(!name) return  next(createError(400,"name is required")) 
        if(!surname) return  next(createError(400,"surname is required"))  
        if(!email) return next(createError(400,"email is required"))  
        if(!password) return next(createError(400,"password is required"))  

        const isUser = await User.findOne({email:email})
    
        if(isUser){
            return res.status(400).json({message:'User already exist!'})
        } 
        
        const user = new User({
            name,
            surname,
            email,
            password
        })
        console.log("user",user);
        
        await user.save()

        const accessToken = jwt.sign({user},process.env.JWT_KEY,{expiresIn:"30000m"})

        return res.json({
            user,
            accessToken,
            message:"Registration Successful!"
        })




    } catch (error) {
        next(error)
    }
}


const loginUser = async (req,res,next)=>{
    try {
        const {email,password} = req.body;


        if(!email) return next(createError(400,"email is required"))  
        if(!password) return next(createError(400,"password is required"))  

        const userInfo = await User.findOne({email:email})
    
        if(!userInfo){
            return next(createError(404,"User not found!"))
        } 
        
        if(userInfo.email === email && userInfo.password === password){
            const user = {user:userInfo}
            const accessToken = jwt.sign({user},process.env.JWT_KEY,{expiresIn:"30000m"})

            return res.json({
                email,
                accessToken,
                message:"Login Successful!"
            })
        }else{
            return res.status(400).json({
                message:"Invalid Credentials"
            })
        }
       
        


    } catch (error) {
        next(error)
    }
}

const getUser = async (req,res,next)=>{
    const {user} = req.user
    const userInfo = user.user

    const isUser = await User.findOne({_id:userInfo._id})
  
    if(!isUser){
        return next(createError(401,"Unauthorized"))
    }

    return res.json({user:isUser})
}


module.exports = {
    registerUser,
    loginUser,
    getUser
}