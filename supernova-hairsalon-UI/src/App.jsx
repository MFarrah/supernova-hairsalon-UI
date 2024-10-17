import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthComponent from './components/AuthComponent/AuthComponent.jsx'; // Gebruik AuthComponent voor login en logout
import Dashboard from './pages/Dashboard/Dashboard.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthComponent />} /> {/* AuthComponent beheert login en logout */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
