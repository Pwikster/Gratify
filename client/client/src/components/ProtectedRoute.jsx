import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

// Component to protect routes that require authentication.
const ProtectedRoute = ({ children }) => {
    const { authState } = useAuth()

    // If there's no token in authState, redirect to the login page.
    if (!authState.token) {
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute