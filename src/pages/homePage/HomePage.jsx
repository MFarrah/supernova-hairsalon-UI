import {useContext} from "react";
import { LanguageContext } from "../../context/LanguageContext.jsx";
import languageContent from "../../content/content.json";
import NavBar from "../../components/navBar/NavBar.jsx";


function HomePage() {
    const { language } = useContext(LanguageContext);
    const { title, description } = languageContent[language].homepage;



    return (
        <>
            <NavBar />
            <h1>{title}</h1>
            <p>{description}</p>
        </>
    );
}

export default HomePage;
