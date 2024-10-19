import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';

const PrivateRoute = ({ children, roles }) => {
    const { user } = useAuth();
    const role = localStorage.getItem('role');

    if (!user || !roles.includes(role)) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
