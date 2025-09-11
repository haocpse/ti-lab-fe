import axios from "axios";

const AxiosSetup = axios.create({
    baseURL: "http://103.110.87.196/api",
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
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosSetup;
