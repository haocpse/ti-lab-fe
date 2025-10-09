import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./Blog.css"

const Blog = () => {


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
                                From Scraps to<br />
                                Something Special
                            </h1>
                            <p className="text-white mb-4" style={{
                                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)"
                            }}>
                                The making of tí.lab bag - how left over plastic<br />
                                becomes a thoughtful design
                            </p>
                            <Link
                                to="/shop/artist-collection"
                                className="text-white text-decoration-none border-bottom border-2 border-white pb-1"
                                style={{ fontSize: "1rem" }}
                            >
                                Read now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* phan 1 */}
            <div className="bg-darkk py-5" style={{ backgroundColor: "black" }}>
                <div className="container">
                    <h2 className="text-warning fw-bold mb-5" style={{ fontSize: "2.5rem" }}>
                        behind the bag
                    </h2>
                    <div className="row g-4">
                        <div className="col-12 col-md-4">
                            <div className="blog-card">
                                <div className="blog-image mb-3">
                                    <img
                                        src="https://picsum.photos/300/250"
                                        alt="Green bag with design"
                                        className="img-fluid rounded"
                                    />
                                </div>
                                <h4 className="text-white fw-bold mb-2">
                                    From Scraps to<br />
                                    Something Special
                                </h4>
                                <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
                                    The making of a tí.lab bag – how leftover plastic becomes a thoughtful design.
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="blog-card">
                                <div className="blog-image mb-3">
                                    <img
                                        src="https://picsum.photos/300/250"
                                        alt="Production process"
                                        className="img-fluid rounded"
                                    />
                                </div>
                                <h4 className="text-white fw-bold mb-2">
                                    Stitched by Hand,<br />
                                    Held with Care
                                </h4>
                                <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
                                    A glimpse into tí.lab's work space and how we craft each meaningful bag.
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="blog-card">
                                <div className="blog-image mb-3">
                                    <img
                                        src="https://picsum.photos/300/250"
                                        alt="Blue artistic bag"
                                        className="img-fluid rounded"
                                    />
                                </div>
                                <h4 className="text-white fw-bold mb-2">
                                    The Beauty of<br />
                                    What's Left Behind
                                </h4>
                                <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
                                    Why tí.lab chooses to work with plastic waste and how it leads to unique creations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* phan 2 */}
            <div className="bg-darkk py-5" style={{ backgroundColor: "black" }}>
                <div className="container">
                    <h2 className="text-warning fw-bold mb-5" style={{ fontSize: "2.5rem" }}>
                        green life stories
                    </h2>
                    <div className="row g-4">
                        <div className="col-12 col-md-4">
                            <div className="blog-card">
                                <div className="blog-image mb-3">
                                    <img
                                        src="https://picsum.photos/300/250"
                                        alt="Indigo bag design"
                                        className="img-fluid rounded"
                                    />
                                </div>
                                <h4 className="text-white fw-bold mb-2">
                                    One Bag,<br />
                                    A Hundred Tomorrows
                                </h4>
                                <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
                                    The first step of changing by showcasing a reusable bag over single-use plastic.
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="blog-card">
                                <div className="blog-image mb-3">
                                    <img
                                        src="https://picsum.photos/300/250"
                                        alt="Person with green bag"
                                        className="img-fluid rounded"
                                    />
                                </div>
                                <h4 className="text-white fw-bold mb-2">
                                    Begin With<br />
                                    One Small Green Thing
                                </h4>
                                <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
                                    How starting with just one conscious choice—like your bag—can change habits for good.
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="blog-card">
                                <div className="blog-image mb-3">
                                    <img
                                        src="https://picsum.photos/300/250"
                                        alt="Colorful recycled bags"
                                        className="img-fluid rounded"
                                    />
                                </div>
                                <h4 className="text-white fw-bold mb-2">
                                    Too Many Bags,<br />
                                    Not Enough Meaning
                                </h4>
                                <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
                                    On tote bag overproduction and why tí.lab focuses on making fewer, better bags.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* phan 3 */}
            <div className="bg-darkk py-5" style={{ backgroundColor: "black" }}>
                <div className="container">
                    <h2 className="text-warning fw-bold mb-5" style={{ fontSize: "2.5rem" }}>
                        bag & you
                    </h2>
                    <div className="row g-4">
                        <div className="col-12 col-md-4">
                            <div className="blog-card">
                                <div className="blog-image mb-3">
                                    <img
                                        src="https://picsum.photos/300/250"
                                        alt="Indigo bag design"
                                        className="img-fluid rounded"
                                    />
                                </div>
                                <h4 className="text-white fw-bold mb-2">
                                    One Bag,<br />
                                    A Hundred Tomorrows
                                </h4>
                                <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
                                    The first step of changing by showcasing a reusable bag over single-use plastic.
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="blog-card">
                                <div className="blog-image mb-3">
                                    <img
                                        src="https://picsum.photos/300/250"
                                        alt="Person with green bag"
                                        className="img-fluid rounded"
                                    />
                                </div>
                                <h4 className="text-white fw-bold mb-2">
                                    Begin With<br />
                                    One Small Green Thing
                                </h4>
                                <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
                                    How starting with just one conscious choice—like your bag—can change habits for good.
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="blog-card">
                                <div className="blog-image mb-3">
                                    <img
                                        src="https://picsum.photos/300/250"
                                        alt="Colorful recycled bags"
                                        className="img-fluid rounded"
                                    />
                                </div>
                                <h4 className="text-white fw-bold mb-2">
                                    Too Many Bags,<br />
                                    Not Enough Meaning
                                </h4>
                                <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
                                    On tote bag overproduction and why tí.lab focuses on making fewer, better bags.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default Blog;