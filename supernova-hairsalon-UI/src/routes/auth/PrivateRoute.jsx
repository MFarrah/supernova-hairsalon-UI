import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '/src/context/auth/AuthContext.jsx';

const PrivateRoute = ({ children, roles }) => {
    const { user, userRole } = useAuth();

    if (!user || !roles.includes(userRole)) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
