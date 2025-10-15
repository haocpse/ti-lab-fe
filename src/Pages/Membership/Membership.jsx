import React, { useEffect, useState } from "react";
import './Membership.css';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import bag1 from "../../assets/membership1.png";
import bag2 from "../../assets/membership2.png";
import bag3 from "../../assets/membership3.png";
import bag4 from "../../assets/membership4.png";
import bag5 from "../../assets/membership5.png";
import logo1 from "../../assets/tí.lab_logo-03.png";
import logo2 from "../../assets/tí.lab_logo-04.png";
import logo3 from "../../assets/tí.lab_logo-05.png";
import icon1 from "../../assets/Vector.png";
import icon2 from "../../assets/Vector-1.png";
import icon3 from "../../assets/Vector-2.png";
import arrow from "../../assets/arrow.png";
import { Link } from "react-router-dom";
import { fetchProfileCustomer } from "../../Services/Profile";
import { useTranslation } from "react-i18next";

const Membership = () => {

    const [user, setUser] = useState(null);
    const [isLogined, setIsLogined] = useState(false);
    const { t } = useTranslation();

    const fetchUserInfor = async () => {

        const response = await fetchProfileCustomer();
        setUser(response);
        console.log(user)
    }

    useEffect(() => {
        fetchUserInfor();
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogined(true);
        }
    }, []);


    return (
        <>
            <Navbar />
            <div className="membership-hero mt-5">
                <div className="container-fluid h-100 p-0">
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
                        <div className="center">
                            <div className="welcome-content">
                                <h1 className="welcome-title">{t("membership.welcome")}{" "}<span style={{ fontWeight: "bold", color: "#CAFF01" }}>tí.lab</span></h1>
                                {isLogined ? (
                                    <div className="welcome-buttons">
                                        <Link to="/shop" className="btn-simple">{t("membership.shopNow")}</Link>
                                        <Link to="/about" className="btn-simple">{t("membership.about")}</Link>
                                    </div>
                                ) : (
                                    <div className="welcome-buttons">
                                        <Link to="/login" className="btn-simple">{t("membership.login")}</Link>
                                        <Link to="/signup" className="btn-simple">{t("membership.signup")}</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="membership-plans text-white py-5" style={{ backgroundColor: "black" }}>
                <div className="container">
                    {isLogined && (
                        <div className="user-tier-section mb-5">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 col-md-10">
                                        <h2
                                            className="text-center mb-4 nameTier"
                                            style={{ color: "#CAFF01", fontSize: "2.5rem", fontWeight: "400" }}
                                        >
                                            {user?.fullName}'s {t("membership.membershipTier")}
                                        </h2>
                                        <div className="tier-card bg-white rounded-4 p-4">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div className="d-flex align-items-center">
                                                    <div className="tier-icon me-3">
                                                        <img src={logo1} alt="Seed tier" style={{ width: "40px", height: "40px" }} />
                                                    </div>
                                                    <span className="tier-name h4 mb-0 text-dark">seed</span>
                                                </div>
                                                <div className="points-display">
                                                    <span className="fw-bold text-dark h4 mb-0">36 POINTS</span>
                                                </div>
                                            </div>
                                            <div className="progress-section">
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="text-muted small">seed</span>
                                                    <span className="text-muted small">grow</span>
                                                </div>
                                                <div className="progress mb-3" style={{ height: "8px", backgroundColor: "#e9ecef" }}>
                                                    <div
                                                        className="progress-bar"
                                                        role="progressbar"
                                                        style={{
                                                            width: "35%",
                                                            backgroundColor: "#007bff",
                                                            borderRadius: "4px"
                                                        }}
                                                        aria-valuenow="35"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    ></div>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-muted mb-1 small">
                                                        You're just <strong>65 POINTS</strong> away from leveling up!
                                                    </p>
                                                    <p className="text-muted mb-1 small">
                                                        Redeeming rewards won't affect your progress toward the next level.
                                                    </p>
                                                    <p className="text-muted mb-0 small">
                                                        Use your POINTS now to claim special offers!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="text-center mb-5">
                        <h2 className="display-4 fw-bold mb-3" style={{ color: "#CAFF01" }}>
                            <span className="brand-highlight">tí.lab</span> MEMBERSHIP
                        </h2>
                        <p className="lead text-light mb-2">
                            {t("membership.subtitle1")},<span style={{ fontWeight: "bold" }}>{t("membership.subtitle")}{" "}</span>
                        </p>
                        <p className="text-light">
                            {t("membership.description")}{" "}
                        </p>
                    </div>


                    <div className="row g-5 mb-5 justify-content-center">
                        {/* Seed Plan */}
                        <div className="col-lg-4 col-md-6">
                            <div className="card h-100 plan-card">
                                <div className="card-body text-center">
                                    <div className="plan-icon mb-3">
                                        <img src={logo1} alt="Seed Plan Logo" className="plan-logo" />
                                    </div>
                                    <h3 className="card-title plan-name"> {t("membership.seed")}</h3>
                                    <ul className="list-unstyled text-start mt-3">
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="check-icon me-2"> ✓</span>
                                            <span>{t("membership.seed1")}</span>
                                        </li>
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="check-icon me-2"> ✓</span>
                                            <span>{t("membership.seed2")}</span>
                                        </li>
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="check-icon me-2"> ✓</span>
                                            <span>{t("membership.seed3")}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Grow Plan */}
                        <div className="col-lg-4 col-md-6">
                            <div className="card h-100 plan-card">
                                <div className="card-body text-center">
                                    <div className="plan-icon mb-3">
                                        <img src={logo2} alt="Seed Plan Logo" className="plan-logo" />
                                    </div>
                                    <h3 className="card-title plan-name">{t("membership.grow")}</h3>
                                    <ul className="list-unstyled text-start  mt-3">
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="check-icon me-2">✓</span>
                                            <span>{t("membership.grow1")}</span>
                                        </li>
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="check-icon me-2">✓</span>
                                            <span>{t("membership.grow2")}</span>
                                        </li>
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="check-icon me-2">✓</span>
                                            <span>{t("membership.grow3")}</span>
                                        </li>
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="check-icon me-2">✓</span>
                                            <span>{t("membership.grow4")}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Glow Plan */}
                        <div className="col-lg-4 col-md-6">
                            <div className="card h-100 plan-card">
                                <div className="card-body text-center">
                                    <div className="plan-icon mb-3">
                                        <img src={logo3} alt="Seed Plan Logo" className="plan-logo" />
                                    </div>
                                    <h3 className="card-title plan-name">{t("membership.glow")}</h3>
                                    <ul className="list-unstyled text-start  mt-3">
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="check-icon me-2">✓</span>
                                            <span>{t("membership.glow1")}</span>
                                        </li>
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="check-icon me-2">✓</span>
                                            <span>{t("membership.glow2")}</span>
                                        </li>
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="check-icon me-2">✓</span>
                                            <span>{t("membership.glow3")}</span>
                                        </li>
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="check-icon me-2">✓</span>
                                            <span>{t("membership.glow4")}</span>
                                        </li>
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="check-icon me-2">✓</span>
                                            <span>{t("membership.glow5")}</span>
                                        </li>
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="check-icon me-2">✓</span>
                                            <span>{t("membership.glow6")}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phan simple */}
                    <div className="text-center">
                        <h2 className="display-4 fw-bold text-uppercase mb-3 simple-start-title" style={{ color: "#CAFF01" }}>
                            {t("membership.simpleStart")}
                        </h2>
                        <p className="lead text-light mb-5">
                            {t("membership.simpleStart1")}
                        </p>

                        <div className="row g-4 align-items-center justify-content-center">
                            <div className="col-lg-3 col-md-4">
                                <div className="step-item text-center">
                                    <div className="step-icon mx-auto mb-3">
                                        <img src={icon1} alt="Seed Plan Logo" className="plan-logo" />
                                    </div>
                                    <h4 className="h5 fw-bold mb-2"> {t("membership.register")}</h4>
                                    <p className="small text-light">
                                        {t("membership.register1")}
                                    </p>
                                </div>
                            </div>

                            <div className="col-auto d-none d-lg-block">
                                <div className="step-arrow">
                                    <img src={arrow} alt="Seed Plan Logo" className="plan-logo" style={{ marginLeft: "20px" }} />
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="step-item text-center">
                                    <div className="step-icon mx-auto mb-3">
                                        <img src={icon2} alt="Seed Plan Logo" className="plan-logo" />
                                    </div>
                                    <h4 className="h5 fw-bold mb-2"> {t("membership.earn")}</h4>
                                    <p className="small text-light">
                                        {t("membership.earn1")}
                                    </p>
                                </div>
                            </div>

                            <div className="col-auto d-none d-lg-block">
                                <div className="step-arrow">
                                    <img src={arrow} alt="Seed Plan Logo" className="plan-logo" style={{ marginLeft: "20px" }} />
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="step-item text-center">
                                    <div className="step-icon mx-auto mb-3">
                                        <img src={icon3} alt="Seed Plan Logo" className="plan-logo" />
                                    </div>
                                    <h4 className="h5 fw-bold mb-2"> {t("membership.level")}</h4>
                                    <p className="small text-light">
                                        {t("membership.level1")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Membership;
