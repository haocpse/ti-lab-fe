import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import bag1 from "../../assets/membership1.png";
import bag2 from "../../assets/membership2.png";
import bag3 from "../../assets/membership3.png";
import bag4 from "../../assets/membership4.png";
import bag5 from "../../assets/membership5.png";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { signUp as signUpService } from "../../Services/SignUpService";

const SignUp = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const data = await signUpService(account, password, email, firstName, lastName);

            console.log("Sign Up successful:", data);

            navigate('/login')
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleClose = () => {
        navigate('/');
    }


    const validateForm = () => {
        const newErrors = {};

        if (!firstName.trim()) newErrors.firstName = "First name is required";
        if (!lastName.trim()) newErrors.lastName = "Last name is required";
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }
        if (!account.trim()) newErrors.account = "Username is required";
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    return (
        <>
            <Navbar />
            <div className="membership-hero" style={{ position: "relative" }}>
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
                    <div className="login-modal  signup-compact">
                        <button className="close-btn" onClick={handleClose}>
                            ×
                        </button>
                        <h2 className="login-title">
                            Sign Up to <span className="brand-name">tí.lab</span>
                        </h2>
                        <form onSubmit={handleSignUp} className="login-form">
                            {errors.submit && (
                                <div className="alert alert-danger text-center">
                                    {errors.submit}
                                </div>
                            )}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="firstName">Name *</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className={`form-input ${errors.firstName ? 'is-invalid' : ''}`}
                                            placeholder="Enter your first name"
                                            required
                                        />
                                        {errors.firstName && (
                                            <div className="invalid-feedback">{errors.firstName}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name *</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className={`form-input ${errors.lastName ? 'is-invalid' : ''}`}
                                            placeholder="Enter your last name"
                                            required
                                        />
                                        {errors.lastName && (
                                            <div className="invalid-feedback">{errors.lastName}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Enter your email"
                                    required
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">User Name *</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                    className={`form-input ${errors.account ? 'is-invalid' : ''}`}
                                    placeholder="Enter your username"
                                    required
                                />
                                {errors.account && (
                                    <div className="invalid-feedback">{errors.account}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password *</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`form-input ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Password (At least 6 characters)"
                                    required
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password *</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`form-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                    placeholder="Confirm Pasword"
                                    required
                                />
                                {errors.confirmPassword && (
                                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="login-btn signup-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    <span>→</span>
                                )}
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="signup-link">
                            Already have account? <Link to="/login">Login Now!</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default SignUp;