// Importing necessary modules and components from React, React Router, and local files.
import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthProvider'
import DisplayDashboard from './views/DisplayDashboard'
import DisplayLogin from './views/DisplayLogin'
import DisplayNoteEdit from './views/DisplayNoteEdit'
import DisplayNoteAdd from './views/DisplayNoteAdd'
import DisplayNoteSend from './views/DisplayNoteSend'
import DisplayRegister from './views/DisplayRegister'
import DisplaySettings from './views/DisplaySettings'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
// Importing Bootstrap for styling.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Defining the main App component.
function App() {
  return (
    // AuthProvider wraps the entire application to provide authentication context.
    <AuthProvider>
      {/* BrowserRouter wraps the Routes to enable SPA routing. */}
      <BrowserRouter>
        {/* Routes define the application's navigation structure. */}
        <Routes>
          <Route path="/" element={<DisplayLogin />} />
          <Route path="/register" element={<DisplayRegister />} />
          {/* Protected routes within Layout */}
          <Route element={<Layout />}>
            <Route path="/user" element={
              <ProtectedRoute>
                <DisplayDashboard />
              </ProtectedRoute>
            } />
            <Route path="/user/note/edit/:id" element={
              <ProtectedRoute>
                <DisplayNoteEdit />
              </ProtectedRoute>
            } />
            <Route path="/user/add" element={
              <ProtectedRoute>
                <DisplayNoteAdd />
              </ProtectedRoute>
            } />
            <Route path="/user/send" element={
              <ProtectedRoute>
                <DisplayNoteSend />
              </ProtectedRoute>
            } />
            <Route path="/user/settings" element={
              <ProtectedRoute>
                <DisplaySettings />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

// Exporting App component for use
export default App
