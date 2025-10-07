import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './ShopViewDetail.css';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { toast } from "react-toastify";
import { fetchCoreCollection, fetchArtistCollection } from "../../Services/ShopService";
import AxiosSetup from "../../Services/AxiosSetup";
import { fetchViewDetailBag } from "../../Services/ShopViewDetail";

const ShopViewDetail = () => {
    const [bag, setBag] = useState([])
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [coreBag, setCoreBag] = useState([])
    const [artistBag, setArtistBag] = useState([])
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const navigate = useNavigate();

    const fetchDetailBag = async () => {
        try {
            const data = await fetchViewDetailBag(id);
            setBag(data);
        } catch (error) {
            console.error('Error fetching bag details:', error);
        }
    }

    const fetchCoreBag = async () => {
        try {
            const res = await fetchCoreCollection(0, 12);
            setCoreBag(res.content);
        } catch (error) {
            console.error("Error fetching core bags:", error);
        }
    }

    const fetchArtistBag = async () => {
        try {
            const res = await fetchArtistCollection(0, 12);
            setArtistBag(res.content[0].bags);
        } catch (error) {
            console.error("Error fetching artist bags:", error);
        }
    }


    useEffect(() => {
        fetchDetailBag();
        fetchCoreBag();
        fetchArtistBag();
    }, [id])

    const addToCart = async () => {
        try {
            await AxiosSetup.post("/carts", {
                bagId: id,
                quantity: quantity,
                totalPrice: bag.price * quantity
            })
            toast.success("Add to cart successfully!")
        } catch (error) {
            console.log(error)
            const token = localStorage.getItem("token");
            if (token) {
                toast.warning("Add to cart fail! Please try again ^^")
            }
            else {
                navigate("/login", { state: { from: `/shop/core-collection/${id}` } });
            }

        }

    }
    const prevImage = () => {
        setMainImageIndex((prev) => (prev === 0 ? bag.bagImages.length - 1 : prev - 1));
    }

    const nextImage = () => {
        setMainImageIndex((prev) => (prev === bag.bagImages.length - 1 ? 0 : prev + 1));
    }

    return (
        <>
            <Navbar />
            <div className="py-4">
                <div className="container bg-white rounded p-4">
                    <div className="row">
                        <div className="col-12 col-lg-6 d-flex flex-column align-items-center">
                            <img
                                src={bag?.bagImages && bag.bagImages.length > 0
                                    ? encodeURI(bag.bagImages[mainImageIndex].url)
                                    : `https://picsum.photos/300/250?`}
                                alt={bag?.name}
                                className="img-fluid mb-3"
                                style={{
                                    width: "500px",
                                    height: "500px",
                                    background: "#eee",
                                    borderRadius: "8px"
                                }}
                            />

                            <div className="d-flex align-items-center mt-2">
                                <button className="btn btn-outline-secondary btn-sm me-2" onClick={prevImage}><i class="bi bi-caret-left"></i></button>
                                {bag?.bagImages && bag.bagImages.map((image, index) => (
                                    <img
                                        src={encodeURI(image.url)}
                                        alt={`${bag?.name} thumb`}
                                        key={image.id}
                                        className={`img-thumbnail mx-1 ${index === mainImageIndex ? 'border border-primary' : ''}`}
                                        style={{ width: "70px", height: "70px", objectFit: "cover", cursor: "pointer" }}
                                        onClick={() => setMainImageIndex(index)}
                                    />
                                ))}
                                <button className="btn btn-outline-secondary btn-sm ms-2" onClick={nextImage}><i class="bi bi-caret-right"></i></button>
                            </div>
                        </div>


                        <div className="col-12 col-lg-6">
                            <h3 className="mt-3 mt-lg-0 mb-2 bagNameDetail">{bag?.name || "Túi xách 1"}</h3>
                            <hr className="custom-divider1" />
                            <p className="mb-2 bagDescription">{bag?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc et tincidunt luctus, ligula arcu pulvinar purus, in fringilla nisl neque ut nisl. Curabitur vitae risus nec nulla ullamcorper tincidunt. Aenean eget sapien sit amet urna facilisis venenatis. Vivamus auctor, justo a dapibus posuere, magna lectus tincidunt libero, sit amet feugiat orci metus a justo. Phasellus eget erat a risus vehicula tincidunt."} </p>
                            <p className="bagDescription">Artwork by {(bag?.author || "HoangLong").toUpperCase()}.</p>

                            <div className="mb-2">
                                <span className="fw-bold fs-1 text-dark bagNameDetail">{bag?.price?.toLocaleString() || "120.000"} VND</span>
                                {/* {bag.oldPrice &&
                                    <span className="text-decoration-line-through ms-3 text-secondary">{bag.oldPrice || "1200.000"} VND</span>
                                } */}
                            </div>
                            <div className="mb-2">
                                <span className="text-danger">tí.lab’s Secret Price : <span className="fw-bold text-danger fs-5">{bag?.secretPrice || "Recieve more Vouchers"}</span></span>
                            </div>
                            <hr />
                            <div className="mb-3 text-secondary bagDescription">
                                Measurements<br />
                                {bag?.length && bag?.weight ? `${bag?.length} cm (L) x ${bag?.weight} cm (W)` : "55cm (L) x 50cm (W)"}
                            </div>

                            <div className="d-flex align-items-center mb-3">
                                <div className="d-inline-flex align-items-center rounded p-1" style={{ backgroundColor: "#EEEEEE" }}>
                                    <button
                                        className="btn btn-sm border-0 bg-transparent text-muted px-2" onClick={() => setQuantity(Math.max(1, quantity - 1))}  >
                                        <i className="bi bi-dash"></i>
                                    </button>
                                    <span className="mx-2 fw-medium text-dark">
                                        {quantity}
                                    </span>
                                    <button className="btn btn-sm border-0 bg-transparent text-muted px-2" onClick={() => setQuantity(Math.min(bag.quantity, quantity + 1))} disabled={quantity >= bag.quantity}
                                    >
                                        <i className="bi bi-plus"></i>
                                    </button>
                                </div>

                                {/* Nút ADD TO CART */}
                                <button
                                    className="btn btn-primary ms-3"
                                    style={{ width: "600px" }}
                                    onClick={addToCart}
                                >
                                    ADD TO CART
                                </button>
                            </div>
                            <Link to="/shop/cart" className="btn w-100 mb-3" style={{ background: "#CAFF01", color: "#222", fontWeight: 600 }}> BUY IT NOW </Link>

                            <div className="accordion" id="bagDetailAccordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="storyHeading">
                                        <button className="accordion-button bagDescription" type="button" data-bs-toggle="collapse" data-bs-target="#storyCollapse" aria-expanded="true" aria-controls="storyCollapse">
                                            Story
                                        </button>
                                    </h2>
                                    <div id="storyCollapse" className="accordion-collapse collapse show bagDescription" aria-labelledby="storyHeading" data-bs-parent="#bagDetailAccordion">
                                        <div className="accordion-body">
                                            {bag?.story || "The bag is designed to be large and spacious so you can hold many items from documents to clothes or other miscellaneous things. A zipper at the top adds security, combined with handy internal pockets ensuring you don't have to scramble to find your keys. Versatile and fashionable design."}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="materialHeading">
                                        <button className="accordion-button collapsed bagDescription" type="button" data-bs-toggle="collapse" data-bs-target="#materialCollapse" aria-expanded="false" aria-controls="materialCollapse">
                                            Material
                                        </button>
                                    </h2>
                                    <div id="materialCollapse" className="accordion-collapse collapse bagDescription" aria-labelledby="materialHeading" data-bs-parent="#bagDetailAccordion">
                                        <div className="accordion-body">
                                            {bag?.material || "High-quality canvas/cotton, sturdy & fashionable."}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="designHeading">
                                        <button className="accordion-button collapsed bagDescription" type="button" data-bs-toggle="collapse" data-bs-target="#designCollapse" aria-expanded="false" aria-controls="designCollapse">
                                            Design
                                        </button>
                                    </h2>
                                    <div id="designCollapse" className="accordion-collapse collapse bagDescription" aria-labelledby="designHeading" data-bs-parent="#bagDetailAccordion">
                                        <div className="accordion-body">
                                            {bag?.design || "Unique design by artist."}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h4 className="artistH4" style={{ fontSize: "2.5rem" }}>YOU MAY ALSO LIKE</h4>
                        <hr className="custom-divider" />
                        <div className="mb-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-center">
                                        <div>
                                            <h5 className="mb-4 mt-4 artistH5" style={{ fontSize: "2rem" }}>CORE COLLECTION</h5>
                                        </div>

                                    </div>
                                    <div className="mb-2 d-flex flex-column flex-md-row justify-content-center">
                                        <Link to="/shop/artist-collection" className="seeMore" style={{ fontSize: "1rem" }}>See more</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                {coreBag && [...coreBag].sort(() => 0.5 - Math.random()).slice(0, 4).map((product) => (
                                    <div className="col-12 col-md-3 mb-4" key={product.id}>
                                        <Link to={`/shop/core-collection/${product.id}`} className="text-decoration-none">
                                            <div className="bg-white rounded p-3 text-center shopcore-artist-card h-100">
                                                <img
                                                    src={product.bagImages ? encodeURI(product.bagImages) : `https://picsum.photos/200/250?random=${product.id}`}
                                                    alt={product.name}
                                                    className="img-fluid rounded mb-2"
                                                    style={{ maxWidth: "300px", height: "400px", objectFit: "cover" }}
                                                />
                                                <div className="fw-semibold text-dark artistName">{product.name}</div>
                                                <div className="text-secondary artistName" style={{ fontSize: "0.95rem" }}>Artist Collection</div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-center">
                                        <div>
                                            <h5 className="mb-4 mt-4 artistH5" style={{ fontSize: "2rem" }}>ARTIST COLLECTION</h5>
                                        </div>

                                    </div>
                                    <div className="mb-2 d-flex flex-column flex-md-row justify-content-center">
                                        <Link to="/shop/artist-collection" className="seeMore" style={{ fontSize: "1rem" }}>See more</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                {artistBag && [...artistBag].sort(() => 0.5 - Math.random()).slice(0, 3).map((product) => (
                                    <div className="col-12 col-md-4 mb-4" key={product.id}>
                                        <Link to={`/shop/core-collection/${product.id}`} className="text-decoration-none">
                                            <div className="bg-white rounded p-3 text-center shopcore-artist-card h-100">
                                                <img
                                                    src={product.bagImages ? encodeURI(product.bagImages) : `https://picsum.photos/200/250?random=${product.id}`}
                                                    alt={product.name}
                                                    className="img-fluid rounded mb-2"
                                                    style={{ maxWidth: "300px", height: "400px", objectFit: "cover" }}
                                                />
                                                <div className="fw-semibold text-dark artistName">{product.name}</div>
                                                <div className="text-secondary artistName" style={{ fontSize: "0.95rem" }}>Artist Collection</div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>


                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShopViewDetail;

