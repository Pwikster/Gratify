import Note from '../models/note.model.js'

const NoteController = {

    // Create a new note
    createNote: async (req, res) => {
        try {
            const newNote = await Note.create(req.body)
            res.status(201).json(newNote)
        } catch (error) {
            res.status(400).json({ message: `Error creating note: ${error.message}` })
        }
    },

    //Get all notes
    getNotes: async (req, res) => {
        try {
            const notes = await Note.find()
            res.json(notes)
        } catch (error) {
            res.status(500).json({ message: `Error fetching notes: ${error.message}` })
        }
    },

    //Update a note by ID
    updateNote: async (req, res) => {
        try {
            const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
            if (!updatedNote) {
                return res.status(404).json({ message: "Note not found" })
            }
            res.json(updatedNote)
        } catch (error) {
            res.status(400).json({ message: `Error updating note: ${error.message}` })
        }
    },

    //Delete a note by ID
    deleteNote: async (req, res) => {
        try {
            const deletedNote = await Note.findByIdAndDelete(req.params.id)
            if (!deletedNote) {
                return res.status(404).json({ message: "Note not found" })
            }
            res.json({ message: 'Note deleted successfully' })
        } catch (error) {
            res.status(500).json({ message: `Error deleting note: ${error.message}` })
        }
    },

}


export default NoteController