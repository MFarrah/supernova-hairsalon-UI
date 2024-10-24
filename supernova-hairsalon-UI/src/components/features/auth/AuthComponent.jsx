import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '/src/context/auth/AuthContext.jsx';
import { loginUser } from '/src/services/auth/authService.jsx';
import '/src/components/features/auth/AuthComponent.css';  // Custom CSS for horizontal layout


const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            const { token, role } = response.data;
            login(email, role, token);
            navigate('/');
        } catch (err) {
            setError('Login failed, please check your credentials.');
        }
    };

    if (user) {
        return (
            <div className="auth-container">
                <button className="button" onClick={logout}>Logout</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                />
            </div>
            <div className="form-field">
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />
            </div>
            <button type="submit" className="button">Login</button>
            {error && <p className="input-error">{error}</p>}
        </form>
    );
};

export default AuthComponent;
