// Importing React hooks, Axios for HTTP requests, a custom hook for authentication context, and Link from React Router for navigation.
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'

// Component to display a list of notes.
const NotesList = () => {
    // State to hold the list of notes.
    const [notes, setNotes] = useState([])
    // Extracting authentication token in authState using the custom useAuth hook.
    const { authState: { token } } = useAuth()

    // useEffect to get notes from API upon mount or when the token changes.
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                // Attempt to fetch notes using the authentication token.
                const response = await axios.get('http://localhost:8000/api/notes', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                // Update the notes state with the fetched data.
                setNotes(response.data)
            } catch (error) {
                console.error("Could not fetch notes", error)
            }
        }

        // Only fetch notes if a token is present.
        if (token) {
            fetchNotes()
        }
    }, [token])

    // handle the deletion of a note.
    const handleDeleteNote = async (noteId) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                // Attempt to delete the note using id and authentication token.
                await axios.delete(`http://localhost:8000/api/notes/${noteId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                // update the UI by removing the deleted note from the state.
                setNotes(notes.filter(note => note._id !== noteId))
            } catch (error) {
                console.error("Failed to delete note:", error)
            }
        }
    }

    // Rendering the list of notes or a message if no notes are found.
    return (
        <div className="list-group mt-3">
            {notes.map((note) => (
                <div key={note._id} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{note.note_text}</h5>
                        <small>{note.customDate && new Date(note.customDate).toLocaleDateString()}</small>
                    </div>
                    <p className="mb-1">Authored by <em>{note.author}</em></p>
                    <div className="d-flex justify-content-between">
                        <Link to={`/user/note/edit/${note._id}`} className="btn btn-success btn-sm">Edit</Link>
                        <button onClick={() => handleDeleteNote(note._id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                </div>
            ))}
            {notes.length === 0 && <p className="list-group-item">No notes found.</p>}
        </div>
    )
}

// Exporting the NotesList component for use
export default NotesList
