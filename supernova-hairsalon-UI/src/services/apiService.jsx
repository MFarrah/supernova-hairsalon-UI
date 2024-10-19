import axios from 'axios';

// Maak een axios instantie aan met de basis-URL van de API
const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Voeg een interceptors toe om de JWT-token aan elke request toe te voegen
apiService.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export { apiService };
