import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '/src/context/auth/AuthContext.jsx';
import AuthComponent from '../features/auth/AuthComponent';
import './Navbar.css';

const Navbar = () => {
    const { user, userRole, logout } = useAuth(); // Haal de rol van de gebruiker op
    const [showLoginForm, setShowLoginForm] = useState(false);

    const toggleLoginForm = () => {
        setShowLoginForm((prevState) => !prevState);
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li id="auth">
                    {user ? (
                        <button className="navbar-auth-button" onClick={logout}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <button className="navbar-auth-button" onClick={toggleLoginForm}>
                                Login
                            </button>
                            {showLoginForm && (
                                <div className="dropdown-login-form">
                                    <AuthComponent />
                                </div>
                            )}
                        </>
                    )}
                </li>
                <li id="nav-landingPage">
                    <Link to="/landingPage">Landing Page</Link>
                </li>

                {/* Conditie om te controleren of de gebruiker de rol ROLE_ADMIN heeft */}
                {userRole === 'ROLE_ADMIN' && (
                    <>
                        <li id="nav-employees">
                            <Link to="/employees">Employees</Link>
                        </li>
                        <li id="nav-customers">
                            <Link to="/customers">Customers</Link>
                        </li>
                        <li id="nav-bookings">
                            <Link to="/bookings">Bookings</Link>
                        </li>
                        <li id="nav-orders">
                            <Link to="/orders">Orders</Link>
                        </li>
                        <li id="nav-schedules">
                            <Link to="/schedules">Schedules</Link>
                        </li>
                        <li id="nav-rosters">
                            <Link to="/rosters">Rosters</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
