import { useState } from 'react';
import EmployeeService from '/src/services/employees/EmployeeService.jsx';

const useCreateEmployee = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const createEmployee = async (employeeData) => {
        setLoading(true);
        try {
            await EmployeeService.createEmployee(employeeData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { createEmployee, loading, error };
};

export default useCreateEmployee;
