const express = require('express')
require('./db/dbConnection')
const cors = require('cors')
const { imageUpload, fileUpload } = require('./middleware/upload');

const authRouter = require('./routes/authRouter')
const todoRouter = require('./routes/todoRouter')


const app = express()


app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




app.use('/api/auth', authRouter)
app.use('/api/todo', todoRouter)


app.post('/upload/image', imageUpload.single('image'), (req, res) => {
    
    
    res.json({ imageUrl: req.file.location });
  });

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"

    return res.status(errorStatus).send(errorMessage)


})

app.listen(3000, (req, res) => {

    console.log("Sistem 3000 portunda çalışıyor");
})