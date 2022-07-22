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
    }
})

export default mongoose.model('User', userSchema)