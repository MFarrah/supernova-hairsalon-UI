import React from 'react';
import useFetchEmployees from '../../hooks/employees/useFetchEmpoyees.jsx';
import { useAuth } from '../../context/auth/AuthContext.jsx'; // Zorg ervoor dat dit pad correct is
import './DataCards.css';

const DataCards = () => {
    const { token } = useAuth(); // Haal de token uit de context
    const { employees, loading, error } = useFetchEmployees(token); // Geef de token door aan de custom hook

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading employees: {error.message}</p>;

    return (
        <div className="data-cards-container">
            {employees.map((employee) => (
                <div key={employee.id} className="card">
                    <h3>{employee.name}</h3>
                    <p>Role: {employee.role}</p>
                    <p>Email: {employee.email}</p>
                    <p>Phone: {employee.phone}</p>
                </div>
            ))}
        </div>
    );
};

export default DataCards;
