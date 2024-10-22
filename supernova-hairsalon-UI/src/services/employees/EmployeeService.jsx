import axios from 'axios';

const API_URL = "http://localhost:8080/api/employees";


const EmployeeService = {
    getAllEmployees: async (token) => {
        try {
            const response = await axios.get(`${API_URL}/all`, {
                headers: {
                    Authorization: `Bearer ${token}` // De JWT-token wordt als argument doorgegeven
                }
            });
            return response; // Geef het volledige response object terug, niet alleen response.data
        } catch (error) {
            console.error("Error fetching employees:", error);
            throw error;
        }
    },
};


    getEmployeeById: async (id, token) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching employee with ID ${id}:`, error);
            throw error;
        }
    },

    createEmployee: async (employeeData, token) => {
        try {
            const response = await axios.post(API_URL, employeeData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating employee:", error);
            throw error;
        }
    },

    updateEmployee: async (id, updatedData, token) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating employee with ID ${id}:`, error);
            throw error;
        }
    },

    deleteEmployee: async (id, token) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting employee with ID ${id}:`, error);
            throw error;
        }
    }
};

export default EmployeeService;
