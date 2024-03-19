import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const UserController = {
    // Create a new user
    createUser: async (req, res) => {
        try {
            const { username, email, password } = req.body
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))

            const newUser = await User.create({
                username,
                email,
                password: hashedPassword
            })

            res.status(201).json({ user: newUser._id })
        } catch (error) {
            res.status(400).json({ message: `Error creating user: ${error.message}` })
        }
    },

    // Get all users
    getUsers: async (req, res) => {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            res.status(500).json({ message: `Error fetching users: ${error.message}` })
        }
    },

    // Update a user by ID
    updateUser: async (req, res) => {
        try {
            const { password } = req.body
            const updateData = { ...req.body }

            if (password) {
                updateData.password = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
            }

            const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true })
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" })
            }
            res.json(updatedUser)
        } catch (error) {
            res.status(400).json({ message: `Error updating user: ${error.message}` })
        }
    },

    // Delete a user by ID
    deleteUser: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id)
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" })
            }
            res.json({ message: 'User deleted successfully' })
        } catch (error) {
            res.status(500).json({ message: `Error deleting user: ${error.message}` })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" })
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '8h',
            });

            res.json({ token, userId: user._id })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "Server error" })
        }
    },

    // Method to fetch user settings
    getUserSettings: async (req, res) => {
        const userId = req.params.id;

        try {
            const user = await User.findById(userId).select('phoneNumber notificationSettings -_id');
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({
                phoneNumber: user.phoneNumber,
                receiveSMS: user.notificationSettings.receiveSMS,
                smsFrequency: user.notificationSettings.smsFrequency,
            });
        } catch (error) {
            console.error(`Error fetching user settings: ${error.message}`);
            res.status(500).json({ message: `Error fetching user settings: ${error.message}` });
        }
    },


    // Method to alter user settings while excluding the password from the return
    updateUserSettings: async (req, res) => {
        const { phoneNumber, smsFrequency, receiveSMS } = req.body;
        const userId = req.params.id;

        try {
            // Update user settings including phone number and SMS frequency
            const updatedUser = await User.findByIdAndUpdate(userId, {
                phoneNumber,
                notificationSettings: {
                    receiveSMS,
                    smsFrequency,
                },
            }, { new: true }).select('-password');

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json(updatedUser);
        } catch (error) {
            console.error(`Error updating user settings: ${error.message}`);
            res.status(500).json({ message: `Error updating user settings: ${error.message}` });
        }
    },
}

export default UserController
