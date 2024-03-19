import express from 'express'
import NoteController from '../controllers/note.controller.js'
import authMiddleware from '../middleware/authMiddleware.js'

// Initialize the router object from Express to manage our routes
const noteRouter = express.Router()

// Route for creating a new note. Only accessible to authenticated users due to authMiddleware.
noteRouter.post('/notes', authMiddleware, NoteController.createNote)

// Route to get all notes for the authenticated user
noteRouter.get('/notes', authMiddleware, NoteController.getNotes)

// Route to get a specific note by its ID. The note's ID is expected to be in the request's path.
noteRouter.get('/notes/:id', authMiddleware, NoteController.getNoteById)

// Route to update a note identified by its ID. The updated note data is expected to be in the request body.
noteRouter.put('/notes/:id', authMiddleware, NoteController.updateNote)

// Route to delete a specific note by its ID
noteRouter.delete('/notes/:id', authMiddleware, NoteController.deleteNote)

// Route to send a note. This could be for sharing notes between users or other purposes.
noteRouter.post('/notes/send', authMiddleware, NoteController.sendNote)

// Export the router so it can be mounted in the main application file.
export default noteRouter
