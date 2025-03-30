import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/LoginPage" element={<LoginPage/>}/>
                <Route path="/RegistrationPage" element={<RegistrationPage/>}/>
            </Routes>
        </>
    );
}

export default App;