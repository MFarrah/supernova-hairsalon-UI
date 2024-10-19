import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '/src/context/auth/AuthContext.jsx'; // Gebruik de auth-context voor login en logout
import AuthComponent from '../auth/AuthComponent.jsx'; // Import AuthComponent voor login

const Navbar = () => {
    const { user, logout } = useAuth();  // Haal de loginstatus en logout-functie uit context
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-links">
                {/* Toon de juiste links voor ingelogde gebruikers */}
                {user ? (
                    <>
                        <Link to="/dashboard/profile">My Profile</Link>
                        <Link to="/dashboard/overview">Overview</Link>
                        {user.role === 'ADMIN' && <Link to="/dashboard/admin">Admin Dashboard</Link>}
                        {user.role === 'EMPLOYEE' && <Link to="/dashboard/employee">Employee Dashboard</Link>}
                        {user.role === 'CUSTOMER' && <Link to="/dashboard/customer">Customer Dashboard</Link>}

                        {/* Logout knop */}
                        <button onClick={logout} className="button">Logout</button>
                    </>
                ) : (
                    // Als de gebruiker niet is ingelogd, toon het loginformulier
                    <AuthComponent />
                )}
            </div>

            {/* Hamburger menu voor kleinere schermen */}
            <div className="hamburger" onClick={toggleMenu}>
                &#9776;
            </div>
        </nav>
    );
};

export default Navbar;
