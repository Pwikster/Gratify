// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import DisplayDashboard from './views/DisplayDashboard';
import DisplayLogin from './views/DisplayLogin';
import DisplayNoteEdit from './views/DisplayNoteEdit';
import DisplayNoteAdd from './views/DisplayNoteAdd';
import DisplayNoteSend from './views/DisplayNoteSend';
import DisplayRegister from './views/DisplayRegister';
import DisplaySettings from './views/DisplaySettings';
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayLogin />} />
          <Route path="/register" element={<DisplayRegister />} />
          {/* Apply Layout to these routes */}
          <Route path="/" element={<Layout />}> 
            <Route path="/user" element={<DisplayDashboard />} />
            <Route path="/user/note/edit/:id" element={<DisplayNoteEdit />} />
            <Route path="/user/add" element={<DisplayNoteAdd />} />
            <Route path="/user/send" element={<DisplayNoteSend />} />
            <Route path="/user/settings" element={<DisplaySettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
