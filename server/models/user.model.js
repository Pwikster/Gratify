import { model, Schema } from 'mongoose';

// Define the User schema with a bit more breathing room
const UserSchema = new Schema({
    // Each user must have a unique and required username
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },

    // Email must also be unique and required
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },

    // Password is essential for account security
    password: { 
        type: String, 
        required: true 
    },

    // Track whether a user's email has been verified
    isVerified: { 
        type: Boolean, 
        default: false 
    },

    // Users may provide a phone number for account recovery or notifications
    phoneNumber: { 
        type: String, 
        required: false  // Marked as optional
    },

    // Users can customize their notification preferences
    notificationSettings: {
        receiveSMS: { 
            type: Boolean, 
            default: false 
        },
        smsFrequency: { 
            type: String, 
            default: 'daily'  // Examples include 'daily', 'weekly'
        },
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Create and export the User model based on the defined schema
const User = model("User", UserSchema);
export default User;
