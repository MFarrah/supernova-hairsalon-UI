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
    }
};

export default CustomerService;
