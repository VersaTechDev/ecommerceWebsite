// this is for authentication 

// create login , signup page or register page 
import User from "../model/userModel.js";
import validator from "validator"
import bcrypt, { hash } from "bcryptjs"
import { genToken } from "../config/token.js";

export const registration = async (req , res) =>  {
    try{
        const {name , email , password} = req.body ;
        // check valid data
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"user already exist"})
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Enter a valid email"})
        }
        // make password strong if less than than three character not accept the password
      if (password.length < 8) {
    return res.status(400).json({ message: "Create a strong password (min 8 characters)" });
}
// best way to create a password

// if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 })) {
//     return res.status(400).json({ message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol" });
// }


        // making hash password
        let hashPassword = await bcrypt.hash(password,10)//use 10 letter to hash password

        const user = await User.create({name , email , password:hashPassword})

        let token = await genToken(user._id)
        res.cookie("token" , token , {
            httpOnly : true , 
            secure : false , 
            sameSite :  "Strict" , 
            maxAge  : 7*24*60*1000 // 7 days 
        })

        return res.status(201).json(user)


    } catch (error){
        console.log("sign up error or register error")
        return res.status(500).json({ message: `Internal Server Error ${error}` }); //backend error
    }
}


// login 
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            console.log("login unsuccessfully");
            return res.status(404).json({ message: "User not found or not registered" });
        }

        // check password
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // generate token
        let token = await genToken(user._id);

        // set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,  // set true if using https
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.log("login error:", error);
       // return res.status(500).json({ message: "Internal Server Error" });
        return res.status(500).json({ message: `Internal Server Error ${error}` });

    }
};


// logout page 

export const logOut = async (req, res) => {

    try {
// we delete the tooken to logout the page
        res.clearCookie("token")
        return res.status(200).json({message : "logout successful"})
        
    } catch (error) {
          console.log("logOut error:", error);
        return res.status(500).json({ message: `Internal Server Error ${error}` });
    }
    
}