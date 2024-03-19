// Import necessary modules from React and React Router.
import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardNav from './DashboardNav'

// Define the Layout component.
const Layout = () => {
    // The Layout component returns a structure that wraps the main content
    return (
        // The wrapper div ensures that the layout takes up at least the full viewport height.
        <div className="d-flex flex-column min-vh-100">
            {/* DashboardNav component is the navigation bar. */}
            <DashboardNav />
            {/* Main content area where routes will be rendered. */}
            <main className="container flex-grow-1">
                {/* Outlet is a placeholder that renders matched child route components. */}
                <Outlet />
            </main>
        </div>
    )
}

// Export the Layout component for use
export default Layout
