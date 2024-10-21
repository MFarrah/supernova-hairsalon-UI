import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import PrivateRoute from './routes/auth/PrivateRoute.jsx';
import { AuthProvider } from './context/auth/AuthContext.jsx';
import DataCards from '/src/components/DataCardsComponent/DataCards.jsx'; // Zorg ervoor dat de DataCards component correct is geïmporteerd

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard/employees" element={
                            <PrivateRoute allowedRoles={['ROLE_ADMIN', 'ROLE_EMPLOYEE']}>
                                <DataCards />
                            </PrivateRoute>
                        } />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
