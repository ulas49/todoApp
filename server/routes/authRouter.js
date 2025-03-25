const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const {authenticateToken} = require('../middleware/authToken')


router.post('/register',authController.registerUser)
router.post('/login',authController.loginUser)
router.get('/getUser',authenticateToken,authController.getUser)


module.exports=router