import AxiosSetup from "./AxiosSetup";

export const fetchCoreCollection = async (page = 0, size = 12) => {
    try {
        const response = await AxiosSetup.get(`/bags/core?page=${page}&size=${size}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching core bags:", error);
        throw error;
    }
};

export const fetchArtistCollection = async (page = 0, size = 12) => {
    try {
        const response = await AxiosSetup.get(`/bags/artist?page=${page}&size=${size}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching artist bags:", error);
        throw error;
    }
};