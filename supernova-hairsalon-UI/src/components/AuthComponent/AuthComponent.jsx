import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/global.css';

const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginData = { email, password };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setIsLoggedIn(true);
                navigate('/dashboard');
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (error) {
            setError('Failed to connect to the server');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="form-container">
            {isLoggedIn ? (
                <>
                    <h2>Welcome to the Dashboard!</h2>
                    <button onClick={handleLogout} className="button">
                        Logout
                    </button>
                </>
            ) : (
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="input-field"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="input-field"
                    />
                    {error && <p className="input-error">{error}</p>}
                    <button type="submit" className="button">
                        Login
                    </button>
                </form>
            )}
        </div>
    );
};

export default AuthComponent;
