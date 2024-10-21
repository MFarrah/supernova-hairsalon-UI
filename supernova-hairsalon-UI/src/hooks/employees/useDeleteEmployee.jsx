import { useState } from 'react';
import EmployeeService from '/src/services/employees/EmployeeService.jsx';

const useDeleteEmployee = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const deleteEmployee = async (id) => {
        setLoading(true);
        try {
            await EmployeeService.deleteEmployee(id);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { deleteEmployee, loading, error };
};

export default useDeleteEmployee;
