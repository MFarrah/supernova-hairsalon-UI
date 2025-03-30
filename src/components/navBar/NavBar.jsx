import {Link} from "react-router-dom";
import LanguagePicker from "../languagePicker/LanguagePicker.jsx";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import {useContext} from "react";
import languageContent from "../../content/content.json";
import "./NavBar.css";

function NavBar() {
    const {language } = useContext(LanguageContext);
    const {home, login, registration} = languageContent[language].navbar;

    return (
        <>
            <ul className="nav-bar">
                <li className="nav-bar-item">
            <Link to={'/'}>{home}</Link>
                </li>
                <li className="nav-bar-item">
            <Link to={'/LoginPage'}>{login}</Link>
                </li>
                <li className="nav-bar-item">
                    <Link to={'/RegistrationPage'}>{registration}</Link>
                </li>
                <li>
                    <LanguagePicker/>
                </li>
            </ul>
        </>
    )
}

export default NavBar;