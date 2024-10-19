import React, { useState } from 'react';
import useLogin from '/src/hooks/auth/useLogin.js';

const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin, loading, error } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>Login</button>
                {error && <p>Error: {error}</p>}
            </form>
        </div>
    );
};

export default AuthComponent;
