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


const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div className="membership-hero">
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
                                <h1 className="welcome-titles">About tí.lab</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-description-section">
                <div className="container">
                    <div className="about-content text-center">
                        <div className="location-text">Base in Ho Chi Minh City</div>
                        <div className="separator-line"></div>
                        <div className="description-text">
                            tí.lab is a trailblazer that reimagines the humble shopping bag
                            into a green-lifestyle fashion accessory: every piece is made from
                            sustainable materials, styled for Gen Z, and sparks eco-friendly
                            habits.
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
                                    <h3 className="content-title">brand story</h3>
                                    <p className="content-text">
                                        When we saw single-use plastic bags piling up, we
                                        turned the everyday shopping bag into a reusable
                                        sidekick. We designed each tote bag into a
                                        pocket-size pouch finished in Gen Z-friendly street-
                                        style colors—a fashion fix that cuts waste.
                                    </p>
                                </div>
                                <div className="content-box vision-content position-absolute">
                                    <h3 className="content-title">vision</h3>
                                    <p className="content-text">
                                        To become Asia's leading green icon where every reusable
                                        bag sparks creativity, unites young communities, and helps
                                        build a sustainable future for the planet.
                                    </p>
                                </div>
                                <div className="content-box mission-content position-absolute">
                                    <h3 className="content-title">mission</h3>
                                    <p className="content-text">
                                        To reinvent the traditional shopping bag with distinctive
                                        design and sustainable materials, inspiring responsible
                                        consumption among the next generation.
                                    </p>
                                </div>
                                <div className="contact-section mt-5 pt-4 text-start" style={{ marginLeft: "800px" }}>
                                    <p className="contact-item">Contact</p>
                                    <p className="contact-item"> +84 707804907</p>
                                    <p className="contact-item"> tilab.green@gmail.com</p>
                                    <p className="contact-item"> @tilab.green</p>
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