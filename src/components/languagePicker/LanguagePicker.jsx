import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext.jsx";


function LanguagePicker() {
    const { language, setLanguage } = useContext(LanguageContext);

    const selectLanguage = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);

    };

    return (
        <div>
            <select value={language} onChange={selectLanguage}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
            </select>
        </div>
    );
}

export default LanguagePicker;
