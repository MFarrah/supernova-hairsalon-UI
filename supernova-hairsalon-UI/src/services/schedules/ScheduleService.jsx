import axios from 'axios';

const API_URL = "http://localhost:8080/api/schedules";

const ScheduleService = {
    getAllSchedules: async (token) => {
        try {
            const response = await axios.get(`${API_URL}/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching schedules:", error);
            throw error;
        }
    }
};

export default ScheduleService;
