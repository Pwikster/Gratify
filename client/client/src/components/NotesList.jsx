import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom'

const NotesList = () => {
    const [notes, setNotes] = useState([]);

    const { authState: { token } } = useAuth();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/notes', {
                    headers: { Authorization: `Bearer ${token}` }, // Use token from authState
                });
                setNotes(response.data);
            } catch (error) {
                console.error("Could not fetch notes", error);
            }
        };

        if (token) {
            fetchNotes();
        }
    }, [token]); // Dependency on token ensures useEffect re-runs when token changes (ie upon user change) 

    return (
        <ul>
            {notes.map((note) => (
                <li key={note._id}>
                    {note.note_text} - <em>Authored by {note.author}</em>
                    {note.customDate && `on ${new Date(note.customDate).toLocaleDateString()}`}
                    <Link to={`/user/note/edit/${note._id}`}>Edit</Link>
                </li>
            ))}
        </ul>
    );
};

export default NotesList;
