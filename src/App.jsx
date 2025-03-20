import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/LoginPage" element={<LoginPage/>}/>
            </Routes>
        </>
    );
}

export default App;