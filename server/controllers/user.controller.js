import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

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
}

export default UserController
