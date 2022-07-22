import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    typeOfUser: {
        type: String,
        default: "Guest"
    },
    email: {
    type: String,
    required: true,
    unique: true
    }
})

export default mongoose.model('User', userSchema)