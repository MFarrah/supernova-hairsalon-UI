import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Eventueel kun je hier een extra validatie doen door de token te verifiëren bij de server
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // Laat iets zien terwijl we checken of de gebruiker is ingelogd
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
