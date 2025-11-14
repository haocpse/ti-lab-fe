import axios from "axios";

const AxiosSetup = axios.create({
    baseURL: "https://tilab.com.vn/api",
    //baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

AxiosSetup.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(token)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosSetup;
