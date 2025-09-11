import AxiosSetup from "./AxiosSetup";

export const fetchProfileCustomer = async () => {
    try {
        const response = await AxiosSetup.get("/customers/me");
        return response.data.data;
    } catch (error) {
        console.log(error)
    }

}