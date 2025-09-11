import React, { useEffect, useState } from "react";
import './Navbar.css'
import logo from "../../assets/Logo.png";
import logoGreen from "../../assets/tí.lab_logo-05.png";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const [isLogined, setIsLogined] = useState(false);
    const navigate = useNavigate();

    const isMembershipPage = location.pathname === "/membership" ||
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/customer/profile";

    useEffect(() => {
        let prevScrollY = window.scrollY;
        const navbar = document.querySelector('.navbar');

        const handleScroll = () => {
            if (!navbar) return;
            if (window.scrollY < prevScrollY) {
                navbar.style.top = '0';
            } else {
                navbar.style.top = '-100px';
            }
            prevScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogined(true);
        }
    }, []);

    function getRoleFromToken() {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const roles = decodedToken.scope || decodedToken.roles || decodedToken.authorities;
            return roles;
        }
        return null;
    }

    const handleClickProfile = () => {
        const roles = getRoleFromToken();
        if (roles === "ADMIN") {
            navigate('/admin');
        } else if (roles === "CUSTOMER") {
            navigate('/customer/profile');
        } else {
            navigate('/login');
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.reload();
    };

    return (
        <nav className={`navbar navbar-expand-lg px-4 ${isMembershipPage ? "bg-black navbar-dark" : "bg-white"}`}>
            <div className="container-fluid">

                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-brand">
                    <Link to="/">
                        <img src={isMembershipPage ? logoGreen : logo} alt="Logo" height={isMembershipPage ? "45px" : "60px"} />
                    </Link>
                </div>

                <div className="d-flex gap-4 d-lg-none">
                    {isLogined ? (
                        <>
                            <Link onClick={(e) => { e.preventDefault(); handleClickProfile(); }} style={{
                                color: isMembershipPage ? "white" : "black", textDecoration: "none"
                            }}>
                                <i className="fa-solid fa-user"></i>
                            </Link>
                            <Link onClick={handleLogout} style={{
                                color: isMembershipPage ? "white" : "black",
                                textDecoration: "none"
                            }}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </Link>
                        </>
                    ) : (
                        <Link to="/login" style={{ color: isMembershipPage ? "white" : "black" }}>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    )}
                    <Link to="/" style={{ color: isMembershipPage ? "white" : "black" }}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>
                    <Link to="/shopping" style={{ color: isMembershipPage ? "white" : "black" }}>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                </div>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${isMembershipPage ? "text-white" : "text-dark"}`} to="/shop">SHOP</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isMembershipPage ? "text-white" : "text-dark"}`} to="/about">ABOUT</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isMembershipPage ? "text-white" : "text-dark"}`} to="/custom">CUSTOM</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isMembershipPage ? "text-white" : "text-dark"}`} to="/blog">BLOG</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isMembershipPage ? "text-white" : "text-dark"}`} to="/membership">MEMBERSHIP</Link>
                        </li>
                    </ul>

                    {/*desktop */}
                    <div className="d-none d-lg-flex gap-4">
                        {isLogined ? (
                            <>
                                <Link onClick={(e) => { e.preventDefault(); handleClickProfile(); }} style={{
                                    color: isMembershipPage ? "white" : "black", textDecoration: "none"
                                }}>
                                    <i className="fa-solid fa-user"></i>
                                </Link>
                                <Link onClick={handleLogout} style={{
                                    color: isMembershipPage ? "white" : "black",
                                    textDecoration: "none"
                                }}>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </Link>
                            </>
                        ) : (
                            <Link to="/login" style={{ color: isMembershipPage ? "white" : "black" }}>
                                <i className="fa-solid fa-user"></i>
                            </Link>
                        )}
                        <Link to="/" style={{ color: isMembershipPage ? "white" : "black" }}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Link>
                        <Link to="/shop/cart" style={{ color: isMembershipPage ? "white" : "black" }}>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;