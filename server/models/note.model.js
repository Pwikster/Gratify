import { model, Schema } from 'mongoose'

const NoteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // Reference to the User model
        required: true,
        ref: 'User'
    },
    author: { 
        type: String, 
        required: true
    },
    note_text: { 
        type: String, 
        required: true 
    },
    customDate: { 
        type: Date, 
        required: false 
    },
}, { timestamps: true })

const Note = model("Note", NoteSchema)
export default Note
