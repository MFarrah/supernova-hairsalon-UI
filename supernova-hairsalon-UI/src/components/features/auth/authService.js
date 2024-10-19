import { apiService } from '/src/services/apiService.js';

const API_URL = '/auth';

// Functie om gebruikers in te laten loggen
export const login = (credentials) => {
    return apiService.post(`${API_URL}/login`, credentials);
};

// Functie om gebruikers uit te laten loggen
export const logout = () => {
    return apiService.post(`${API_URL}/logout`);
};

// Functie om nieuwe gebruikers te registreren
export const register = (userData) => {
    return apiService.post(`${API_URL}/register`, userData);
};
