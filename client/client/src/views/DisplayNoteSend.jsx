import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';

const DisplayNoteSend = () => {
    const { authState: { token } } = useAuth();
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
    
        // Recipient validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.recipient || (!emailRegex.test(formData.recipient) && formData.recipient.length < 3)) {
            setErrorMessage('Please enter a valid recipient email or username.');
            return;
        }
    
        // Note content validation
        if (!formData.note_text || formData.note_text.length < 20) {
            setErrorMessage('Please write a note with at least 20 characters to express your gratitude meaningfully.');
            return;
        }
    
        // Ensure the date is not in the future.
        if (formData.customDate && new Date(formData.customDate) > new Date()) {
            setErrorMessage('The date cannot be in the future.');
            return;
        }
    
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center text-success mb-4">Send a Gratitude Note</h2>
                            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="recipient"
                                        placeholder="Recipient's email or username"
                                        value={formData.recipient}
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
                                        Send Note
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayNoteSend;
