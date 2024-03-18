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

    // Helper function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        let month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    };

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/notes/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const fetchedData = response.data;
                // Ensure customDate is formatted correctly for the input field
                if (fetchedData.customDate) {
                    fetchedData.customDate = formatDate(fetchedData.customDate);
                }
                setNoteData(fetchedData);
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
            navigate('/user');
        } catch (error) {
            console.error('Failed to update note:', error);
            setErrorMessage('Failed to update note. Please try again.');
        }
    };

    return (
        <div>
            <h2>Edit Note</h2>
            {errorMessage && <div>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <textarea
                    name="note_text"
                    value={noteData.note_text}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="customDate"
                    value={noteData.customDate || ''}
                    onChange={handleChange}
                />
                <button type="submit">Update Note</button>
            </form>
        </div>
    );
};

export default DisplayNoteEdit;
