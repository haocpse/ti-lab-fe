import AxiosSetup from "./AxiosSetup";

export const fetchCartNumber = async () => {
    const response = await AxiosSetup.get("/customers/me/cart-number");
    console.log(response.data.data.number)
    return response.data?.data?.number || 0;
};
