// Importing necessary hooks and components for managing state, context, navigation, and making HTTP requests.
import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// The DisplayLogin component handles user login.
const DisplayLogin = () => {
    const { login } = useAuth() // Using the login function from the AuthProvider context to manage user authentication.
    const navigate = useNavigate() // Hook to programmatically navigate users after actions.
    const [errorMessage, setErrorMessage] = useState('') // State to manage error messages related to login.

    // Handles the form submission for logging in.
    const handleSubmit = async (event) => {
        event.preventDefault() // Prevents the default form submission behavior.
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            // Attempt to login with the provided credentials.
            const response = await axios.post('http://localhost:8000/api/login', { email, password })
            login(response.data) // Pass the response data to the login function to manage application state.
            navigate('/user') // Navigate to the dashboard upon successful login.
        } catch (error) {
            console.error('Login failed:', error)
            setErrorMessage('Login failed. Please check your credentials.') // Update the error message state to provide feedback.
        }
    }

    // Navigates to the registration page.
    const handleNavigateToRegister = () => {
        navigate('/register') // Use navigate hook to change path to register.
    }

    // Rendering the login form and handling user interactions.
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {/* Display the application title and tagline */}
                    <div className="text-center mb-5">
                        <h1 className="display-4">Gratify</h1>
                        <p className="lead">Gratitude for everyone</p>
                    </div>
                    {/* Login form card */}
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            {/* Display error message if login fails */}
                            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                            {/* Form for email and password input */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input type="email" name="email" placeholder="Email" required className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <input type="password" name="password" placeholder="Password" required className="form-control" />
                                </div>
                                {/* Submission and navigation buttons */}
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-success">Login</button>
                                    <button type="button" onClick={handleNavigateToRegister} className="btn btn-outline-success">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Export the DisplayLogin component for use in other parts of the application.
export default DisplayLogin
