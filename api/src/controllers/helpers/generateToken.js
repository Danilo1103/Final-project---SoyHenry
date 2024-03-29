import jwt from "jsonwebtoken"

export const tokenSign = async (user) => {
    return jwt.sign(
        {
            _id: user._id,
            role: user.role,
            email: user.email,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h",
        }
    )
}

export const verifyToken = async (token) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e){
        return null
    }
} 