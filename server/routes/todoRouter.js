const express = require('express')
const router = express.Router()
const todoController = require('../controller/todoController')
const {authenticateToken} = require('../middleware/authToken')
const { imageUpload, fileUpload } = require('../middleware/upload');


router.post('/addtodo',authenticateToken,imageUpload.single('image'),todoController.addTodo)
router.put('/editTodo/:todoId',authenticateToken,imageUpload.single('image'),todoController.editTodo)
router.get('/getAllTodos',authenticateToken,todoController.getAllTodos)
router.delete('/deletetodo/:todoId',authenticateToken,todoController.deleteTodo)
router.get('/search-todos/',authenticateToken,todoController.searchTodo)


module.exports = router