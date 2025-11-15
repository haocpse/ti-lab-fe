import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import avt from "../../assets/hinhdaidien.jpg";
import { fetchProfileCustomer, fetchProfileOrder } from "../../Services/Profile";
import { useTranslation } from "react-i18next";
import OrderDetailModal from "../OrderDetail/OrderDetailModal";

const Profile = () => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState(null);
    const [order, setOrder] = useState([]);
    const [profile1, setProfile1] = useState(null);
    const [currentTab, setCurrentTab] = useState("account");
    const statusColors = {
        PREPARING: "#ffc107",
        DELIVERING: "#17a2b8",
        DELIVERED: "#28a745",
        COMPLETED: "#007bff",
        CANCELLED: "#dc3545",
        FAILED: "#6c757d",
        RETURNED: "#fd7e14",
        REFUNDED: "#20c997"
    };
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleOpenDetail = (orderId) => {
        setSelectedOrderId(orderId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrderId(null);
    };

    const itemsPerPage = 6;
    const [page, setPage] = useState(0);

    const fetchProfile = async () => {
        try {
            const data = await fetchProfileCustomer();
            setProfile(data)
            setProfile1(data.userResponse)

        } catch (error) {
            console.log(error)
        }
    };

    const fetchOrder = async (page) => {
        try {
            const data = await fetchProfileOrder(page);
            const sortedOrders = data.content.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setOrder(sortedOrders)

            window.scrollTo(0, 0);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchProfile();
        fetchOrder();
    }, []);


    const totalPages = Math.ceil(order.length / itemsPerPage);

    const displayedOrders = order.slice(
        page * itemsPerPage,
        page * itemsPerPage + itemsPerPage
    );


    return (
        <>
            <Navbar />
            <div className="text-light min-vh-100 py-5" style={{ backgroundColor: "black" }}>
                <div className="container">
                    <h2 className="text-center mb-4 mt-5" style={{ color: "#caff01", fontSize: "2.5rem", fontWeight: 500 }}> {t("profile.title")}</h2>

                    <div className="d-flex justify-content-center mb-5">
                        <div
                            className={`me-5 pb-1 ${currentTab === "account" ? "border-bottom border-2" : ""}`}
                            style={{
                                color: "#caff01",
                                fontWeight: 500,
                                cursor: "pointer",
                                opacity: currentTab === "account" ? 1 : 0.6
                            }}
                            onClick={() => setCurrentTab("account")}
                        >
                            {t("profile.accountInfo")}
                        </div>
                        <div
                            className={`pb-1 ${currentTab === "orders" ? "border-bottom border-2" : ""}`}
                            style={{
                                color: "#caff01",
                                fontWeight: 500,
                                cursor: "pointer",
                                opacity: currentTab === "orders" ? 1 : 0.6
                            }}
                            onClick={() => setCurrentTab("orders")}
                        >
                            {t("profile.latestList")}
                        </div>
                    </div>
                    {currentTab === "account" ? (
                        <div className="row justify-content-center align-items-center">
                            <div className="col-12 col-md-4 d-flex justify-content-center mb-4 mb-md-0">
                                <img
                                    src={profile?.bagImages ? encodeURI(profile?.bagImages) : avt}
                                    alt="User Avatar"
                                    className="rounded-4"
                                    style={{ width: "250px", height: "250px", objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="mb-3 d-flex">
                                    <span className="me-3" style={{ width: 130, color: "#caff01" }}>{t("profile.fullName")}:</span>
                                    <span>{(profile?.fullName || "Name").toUpperCase()}</span>
                                </div>
                                <div className="mb-3 d-flex">
                                    <span className="me-3" style={{ width: 130, color: "#caff01" }}> {t("profile.dob")}:</span>
                                    <span> {profile?.dob ? new Date(profile.dob).toLocaleDateString("en-GB") : "Birth"}</span>
                                </div>
                                <div className="mb-3 d-flex">
                                    <span className="me-3" style={{ width: 130, color: "#caff01" }}> {t("profile.phone")}:</span>
                                    <span>{profile1?.phone || "Phone"}</span>
                                </div>
                                <div className="mb-3 d-flex">
                                    <span className="me-3" style={{ width: 130, color: "#caff01" }}> {t("profile.email")}:</span>
                                    <span>{profile1?.email || "Gmail"}</span>
                                </div>
                            </div>
                        </div>
                    ) : (<div className="row justify-content-center">
                        <div className="col-12 col-lg-10">
                            <div className="row mb-3 pb-2 border-bottom" style={{ borderColor: "#caff01 !important" }}>
                                <div className="col-3">
                                    <span style={{ color: "#caff01", fontWeight: 500 }}>{t("profile.orderId")}</span>
                                </div>
                                <div className="col-3">
                                    <span style={{ color: "#caff01", fontWeight: 500 }}>{t("profile.dates")}</span>
                                </div>
                                <div className="col-3">
                                    <span style={{ color: "#caff01", fontWeight: 500 }}>{t("profile.status")}</span>
                                </div>
                                <div className="col-2">
                                    <span style={{ color: "#caff01", fontWeight: 500 }}>{t("profile.price")}</span>
                                </div>
                                <div className="col-1">
                                    <span style={{ color: "#caff01", fontWeight: 500 }}>Report</span>
                                </div>
                            </div>
                            {displayedOrders && displayedOrders.length > 0 ? (
                                displayedOrders.map((orderItem, index) => (
                                    <div
                                        key={index}
                                        className="row mb-3 py-3"
                                        style={{ borderBottom: "1px solid rgba(202, 255, 1, 0.2)", cursor: "pointer" }}
                                        onClick={() => handleOpenDetail(orderItem.orderId)}
                                    >
                                        <div className="col-3">
                                            <span style={{ color: "#caff01" }}>#{orderItem.orderId}</span>
                                        </div>
                                        <div className="col-3">
                                            <span>
                                                {new Date(orderItem.createdAt).toLocaleDateString("en-GB")}{" "}
                                                {new Date(orderItem.createdAt).toLocaleTimeString("en-GB")}
                                            </span>
                                        </div>
                                        <div className="col-3">
                                            <span style={{ color: statusColors[orderItem.status] }}>{orderItem.status}</span>
                                        </div>
                                        <div className="col-2">
                                            <span>{orderItem.total.toLocaleString()} VND</span>
                                        </div>
                                        <div className="col-1">
                                            <button
                                                className="btn btn-sm"
                                                style={{
                                                    backgroundColor: "transparent",
                                                    border: "1px solid #caff01",
                                                    color: "#caff01",
                                                    padding: "3px 10px",
                                                    borderRadius: "6px"
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Không mở modal order detail
                                                    console.log("Report order:", orderItem.orderId);
                                                    alert(`Report for order: ${orderItem.orderId}`);
                                                }}
                                            >
                                                Report
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (<div>{t("profile.noOrders")}</div>)}
                            <nav>
                                <ul className="pagination justify-content-center">
                                    <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setPage(page - 1)}
                                            disabled={page === 0}
                                            style={{ backgroundColor: "black" }}
                                        >
                                            <i class="bi bi-caret-left" style={{ color: "white" }}></i>
                                        </button>
                                    </li>

                                    {[...Array(totalPages)].map((_, index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${page === index ? "active" : ""}`}
                                        >
                                            <button className="page-link" onClick={() => setPage(index)}
                                                style={{ backgroundColor: "black" }}>
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}

                                    <li
                                        className={`page-item ${page === totalPages - 1 ? "disabled" : ""
                                            }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setPage(page + 1)}
                                            disabled={page === totalPages - 1}
                                            style={{ backgroundColor: "black" }}
                                        >
                                            <i class="bi bi-caret-right" style={{ color: "white" }}></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    )}

                </div>
            </div>
            <OrderDetailModal
                show={showModal}
                orderId={selectedOrderId}
                onClose={handleCloseModal}
            />
            <Footer />
        </>
    );
};
export default Profile;