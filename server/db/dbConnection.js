const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


mongoose.connect(process.env.DATABASE_CONNECTION).then(_=>console.log("DB bağlantısı başarılı")).catch(err=>console.log("DB Bağlantısı başarısız " + err))