// Importing React hooks, Axios for HTTP requests, a custom hook for authentication context, and useNavigate for redirection.
import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// The DisplayNoteAdd component allows users to add new gratitude notes.
const DisplayNoteAdd = () => {
    const { authState: { token } } = useAuth() // Destructuring to get the auth token.
    const navigate = useNavigate() // Hook for navigation.
    const [formData, setFormData] = useState({
        author: '',
        note_text: '',
        customDate: ''
    }) // State for form data.
    const [errorMessage, setErrorMessage] = useState('') // State for storing error messages.

    // Handles changes in form inputs and updates formData state.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Handles form submission for adding a new note.
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        // Validation for author name length.
        if (!formData.author || formData.author.length < 3) {
            setErrorMessage('Please provide an author name with at least 3 characters.')
            return
        }
    
        // Validation for note content length.
        if (!formData.note_text || formData.note_text.length < 20) {
            setErrorMessage('Please write a note with at least 20 characters to express your gratitude meaningfully.')
            return
        }
    
        // Validation for custom date, ensuring it's not set in the future.
        if (formData.customDate && new Date(formData.customDate) > new Date()) {
            setErrorMessage('The date cannot be in the future.')
            return
        }
    
        // Check for authentication token.
        if (!token) {
            console.error('Authentication token is missing')
            setErrorMessage('Authentication error. Please log in.')
            return
        }
    
        // Attempt to post the new note using Axios, including error handling.
        try {
            await axios.post('http://localhost:8000/api/notes', 
                { ...formData }, 
                { headers: { Authorization: `Bearer ${token}` } }
            )
            navigate('/user') // Redirect to dashboard after successful note addition.
        } catch (error) {
            console.error('Failed to add note:', error)
            setErrorMessage('Failed to add note. Please try again.')
        }
    }
    
    // Rendering the form for adding a new note.
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center text-success mb-4">Add a Gratitude Note</h2>
                            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="author"
                                        placeholder="Author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        name="note_text"
                                        placeholder="Write your gratitude note here..."
                                        value={formData.note_text}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="date"
                                        name="customDate"
                                        value={formData.customDate}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-success">
                                        Add Note
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Export the DisplayNoteAdd component for use
export default DisplayNoteAdd
