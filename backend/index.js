import express from 'express' 

import dotenv from 'dotenv' 
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
dotenv.config() 
// we arre taking two port one is 8000 and another is 6000 if 8000 not working some how then or operator work with 6000 
let port = process.env.PORT  || 6000 

let app = express() 

app.use(express.json()) // data come in json format

app.use(cookieParser())

app.use("/api/auth" , authRoutes)


app.listen(port,() =>{
    console.log("Hello vikrant") ;
    connectDb() ;
})