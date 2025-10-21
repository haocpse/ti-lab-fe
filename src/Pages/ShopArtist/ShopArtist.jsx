import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { fetchCoreCollection, fetchArtistCollection } from "../../Services/ShopService";
import './ShopArtist.css';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ShopArtist = () => {
    const { t } = useTranslation();
    const [coreBag, setCoreBag] = useState([])
    const [artistBag, setArtistBag] = useState([])
    const [pageCore, setPageCore] = useState(0);
    const [totalPagesCore, setTotalPagesCore] = useState(0);
    const [searchFunction, setSearchFunction] = useState("");

    const fetchCoreBag = async () => {
        try {
            const res = await fetchCoreCollection(0, 12);
            setCoreBag(res.content);
        } catch (error) {
            console.error("Error fetching core bags:", error);
        }
    }
    const fetchArtistBag = async (page = 0) => {
        try {
            const res = await fetchArtistCollection(page, 12);
            setArtistBag(res.content);
            setTotalPagesCore(res.totalPages);
            setPageCore(res.pageable.pageNumber);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            console.error("Error fetching artist bags:", error);
        }
    }

    useEffect(() => {
        fetchCoreBag();
        fetchArtistBag();
    }, []);

    return (
        <>
            <Navbar />
            <div className="shopcore-bg py-4">
                <div className="container bg-white p-4 rounded">
                    <div className="d-flex justify-content-between align-items-center mb-3 shopcore-controls">
                        <h2 className="mb-0 h2core mt-5" style={{ fontSize: "2.5rem" }}>    {t("shopArtist.artistCollection")}</h2>
                        <div className="d-flex align-items-center gap-2">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Search by name..."
                                value={searchFunction}
                                onChange={(e) => setSearchFunction(e.target.value)}
                                style={{ width: "200px" }}
                            />
                            <span>{t("shopArtist.sortBy")}</span>
                            <select className="form-select form-select-sm" style={{ width: "140px" }}>
                                <option>{t("shopArtist.sort.bestSellers")}</option>
                                <option>{t("shopArtist.sort.newest")}</option>
                                <option>{t("shopArtist.sort.lowToHigh")}</option>
                                <option>{t("shopArtist.sort.highToLow")}</option>
                            </select>
                        </div>

                    </div>
                    <hr className="custom-divider" />


                    {/* artist bag */}
                    <div className="row">
                        {artistBag && artistBag
                            .filter(collection =>
                                collection.bags && collection.bags.some(
                                    bag => bag.name.toLowerCase().includes(searchFunction.toLowerCase())
                                )
                            )
                            .map((collection, i) => (
                                <div key={i} className="mb-5">
                                    <h3 className="text-center fw-bold name-collection" style={{ fontSize: "1.8rem" }}>
                                        "{collection.name.toUpperCase()}"
                                    </h3>
                                    <p
                                        className="text-dark text-center mb-4 name-collection fw-medium"
                                        style={{ fontSize: "1.1rem", marginTop: "-5px" }}
                                    >
                                        {t("shopArtist.artistCollection")}
                                    </p>
                                    <div className="row">
                                        {collection.bags &&
                                            collection.bags
                                                .filter(bag =>
                                                    bag.name.toLowerCase().includes(searchFunction.toLowerCase())
                                                )
                                                .map((product) => (
                                                    <div className="col-6 col-md-4 col-lg-3 mb-4" key={product.id}>
                                                        <Link
                                                            to={`/shop/artist-collection/${product.id}`}
                                                            className="text-decoration-none"
                                                        >
                                                            <div className="bg-white h-100 p-2 text-center shopcore-card">
                                                                <img
                                                                    src={
                                                                        product.bagImages && product.bagImages.length > 0
                                                                            ? encodeURI(product.bagImages[0].url)
                                                                            : `https://picsum.photos/300/250?random=${product.id}`
                                                                    }
                                                                    alt={product.name}
                                                                    className="img-fluid rounded mb-2"
                                                                    style={{
                                                                        width: "250px",
                                                                        height: "400px",
                                                                        objectFit: "cover",
                                                                        background: "#eee",
                                                                    }}
                                                                />
                                                                <div
                                                                    className="fw-semibold text-dark coreBagName"
                                                                    style={{ minHeight: "45px" }}
                                                                >
                                                                    {product.name}
                                                                </div>
                                                                <div className="coreBagPrice" style={{ fontSize: "1rem" }}>
                                                                    {product.price.toLocaleString()} VND
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                    </div>
                                </div>
                            ))}

                    </div>

                    {/* paging */}
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center my-4">
                            {[...Array(totalPagesCore)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${index === pageCore ? "active" : ""}`}
                                    onClick={() => fetchCoreBag(index)}
                                >
                                    <span className="page-link">{index + 1}</span>
                                </li>
                            ))}
                        </ul>
                    </nav>


                    <h4 className="artistH4" style={{ fontSize: "2.5rem" }}> {t("shopArtist.youMayAlsoLike")}</h4>
                    <hr className="custom-divider" />
                    <div className="mb-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-center">
                                    <div>
                                        <h5 className="mb-4 mt-4 artistH5" style={{ fontSize: "2.5rem" }}>    {t("shopArtist.coreCollection")}</h5>
                                    </div>

                                </div>
                                <div className="mb-2 d-flex flex-column flex-md-row justify-content-center">
                                    <Link to="/shop/core-collection" className="seeMore" style={{ fontSize: "1rem" }}> {t("shopArtist.seeMore")}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {coreBag && [...coreBag].sort(() => 0.5 - Math.random()).slice(0, 3).map((product) => (
                                <div className="col-12 col-md-4 mb-4" key={product.id}>
                                    <Link to={`/shop/core-collection/${product.id}`} className="text-decoration-none">
                                        <div className="bg-white rounded p-3 text-center shopcore-artist-card h-100">
                                            <img
                                                src={product.bagImages && product.bagImages.length > 0
                                                    ? encodeURI(product.bagImages[0].url)
                                                    : `https://picsum.photos/300/250?random=${product.id}`
                                                }
                                                alt={product.name}
                                                className="img-fluid rounded mb-2"
                                                style={{ maxWidth: "300px", height: "400px", objectFit: "cover" }}
                                            />
                                            <div className="fw-semibold text-dark artistName">{product.name}</div>
                                            <div className="text-secondary artistName" style={{ fontSize: "0.95rem" }}>  {t("shopArtist.artistCollection")}</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default ShopArtist;