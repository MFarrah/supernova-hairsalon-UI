import axios from 'axios';

const API_URL = "http://localhost:8080/api/bookings";

const BookingService = {
    getAllBookings: async (token) => {
        try {
            const response = await axios.get(`${API_URL}/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching bookings:", error);
            throw error;
        }
    },

    getBookingById: async (id, token) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching booking with ID ${id}:`, error);
            throw error;
        }
    },

    createBooking: async (bookingData, token) => {
        try {
            const response = await axios.post(API_URL, bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating booking:", error);
            throw error;
        }
    },

    updateBooking: async (id, updatedData, token) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating booking with ID ${id}:`, error);
            throw error;
        }
    },

    deleteBooking: async (id, token) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting booking with ID ${id}:`, error);
            throw error;
        }
    }
};

export default BookingService;
