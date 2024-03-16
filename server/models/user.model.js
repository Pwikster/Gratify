import { model, Schema } from 'mongoose'
const UserSchema = new Schema(
    {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
)

const User = model("User", UserSchema)
export default User