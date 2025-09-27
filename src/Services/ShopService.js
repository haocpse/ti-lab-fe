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

export const fetchCollection = async (page = 0) => {
    try {
        const response = await AxiosSetup.get(`/collections?page=${page}&size=8`);
        return response.data.data.content;

    } catch (error) {
        console.log("Lỗi khi fetch dữ liệu:", error);
    }
};