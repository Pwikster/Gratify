// First up, we're importing the necessary modules. User model for dealing with user data,
// bcrypt for hashing passwords (because plain text passwords are a big no-no),
// and jwt for creating tokens to keep users logged in securely.
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Here's our UserController, a collection of functions that handle user-related requests.
const UserController = {
    // createUser is all about getting those sign-up details and storing them.
    // We hash the password for security and save the user to the database.
    createUser: async (req, res) => {
        try {
            const { username, email, password } = req.body
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))

            const newUser = await User.create({
                username,
                email,
                password: hashedPassword
            })

            // Send back the new user's ID as a success indicator.
            res.status(201).json({ user: newUser._id })
        } catch (error) {
            // Catch any errors, like if the user already exists, and report back.
            res.status(400).json({ message: `Error creating user: ${error.message}` })
        }
    },

    // getUsers fetches a list of all users. Great for admin features or user directories.
    getUsers: async (req, res) => {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            // If something goes wrong with the database fetch, we let the requester know.
            res.status(500).json({ message: `Error fetching users: ${error.message}` })
        }
    },

    // updateUser allows users to change their details. Password changes are handled carefully by re-hashing.
    updateUser: async (req, res) => {
        try {
            const { password } = req.body
            const updateData = { ...req.body }

            if (password) {
                updateData.password = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
            }

            const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true })
            if (!updatedUser) {
                // If no user is found with the given ID, let the client know.
                return res.status(404).json({ message: "User not found" })
            }
            // Success? Send back the updated user details (minus the password, of course).
            res.json(updatedUser)
        } catch (error) {
            // Any issues with the update process, we report back with the error.
            res.status(400).json({ message: `Error updating user: ${error.message}` })
        }
    },

    // deleteUser is pretty straightforward - it finds a user by ID and removes them from the database.
    deleteUser: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id)
            if (!deletedUser) {
                // If the user can't be found, maybe they're already deleted, or the ID is wrong.
                return res.status(404).json({ message: "User not found" })
            }
            // Confirm deletion to the requester.
            res.json({ message: 'User deleted successfully' })
        } catch (error) {
            // Database or server issues? Let the client know something went wrong.
            res.status(500).json({ message: `Error deleting user: ${error.message}` })
        }
    },

    // login handles the authentication. Users provide email and password, we verify, then send a token if all's good.
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                // No user with that email? They can't log in, then.
                return res.status(404).json({ message: "User not found" })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                // Wrong password? That's a no-go for login.
                return res.status(400).json({ message: "Invalid credentials" })
            }

            // Password checks out? Create a token that'll keep them logged in.
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8h', })

            // Send the token and user ID back to the client.
            res.json({ token, userId: user._id })
        } catch (error) {
            // Catch-all for any other errors that might occur.
            console.error(error)
            res.status(500).json({ message: "Server error" })
        }
    },

    // getUserSettings fetches preferences and settings for a user. Useful for customization and personalization.
    getUserSettings: async (req, res) => {
        const userId = req.params.id

        try {
            const user = await User.findById(userId).select('phoneNumber notificationSettings -_id')
            if (!user) {
                // Can't customize settings if we can't find the user, can we?
                return res.status(404).json({ message: "User not found" })
            }

            // Send back the relevant user settings.
            res.json({
                phoneNumber: user.phoneNumber,
                receiveSMS: user.notificationSettings.receiveSMS,
                smsFrequency: user.notificationSettings.smsFrequency,
            })
        } catch (error) {
            // If fetching settings goes wrong, we report back.
            console.error(`Error fetching user settings: ${error.message}`)
            res.status(500).json({ message: `Error fetching user settings: ${error.message}` })
        }
    },

    // updateUserSettings lets users tweak their preferences, like how often they get SMS notifications.
    updateUserSettings: async (req, res) => {
        const { phoneNumber, smsFrequency, receiveSMS } = req.body
        const userId = req.params.id

        try {
            // Apply the new settings to the user's profile, and make sure we don't accidentally send back their password.
            const updatedUser = await User.findByIdAndUpdate(userId, {
                phoneNumber,
                notificationSettings: { receiveSMS, smsFrequency },
            }, { new: true }).select('-password')

            if (!updatedUser) {
                // No user found to update? That's an issue.
                return res.status(404).json({ message: "User not found" })
            }

            // All good? Here are your new settings.
            res.json(updatedUser)
        } catch (error) {
            // Problems updating? Let's report that.
            console.error(`Error updating user settings: ${error.message}`)
            res.status(500).json({ message: `Error updating user settings: ${error.message}` })
        }
    },
}

// Finally, we make sure the UserController can be imported elsewhere in our app.
export default UserController
