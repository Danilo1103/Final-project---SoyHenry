import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    idPayment: {
        type: String,
    },
    container:[],
    amount: {
        type: Number
    },
    role: {
        type: String,
        default: "user"
    },
    date: {
        type: Date, 
        default:  Date.now
    },
    state: {
        type: String,
        default: "pendiente"
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    userId: {
        type: String
    }
})

export default mongoose.model('Payment', paymentSchema)