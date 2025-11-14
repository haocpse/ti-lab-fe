import AxiosSetup from "./AxiosSetup";


export const fetchOrderById = async (orderId) => {
    try {
        const response = await AxiosSetup.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error get order by Id", error);
    }
};