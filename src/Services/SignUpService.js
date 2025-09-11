import AxiosSetup from "./AxiosSetup";

export const signUp = async (account, password, email, firstName, lastName) => {
    try {
        const response = await AxiosSetup.post("/register", {
            username: account,
            rawPassword: password,
            firstName: firstName,
            lastName: lastName,
            email: email
        });
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}