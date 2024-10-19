import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response;
    } catch (error) {
        throw error;
    }
};
