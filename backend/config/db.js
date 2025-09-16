import mongoose from "mongoose";
const connectDb = async () =>{
    try {
        let response = await mongoose.connect(process.env.MONGODB_URL)
        console.log("moongodb connected")

    }
    catch(error){
        console.log("DB error", error)
    }
}

export default connectDb 