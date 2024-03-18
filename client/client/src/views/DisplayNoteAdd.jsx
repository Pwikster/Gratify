import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayNoteAdd = () => {
    const { authState: { token } } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        author: '',
        note_text: '',
        customDate: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure token is not empty
        if (!token) {
            console.error('Authentication token is missing');
            setErrorMessage('Authentication error. Please log in.');
            return;
        }

        try {
            await axios.post('http://localhost:8000/api/notes', 
                { ...formData }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/user'); // Redirect to dashboard after adding
        } catch (error) {
            console.error('Failed to add note:', error);
            setErrorMessage('Failed to add note. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add a Gratitude Note</h2>
            {errorMessage && <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{errorMessage}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <textarea
                    name="note_text"
                    placeholder="Write your gratitude note here..."
                    value={formData.note_text}
                    onChange={handleChange}
                    required
                    style={{ padding: '10px', fontSize: '16px', height: '150px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="date"
                    name="customDate"
                    value={formData.customDate}
                    onChange={handleChange}
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default DisplayNoteAdd;
