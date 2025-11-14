import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="dashboard-tabs">
            <button
                className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
            >
                Đơn hàng
            </button>

            <button
                className={`tab-btn ${activeTab === "payment" ? "active" : ""}`}
                onClick={() => setActiveTab("payment")}
            >
                Thanh toán
            </button>
        </div>
    );
};

export default Tabs;