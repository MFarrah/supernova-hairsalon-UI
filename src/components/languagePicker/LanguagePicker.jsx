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
                <option value="nl">Nederlands</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
            </select>
        </div>
    );
}

export default LanguagePicker;
