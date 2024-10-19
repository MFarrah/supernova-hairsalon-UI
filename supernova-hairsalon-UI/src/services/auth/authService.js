import { apiService } from '/src/services/apiService.js';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;  // Gebruik VITE_API_URL uit environment

// Functie om gebruikers in te laten loggen met email en wachtwoord
export const login = async (credentials) => {
    const response = await apiService.post(`${API_URL}/login`, credentials);
    const { email, token, role } = response.data; // Verwerking van de API response
    // Sla het token, email en rol op in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);
    return { email, token, role };
};

// Functie om gebruikers uit te laten loggen
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
};

// Functie om nieuwe gebruikers te registreren
export const register = (userData) => {
    return apiService.post(`${API_URL}/register`, userData);
};
