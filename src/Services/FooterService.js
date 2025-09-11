import AxiosSetup from "./AxiosSetup";

export const sendEmailFooter = async (email) => {
    try {
        const response = await AxiosSetup.post("/sendMail", {
            email
        });
        return response;
    } catch (error) {
        console.error("Error sending email", error);
    }
}
