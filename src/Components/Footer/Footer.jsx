import './Footer.css'
import logo from "../../assets/LogoMain.png";
import { ToastContainer } from "react-toastify";
import logo1 from "../../assets/Tilab1.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const handleSubmit = async () => {

        navigate("/login")

    };


    const isShopPage = location.pathname === "/shop" ||
        location.pathname.startsWith("/shop/artist-collection/") ||
        location.pathname.startsWith("/shop/core-collection/") ||
        location.pathname === "/shop/cart";


    return (
        <footer className={`footer py-5 ${isShopPage ? "footer-dark" : "bg-light"}`}>
            <ToastContainer position="bottom-right" autoClose={5000} />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4">
                        <h2
                            className="footer-title fw-semibold mb-4"
                            style={{ color: isShopPage ? "#CAFF01" : "#0d6efd" }}
                        >
                            Little things<br />
                            make a<br />
                            impact.
                        </h2>
                        <div className="arrow-icon" style={{ color: isShopPage ? "#fff" : "#0d6efd" }}>
                            <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
                                <path d="M25 5L35 15L25 25M35 15H5" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className=" mb-3">
                            <img src={isShopPage ? logo1 : logo} alt="Logo" height="100" />
                        </div>
                        <div className="row mb-6">

                            <div className={`col-md-8 ${isShopPage ? "text-light" : "text-dark"}`}>
                                <h5 className="fw-bold">Subscribe to our newsletter</h5>
                                <p className={` small mb-3 ${isShopPage ? "text-light" : "text-dark"}`}>
                                    For eco-friendly lifestyle tips, new sustainable designs & special member offers.
                                </p>

                                <div className="input-group mb-3" style={{ cursor: "pointer", textDecoration: "underline" }}>
                                    <span onClick={handleSubmit} style={{ textDecoration: "curosr" }}> Sign up to recieve Tis.lab new Products <i class="bi bi-bell"></i></span>

                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className={`col-md-6 mb-3 ${isShopPage ? "text-light" : "text-dark"}`}>
                                <h6 className="fw-bold mb-3">Menu</h6>
                                <div className="d-flex flex-wrap gap-3">
                                    <a href="/shop" className={`text-decoration-none ${isShopPage ? "text-light" : "text-dark"}`}>Shop</a>
                                    <a href="/about" className={`text-decoration-none ${isShopPage ? "text-light" : "text-dark"}`}>About</a>
                                    <a href="/custom" className={`text-decoration-none ${isShopPage ? "text-light" : "text-dark"}`}>Custom</a>
                                    <a href="/blog" className={`text-decoration-none ${isShopPage ? "text-light" : "text-dark"}`}>Blog</a>
                                    <a href="/membership" className={`text-decoration-none ${isShopPage ? "text-light" : "text-dark"}`}>Membership</a>
                                </div>
                            </div>
                            <div className={`col-md-6 mb-3 ${isShopPage ? "text-light" : "text-dark"}`}>
                                <h6 className="fw-bold mb-3">Social</h6>
                                <div className="d-flex flex-wrap gap-3">
                                    <a href="#" className={`text-decoration-none ${isShopPage ? "text-light" : "text-dark"}`}>Facebook</a>
                                    <a href="#" className={`text-decoration-none ${isShopPage ? "text-light" : "text-dark"}`}>Instagram</a>
                                    <a href="#" className={`text-decoration-none ${isShopPage ? "text-light" : "text-dark"}`}>Youtube</a>
                                    <a href="#" className={`text-decoration-none ${isShopPage ? "text-light" : "text-dark"}`}>Tiktok</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* phan ban quyen */}
                <hr className={`my-4 row align-items-center ${isShopPage ? "text-light" : "text-dark"}`} style={{ color: "white" }} />
                <div className={`row align-items-center ${isShopPage ? "text-light" : "text-dark"}`}>
                    <div className="col-md-6">
                        <p className="small mb-0">
                            Copyright © 2025 tilab. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <a className={`text-decoration-none small me-3 ${isShopPage ? "text-light" : "text-dark"}`}>
                            Privacy Policy
                        </a>
                        <a className={`text-decoration-none small me-3 ${isShopPage ? "text-light" : "text-dark"}`}>
                            Terms of Use
                        </a>
                    </div>
                </div>
            </div >
        </footer >
    )
}

export default Footer;