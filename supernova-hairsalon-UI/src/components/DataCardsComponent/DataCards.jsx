import React from 'react';
import useFetchEmployees from '../../hooks/employees/useFetchEmpoyees.jsx';
import { useAuth } from '../../context/auth/AuthContext.jsx'; // Zorg dat het pad correct is
import './DataCards.css';

const DataCards = () => {
    const { token } = useAuth(); // Haal de token op vanuit AuthContext
    const { employees, loading, error } = useFetchEmployees(token); // Geef de token door aan de hook

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading employees: {error.message}</p>;

    return (
        <div className="data-cards-container">
            {employees.map((employee) => (
                <div key={employee.employeeId} className="card">
                    <h3>{employee.firstName} {employee.lastName}</h3>
                    <p><strong>ID:</strong> {employee.employeeId}</p>
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Phone:</strong> {employee.phoneNumber}</p>
                    <p><strong>Gender:</strong> {employee.gender}</p>
                    <p><strong>Date of Birth:</strong> {employee.dateOfBirth}</p>
                    <p><strong>Roles:</strong> {employee.roles.map(role => role.name).join(', ')}</p> {/* Assuming roles have a name property */}
                    <p><strong>Qualified Orders:</strong> {employee.qualifiedOrderIds.join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default DataCards;
