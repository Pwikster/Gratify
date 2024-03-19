// Import necessary parts from mongoose: the model function to create the model and Schema to define the structure.
import { model, Schema } from 'mongoose'

// Define NoteSchema, which outlines the structure of each note document in the database.
const NoteSchema = new Schema({
    // The userId field is a reference to the User model. This establishes a link between each note and the user it belongs to.
    // The type is set to Schema.Types.ObjectId, which is the default format for MongoDB document IDs, and it's marked as required.
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User' // The 'ref' property indicates which model this ID relates to, enabling Mongoose to easily fetch related data.
    },
    // The author field is a string that represents the name (or identifier) of the note's author. It is also required.
    author: { 
        type: String, 
        required: true
    },
    // The note_text field stores the content of the note. Like the author, it's a string and required.
    note_text: { 
        type: String, 
        required: true 
    },
    // The customDate field is an optional Date object that can store a custom date associated with the note.
    customDate: { 
        type: Date, 
        required: false 
    },
    // The second argument to the Schema constructor adds the timestamps option.
    // This automatically adds createdAt and updatedAt fields to the schema, tracking when each note is created and last updated.
}, { timestamps: true })

// Create the Note model from the schema. The model function makes a model (a constructor for documents) named "Note", based on NoteSchema.
const Note = model("Note", NoteSchema)

// Export the Note model, making it available for import in other parts of the application.
export default Note
