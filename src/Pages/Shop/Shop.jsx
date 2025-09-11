import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import './Shop.css'
import { Link } from "react-router-dom";
import bgg from "../../assets/LogoMain.png";
import detail1 from "../../assets/shopdetail1.png"
import detail2 from "../../assets/shopdetail2.png"
import detail3 from "../../assets/shopdetail3.png"
import detail4 from "../../assets/shopdetail4.png"
import { fetchCoreCollection, fetchArtistCollection } from "../../Services/ShopService";

const Shop = () => {
    const [bag, setBag] = useState([]);
    const [artistBag, setArtistBag] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBags = async () => {
        setLoading(true)
        try {
            const coreBags = await fetchCoreCollection(0, 12);
            setBag(coreBags.content)

            const artistBags = await fetchArtistCollection();
            setArtistBag(artistBags.content[0].bags)
            console.log(coreBags);
            console.log(artistBags);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        fetchBags();
    }, [])



    return (
        <>
            <Navbar />
            <div className="backgroundShop">
                <div className="backgoundImg mb-5 d-none d-lg-block">
                    <img src={bgg} alt="" style={{ width: "400px", marginTop: "180px" }} />
                    <p style={{ lineHeight: "1.2" }}>Reimagining <br />the traditional<br />shopping bag</p>
                    <Link to="/shop/artist-collection" className=" text-dark fw-meidum" style={{ marginLeft: "60px" }}>
                        Buy now →
                    </Link>
                </div>
            </div>
            <div className="container-fluid px-lg-5 py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10">
                        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-2">

                            <h2 className="fw-bold fs-1 mb-0 text-dark">CORE COLLECTION</h2>

                            <Link to="/shop/core-collection" className="text-decoration-none text-dark fw-medium">
                                See more →
                            </Link>
                        </div>
                        <div className="row g-4">
                            {loading ? (
                                <div className="col-12">
                                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="spinner-border text-secondary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <span className="fs-5 text-secondary">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            ) : bag.length > 0 ? (
                                bag.slice(0, 4).map((product) => (
                                    <div key={product.id} className="col-6 col-md-4 col-lg-3">
                                        <Link to={`/shop/core-collection/${product.id}`} className="text-decoration-none">
                                            <div className="card h-100 border-0 shadow-sm product-card">
                                                <div className="bg-light p-4 d-flex align-items-center justify-content-center" style={{ minHeight: "280px" }}>
                                                    <img
                                                        src={product.bagImages ? encodeURI(product.bagImages) : `https://picsum.photos/300/250?random=${product.id}`}
                                                        alt={product.name}
                                                        className="img-fluid rounded product-image"
                                                        style={{ width: "100%", height: "300px", objectFit: "cover" }}
                                                    />
                                                </div>

                                                <div className="card-body text-start">
                                                    <h5 className="card-title text-dark fw-semibold mb-2"
                                                        style={{
                                                            fontSize: "1rem",
                                                            lineHeight: "1.4",
                                                            height: "2.8rem",
                                                            overflow: "hidden",
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: "2",
                                                            WebkitBoxOrient: "vertical"
                                                        }}>
                                                        {product.name}
                                                    </h5>
                                                    <p className="card-text text-dark fw-bold mb-0 fs-6">
                                                        {product.price} VND
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <div className="text-center py-5">
                                        <p className="fs-5 text-muted">No product found</p>
                                    </div>
                                </div>
                            )}
                            {/* artist */}
                            <div className="pt-5" style={{ marginTop: "90px" }}>
                                <div className="row align-items-start">
                                    <div className="col-12 col-lg-8">
                                        <div className="row g-4">
                                            {artistBag.slice(0, 2).map((product, index) => (
                                                <div key={product.id} className={index === 0 ? "col-5" : "col-5"}>
                                                    {index === 1 && (
                                                        <div className="mb-3">
                                                            <h2 className="fw-bold fs-1 mb-0 text-dark lh-1">
                                                                ARTIST<br />COLLECTION
                                                            </h2>

                                                        </div>
                                                    )}

                                                    <Link to={`/shop/artist-collection/${product.id}`} className="text-decoration-none">
                                                        <div className="artist-image-container position-relative">
                                                            <img
                                                                src={product.bagImages ? encodeURI(product.bagImages) : `https://picsum.photos/300/250?random=${product.id}`}
                                                                alt={product.name}
                                                                className="img-fluid w-100 rounded artist-image"
                                                                style={{
                                                                    height: index === 0 ? "500px" : "400px",
                                                                    objectFit: "cover"
                                                                }}
                                                            />
                                                            <div className="artist-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3">
                                                                <div className="text-white">
                                                                    <h6 className="fw-bold mb-1">{product.name}</h6>
                                                                    <p className="mb-0 small">{product.price} VND</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-4">
                                        <div className="d-flex justify-content-end mt-2">
                                            <Link to="/shop/artist-collection" className="text-decoration-none text-dark fw-medium see-more-link">
                                                See more →
                                            </Link>
                                        </div>
                                        <div className="ps-lg-4 mt-4 mt-lg-0">
                                            <h3 className="fw-bold fs-4 mb-4 text-dark" style={{ marginTop: "60px" }}>
                                                "POST-CIVILIZATION"
                                            </h3>
                                            <p className="text-muted lh-lg fs-6">
                                                In a post-modern world eroded by overconsumption,
                                                waste, and climate change, whimsical lost souls begin to
                                                appear — both endearing and melancholic.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*detail */}
            <div className="details-bg text-white" style={{ color: "#CAFF01" }}>
                <div className="text-center py-5">
                    <h1 className="display-1 fw-bold text-successs mb-0" style={{ letterSpacing: '2px' }}>
                        Details
                    </h1>
                </div>

                <div className="container">
                    <div className="row align-items-center py-5">
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            <img src={detail1} alt="Materials" className="img-fluid rounded shadow" />
                        </div>
                        <div className="col-lg-8">
                            <h2 className="display-4 text-successs mb-4" style={{ color: "#CAFF01" }}>materials</h2>
                            <p className="text-light fs-6 lh-lg">
                                100 % recycled woven PP — tightly interlaced polypropylene yarns that carry ≈ 20 kg without stretching, surviving 10 000+ folds.
                                Matte lamination — water-repellent, stain-resistant; wipes clean in seconds.
                                UV-shield coating — keeps prints vibrant even under frequent sunlight.
                                Double cotton handles — four-fold box-stitching, soft on the shoulder, tensile strength ≥ 60 N.
                            </p>
                        </div>
                    </div>

                    <div className="row align-items-center py-5">
                        <div className="col-lg-8 order-lg-1 order-2">
                            <h2 className="display-4 text-successs mb-4">design</h2>
                            <p className="text-light fs-6 lh-lg">
                                Eye-catching, vivid graphics that stand out in any crowd.
                                Purpose-driven storytelling artwork to spark sustainable living inspiration.
                                Rigid box silhouette that stands upright yet folds flat for easy storage when not in use.
                            </p>
                        </div>
                        <div className="col-lg-4 order-lg-2 order-1 mb-4 mb-lg-0">
                            <img src={detail2} alt="Design" className="img-fluid rounded shadow" />
                        </div>
                    </div>

                    <div className="row align-items-center py-5">
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            <img src={detail3} alt="Experience" className="img-fluid rounded shadow" />
                        </div>
                        <div className="col-lg-8">
                            <h2 className="display-4 text-successs mb-4">experience</h2>
                            <p className="text-light fs-6 lh-lg">
                                #GrowWithYourBag kit — every bag ships with marigold seeds + coco-pellet; plant it, scan the bamboo QR tag and track your bag-and-plant journey online.
                                Feather-light yet sturdy; perfect for errands, gym, or weekend trips.
                            </p>
                        </div>
                    </div>

                    <div className="row align-items-center py-5">
                        <div className="col-lg-8 order-lg-1 order-2">
                            <h2 className="display-4 text-successs mb-4">environment impact</h2>
                            <p className="text-light fs-6 lh-lg">
                                1 kg of ocean-bound plastic removed from Vietnamese beaches for every purchase — progress visible on your personal dashboard.
                                “5 ↔ 1” regeneration scheme — return any 5 used bags and get 1 fresh ReBag plus 10 % off your next order.
                                Replaces hundreds of single-use plastic bags over its multi-year lifespan.
                            </p>
                        </div>
                        <div className="col-lg-4 order-lg-2 order-1 mb-4 mb-lg-0">
                            <img src={detail4} alt="Environment Impact" className="img-fluid rounded shadow" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Shop;



