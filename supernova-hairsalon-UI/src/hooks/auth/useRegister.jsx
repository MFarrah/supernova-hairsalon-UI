import { useState } from 'react';
import { register } from '/src/services/auth/authService.jsx';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async (userData) => {
        setLoading(true);
        try {
            await register(userData);
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return { handleRegister, loading, error };
};

export default useRegister;
