import {Link} from "react-router-dom";
import LanguagePicker from "../languagePicker/LanguagePicker.jsx";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import {useContext} from "react";
import languageContent from "../../content/content.json";

function NavBar() {
    const {language } = useContext(LanguageContext);
    const {home, login} = languageContent[language].navbar;

    return (
        <>
            <ul className="navBar">
                <li>
            <Link to={'/'}>{home}</Link>
                </li>
                <li>
            <Link to={'/LoginPage'}>{login}</Link>
                </li>
                <li>
                    <LanguagePicker/>
                </li>
            </ul>
        </>
    )
}

export default NavBar;