import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [token, setToken] = useState(null);

    // Controleer of de gebruiker al is ingelogd op basis van localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('email');
        const storedRole = localStorage.getItem('role');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedRole && storedToken) {
            setUser(storedUser);
            setUserRole(storedRole);
            setToken(storedToken);
        }
    }, []);

    const login = (email, role, token) => {
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);
        localStorage.setItem('token', token);
        setUser(email);
        setUserRole(role);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        setUser(null);
        setUserRole(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, userRole, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
