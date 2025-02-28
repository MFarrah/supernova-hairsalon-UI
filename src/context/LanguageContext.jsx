import {createContext, useState} from "react";


export const LanguageContext = createContext({});

function LanguageProvider({children}) {
const storedLanguage = localStorage.getItem('language');
const [language, setLanguage] = useState(storedLanguage || 'en');

function setLanguageAndStore(language) {
    setLanguage(language);
    localStorage.setItem('language', language);
}

const data = {
    language,
    setLanguage: setLanguageAndStore,
};

    return (
        <LanguageContext.Provider value={data}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageProvider;