import React, { useEffect, useState } from "react";
import { fetchOrderById } from "../../Services/OrderService";
import { Spinner } from "react-bootstrap";
import "./OrderDetailModal.css";

const OrderDetailModal = ({ show, orderId, onClose }) => {
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const statusSteps = ["PREPARING", "DELIVERING", "COMPLETED", "CANCELLED"];

    const getActiveStep = (status) => {
        return statusSteps.indexOf(status);
    };
    useEffect(() => {

        console.log(orderId)

        if (show && orderId) {
            const loadDetail = async () => {
                setLoading(true);
                setError(null);
                try {
                    const res = await fetchOrderById(orderId);
                    setOrderDetail(res.data);
                } catch (err) {
                    console.error(err);
                    setError("Failed to load order details.");
                } finally {
                    setLoading(false);
                }
            };
            loadDetail();
        }
    }, [show, orderId]);

    if (!show) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "60%" }}>
                <div
                    className="modal-content"
                    style={{
                        backgroundColor: "#111",
                        color: "white",
                        border: "1px solid #caff01",
                        borderRadius: "10px"
                    }}
                >
                    <div className="modal-header border-0">
                        <h5 className="modal-title" style={{ color: "#caff01" }}>
                            {orderDetail ? `Order #${orderDetail.orderId}` : "Order Details"}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            style={{ filter: "invert(1)" }}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {loading && (
                            <div className="text-center py-5">
                                <Spinner animation="border" variant="light" />
                                <div>Loading...</div>
                            </div>
                        )}
                        {/* Progress Status */}
                        {orderDetail && (
                            <>
                                <h6 style={{ color: "#caff01" }}>Order Progress</h6>
                                <div className="my-order-progress-container">
                                    {statusSteps.map((step, index) => {
                                        const isActive = index <= getActiveStep(orderDetail.status);
                                        return (
                                            <div
                                                key={step}
                                                className={`my-order-progress-step ${isActive ? "active" : ""}`}
                                            >
                                                <div className="my-order-progress-line"></div>
                                                {step}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                        {error && <div className="text-danger">{error}</div>}

                        {orderDetail && (
                            <>
                                <div className="row">
                                    {/* Customer Info */}
                                    <div className="col-6">
                                        <h6 style={{ color: "#caff01" }}>Customer Information</h6>
                                        <div className="mb-3">
                                            <p><strong>Name:</strong> {orderDetail.customerResponse.fullName}</p>
                                            <p><strong>Email:</strong> {orderDetail.customerResponse.email}</p>
                                            <p><strong>Phone:</strong> {orderDetail.phone || "N/A"}</p>
                                            <p><strong>Address:</strong> {orderDetail.address || "N/A"}</p>
                                        </div>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="col-6">
                                        <h6 style={{ color: "#caff01" }}>Order Summary</h6>
                                        <div className="mb-3">
                                            <p><strong>Created at:</strong> {new Date(orderDetail.createdAt).toLocaleString()}</p>
                                            <p>
                                                <strong>Delivered at:</strong>{" "}
                                                {orderDetail.deliveredAt
                                                    ? new Date(orderDetail.deliveredAt).toLocaleString()
                                                    : "Not delivered yet"}
                                            </p>
                                            <p><strong>Total:</strong> <span style={{ color: "#caff01" }}>{orderDetail.total.toLocaleString()} VND</span></p>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <h6 style={{ color: "#caff01" }}>Payment Information</h6>
                                <div className="mb-3">
                                    <p><strong>Method:</strong> {orderDetail.paymentResponse.method}</p>
                                    <p><strong>Status:</strong> {orderDetail.paymentResponse.status}</p>
                                    <p><strong>Payment Date:</strong> {new Date(orderDetail.paymentResponse.paymentDate).toLocaleString()}</p>
                                </div>

                                {/* Products */}
                                <h6 style={{ color: "#caff01" }}>Products</h6>
                                <ul className="list-unstyled mt-2">
                                    {orderDetail.orderDetailResponseList.map((item) => (
                                        <li
                                            key={item.detailId}
                                            className="d-flex justify-content-between align-items-center py-2 border-bottom border-secondary"
                                        >
                                            <div className="d-flex align-items-center gap-3">

                                                {/* Bag Image */}
                                                <img
                                                    src={item.bagResponse.bagImages?.[0]?.url}
                                                    alt={item.bagResponse.name}
                                                    style={{
                                                        width: "60px",
                                                        height: "60px",
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                        border: "1px solid #333"
                                                    }}
                                                />

                                                <div>
                                                    <strong>{item.bagResponse.name}</strong>
                                                    <div style={{ fontSize: "0.9rem", color: "#ccc" }}>
                                                        {item.bagResponse.author}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <span>{item.quantity} × {item.bagResponse.price.toLocaleString()} VND</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Nền tối */}
            <div
                className="modal-backdrop fade show"
                onClick={onClose}
                style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            ></div>
        </div>
    );
};

export default OrderDetailModal;
