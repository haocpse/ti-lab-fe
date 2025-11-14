import AxiosSetup from "./AxiosSetup";

export const getOrderStat = async (range) => {
    try {
        const response = await AxiosSetup.get(`/dashboards/order-stat?range=${range}`);
        return response.data;
    } catch (error) {
        console.error("Error sending email", error);
    }
}

export const getOrderStatusStat = async (range) => {
    try {
        const response = await AxiosSetup.get(`/dashboards/order-stat-status?range=${range}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order status stat", error);
    }
}

export const getBestSellingBags = async (range) => {
    try {
        const response = await AxiosSetup.get(`/dashboards/best-selling?range=${range}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching best selling bags", error);
    }
}

export const getPaymentStat = async (range) => {
    try {
        const response = await AxiosSetup.get(`/dashboards/payment-stat?range=${range}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching payment stat", error);
    }
}

export const getPaymentMethodStat = async (range) => {
    try {
        const response = await AxiosSetup.get(`/dashboards/payment-method-stat?range=${range}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching payment method stat", error);
    }
}

export const getPaymentOverview = async (range) => {
    try {
        const response = await AxiosSetup.get(`/dashboards/payment-stat-overview?range=${range}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching payment overview", error);
    }
}

export const getPaymentHistory = async (page = 1, size = 3) => {
    try {
        const response = await AxiosSetup.get(`/payments`, {
            params: { page, size }
        });
        return response.data;
    } catch (err) {
        console.error("Lỗi lấy lịch sử giao dịch:", err);
    }
};