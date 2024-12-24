import React from 'react';
import {NavLink} from "react-router-dom";
import './Navbar.css';

function Navbar() {


    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/portal' className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/' className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/services' className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Services
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/contact' className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;