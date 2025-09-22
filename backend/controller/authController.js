import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken } from "../config/token.js";

// ----------------- Registration -----------------
export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user already exists
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter a valid email" });
        }

        // password validation
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            authType: "local"
        });

        // generate token
        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(201).json(user);

    } catch (error) {
        console.log("sign up error:", error);
        return res.status(500).json({ message: `Internal Server Error: ${error}` });
    }
};

// ----------------- Login -----------------
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // only check password for local users
        if (user.authType === "local") {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect password" });
            }
        }

        // generate token
        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        console.log("login error:", error);
        return res.status(500).json({ message: `Internal Server Error: ${error}` });
    }
};

// ----------------- Google Login -----------------
export const googleLogin = async (req, res) => {
    try {
        const { name, email } = req.body;

        // check if user already exists
        let user = await User.findOne({ email });

        if (!user) {
            // create google user without password
            user = await User.create({
                name,
                email,
                authType: "google"
            });
        }

        // generate token
        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);

    } catch (error) {
        console.log("googleLogin error:", error);
        return res.status(500).json({ message: `Google login Error: ${error}` });
    }
};

// ----------------- Logout -----------------
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log("logOut error:", error);
        return res.status(500).json({ message: `Internal Server Error: ${error}` });
    }
};
