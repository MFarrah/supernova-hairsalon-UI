import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import './Navbar.css';
import LanguagePicker from "../languagePicker/LanguagePicker.jsx";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import content from "../../content/content.json";

function Navbar() {
    const { language } = useContext(LanguageContext);
    const { home, services, contact } = content[language].navbar;

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/portal' className={({isActive}) => isActive ? 'active-link' : 'default-link'}><p>Login</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/' className={({isActive}) => isActive ? 'active-link' : 'default-link'}><p>{home}</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/services' className={({isActive}) => isActive ? 'active-link' : 'default-link'}>{services}
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/contact' className={({isActive}) => isActive ? 'active-link' : 'default-link'}>{contact}
                    </NavLink>
                </li>
                <li>
                    <LanguagePicker/>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;