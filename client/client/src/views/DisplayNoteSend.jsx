import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';

const DisplayNoteSend = () => {
    const { authState: { token, userId } } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        recipient: '',
        note_text: '',
        customDate: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            console.error('Authentication token is missing');
            setErrorMessage('Please log in to send a note.');
            return;
        }
    
        try {
            await axios.post('http://localhost:8000/api/notes/send', 
                { ...formData },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/user'); // Navigate back to the dashboard upon successful note send
        } catch (error) {
            console.error('Failed to send note:', error);
            setErrorMessage('Failed to send note. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h2>Send a Gratitude Note</h2>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="recipient"
                    placeholder="Recipient's email or username"
                    value={formData.recipient}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="note_text"
                    placeholder="Write your gratitude note here..."
                    value={formData.note_text}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="customDate"
                    value={formData.customDate}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Send Note</button>
            </form>
        </div>
    );
};

export default DisplayNoteSend;
