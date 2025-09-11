import axios from "axios";

export const fetchCoreCollection = async (page = 0, size = 12) => {
    try {
        const response = await axios.get(`http://103.110.87.196/api/bags/core?page=${page}&size=${size}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching core bags:", error);
        throw error;
    }
};

export const fetchArtistCollection = async (page = 0, size = 12) => {
    try {
        const response = await axios.get(`http://103.110.87.196/api/bags/artist?page=${page}&size=${size}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching artist bags:", error);
        throw error;
    }
};