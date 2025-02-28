import {useContext, useState} from "react";
import { LanguageContext } from "../../context/LanguageContext.jsx";
import languageContent from "../../content/content.json";
import ReusableForm from "../../components/ReuseableForm/ReusableForm.jsx";

function HomePage() {
    const { language } = useContext(LanguageContext);
    const { title, description } = languageContent[language].homepage;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            {console.log(username)}
            {console.log(password)}
            <h1>{title}</h1>
            <p>{description}</p>
            <ReusableForm type1='text' placeholder1='Vul hier je username in' onChange1={(e) => setUsername(e.target.value)}/>
            <ReusableForm type1='password' placeholder1='Vul hier je password in' onChange1={(e) => setPassword(e.target.value)}/>
            <p></p>
        </>
    );
}

export default HomePage;
