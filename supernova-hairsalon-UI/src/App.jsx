import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import PrivateRoute from './routes/auth/PrivateRoute.jsx';
import { AuthProvider } from './context/auth/AuthContext.jsx';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    {/* Verwijder de login-route als het in de Navbar zit */}
                    {/* <Route path="/" element={<AuthComponent />} /> */}


                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
