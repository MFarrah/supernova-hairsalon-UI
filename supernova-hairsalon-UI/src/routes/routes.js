import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthComponent from '../components/features/auth/AuthComponent.jsx/';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';

import PrivateRoute from '../routes/auth/PrivateRoute';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<AuthComponent />} />
                <Route path="/dashboard" element={<PrivateRoute roles={['ADMIN', 'EMPLOYEE', 'CUSTOMER']}><Dashboard /></PrivateRoute>} />
                <Route path="/admin" element={<PrivateRoute roles={['ADMIN']}><AdminPage /></PrivateRoute>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
