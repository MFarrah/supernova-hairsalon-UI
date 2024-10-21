import { useState } from 'react';
import EmployeeService from '/src/services/employees/EmployeeService.jsx';

const useUpdateEmployee = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateEmployee = async (id, employeeData) => {
        setLoading(true);
        try {
            await EmployeeService.updateEmployee(id, employeeData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { updateEmployee, loading, error };
};

export default useUpdateEmployee;
