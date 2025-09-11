import React from "react";
import AxiosSetup from "./AxiosSetup";

export const login = async (account, password) => {
    try {
        const response = await AxiosSetup.post("/login", {
            username: account,
            password: password
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}