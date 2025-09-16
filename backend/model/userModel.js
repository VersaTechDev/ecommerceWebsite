import mongoose from "mongoose";

// create a schema 
const userSchema = new mongoose.Schema({
    name:{
        type: String , 
        required : true 
    }, 
    email:{
        type: String , 
        required : true ,
        unique: true // this is using because user can not use same gmail to create multiple account 
    }, 
    password :{
        type : String , 
        required : true 
    },
    cartData :{
        type : Object ,
        default:{}
    }
},{timestamps : true , minimize:false})

const User = mongoose.model("user" , userSchema) 

export default User 