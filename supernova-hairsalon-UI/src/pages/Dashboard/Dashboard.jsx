import React from 'react';

const Dashboard = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div>
            <h1>Welkom op het Dashboard</h1>
            <button onClick={handleLogout}>Uitloggen</button>
        </div>
    );
};

export default Dashboard;
