import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./Blog.css"
import { useTranslation } from "react-i18next";

const Blog = () => {

    const { t } = useTranslation();

    return (
        <>
            <Navbar />
            <div className="backgroundBlog d-flex align-items-center mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <h1 className="text-white fw-bold mb-3" style={{
                                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                                lineHeight: "1.1"
                            }}>
                                {t("blog.hero.title1")}<br />
                                {t("blog.hero.title2")}
                            </h1>
                            <p className="text-white mb-4" style={{
                                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)"
                            }}>
                                {t("blog.hero.subtitle")}<br />
                                {t("blog.hero.subtitle1")}
                            </p>
                            <Link
                                to="/shop/artist-collection"
                                className="text-white text-decoration-none border-bottom border-2 border-white pb-1"
                                style={{ fontSize: "1rem" }}
                            >
                                {t("blog.hero.readNow")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* phan 1 */}
            <div className="bg-darkk py-5" style={{ backgroundColor: "black" }}>
                <div className="container">
                    <h2
                        className="text-warning fw-bold mb-5"
                        style={{ fontSize: "2.5rem" }}
                    >
                        {t("blog.section1.title")}
                    </h2>

                    <div className="row g-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="col-12 col-md-4">
                                <div className="blog-card">
                                    <div className="blog-image mb-3">
                                        <img
                                            src="https://picsum.photos/300/250"
                                            alt={`blog-section1-card${i}`}
                                            className="img-fluid rounded"
                                        />
                                    </div>
                                    <h4 className="text-white fw-bold mb-2">
                                        {t(`blog.section1.card${i}.title1`)} <br />
                                        {t(`blog.section1.card${i}.title2`)}
                                    </h4>
                                    <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
                                        {t(`blog.section1.card${i}.desc`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* phan 2 */}
            <div className="bg-darkk py-5" style={{ backgroundColor: "black" }}>
                <div className="container">
                    <h2
                        className="text-warning fw-bold mb-5"
                        style={{ fontSize: "2.5rem" }}
                    >
                        {t("blog.section2.title")}
                    </h2>
                    <div className="row g-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="col-12 col-md-4">
                                <div className="blog-card">
                                    <div className="blog-image mb-3">
                                        <img
                                            src="https://picsum.photos/300/250"
                                            alt={`blog-section2-card${i}`}
                                            className="img-fluid rounded"
                                        />
                                    </div>
                                    <h4 className="text-white fw-bold mb-2">
                                        {t(`blog.section2.card${i}.title1`)} <br />
                                        {t(`blog.section2.card${i}.title2`)}
                                    </h4>
                                    <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
                                        {t(`blog.section2.card${i}.desc`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* phan 3 */}
            <div className="bg-darkk py-5" style={{ backgroundColor: "black" }}>
                <div className="container">
                    <h2
                        className="text-warning fw-bold mb-5"
                        style={{ fontSize: "2.5rem" }}
                    >
                        {t("blog.section3.title")}
                    </h2>
                    <div className="row g-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="col-12 col-md-4">
                                <div className="blog-card">
                                    <div className="blog-image mb-3">
                                        <img
                                            src="https://picsum.photos/300/250"
                                            alt={`blog-section3-card${i}`}
                                            className="img-fluid rounded"
                                        />
                                    </div>
                                    <h4 className="text-white fw-bold mb-2">
                                        {t(`blog.section3.card${i}.title1`)} <br />
                                        {t(`blog.section3.card${i}.title2`)}
                                    </h4>
                                    <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
                                        {t(`blog.section3.card${i}.desc`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default Blog;