import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '/src/context/auth/AuthContext.jsx';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, userRole } = useAuth();

    if (!user || !userRole || !Array.isArray(allowedRoles)) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;
