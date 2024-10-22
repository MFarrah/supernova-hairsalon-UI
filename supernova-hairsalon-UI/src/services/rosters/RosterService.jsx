import axios from 'axios';

const API_URL = "http://localhost:8080/api/rosters";

const RosterService = {
    getAllRosters: async (token) => {
        try {
            const response = await axios.get(`${API_URL}/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching rosters:", error);
            throw error;
        }
    }
};

export default RosterService;
