import express from 'express'
import { body } from 'express-validator'
import UserController from '../controllers/user.controller.js'

const userRouter = express.Router()

router.post('/users', [
    body('username').not().isEmpty().withMessage('Username is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], UserController.createUser)

router.get('/users', UserController.getUsers)
router.put('/users/:id', [
    // Add validation as necessary, for example:
    body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').optional().isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
], UserController.updateUser)

router.delete('/users/:id', UserController.deleteUser)

export default userRouter
