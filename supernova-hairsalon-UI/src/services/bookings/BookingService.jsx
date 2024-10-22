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
    }
};

export default BookingService;
