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
    },

    getScheduleById: async (id, token) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching schedule with ID ${id}:`, error);
            throw error;
        }
    },

    createSchedule: async (scheduleData, token) => {
        try {
            const response = await axios.post(API_URL, scheduleData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating schedule:", error);
            throw error;
        }
    },

    updateSchedule: async (id, updatedData, token) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating schedule with ID ${id}:`, error);
            throw error;
        }
    },

    deleteSchedule: async (id, token) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting schedule with ID ${id}:`, error);
            throw error;
        }
    }
};

export default ScheduleService;
