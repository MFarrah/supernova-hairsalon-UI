import axios from 'axios';

const API_URL = "http://localhost:8080/api/customers";

const CustomerService = {
    getAllCustomers: async (token) => {
        try {
            const response = await axios.get(`${API_URL}/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching customers:", error);
            throw error;
        }
    },

    getCustomerById: async (id, token) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching customer with ID ${id}:`, error);
            throw error;
        }
    },

    createCustomer: async (customerData, token) => {
        try {
            const response = await axios.post(API_URL, customerData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating customer:", error);
            throw error;
        }
    },

    updateCustomer: async (id, updatedData, token) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating customer with ID ${id}:`, error);
            throw error;
        }
    },

    deleteCustomer: async (id, token) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting customer with ID ${id}:`, error);
            throw error;
        }
    }
};

export default CustomerService;
