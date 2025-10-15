import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutUs.css";
import ab1 from "../../assets/about1.png"
import ab2 from "../../assets/about2.png"
import ab3 from "../../assets/about3.png"
import ab4 from "../../assets/aboutLine.png"
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useTranslation } from "react-i18next";



const AboutUs = () => {
    const { t } = useTranslation();
    return (
        <>
            <Navbar />
            <div className="membership-hero mt-5">
                <div className="container-fluid h-100 p-0">
                    <div className="membership-container">
                        <div className="bag-layer layer-1">
                            <img
                                src={ab1}
                                alt="Japanese Typography Bag"
                                className="bag-image bag-japanese"
                            />
                        </div>
                        <div className="bag-layer layer-2">
                            <img
                                src={ab2}
                                alt="Blue Geometric Bag"
                                className="bag-image bag-blue"
                            />
                        </div>
                        <div className="bag-layer layer-1">
                            <img
                                src={ab3}
                                alt="Yellow Cartoon Bag"
                                className="bag-image bag-cartoon"
                            />
                        </div>
                        <div className="bag-layer layer-3">
                            <img
                                src={ab3}
                                alt="Yellow Eat You Up Bag"
                                className="bag-image bag-eat"
                            />
                        </div>
                        <div className="centers">
                            <div className="welcome-contents">
                                <h1 className="welcome-titles">{t("about.title")}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-description-section">
                <div className="container">
                    <div className="about-content text-center">
                        <div className="location-text">{t("about.location")}</div>
                        <div className="separator-line"></div>
                        <div className="description-text">
                            {t("about.description")}
                        </div>
                    </div>
                </div>
            </div>
            <section className="membership-plans text-white py-5" style={{ backgroundColor: "black" }}>
                <section className="wire-section">
                    <div className="container-fluid h-100">
                        <div className="row h-100 justify-content-center align-items-center">
                            <div className="col-12 text-center position-relative">
                                <div className="wire-container">
                                    <img src={ab4} alt="About Line" className="wire-line-img" />
                                </div>
                                <div className="content-box brand-story position-absolute">
                                    <h3 className="content-title">{t("about.brandStoryTitle")}</h3>
                                    <p className="content-text">
                                        {t("about.brandStoryText")}
                                    </p>
                                </div>
                                <div className="content-box vision-content position-absolute">
                                    <h3 className="content-title">{t("about.visionTitle")}</h3>
                                    <p className="content-text">
                                        {t("about.visionText")}
                                    </p>
                                </div>
                                <div className="content-box mission-content position-absolute">
                                    <h3 className="content-title">{t("about.missionTitle")}</h3>
                                    <p className="content-text">
                                        {t("about.missionText")}
                                    </p>
                                </div>
                                <div className="contact-section mt-5 pt-4 text-start" style={{ marginLeft: "800px" }}>
                                    <h1 className="contact-item">{t("about.contactTitle")}</h1>
                                    <p className="contact-item"> {t("about.phone")}</p>
                                    <p className="contact-item"><i class="bi bi-envelope-open-heart-fill"></i>   {t("about.email")}</p>
                                    <p className="contact-item"><i class="bi bi-instagram"></i> {t("about.instagram")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <Footer />
        </>
    );
}

export default AboutUs;