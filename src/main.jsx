import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import LanguageProvider from "./context/LanguageContext.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";


createRoot(document.getElementById("root")).render(


        <BrowserRouter>
            <AuthContextProvider>
            <LanguageProvider>

                    <App />

            </LanguageProvider>
    </AuthContextProvider>
        </BrowserRouter>


);
