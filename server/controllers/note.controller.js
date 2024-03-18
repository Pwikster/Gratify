import Note from '../models/note.model.js'
import User from '../models/user.model.js'

const NoteController = {
    // Create a new note, associating it with the userId of the currently logged in user
    createNote: async (req, res) => {
        const { author, note_text, customDate } = req.body
        const userId = req.user.id

        try {
            const newNote = await Note.create({ userId, author, note_text, customDate })
            res.status(201).json(newNote)
        } catch (error) {
            res.status(400).json({ message: `Error creating note: ${error.message}` })
        }
    },

    // Get all notes for the authenticated user
    getNotes: async (req, res) => {
        const userId = req.user.id // Use the authenticated user's ID

        try {
            const notes = await Note.find({ userId })
            res.json(notes)
        } catch (error) {
            res.status(500).json({ message: `Error fetching notes: ${error.message}` })
        }
    },

    // Update a note by ID, ensuring it belongs to the authenticated user
    updateNote: async (req, res) => {
        const { id } = req.params
        const userId = req.user.id
        const updateData = req.body

        try {
            const updatedNote = await Note.findOneAndUpdate(
                { _id: id, userId },
                updateData,
                { new: true }
            )

            if (!updatedNote) {
                return res.status(404).json({ message: "Note not found or unauthorized" })
            }

            res.json(updatedNote)
        } catch (error) {
            res.status(400).json({ message: `Error updating note: ${error.message}` })
        }
    },

    // Delete a note by ID, ensuring it belongs to the authenticated user
    deleteNote: async (req, res) => {
        const { id } = req.params
        const userId = req.user.id

        try {
            const deletedNote = await Note.findOneAndDelete({ _id: id, userId })

            if (!deletedNote) {
                return res.status(404).json({ message: "Note not found or unauthorized" })
            }

            res.json({ message: 'Note deleted successfully' })
        } catch (error) {
            res.status(500).json({ message: `Error deleting note: ${error.message}` })
        }
    },

    // method for sending a note
    sendNote: async (req, res) => {
        const { recipient, note_text, customDate } = req.body;
        const userId = req.user.id;
    
        try {
            const sender = await User.findById(userId);
            if (!sender) {
                return res.status(404).json({ message: "Sender not found" });
            }
    
            const receiver = await User.findOne({
                $or: [{ email: new RegExp(`^${recipient}$`, 'i') }, { username: recipient }]
            });
            if (!receiver) {

                return res.status(404).json({ message: "Recipient not found" });
            }
    
            const newNote = await Note.create({
                userId: receiver._id,
                author: sender.username, // Use the sender's username as the author
                note_text,
                customDate
            });
            res.status(201).json(newNote);
        } catch (error) {
            res.status(400).json({ message: `Error sending note: ${error.message}` });
        }
    },
}

export default NoteController
