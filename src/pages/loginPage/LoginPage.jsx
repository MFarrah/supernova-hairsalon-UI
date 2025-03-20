import InputField from "../../components/inputField/inputField.jsx";
import {useContext, useState} from "react";
import NavBar from "../../components/navBar/NavBar.jsx";
import {LanguageContext} from "../../context/LanguageContext.jsx";
import languageContent from "../../content/content.json";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {language} = useContext(LanguageContext);
    const {title, emailTitle, passwordTitle} = languageContent[language].loginpage;

    return (
        <>
            <NavBar/>
            <h1>{title}</h1>
            <p>{emailTitle}</p>
            <InputField label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <p>{passwordTitle}</p>
            <InputField label="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </>
    );
}

export default LoginPage;