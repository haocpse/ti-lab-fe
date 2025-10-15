import React, { useEffect, useState } from "react";
import './Navbar.css'
import logo from "../../assets/Logo.png";
import logoGreen from "../../assets/tí.lab_logo-05.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { fetchCartNumber } from "../../Services/CartService";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const [isLogined, setIsLogined] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language || "vi");

    const changeLanguage = () => {
        const newLang = language === "vi" ? "en" : "vi";
        i18n.changeLanguage(newLang);       
        localStorage.setItem("lang", newLang);
        setLanguage(newLang);
      };
      
    const isMembershipPage = location.pathname === "/membership" ||
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/customer/profile" ||
        location.pathname === "/about" ||
        location.pathname === "/blog" ||
        location.pathname === "/custom";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogined(true);
            loadCartNumber();
        }
    }, []);

    const loadCartNumber = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const number = await fetchCartNumber();
            setCartCount(number);
            console.log("Cart number response:", number);
        } catch (error) {
            console.error("Error fetching cart number:", error);
        }
    };



    useEffect(() => {
        const handleCartUpdate = () => {
            loadCartNumber();
        };
        window.addEventListener("cartUpdated", handleCartUpdate);
        return () => window.removeEventListener("cartUpdated", handleCartUpdate);
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

    const getActiveColor = (path) => {
        if (path === "/about" || path === "/custom" || path === "/blog" || path === "/membership") {
            return "#CAFF01";
        }
        return "#0168EB";
    };


    console.log("Cart count state in Navbar:", cartCount);
    console.log("Cart count state in Navbar:", cartCount);

    return (

        <nav className={`navbar fixed-top navbar-expand-lg px-4 ${isMembershipPage ? "navbar-dark" : "navbar-light"} ${(isMembershipPage ? "bg-black" : "bg-white")}`}>
            <div className="container-fluid">

                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-brand">
                    <NavLink to="/">
                        <img src={isMembershipPage ? logoGreen : logo} alt="Logo" height={isMembershipPage ? "45px" : "60px"} />
                    </NavLink>
                </div>

                <div className="d-flex gap-4 d-lg-none">
                    {isLogined ? (
                        <>
                            <NavLink onClick={(e) => { e.preventDefault(); handleClickProfile(); }} style={{
                                color: isMembershipPage ? "white" : "black", textDecoration: "none"
                            }}>
                                <i className="fa-solid fa-user"></i>
                            </NavLink>
                            <NavLink onClick={handleLogout} style={{
                                color: isMembershipPage ? "white" : "black",
                                textDecoration: "none"
                            }}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </NavLink>
                        </>
                    ) : (
                        <NavLink to="/login" style={{ color: isMembershipPage ? "white" : "black" }}>
                            <i className="fa-solid fa-user"></i>
                        </NavLink>
                    )}
                    <NavLink to="/" style={{ color: isMembershipPage ? "white" : "black" }}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </NavLink>
                    <NavLink to="/shop/cart" style={{ color: isMembershipPage ? "white" : "black" }}>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </NavLink>
                </div>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? "active-tab" : (isMembershipPage ? "text-white" : "text-dark")}`}
                                style={({ isActive }) => ({
                                    color: isActive ? getActiveColor("/shop") : undefined
                                })}>
                                SHOP
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active-tab" : (isMembershipPage ? "text-white" : "text-dark")}`}
                                style={({ isActive }) => ({
                                    color: isActive ? getActiveColor("/about") : undefined
                                })}>
                                ABOUT
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/custom" className={({ isActive }) => `nav-link ${isActive ? "active-tab" : (isMembershipPage ? "text-white" : "text-dark")}`}
                                style={({ isActive }) => ({
                                    color: isActive ? getActiveColor("/custom") : undefined
                                })}>
                                CUSTOM
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? "active-tab" : (isMembershipPage ? "text-white" : "text-dark")}`}
                                style={({ isActive }) => ({
                                    color: isActive ? getActiveColor("/blog") : undefined
                                })}>
                                BLOG
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/membership" className={({ isActive }) => `nav-link ${isActive ? "active-tab" : (isMembershipPage ? "text-white" : "text-dark")}`}
                                style={({ isActive }) => ({
                                    color: isActive ? getActiveColor("/membership") : undefined
                                })}>
                                MEMBERSHIP
                            </NavLink>
                        </li>
                    </ul>


                    {/*desktop */}
                    <div className="d-none d-lg-flex gap-4">
                        {isLogined ? (
                            <>
                                <NavLink onClick={(e) => { e.preventDefault(); handleClickProfile(); }} style={{
                                    color: isMembershipPage ? "white" : "black", textDecoration: "none"
                                }}>
                                    <i className="fa-solid fa-user"></i>
                                </NavLink>
                                <NavLink onClick={handleLogout} style={{
                                    color: isMembershipPage ? "white" : "black",
                                    textDecoration: "none"
                                }}>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </NavLink>
                            </>
                        ) : (
                            <NavLink to="/login" style={{ color: isMembershipPage ? "white" : "black" }}>
                                <i className="fa-solid fa-user"></i>
                            </NavLink>
                        )}
                        <NavLink to="/" style={{ color: isMembershipPage ? "white" : "black" }}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </NavLink>
                        <div className="cart-icon-wrapper">
                            <NavLink to="/shop/cart" style={{ color: isMembershipPage ? "white" : "black" }}>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </NavLink>
                            {cartCount > 0 && (
                                <span className="cart-count-badge">{cartCount}</span>
                            )}
                        </div>
                        <div className="checkbox-wrapper-35">
                            <input
                                value="private"
                                name="switch"
                                id="switch"
                                type="checkbox"
                                className="switch"
                                checked={language === "en"}
                                onChange={changeLanguage}
                            />
                            <label htmlFor="switch">
                                <span className="switch-x-text">
                                    {i18n.language === "vi" ? "🇻🇳" : "🇬🇧"}
                                </span>
                                <span className="switch-x-toggletext">
                                    <span className="switch-x-unchecked">
                                        <span className="switch-x-hiddenlabel">Unchecked: </span>VI
                                    </span>
                                    <span className="switch-x-checked">
                                        <span className="switch-x-hiddenlabel">Checked: </span>EN
                                    </span>
                                </span>
                            </label>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;