// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import DashboardNav from './DashboardNav';

const Layout = () => {
    return (
        <>
            <DashboardNav />
            <Outlet /> {/* Use Outlet to render child routes */}
        </>
    );
};

export default Layout;
