import express from 'express'
import NoteController from '../controllers/note.controller.js'

import authMiddleware from '../middleware/authMiddleware.js'

const noteRouter = express.Router()

noteRouter.post('/notes', authMiddleware, NoteController.createNote)
noteRouter.get('/notes', authMiddleware, NoteController.getNotes)
noteRouter.get('/notes/:id', authMiddleware, NoteController.getNoteById)
noteRouter.put('/notes/:id', authMiddleware, NoteController.updateNote)
noteRouter.delete('/notes/:id', authMiddleware, NoteController.deleteNote)
noteRouter.post('/notes/send', authMiddleware, NoteController.sendNote)

export default noteRouter
