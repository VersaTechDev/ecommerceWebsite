import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true // prevent duplicate emails
    }, 
    password: {
        type: String, 
        required: function() {
            // password is required only for local users
            return this.authType === "local";
        }
    },
    authType: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    cartData: {
        type: Object,
        default: {}
    }
}, { timestamps: true, minimize: false });

const User = mongoose.model("User", userSchema);

export default User;
