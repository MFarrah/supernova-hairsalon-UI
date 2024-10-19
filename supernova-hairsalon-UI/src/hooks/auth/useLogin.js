import { useState } from 'react';
import { login } from '/src/services/auth/authService.js';
import { useAuth } from '/src/context/auth/AuthContext.js';  // Context voor de gebruiker

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setUser } = useAuth(); // Toegang tot de context om de gebruiker op te slaan

    const handleLogin = async (email, password) => {
        setLoading(true);
        try {
            const credentials = { email, password };
            const response = await login(credentials);
            setUser({ email: response.email, role: response.role });
            // Eventueel navigeren naar een pagina op basis van de rol
        } catch (err) {
            setError(err.response?.data?.message || 'Login mislukt');
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading, error };
};

export default useLogin;
