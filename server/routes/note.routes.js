import express from 'express'
import NoteController from '../controllers/note.controller.js'

const noteRouter = express.Router()

router.post('/notes', NoteController.createNote)
router.get('/notes', NoteController.getNotes)
router.put('/notes/:id', NoteController.updateNote)
router.delete('/notes/:id', NoteController.deleteNote)

export default noteRouter
