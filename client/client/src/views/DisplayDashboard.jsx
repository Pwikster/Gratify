// Importing React for component creation and NotesList component to display a list of notes.
import React from 'react'
import NotesList from '../components/NotesList'

// The DisplayDashboard component is a container for gratitude notes.
const DisplayDashboard = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    {/* Heading for the notes section */}
                    <h2 className="mb-4">Your Gratitude Notes</h2>
                    {/* NotesList component that fetches and displays the notes */}
                    <NotesList />
                </div>
            </div>
        </div>
    )
}

// Exporting DisplayDashboard for use
export default DisplayDashboard
