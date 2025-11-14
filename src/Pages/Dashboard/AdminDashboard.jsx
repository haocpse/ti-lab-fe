import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

// Services
import {
    getOrderStat,
    getOrderStatusStat,
    getBestSellingBags,
    getPaymentStat,
    getPaymentMethodStat,
    getPaymentOverview,
    getPaymentHistory
} from "../../Services/DashboardService";

// Components
import Tabs from "./components/Tabs";
import StatusCards from "./components/StatusCards";
import OrderChart from "./components/OrderChart";
import BestSellingBags from "./components/BestSellingBags";

import PaymentOverview from "./components/PaymentOverview";
import PaymentPieChart from "./components/PaymentPieChart";
import PaymentChart from "./components/PaymentChart";
import PaymentHistory from "./components/PaymentHistory";
import PaymentHistoryModal from "./components/PaymentHistoryModal";

import "./AdminDashboard.css";

const AdminDashboard = () => {
    // Tabs
    const [activeTab, setActiveTab] = useState("orders");

    // Order states
    const [orderStat, setOrderStat] = useState([]);
    const [statusStat, setStatusStat] = useState([]);
    const [bestSellingBags, setBestSellingBags] = useState([]);

    // Payment states
    const [paymentStat, setPaymentStat] = useState([]);
    const [paymentMethodStat, setPaymentMethodStat] = useState([]);
    const [paymentOverview, setPaymentOverview] = useState(null);
    const [paymentTypePeriod, setPaymentTypePeriod] = useState("");
    const [paymentHistory, setPaymentHistory] = useState([]);

    // Pagination
    const [page, setPage] = useState(1);
    const [size] = useState(3);
    const [totalPages, setTotalPages] = useState(1);

    // Modal lịch sử giao dịch
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [modalPage, setModalPage] = useState(1);
    const [modalSize] = useState(10);
    const [modalTotalPages, setModalTotalPages] = useState(1);
    const [modalHistory, setModalHistory] = useState([]);

    // Common
    const [loading, setLoading] = useState(true);
    const [range, setRange] = useState("1m");
    const [typePeriod, setTypePeriod] = useState("");

    // Status labels/colors
    const statusColors = {
        CANCELLED: "status-red",
        COMPLETED: "status-green",
        DELIVERING: "status-blue",
        PREPARING: "status-yellow",
    };
    const statusLabels = {
        CANCELLED: "Đã hủy",
        COMPLETED: "Hoàn thành",
        DELIVERING: "Đang giao hàng",
        PREPARING: "Đang chuẩn bị",
    };

    // Payment method info
    const paymentMethodLabels = {
        CARD: "Thẻ tín dụng",
        COD: "Thanh toán khi nhận hàng",
        BANK_TRANSFER: "Chuyển khoản ngân hàng",
        E_WALLET: "Ví điện tử",
    };

    // Format tiền
    const formatCurrency = (amount) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

    // Fetch order data
    const fetchOrderStat = async () => {
        const res = await getOrderStat(range);
        if (res?.code === 200) {
            let details = res.data.details || [];
            const periodType = res.data.typePeriod;

            details = details.map((d) => ({
                ...d,
                period:
                    periodType === "DAY"
                        ? dayjs(d.period).format("DD/MM")
                        : periodType === "MONTH"
                            ? dayjs(d.period).format("MM/YYYY")
                            : d.period.split(" - ")[0],
                fullDate: d.period,
            }));

            setOrderStat(details);
            setTypePeriod(periodType);
        }
    };

    // Fetch order status
    const fetchStatusData = async () => {
        const res = await getOrderStatusStat(range);
        if (res?.code === 200) setStatusStat(res.data);
    };

    // Fetch best selling
    const fetchBestSellingBags = async () => {
        const res = await getBestSellingBags(range);
        if (res?.code === 200) setBestSellingBags((res.data || []).slice(0, 3));
    };

    // Fetch payment stat
    const fetchPaymentStatData = async () => {
        const res = await getPaymentStat(range);
        if (res?.code === 200) {
            let details = res.data.details || [];
            const periodType = res.data.typeRange || res.data.typePeriod;

            details = details.map((d) => ({
                ...d,
                period:
                    periodType === "DAY"
                        ? dayjs(d.period).format("DD/MM")
                        : periodType === "MONTH"
                            ? dayjs(d.period).format("MM/YYYY")
                            : d.period.split(" - ")[0],
                fullDate: d.period,
                fullPeriod: d.period,
            }));

            setPaymentStat(details);
            setPaymentTypePeriod(periodType);
        }
    };

    const fetchPaymentMethodData = async () => {
        const res = await getPaymentMethodStat(range);
        if (res?.code === 200) setPaymentMethodStat(res.data);
    };

    const fetchPaymentOverviewData = async () => {
        const res = await getPaymentOverview(range);
        if (res?.code === 200) setPaymentOverview(res.data);
    };

    // Fetch nhỏ lịch sử giao dịch
    const fetchPaymentHistorySmall = async () => {
        const res = await getPaymentHistory(page, size);
        if (res?.code === 200) {
            setPaymentHistory(res.data.content);
            setTotalPages(res.data.totalPages);
        }
    };

    // Fetch modal history
    const fetchPaymentHistoryModal = async () => {
        const res = await getPaymentHistory(modalPage, modalSize);
        if (res?.code === 200) {
            setModalHistory(res.data.content);
            setModalTotalPages(res.data.totalPages);
        }
    };

    const openHistoryModal = () => {
        setHistoryModalOpen(true);
        setModalPage(1);
        fetchPaymentHistoryModal();
    };

    // Load data when tab or range changes
    useEffect(() => {
        const load = async () => {
            setLoading(true);

            if (activeTab === "orders") {
                await Promise.all([
                    fetchOrderStat(),
                    fetchStatusData(),
                    fetchBestSellingBags(),
                ]);
            } else {
                await Promise.all([
                    fetchPaymentStatData(),
                    fetchPaymentMethodData(),
                    fetchPaymentOverviewData(),
                ]);
            }

            setLoading(false);
        };
        load();
    }, [activeTab, range]);

    // load small history
    useEffect(() => {
        if (activeTab === "payment") fetchPaymentHistorySmall();
    }, [page, activeTab]);

    // load modal when page change
    useEffect(() => {
        if (historyModalOpen) fetchPaymentHistoryModal();
    }, [modalPage]);

    // UI
    return (
        <div className="dashboard-container">
            {loading ? (
                <div className="dashboard-loading">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    {/* Tabs */}
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Header */}
                    <div className="dashboard-header">
                        <h1>
                            {activeTab === "orders"
                                ? "Thống kê đơn hàng"
                                : "Thống kê thanh toán"}
                        </h1>

                        <div className="range-select-container">
                            <label>Khoảng thời gian:</label>
                            <select
                                value={range}
                                onChange={(e) => setRange(e.target.value)}
                                className="range-select"
                            >
                                <option value="1w">1 tuần</option>
                                <option value="1m">1 tháng</option>
                                <option value="3m">3 tháng</option>
                                <option value="6m">6 tháng</option>
                                <option value="1y">1 năm</option>
                            </select>
                        </div>
                    </div>

                    {/* Orders Tab */}
                    {activeTab === "orders" && (
                        <>
                            <StatusCards
                                statusStat={statusStat}
                                statusLabels={statusLabels}
                                statusColors={statusColors}
                            />

                            <p className="period-type">
                                Chu kỳ thống kê: <span>{typePeriod}</span>
                            </p>

                            <OrderChart
                                orderStat={orderStat}
                                typePeriod={typePeriod}
                            />

                            <BestSellingBags bestSellingBags={bestSellingBags} />
                        </>
                    )}

                    {/* Payment Tab */}
                    {activeTab === "payment" && (
                        <>
                            <div className="payment-row">
                                <PaymentOverview
                                    paymentOverview={paymentOverview}
                                    formatCurrency={formatCurrency}
                                />

                                <PaymentPieChart
                                    paymentMethodStat={paymentMethodStat}
                                    paymentMethodLabels={paymentMethodLabels}
                                />
                            </div>

                            <p className="period-type">
                                Chu kỳ thống kê: <span>{paymentTypePeriod}</span>
                            </p>

                            <PaymentChart
                                paymentStat={paymentStat}
                                paymentTypePeriod={paymentTypePeriod}
                                formatCurrency={formatCurrency}
                            />

                            <PaymentHistory
                                paymentHistory={paymentHistory}
                                formatCurrency={formatCurrency}
                                paymentMethodLabels={paymentMethodLabels}
                                openHistoryModal={openHistoryModal}
                            />
                        </>
                    )}

                    {/* Modal */}
                    <PaymentHistoryModal
                        historyModalOpen={historyModalOpen}
                        setHistoryModalOpen={setHistoryModalOpen}
                        modalHistory={modalHistory}
                        modalPage={modalPage}
                        setModalPage={setModalPage}
                        modalTotalPages={modalTotalPages}
                        formatCurrency={formatCurrency}
                        paymentMethodLabels={paymentMethodLabels}
                    />
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
