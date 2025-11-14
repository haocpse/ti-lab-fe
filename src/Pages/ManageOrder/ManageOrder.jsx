import React, { useEffect, useState } from "react";
import AxiosSetup from "../../Services/AxiosSetup";
import "./ManageOrder.css";

const ManageOrder = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [searchFunction, setSearchFunction] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrder = async (page) => {
        try {
            const response = await AxiosSetup.get(`/orders?page=${page}&size=10`);
            setOrders(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
            setPage(response.data.data.number);
            setTotalElements(response.data.data.totalElements);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchOrderDetail = async (orderId) => {
        try {
            const response = await AxiosSetup.get(`/orders/${orderId}`);
            setSelectedOrder(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrder(page);
    }, [page]);

    const filteredOrders = orders.filter((order) =>
        order.customerResponse.fullName.toLowerCase().includes(searchFunction.toLowerCase()) ||
        order.status.toLowerCase().includes(searchFunction.toLowerCase())
    );

    return (
        <div className="container mt-4">

            {/* Header + Search */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Manage Orders</h2>

                <div className="input-group w-25">
                    <span className="input-group-text bg-white border-end-0">
                        <i className="bi bi-search-heart"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Search..."
                        value={searchFunction}
                        onChange={(e) => setSearchFunction(e.target.value)}
                    />
                </div>
            </div>

            {/* Total */}
            <div className="badge bg-info fs-6 mb-3">
                <i className="fas fa-info-circle"></i> Total: {totalElements} Orders
            </div>

            {/* Table */}
            <div className="admin-order-table-container">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Bags</th>
                            <th>Total (VND)</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Details</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order, index) => (
                                <tr key={order.orderId}>
                                    <td>{index + 1 + page * 8}</td>
                                    <td>{order.customerResponse.fullName}</td>
                                    <td>{order.customerResponse.email}</td>
                                    <td>{order.numberOfBag}</td>
                                    <td>{order.total}</td>

                                    <td>
                                        <span className="badge bg-warning text-dark">{order.status}</span>
                                    </td>

                                    <td>{new Date(order.createdAt).toLocaleString()}</td>

                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#orderDetailModal"
                                            onClick={() => fetchOrderDetail(order.orderId)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setPage(page - 1)}>
                            <i className="bi bi-caret-left"></i>
                        </button>
                    </li>

                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${page === index ? "active" : ""}`}>
                            <button className="page-link" onClick={() => setPage(index)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setPage(page + 1)}>
                            <i className="bi bi-caret-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>

            {/* =======================
                ORDER DETAIL MODAL
            ======================== */}
            <div
                className="modal fade"
                id="orderDetailModal"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Order Detail</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            {selectedOrder ? (
                                <>
                                    {/* CUSTOMER INFO */}
                                    <h5 className="fw-bold">Customer</h5>
                                    <p className="mb-2">
                                        <b>{selectedOrder.customerResponse.fullName}</b><br />
                                        Email: {selectedOrder.customerResponse.email}<br />
                                        Phone: {selectedOrder.phone || "No phone provided"}
                                    </p>

                                    <hr />

                                    {/* ORDER ITEMS */}
                                    <h5 className="fw-bold">Items</h5>
                                    <ul className="list-unstyled">
                                        {selectedOrder.orderDetailResponseList.map((detail) => (
                                            <li key={detail.detailId} className="mb-1">
                                                <img
                                                    src={detail.bagResponse.bagImages?.[0]?.url}
                                                    alt=""
                                                    style={{ width: 50, height: 50, objectFit: "cover", marginRight: 10, borderRadius: 6 }}
                                                />
                                                <b>{detail.bagResponse.name}</b> × {detail.quantity}
                                                <span className="text-primary ms-2">
                                                    {detail.totalPrice.toLocaleString()} VND
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <hr />

                                    {/* PAYMENT */}
                                    <h5 className="fw-bold">Payment</h5>
                                    <p>
                                        Method: <b>{selectedOrder.paymentResponse?.method || "N/A"}</b> <br />
                                        Status: {selectedOrder.paymentResponse?.status || "N/A"} <br />
                                        Payment Date: {selectedOrder.paymentResponse?.paymentDate
                                            ? new Date(selectedOrder.paymentResponse.paymentDate).toLocaleString()
                                            : "N/A"}
                                    </p>

                                    <hr />

                                    {/* ORDER SUMMARY */}
                                    <h5 className="fw-bold">Order Summary</h5>

                                    <div className="alert alert-info mt-3">
                                        <b>Total: {selectedOrder.total.toLocaleString()} VND</b> <br />
                                        Status: {selectedOrder.status} <br />
                                        Created At: {new Date(selectedOrder.createdAt).toLocaleString()}
                                    </div>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default ManageOrder;
