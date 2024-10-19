import { useState } from 'react';
import { logout } from '/src/services/auth/authService.js';
import { useAuth } from '/src/context/auth/AuthContext.js';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setUser } = useAuth(); // Toegang tot de context

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
            localStorage.removeItem('token'); // Verwijder de token uit localStorage
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return { handleLogout, loading, error };
};

export default useLogout;
