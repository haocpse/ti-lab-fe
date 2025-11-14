import React from "react";
import "./AdminSideBar.css";
import avt from "../../assets/hinhdaidien.jpg"
import { NavLink } from "react-router-dom";
import logoGreen from "../../assets/tí.lab_logo-05.png";

const AdminSideBar = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div
            className="sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
            style={{ width: "280px", height: "100vh" }}
        >
            <a
                href="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
                <img src={logoGreen} alt="logo" style={{ height: "35px", marginRight: "10px" }} />
                <span className="fs-4">Tí.lab Admin</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                            "nav-link " + (isActive ? "active" : "text-white")
                        }
                    >
                        <i class="bi bi-bar-chart" style={{ marginRight: "5px" }}></i>
                        Dashboard
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/admin/manage-bag"
                        className={({ isActive }) =>
                            "nav-link " + (isActive ? "active" : "text-white")
                        }
                    >
                        <i class="bi bi-bag-heart-fill" style={{ marginRight: "5px" }}></i>
                        Bag Controller
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/manage-collection"
                        className={({ isActive }) =>
                            "nav-link " + (isActive ? "active" : "text-white")
                        }
                    >
                        <i class="bi bi-collection" style={{ marginRight: "5px" }}></i>
                        Collection Controller
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/manage-order"
                        className={({ isActive }) =>
                            "nav-link " + (isActive ? "active" : "text-white")
                        }
                    >
                        <i class="bi bi-receipt" style={{ marginRight: "5px" }}></i>
                        Order Controller
                    </NavLink>
                </li>
                {/* 
                <li>
                    <NavLink
                        to="/admin/manage-coupon"
                        className={({ isActive }) =>
                            "nav-link " + (isActive ? "active" : "text-white")
                        }
                    >
                        <i class="bi bi-tags-fill" style={{ marginRight: "5px" }}></i>
                        Coupon Controller
                    </NavLink>
                </li>
                
                <li>
                    <NavLink
                        to="/admin/manage-membership"
                        className={({ isActive }) =>
                            "nav-link " + (isActive ? "active" : "text-white")
                        }
                    >
                        <i class="bi bi-person-hearts" style={{ marginRight: "5px" }}></i>
                        Membership Controller
                    </NavLink>
                </li>
                */}
                <li>
                    <NavLink
                        to="/admin/manage-customer"
                        className={({ isActive }) =>
                            "nav-link " + (isActive ? "active" : "text-white")
                        }
                    >
                        <i class="bi bi-person-circle" style={{ marginRight: "5px" }}></i>
                        Customer Controller
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/manage-staff"
                        className={({ isActive }) =>
                            "nav-link " + (isActive ? "active" : "text-white")
                        }
                    >
                        <i class="bi bi-person-badge-fill" style={{ marginRight: "5px" }}></i>
                        Staff Controller
                    </NavLink>
                </li>
            </ul>
            <hr />
            <div className="d-flex align-items-center justify-content-between text-white">
                <div className="d-flex align-items-center">
                    <img
                        src={avt}
                        alt="avatar"
                        width="32"
                        height="32"
                        className="rounded-circle me-2"
                    />
                    <strong>Tí.lab Admin</strong>
                </div>

                <button
                    className="btn btn-outline-light btn-sm ms-3"
                    onClick={handleLogout}
                >
                    Log Out
                </button>
            </div>



        </div>
    );
};

export default AdminSideBar;
