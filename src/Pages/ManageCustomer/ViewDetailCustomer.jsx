import React, { useEffect, useState } from "react";
import AxiosSetup from "../../Services/AxiosSetup";
import { useParams, useNavigate } from "react-router-dom";
import avt from "../../assets/hinhdaidien.jpg"

const ViewDetailCustomer = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [orderDetailLoading, setOrderDetailLoading] = useState(false);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await AxiosSetup.get(`/customers/${id}`);


            if (response.data.code === 200) {
                setProfile(response.data.data);
            } else {
                setError('Unable to load customer information');
            }
        } catch (error) {
            console.error("Error loading customer information:", error);
            setError('An error occurred while loading data');
        } finally {
            setLoading(false);
        }
    };

    const fetchOrderDetail = async (orderId) => {
        try {
            setOrderDetailLoading(true);
            const response = await AxiosSetup.get(`/orders/${orderId}`);
            if (response.data.code === 200) {
                setSelectedOrder(response.data.data);
                setOrderModalOpen(true);
            }
        } catch (err) {
            console.error("Error loading order detail:", err);
        } finally {
            setOrderDetailLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await AxiosSetup.get(`/customers/${id}/orders`);
            if (response.data.code === 200 || response.data.code === 0) {
                const sortedOrders = response.data.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setOrders(sortedOrders);
            } else {
                setOrders([]);
            }
        } catch (e) {
            console.error("Error loading orders:", e);
            setOrders([]);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProfile();
            fetchOrders();
        }
    }, [id]);

    const formatPoints = (points) => {
        return points?.toLocaleString() || '0';
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'ADMIN':
                return 'bg-danger';
            case 'MANAGER':
                return 'bg-warning';
            case 'STAFF':
                return 'bg-info';
            case 'CUSTOMER':
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    };

    const getMembershipBadge = (membershipName) => {
        switch (membershipName?.toLowerCase()) {
            case 'seed':
                return 'bg-success';
            case 'grow':
                return 'bg-warning';
            case 'glow':
                return 'bg-secondary';
            case 'gold':
                return 'bg-warning text-dark';
            default:
                return 'bg-primary';
        }
    };

    if (loading) {
        return (
            <div className="container-fluid py-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading customer information...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div>
                <p className="text-center text-danger">View detail fail!</p>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/admin/manage-customer')}
                >
                    <i className="fas fa-arrow-left"></i> Back to Admin Page
                </button>
            </div>
        )
    }


    return (
        <div className="container-fluid py-4">
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <button
                                className="btn btn-outline-secondary me-3"
                                onClick={() => navigate('/admin/manage-customer')}
                                title="Back to customer list"
                            >
                                <i className="fas fa-arrow-left"></i>
                            </button>
                        </div>


                        <div className="btn-group" role="group">
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => console.log('Ban customer:', profile.userResponse.id)}
                            >
                                <i className="fas fa-ban"></i> Ban Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-4">
                            <div className="row">
                                <div className="col-md-4 text-center">
                                    <div className="mb-3">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto overflow-hidden" style={{ width: '120px', height: '120px' }} >
                                            <img src={avt} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    </div>


                                    <h3 className="mb-2">{profile.fullName}</h3>
                                    <p className="text-muted mb-3">@{profile.userResponse.username}</p>

                                    <div className="d-flex flex-column gap-2 align-items-center">
                                        <span className={`badge ${getRoleBadge(profile.userResponse.role)} fs-6`}>
                                            <i className="fas fa-user-tag"></i> {profile.userResponse.role}
                                        </span>

                                        <span className={`badge ${profile.userResponse.active ? 'bg-success' : 'bg-danger'} fs-6`}>
                                            <i className={`fas ${profile.userResponse.active ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                                            {profile.userResponse.active ? 'Active' : 'Banned'}
                                        </span>

                                        {profile.userResponse.reasonBan && (
                                            <div className="alert alert-warning mt-2 small">
                                                <strong>Ban Reason:</strong> {profile.userResponse.reasonBan}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <h5 className="mb-3">
                                        <i className="fas fa-info-circle text-primary"></i> Account Information
                                    </h5>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="fw-semibold text-muted small">User ID:</label>
                                                <p className="mb-0 font-monospace">
                                                    {profile.userResponse.id}
                                                </p>
                                            </div>

                                            <div className="mb-3">
                                                <label className="fw-semibold text-muted small">Email:</label>
                                                <p className="mb-0">
                                                    <i className="fas fa-envelope text-muted me-1"></i>
                                                    {profile.userResponse.email}
                                                </p>
                                            </div>

                                            <div className="mb-3">
                                                <label className="fw-semibold text-muted small">Phone Number:</label>
                                                <p className="mb-0">
                                                    <i className="fas fa-phone text-muted me-1"></i>
                                                    {profile.userResponse.phone ||
                                                        <span className="text-muted fst-italic">Not provided</span>
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="fw-semibold text-muted small">Full Name:</label>
                                                <p className="mb-0">
                                                    <i className="fas fa-user text-muted me-1"></i>
                                                    {profile.fullName}
                                                </p>
                                            </div>

                                            <div className="mb-3">
                                                <label className="fw-semibold text-muted small">Loyalty Points:</label>
                                                <p className="mb-0">
                                                    <i className="fas fa-star text-warning me-1"></i>
                                                    <span className="fw-bold text-success">
                                                        {formatPoints(profile.point)} points
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="mb-3">
                                                <label className="fw-semibold text-muted small">Membership Tier:</label>
                                                <div>
                                                    <span className={`badge ${getMembershipBadge(profile.membershipResponse?.name)} fs-6`}>
                                                        <i className="fas fa-crown"></i>
                                                        {profile.membershipResponse?.name?.toUpperCase() || 'UNDEFINED'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {profile.membershipResponse && (
                <div className="row mb-4">
                    <div className="col-md-12">
                        <div className="card shadow-sm border-0" style={{ borderRadius: '12px' }}>
                            <div className="card-body">
                                <h5 className="card-title">
                                    Membership Information
                                </h5>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="text-center p-3 bg-light rounded">
                                            <i className="fas fa-trophy fa-2x text-warning mb-2"></i>
                                            <h6 className="mb-1">Membership Tier</h6>
                                            <span className={`badge ${getMembershipBadge(profile.membershipResponse.name)} fs-6`}>
                                                {profile.membershipResponse.name?.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="text-center p-3 bg-light rounded">
                                            <i className="fas fa-percentage fa-2x text-success mb-2"></i>
                                            <h6 className="mb-1">Discount</h6>
                                            <span className="text-success fw-bold">
                                                {profile.membershipResponse.description}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <small className="text-muted">
                                        <strong>Requirements:</strong> From {formatPoints(profile.membershipResponse.min)} <span></span>
                                        point to {formatPoints(profile.membershipResponse.max)} points
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm border-0" style={{ borderRadius: "12px" }}>
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-shopping-bag text-primary"></i> Order History
                            </h5>

                            {orders.length === 0 ? (
                                <p className="text-muted fst-italic">No orders found.</p>
                            ) : (
                                <table className="table table-hover mt-3">
                                    <thead className="table-light">
                                        <tr>
                                            <th style={{ width: "60px" }}>#</th>
                                            <th>Order ID</th>
                                            <th>Date</th>
                                            <th>Number of Bags</th>
                                            <th>Total</th>
                                            <th style={{ width: "140px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => {
                                            const date = new Date(order.createdAt);
                                            const formattedDate = date.toLocaleDateString("vi-VN"); // dd/MM/yyyy

                                            return (
                                                <tr key={index}>
                                                    <td className="fw-bold">{index + 1}</td>
                                                    <td className="font-monospace">{order.orderId}</td>
                                                    <td>{formattedDate}</td>
                                                    <td>{order.numberOfBag}</td>
                                                    <td className="fw-bold text-success">
                                                        {order.total.toLocaleString()}₫
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={() => fetchOrderDetail(order.orderId)}
                                                        >
                                                            <i className="fas fa-eye"></i> View
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal View Detail Order */}
            {orderModalOpen && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="fas fa-receipt text-primary"></i> Order Detail
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setOrderModalOpen(false)}></button>
                            </div>

                            <div className="modal-body">
                                {orderDetailLoading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary"></div>
                                    </div>
                                ) : (
                                    <>
                                        <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                                        <p><strong>Status:</strong>
                                            <span className="badge bg-info ms-2">{selectedOrder.status}</span>
                                        </p>

                                        <p><strong>Created At:</strong>
                                            {" "}
                                            {new Date(selectedOrder.createdAt).toLocaleDateString("vi-VN")}
                                        </p>

                                        <hr />

                                        <p><strong>Number of Bags:</strong> {selectedOrder.numberOfBag}</p>
                                        <p><strong>Total:</strong>
                                            <span className="text-success fw-bold ms-1">
                                                {selectedOrder.total.toLocaleString()}₫
                                            </span>
                                        </p>

                                        <hr />

                                        <h6><strong>Products:</strong></h6>

                                        <table className="table table-sm table-bordered mt-2">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Bag Name</th>
                                                    <th>Qty</th>
                                                    <th>Total Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedOrder.orderDetailResponseList.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.bagResponse.name}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.totalPrice.toLocaleString()}₫</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                )}
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setOrderModalOpen(false)}>
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ViewDetailCustomer;