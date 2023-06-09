const express=require('express')
const dotenv= require('dotenv').config()
const{errorHandler}=require('./middleware/errorMiddleware')
const color= require('colors')
const connectDB= require('./config/db')
const port= process.env.PORT || 5000

connectDB()

const app= express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)




app.listen(port,()=>console.log(`listening started at ${port}`))