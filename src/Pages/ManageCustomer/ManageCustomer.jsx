import React, { useEffect, useState } from "react";
import AxiosSetup from "../../Services/AxiosSetup";
import avt from "../../assets/hinhdaidien.jpg"
import { useNavigate } from "react-router-dom";
import "./ManageCustomer.css"

const ManageCustomer = () => {
    const [customer, setCustomer] = useState([])
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchFunction, setSearchFunction] = useState("");
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(null);
    const [totalElements, setTotalElements] = useState(0);

    const fetchCustomer = async (page = 0, size = 8) => {
        try {
            const response = await AxiosSetup.get(`/customers?page=${page}&size=${size}`);
            setCustomer(response.data.data.content.map(item => item.userResponse));
            setPage(response.data.data.number);
            setTotalPages(response.data.data.totalPages);
            setTotalElements(response.data.data.totalElements);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchCustomer(page, 8);
    }, [page]);



    const toggleMenu = (id) => {
        setOpenMenu(openMenu === id ? null : id);
    };

    const handleViewClick = (id) => {
        navigate(`/admin/manage-customer/view/${id}`);
    };

    const filteredCustomer = customer.filter((customer) =>
        customer.username.toLowerCase().includes(searchFunction.toLowerCase())
    );


    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Manage Customer</h3>
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

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="badge bg-info fs-6">
                    <i className="fas fa-info-circle"></i> Total: {totalElements} Customers
                </div>
            </div>

            <div className="container">
                <div className="row g-4">
                    {filteredCustomer.map((customer) => (
                        <div key={customer.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <div className="card h-100 border-0 shadow-sm customer-card">
                                <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <span className={`badge ${customer.active ? 'bg-success' : 'bg-danger'} me-2`}>
                                            <i className={`fas ${customer.active ? 'fa-check-circle' : 'fa-times-circle'} me-1`}></i>
                                            {customer.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>

                                    <div className="dropdown">
                                        <button className="btn btn-sm btn-outline-secondary border-0 menu-button" onClick={() => toggleMenu(customer.id)} >
                                            <i className="fas fa-ellipsis-v"></i>
                                        </button>
                                        {openMenu === customer.id && (
                                            <div className="dropdown-menu dropdown-menu-end show position-absolute dropdown-menu-custom">
                                                <button className="dropdown-item d-flex align-items-center py-2 px-3 rounded" onClick={() => handleViewClick(customer.id)}>
                                                    <i className="fas fa-eye text-primary me-2"></i>
                                                    <span>View Details</span>
                                                </button>
                                                <button className="dropdown-item d-flex align-items-center py-2 px-3 rounded">
                                                    <i className="fas fa-edit text-warning me-2"></i>
                                                    <span>Edit</span>
                                                </button>
                                                <hr className="dropdown-divider my-1" />
                                                <button className="dropdown-item d-flex align-items-center py-2 px-3 rounded text-danger">
                                                    <i className="fas fa-trash me-2"></i>
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="position-relative me-3">
                                            <img
                                                src={avt}
                                                alt={`${customer.username} avatar`}
                                                className="rounded-circle border avatar"
                                                width="60"
                                                height="60"
                                            />
                                            <span
                                                className={`position-absolute bottom-0 end-0 rounded-circle border border-2 border-white ${customer.active ? 'bg-success' : 'bg-secondary'} status-dot`}
                                            ></span>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="card-title mb-1">{customer.username}</h5>
                                        </div>
                                    </div>

                                    <div className="customer-details">
                                        <div className="info-item mb-2">
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-envelope text-primary me-2"></i>
                                                <div>
                                                    <small className="text-muted d-block">Email</small>
                                                    <span className="text-dark fw-medium email-text" title={customer.email}>
                                                        {customer.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="info-item mb-2">
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-phone text-success me-2"></i>
                                                <div>
                                                    <small className="text-muted d-block">Phone</small>
                                                    <span className="text-dark fw-medium">{customer.phone || 'Not provided'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="info-item mb-3">
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-user-tag text-warning me-2"></i>
                                                <div>
                                                    <small className="text-muted d-block">Role</small>
                                                    <span className="text-dark fw-medium">{customer.role}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {/* paging */}
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
        </div>

    );
}
export default ManageCustomer;