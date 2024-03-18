import React from 'react';
import { Link } from 'react-router-dom';

const DashboardNav = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/user">Dashboard</Link></li> {/* Dashboard link */}
                <li><Link to="/user/add">Add Note</Link></li>
                <li><Link to="/user/send">Send Note</Link></li>
                <li><Link to="/user/settings">Settings</Link></li>
            </ul>
        </nav>
    );
};

export default DashboardNav;
