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
    },

    getOrderById: async (id, token) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching order with ID ${id}:`, error);
            throw error;
        }
    },

    createOrder: async (orderData, token) => {
        try {
            const response = await axios.post(API_URL, orderData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    },

    updateOrder: async (id, updatedData, token) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating order with ID ${id}:`, error);
            throw error;
        }
    },

    deleteOrder: async (id, token) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting order with ID ${id}:`, error);
            throw error;
        }
    }
};

export default OrderService;
