import { useState, useEffect } from 'react';
import EmployeeService from '/src/services/employees/EmployeeService.jsx';

const useFetchEmployees = (token) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await EmployeeService.getAllEmployees(token); // Geef de token door aan de service
                setEmployees(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (token) { // Voorkom het uitvoeren zonder token
            fetchEmployees();
        }
    }, [token]);

    return { employees, loading, error };
};

export default useFetchEmployees;
