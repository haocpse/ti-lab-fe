import axios from "axios";

export const signUp = async (account, password, email, firstName, lastName) => {
    try {
        const response = await axios.post("http://103.110.87.196/api/register", {
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