import { useState } from 'react'
import './App.css'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import { AuthProvider } from './context/AuthProvider'

import DisplayDashboard from './views/DisplayDashboard'
import DisplayLogin from './views/DisplayLogin'
import DisplayNoteEdit from './views/DisplayNoteEdit'
import DisplayNoteAdd from './views/DisplayNoteAdd'
import DisplayNoteSend from './views/DisplayNoteSend'
import DisplayRegister from './views/DisplayRegister'
import DisplaySettings from './views/DisplaySettings'


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayLogin />}></Route>
          <Route path="/register" element={<DisplayRegister />}></Route>
          <Route path="/user" element={<DisplayDashboard />}></Route>
          <Route path="/user/note" element={<DisplayNoteEdit />}></Route>
          <Route path="/user/add" element={<DisplayNoteAdd />}></Route>
          <Route path="/user/send" element={<DisplayNoteSend />}></Route>
          <Route path="/user/settings" element={<DisplaySettings />}></Route>
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
