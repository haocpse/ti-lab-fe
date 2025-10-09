import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import bag1 from "../../assets/membership1.png";
import bag2 from "../../assets/membership2.png";
import bag3 from "../../assets/membership3.png";
import bag4 from "../../assets/membership4.png";
import bag5 from "../../assets/membership5.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import { login as loginService } from "../../Services/LoginService";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.state)
    console.log(location.state?.from)

    function getRoleFromToken() {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const roles = decodedToken.scope || decodedToken.roles || decodedToken.authorities;
            return roles;
        }
        return null;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await loginService(account, password);

            console.log("Login successful:", data);

            localStorage.setItem('token', data.data.accessToken);

            const redirectPath = location.state?.from || "/";

            const roles = getRoleFromToken();
            console.log(roles);
            if (roles === "ADMIN" || roles === "STAFF") {
                navigate('/admin')
            } else if (roles === "CUSTOMER") {
                navigate(redirectPath, { replace: true });
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error(error);

            if (error.response && error.response.status === 401) {
                toast.warn("Incorrect username or password!");
            } else {
                toast.warn("Incorrect username or password.");
            }

        } finally {
            setIsLoading(false);
        }
    }

    const handleClose = () => {
        navigate('/');
    }

    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="membership-hero mt-5" style={{ position: "relative" }}>
                {/* Background */}
                <div className="container-fluid h-100 p-0" style={{ filter: "blur(5px)" }}>
                    <div className="membership-container">
                        <div className="bag-layer layer-1">
                            <img src={bag1} alt="Japanese Typography Bag" className="bag-image bag-japanese" />
                        </div>
                        <div className="bag-layer layer-2">
                            <img src={bag2} alt="Blue Geometric Bag" className="bag-image bag-blue" />
                        </div>
                        <div className="bag-layer layer-1">
                            <img src={bag4} alt="Yellow Cartoon Bag" className="bag-image bag-cartoon" />
                        </div>
                        <div className="bag-layer layer-2">
                            <img src={bag3} alt="Flower Design Bag" className="bag-image bag-flower" />
                        </div>
                        <div className="bag-layer layer-3">
                            <img src={bag5} alt="Yellow Eat You Up Bag" className="bag-image bag-eat" />
                        </div>
                    </div>
                </div>


                <div className="login-modal-overlay">
                    <div className="login-modal">

                        <button className="close-btn" onClick={handleClose}>
                            ×
                        </button>

                        <h2 className="login-title">
                            Welcome to <span className="brand-name">tí.lab</span>
                        </h2>


                        <div className="social-login-section">
                            <button className="social-btn apple-btn">
                                <i className="fab fa-apple"></i>
                            </button>
                            <button className="social-btn facebook-btn">
                                <i className="fab fa-facebook-f"></i>
                            </button>
                            <button className="social-btn google-btn">
                                <i className="fab fa-google"></i>
                            </button>
                        </div>

                        {/* dau gach nagng */}
                        <div className="d-flex align-items-center my-4 ">
                            <hr className="flex-grow-1 border-secondary" />
                            <span className="px-3 text-muted small">or</span>
                            <hr className="flex-grow-1 border-secondary" />
                        </div>

                        <form onSubmit={handleLogin} className="login-form">
                            <div className="form-group">
                                <label htmlFor="userName">User Name</label>
                                <input
                                    type="text"
                                    id="userName"
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                    className="form-input"
                                    placeholder="Enter your user name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="password-input-container">
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-input"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <Link to="/forgot-password" className="forgot-password">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="remember-me">
                                    <input
                                        type="checkbox"
                                    // checked={rememberMe}
                                    // onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <span className="checkmark"></span>
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="login-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    <span>→</span>
                                )}
                            </button>
                        </form>

                        {/* dang ky */}
                        <div className="signup-link">
                            Don't have an account? <Link to="/signup">Signup!</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default Login;