import express from 'express'
import { body } from 'express-validator'
import UserController from '../controllers/user.controller.js'

import authMiddleware from '../middleware/authMiddleware.js'

const userRouter = express.Router()

userRouter.post('/users', [
    body('username').not().isEmpty().withMessage('Username is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], UserController.createUser)

userRouter.get('/users', authMiddleware, UserController.getUsers)
userRouter.put('/users/:id', authMiddleware, [
    // Add validation as necessary, for example:
    body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').optional().isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
], UserController.updateUser)

userRouter.delete('/users/:id', authMiddleware, UserController.deleteUser)

userRouter.post('/login', UserController.login)

export default userRouter
