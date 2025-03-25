const express = require('express')
const router = express.Router()
const todoController = require('../controller/todoController')
const {authenticateToken} = require('../middleware/authToken')


router.post('/addtodo',authenticateToken,todoController.addTodo)
router.put('/editTodo/:todoId',authenticateToken,todoController.editTodo)
router.get('/getAllTodos',authenticateToken,todoController.getAllTodos)
router.delete('/deletetodo/:todoId',authenticateToken,todoController.deleteTodo)


module.exports = router