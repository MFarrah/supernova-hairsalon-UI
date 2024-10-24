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
    },

    getRosterById: async (id, token) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching roster with ID ${id}:`, error);
            throw error;
        }
    },

    createRoster: async (rosterData, token) => {
        try {
            const response = await axios.post(API_URL, rosterData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating roster:", error);
            throw error;
        }
    },

    updateRoster: async (id, updatedData, token) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating roster with ID ${id}:`, error);
            throw error;
        }
    },

    deleteRoster: async (id, token) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting roster with ID ${id}:`, error);
            throw error;
        }
    }
};

export default RosterService;
