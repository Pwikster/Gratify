import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    phoneNumber: { type: String, required: false }, // Optional field for user's phone number
    notificationSettings: {
        receiveSMS: { type: Boolean, default: false },
        smsFrequency: { type: String, default: 'daily' }, // Could be 'daily', 'weekly', etc.
    },
}, { timestamps: true });

const User = model("User", UserSchema);
export default User;
