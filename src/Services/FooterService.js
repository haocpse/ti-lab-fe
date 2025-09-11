import axios from "axios";

export const sendEmailFooter = async (email) => {
    try {
        const response = await axios.post("http://103.110.87.196/api/sendMail", {
            email
        });
        return response;
    } catch (error) {
        console.error("Error sending email", error);
    }
}
