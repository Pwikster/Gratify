import express from 'express'
import { body } from 'express-validator'
import UserController from '../controllers/user.controller.js'
import authMiddleware from '../middleware/authMiddleware.js'

// Initialize the router for user-related routes
const userRouter = express.Router()

// Route for creating a new user with validation rules to ensure valid data is received
userRouter.post('/users', [
    body('username').not().isEmpty().withMessage('Username is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], UserController.createUser)

// Route to get all users, accessible only to authenticated users
userRouter.get('/users', authMiddleware, UserController.getUsers)

// Route for updating user information with optional validation for email and password
userRouter.put('/users/:id', authMiddleware, [
    body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').optional().isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
], UserController.updateUser)

// Route to delete a user, only accessible to authenticated users
userRouter.delete('/users/:id', authMiddleware, UserController.deleteUser)

// Route for user login with validation to ensure the credentials are properly formatted
userRouter.post('/login', [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], UserController.login)

// Route to get a user's settings, protected by authentication middleware
userRouter.get('/users/settings/:id', authMiddleware, UserController.getUserSettings)

// Route to update a user's settings, also protected by authentication
userRouter.put('/users/settings/:id', authMiddleware, UserController.updateUserSettings)

// Export the router to be used in the main application file
export default userRouter
