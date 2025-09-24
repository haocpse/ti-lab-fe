import React, { useEffect, useState } from "react";
import AxiosSetup from "../../Services/AxiosSetup";

const ManageOrder = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [searchFunction, setSearchFunction] = useState("");

    const fetchOrder = async (page) => {
        try {
            const response = await AxiosSetup.get(`/orders?page=${page}&size=8`);
            setOrders(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
            setPage(response.data.data.number);
            setTotalElements(response.data.data.totalElements);
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
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="badge bg-info fs-6">
                    <i className="fas fa-info-circle"></i> Total: {totalElements} Orders
                </div>
            </div>
            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr >
                        <th scope="col">#</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Email</th>
                        <th scope="col">Number of Bags</th>
                        <th scope="col">Subtotal (VND)</th>
                        <th scope="col">Delivery Fee (VND)</th>
                        <th scope="col">Total (VND)</th>
                        <th scope="col">Status</th>
                        <th scope="col">Details</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredOrders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={order.orderId}>
                                <td>{index + 1 + page * 8}</td>
                                <td>{order.customerResponse.fullName}</td>
                                <td>{order.customerResponse.email}</td>
                                <td>{order.numberOfBag}</td>
                                <td>{order.subTotal.toFixed(2)}</td>
                                <td>{order.feeOfDelivery.toFixed(2)}</td>
                                <td>{order.total.toFixed(2)}</td>
                                <td>
                                    <span className="badge bg-warning text-dark">
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <ul className="mb-0">
                                        {order.orderDetailResponseList.map((detail) => (
                                            <li key={detail.detailId}>
                                                {detail.bagResponse.name} × {detail.quantity} = $
                                                {detail.totalPrice}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">
                                No orders found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Phân trang */}

            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 0}
                        >
                            <i class="bi bi-caret-left"></i>
                        </button>
                    </li>

                    {[...Array(totalPages)].map((_, index) => (
                        <li
                            key={index}
                            className={`page-item ${page === index ? "active" : ""}`}
                        >
                            <button className="page-link" onClick={() => setPage(index)}>
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
                        >
                            <i class="bi bi-caret-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ManageOrder;
