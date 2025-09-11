import AxiosSetup from "./AxiosSetup";

export const fetchViewDetailBag = async (id) => {
    try {
        const response = await AxiosSetup.get(`/bags/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching bag details:", error);
        throw error;
    }
}   