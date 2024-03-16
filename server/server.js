import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './config/mongoose.config.js'

import userRouter from './routes/user.routes.js'
import noteRouter from './routes/note.routes.js'


const app = express()

app.use(express.json(), cors())

dotenv.config()
const PORT = process.env.PORT

dbConnect()

app.use('/api', userRouter) // Existing user routes
app.use('/api', noteRouter) // Use note routes

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
