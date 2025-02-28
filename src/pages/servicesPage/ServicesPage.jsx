import React, {useContext} from 'react';
import {LanguageContext} from "../../context/LanguageContext.jsx";
import languageContent from "../../content/content.json";

function ServicesPage() {
    const { language } = useContext(LanguageContext);
    const { title, description } = languageContent[language].service;

    return (
        <>
            <h1>{title}</h1>
            <p>{description}</p>
        </>
    );
}

export default ServicesPage;