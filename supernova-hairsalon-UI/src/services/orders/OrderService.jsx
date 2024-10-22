import axios from 'axios';

const API_URL = "http://localhost:8080/api/orders";

const OrderService = {
    getAllOrders: async (token) => {
        try {
            const response = await axios.get(`${API_URL}/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    }
};

export default OrderService;
