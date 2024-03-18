import { useState } from 'react'
import { useAuth } from '../context/AuthProvider.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DisplayLogin = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password })
            login(response.data) 
            navigate('/user') // Navigate to the dashboard upon successful login
        } catch (error) {
            console.error('Login failed:', error)
            setErrorMessage('Login failed. Please check your credentials.') // Provide user feedback
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="email" name="email" placeholder="Email" required style={{ padding: '10px', fontSize: '16px' }} />
                <input type="password" name="password" placeholder="Password" required style={{ padding: '10px', fontSize: '16px' }} />
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Login
                </button>
            </form>
        </div>
    )
}

export default DisplayLogin
