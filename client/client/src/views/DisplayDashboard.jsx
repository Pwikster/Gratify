import React from 'react'
import { useAuth } from '../context/AuthProvider.jsx'
import { useNavigate } from 'react-router-dom'
import NotesList from '../components/NotesList'
import DashboardNav from '../components/DashboardNav'

const DisplayDashboard = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div>
            <DashboardNav />
            <h2>Your Gratitude Notes</h2>
            <NotesList />
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default DisplayDashboard
