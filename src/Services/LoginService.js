import axios from "axios";
import React from "react";

export const login = async (account, password) => {
    try {
        const response = await axios.post("http://103.110.87.196/api/login", {
            username: account,
            password: password
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}