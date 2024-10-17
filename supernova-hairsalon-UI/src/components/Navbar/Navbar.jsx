import React, { useState } from 'react';
import './global.css'; // Zorg ervoor dat je globale CSS is geïmporteerd

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Functie om het mobiele menu te togglen
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo">Supernova</div>

            {/* Links voor grotere schermen */}
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/services">Services</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div>

            {/* Hamburger menu voor kleinere schermen */}
            <div className="hamburger" onClick={toggleMenu}>
                &#9776; {/* Dit is het hamburger icoon */}
            </div>

            {/* Mobiel menu */}
            <div className={`nav-links-mobile ${menuOpen ? 'active' : ''}`}>
                <a href="/">Home</a>
                <a href="/services">Services</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;
