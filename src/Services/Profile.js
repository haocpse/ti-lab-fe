import AxiosSetup from "./AxiosSetup";

export const fetchProfileCustomer = async () => {
    try {
        const response = await AxiosSetup.get("/customers/me");
        return response.data.data;
    } catch (error) {
        console.log(error)
    }

}

export const fetchProfileOrder = async (page = 0, size = 8) => {
    try {
        const response = await AxiosSetup.get(`/customers/me/orders?page=${page}&size=${size}`);
        return response.data.data;
    } catch (error) {
        console.log(error)
    }
}