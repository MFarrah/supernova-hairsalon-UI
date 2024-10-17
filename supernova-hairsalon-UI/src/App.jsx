import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthComponent from './components/AuthComponent/AuthComponent.jsx'; // Login
import Dashboard from './pages/Dashboard/Dashboard.jsx'; // Admin Dashboard
import ProtectedRoute from './routes/ProtectedRoute/ProtectedRoute.jsx'; // ProtectedRoute voor beveiligde routes

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route voor inloggen */}
                <Route path="/" element={<AuthComponent />} />

                {/* Beveiligde route voor admin dashboard */}
                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
