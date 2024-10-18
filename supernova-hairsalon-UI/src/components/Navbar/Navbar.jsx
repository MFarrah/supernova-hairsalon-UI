import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // For navigation
import '../../styles/global.css';  // Import your global styles

const Navbar = ({ userRole }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Toggle mobile menu visibility
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            {/* Links for larger screens */}
            <div className="nav-links">
                <Link to="/dashboard/profile">My Profile</Link>
                <Link to="/dashboard/overview">Overview</Link>

                {/* Conditionally render menu based on the role */}
                {userRole === 'ADMIN' && (
                    <>
                        <Link to="/dashboard/bookings">Bookings</Link>
                        <Link to="/dashboard/customers">Customers</Link>
                        <Link to="/dashboard/employees">Employees</Link>
                        <Link to="/dashboard/roster">Roster</Link>
                        <Link to="/dashboard/schedules">Schedules</Link>
                        <Link to="/dashboard/services">Services</Link>
                    </>
                )}
                {userRole === 'Customer' && (
                    <>
                        <Link to="/dashboard/bookings">Bookings</Link>
                    </>
                )}
            </div>

            {/* Hamburger menu for smaller screens */}
            <div className="hamburger" onClick={toggleMenu}>
                &#9776; {/* Hamburger icon */}
            </div>

            {/* Mobile menu */}
            <div className={`nav-links-mobile ${menuOpen ? 'active' : ''}`}>
                <Link to="/dashboard/profile">My Profile</Link>
                <Link to="/dashboard/overview">Overview</Link>

                {userRole === 'ADMIN' && (
                    <>
                        <Link to="/dashboard/bookings">Bookings</Link>
                        <Link to="/dashboard/customers">Customers</Link>
                        <Link to="/dashboard/employees">Employees</Link>
                        <Link to="/dashboard/roster">Roster</Link>
                        <Link to="/dashboard/schedules">Schedules</Link>
                        <Link to="/dashboard/services">Services</Link>
                    </>
                )}
                {userRole === 'CUSTOMER' && (
                    <>
                        <Link to="/dashboard/bookings">Bookings</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
