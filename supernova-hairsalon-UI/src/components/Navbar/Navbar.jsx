import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Gebruik Link van React Router v6
import '../../styles/global.css';  // Zorg ervoor dat de globale CSS is geïmporteerd

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Functie om het mobiele menu te togglen
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">

            {/* Links voor grotere schermen */}
            <div className="nav-links">
                <Link to="/dashboard/profile">My Profile</Link>
                <Link to="/dashboard/overview">Overview</Link>
                <Link to="/dashboard/bookings">Bookings</Link>
                <Link to="/dashboard/customers">Customers</Link>
                <Link to="/dashboard/employees">Employees</Link>
                <Link to="/dashboard/roster">Roster</Link>
                <Link to="/dashboard/schedules">Schedules</Link>
                <Link to="/dashboard/services">Services</Link>
            </div>

            {/* Hamburger menu voor kleinere schermen */}
            <div className="hamburger" onClick={toggleMenu}>
                &#9776; {/* Dit is het hamburger icoon */}
            </div>

            {/* Mobiel menu */}
            <div className={`nav-links-mobile ${menuOpen ? 'active' : ''}`}>
                <Link to="/dashboard/profile">My Profile</Link>
                <Link to="/dashboard/overview">Overview</Link>
                <Link to="/dashboard/bookings">Bookings</Link>
                <Link to="/dashboard/customers">Customers</Link>
                <Link to="/dashboard/employees">Employees</Link>
                <Link to="/dashboard/roster">Roster</Link>
                <Link to="/dashboard/schedules">Schedules</Link>
                <Link to="/dashboard/services">Services</Link>
            </div>
        </nav>
    );
};

export default Navbar;
