import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '/src/context/auth/AuthContext.jsx';
import AuthComponent from '/src/components/features/auth/AuthComponent.jsx';
import Supernova_Logo from '/src/assets/supernova_logo.webp';

const Navbar = () => {
    const { user, userRole, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-links">
                {user ? (
                    <>
                        <Link to="/"><img className="logo" src={Supernova_Logo} alt="Logo" /></Link>
                        <Link to="/dashboard/overview">Overview</Link>
                        {userRole === 'ROLE_ADMIN' && <Link to="/dashboard/bookings">Bookings</Link>}
                        {userRole === 'ROLE_ADMIN' && <Link to="/dashboard/customers">Customers</Link>}
                        {userRole === 'ROLE_ADMIN' && <Link to="/dashboard/employees">Employees</Link>}
                        {userRole === 'ROLE_ADMIN' && <Link to="/dashboard/services">Services</Link>}
                        {userRole === 'ROLE_ADMIN' && <Link to="/dashboard/rosters">Rosters</Link>}
                        {userRole === 'ROLE_ADMIN' && <Link to="/dashboard/schedules">Schedules</Link>}
                        {userRole === 'ROLE_EMPLOYEE' && <Link to="/dashboard/employee">Employee Dashboard</Link>}
                        {userRole === 'ROLE_CUSTOMER' && <Link to="/dashboard/customer">Customer Dashboard</Link>}
                        <button onClick={logout} className="button">Logout</button>
                    </>
                ) : (
                    <AuthComponent />
                )}
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                &#9776;
            </div>
        </nav>
    );
};

export default Navbar;