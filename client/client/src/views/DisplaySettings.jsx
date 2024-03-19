import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider.jsx';

const DisplaySettings = () => {
    // Accessing authentication state from the context
    const { authState } = useAuth();
    
    // State variables to manage user settings, loading state, and error state
    const [settings, setSettings] = useState({
        phoneNumber: '',
        receiveSMS: false,
        smsFrequency: 'daily',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetching user settings from the backend upon component mount or auth state change
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/settings/${authState.userId}`, {
                    headers: { Authorization: `Bearer ${authState.token}` },
                });
                setSettings(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching settings:', error);
                setError('Failed to fetch settings');
                setLoading(false);
            }
        };

        // Checking if the user is authenticated before fetching settings
        if (authState.userId) {
            fetchSettings();
        }
    }, [authState.userId, authState.token]);

    // Handling user settings update
    const handleUpdateSettings = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8000/api/users/settings/${authState.userId}`,
                settings,
                { headers: { Authorization: `Bearer ${authState.token}` } }
            );
            alert('Settings updated successfully');
        } catch (error) {
            console.error('Error updating settings:', error);
            setError('Failed to update settings');
        }
    };

    // Handling changes in form inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prevSettings => ({
            ...prevSettings,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Rendering loading state
    if (loading) return <div>Loading...</div>;
    
    // Rendering error state
    if (error) return <div>Error: {error}</div>;

    // Rendering the settings form
    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="card-title text-center text-success mb-4">User Settings</h2>
                    <form onSubmit={handleUpdateSettings}>
                        {/* Phone number input */}
                        <div className="mb-3">
                            <label className="form-label">Phone Number:</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={settings.phoneNumber}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        {/* Receive SMS notification checkbox */}
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                name="receiveSMS"
                                checked={settings.receiveSMS}
                                onChange={handleChange}
                                className="form-check-input"
                            />
                            <label className="form-check-label">Receive SMS Notifications:</label>
                        </div>
                        {/* SMS frequency dropdown */}
                        <div className="mb-3">
                            <label className="form-label">SMS Frequency:</label>
                            <select
                                name="smsFrequency"
                                value={settings.smsFrequency}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                        {/* Update button */}
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-success">
                                Update Settings
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DisplaySettings;
