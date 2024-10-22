import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import PrivateRoute from './routes/auth/PrivateRoute.jsx';
import { AuthProvider } from './context/auth/AuthContext.jsx';
import DataCard from '/src/components/DataCards/DataCard.jsx';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="*" element={<Dashboard />} />
                    <Route
                        path="/dashboard/*"
                        element={
                            <PrivateRoute allowedRoles={['ROLE_ADMIN', 'ROLE_EMPLOYEE']}>
                                <DataCard />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
