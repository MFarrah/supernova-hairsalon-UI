import {Link} from "react-router-dom";
import LanguagePicker from "../languagePicker/LanguagePicker.jsx";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import {useContext} from "react";
import languageContent from "../../content/content.json";
import "./NavBar.css";
import DashboardDropdown from "../dashboardDropdown/DashboardDropdown.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function NavBar() {
    const {isAuth, logout} = useContext(AuthContext);
    const {language } = useContext(LanguageContext);
    const {home, login, registration} = languageContent[language].navbar;

    return (
        <>
            <ul className="nav-bar">
                <li className="nav-bar-item">
            <Link to={'/'}>{home}</Link>
                </li>
                <li className="nav-bar-item">
                    {isAuth ? <Link to={'/LoginPage'}><p onClick={logout}>Logout</p></Link> : <Link to={'/LoginPage'}>{login}</Link>}
                </li>
                <li className="nav-bar-item">
                    {!isAuth ? <Link to={'/RegistrationPage'}>{registration}</Link> : ""}
                </li>
                <li>
                    <LanguagePicker/>
                </li>

            </ul>
            <div className="sub-bar"><h4>Dashboard pages :</h4> <DashboardDropdown/></div>

        </>
    )
}

export default NavBar;