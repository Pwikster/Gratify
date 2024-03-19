import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';
import axios from 'axios';

const DisplayNoteEdit = () => {
    const { id } = useParams();
    const { authState: { token } } = useAuth();
    const navigate = useNavigate();
    const [noteData, setNoteData] = useState({ note_text: '', customDate: '' });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/notes/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNoteData({
                    note_text: response.data.note_text,
                    customDate: response.data.customDate ? response.data.customDate.split('T')[0] : '', // Format date for input
                });
            } catch (error) {
                console.error('Failed to fetch note:', error);
                setErrorMessage('Failed to fetch note. Please try again.');
            }
        };

        fetchNote();
    }, [id, token]);

    const handleChange = (e) => {
        setNoteData({ ...noteData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/notes/${id}`,
                { ...noteData },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/user'); // Redirect back to user dashboard after successful update
        } catch (error) {
            console.error('Failed to update note:', error);
            setErrorMessage('Failed to update note. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Edit Note</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="note_text" className="form-label">Note Text</label>
                    <textarea
                        id="note_text"
                        name="note_text"
                        value={noteData.note_text}
                        onChange={handleChange}
                        required
                        className="form-control"
                        rows="3"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="customDate" className="form-label">Custom Date</label>
                    <input
                        type="date"
                        id="customDate"
                        name="customDate"
                        value={noteData.customDate || ''}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-success">Update Note</button>
            </form>
        </div>
    );
};

export default DisplayNoteEdit;
