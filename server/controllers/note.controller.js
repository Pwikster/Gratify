// Bringing in the squad: Note and User models. They're like the backbone of our note-taking app.
import Note from '../models/note.model.js'
import User from '../models/user.model.js'

// Define our NoteController - this dude handles all the note actions.
const NoteController = {
    // Hey, let's create a new note. We need the author, the juicy text, and a custom date if you're fancy.
    createNote: async (req, res) => {
        const { author, note_text, customDate } = req.body
        const userId = req.user.id

        try {
            // Creating the note here. Magic!
            const newNote = await Note.create({ userId, author, note_text, customDate })
            res.status(201).json(newNote)
        } catch (error) {
            // Uh-oh, something went wonky.
            res.status(400).json({ message: `Error creating note: ${error.message}` })
        }
    },

    // Getting all your notes, because you're important and we love you.
    getNotes: async (req, res) => {
        const userId = req.user.id // Your ID, because it's all about you.

        try {
            // Finding those notes. It's like a treasure hunt, but for your thoughts.
            const notes = await Note.find({ userId })
            res.json(notes)
        } catch (error) {
            // If we hit a snag, we'll let you know.
            res.status(500).json({ message: `Error fetching notes: ${error.message}` })
        }
    },

    // Wanna specific note? We got you.
    getNoteById: async (req, res) => {
        const { id } = req.params
        const userId = req.user.id

        try {
            // Looking for that one special note.
            const note = await Note.findOne({ _id: id, userId })
            if (!note) {
                // No note found, or it's just not yours to see.
                return res.status(404).json({ message: "Note not found or unauthorized" })
            }

            res.json(note)
        } catch (error) {
            // Oops, our bad.
            res.status(500).json({ message: `Error fetching note: ${error.message}` })
        }
    },

    // Time to change up your note? Let's do it.
    updateNote: async (req, res) => {
        const { id } = req.params
        const userId = req.user.id
        const updateData = req.body

        try {
            // Finding and updating in one go. Efficient, huh?
            const updatedNote = await Note.findOneAndUpdate(
                { _id: id, userId },
                updateData,
                { new: true }
            )

            if (!updatedNote) {
                // Note's gone AWOL or it's not yours.
                return res.status(404).json({ message: "Note not found or unauthorized" })
            }

            res.json(updatedNote)
        } catch (error) {
            // Didn't work out? We'll tell you why.
            res.status(400).json({ message: `Error updating note: ${error.message}` })
        }
    },

    // Not feeling a note anymore? This is how you say goodbye.
    deleteNote: async (req, res) => {
        const { id } = req.params
        const userId = req.user.id

        try {
            // It's like magic, but sadder. Poof, the note's gone.
            const deletedNote = await Note.findOneAndDelete({ _id: id, userId })

            if (!deletedNote) {
                // Maybe it was already gone? Or it wasn't yours to delete.
                return res.status(404).json({ message: "Note not found or unauthorized" })
            }

            res.json({ message: 'Note deleted successfully' })
        } catch (error) {
            // Something went wrong with the vanishing act.
            res.status(500).json({ message: `Error deleting note: ${error.message}` })
        }
    },

    // Feel like sending a note? Let's spread some words.
    sendNote: async (req, res) => {
        const { recipient, note_text, customDate } = req.body
        const userId = req.user.id

        try {
            // First, let's make sure you're real.
            const sender = await User.findById(userId)
            if (!sender) {
                // Can't find you? Uh oh.
                return res.status(404).json({ message: "Sender not found" })
            }

            // Now, for the receiver. Are they around?
            const receiver = await User.findOne({
                $or: [{ email: new RegExp(`^${recipient}$`, 'i') }, { username: recipient }]
            })
            if (!receiver) {
                // No luck finding the receiver.
                return res.status(404).json({ message: "Recipient not found" })
            }

            // Cool, let's create that note.
            const newNote = await Note.create({
                userId: receiver._id,
                author: sender.username, // You're the author, champ.
                note_text,
                customDate
            })
            res.status(201).json(newNote)
        } catch (error) {
            // Hit a bump? We're here to help.
            res.status(400).json({ message: `Error sending note: ${error.message}` })
        }
    },
}

// And that's how we control notes. Easy peasy.
export default NoteController
