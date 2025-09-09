import jwt from "jsonwebtoken"

export const genToken = async (userId) =>{
    try{
        let token = await jwt.sign({userId}, process.env)
        return token 
    }
    catch(error){
        console.log("token error")
    }
}