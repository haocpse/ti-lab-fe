import React, { useEffect, useState } from "react";
import { fetchOrderById } from "../../Services/OrderService";
import { Spinner } from "react-bootstrap";

const OrderDetailModal = ({ show, orderId, onClose }) => {
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            <div className="modal-dialog modal-lg modal-dialog-centered">
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

                        {error && <div className="text-danger">{error}</div>}

                        {orderDetail && (
                            <>
                                {/* Customer Info */}
                                <h6 style={{ color: "#caff01" }}>Customer Information</h6>
                                <div className="mb-3">
                                    <p><strong>Name:</strong> {orderDetail.customerResponse.fullName}</p>
                                    <p><strong>Email:</strong> {orderDetail.customerResponse.email}</p>
                                    <p><strong>Phone:</strong> {orderDetail.customerResponse.phone || "N/A"}</p>
                                </div>

                                {/* Order Info */}
                                <h6 style={{ color: "#caff01" }}>Order Summary</h6>
                                <div className="mb-3">
                                    <p><strong>Status:</strong> {orderDetail.status}</p>
                                    <p><strong>Created at:</strong> {new Date(orderDetail.createdAt).toLocaleString()}</p>
                                    <p><strong>Subtotal:</strong> {orderDetail.subTotal.toLocaleString()} VND</p>
                                    <p><strong>Delivery Fee:</strong> {orderDetail.feeOfDelivery.toLocaleString()} VND</p>
                                    <p><strong>Total:</strong> <span style={{ color: "#caff01" }}>{orderDetail.total.toLocaleString()} VND</span></p>
                                </div>

                                {/* Products */}
                                <h6 style={{ color: "#caff01" }}>Products</h6>
                                <ul className="list-unstyled mt-2">
                                    {orderDetail.orderDetailResponseList.map((item) => (
                                        <li
                                            key={item.detailId}
                                            className="d-flex justify-content-between align-items-center py-2 border-bottom border-secondary"
                                        >
                                            <div>
                                                <strong>{item.bagResponse.name}</strong>
                                                <div style={{ fontSize: "0.9rem", color: "#ccc" }}>
                                                    {item.bagResponse.author}
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
