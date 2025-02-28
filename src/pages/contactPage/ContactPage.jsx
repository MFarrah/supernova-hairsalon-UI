import React, {useContext} from 'react';
import {LanguageContext} from "../../context/LanguageContext.jsx";
import languageContent from "../../content/content.json";

function ContactPage() {
    const { language } = useContext(LanguageContext);
    const { title, description } = languageContent[language].contact;

    return (
        <>
            <h1>{title}</h1>
            <p>{description}</p>
        </>
    );
}

export default ContactPage;