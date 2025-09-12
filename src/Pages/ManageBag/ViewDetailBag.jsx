import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchViewDetailBag } from "../../Services/ShopViewDetail";

const ViewDetailBag = () => {
    const [bag, setBag] = useState([])
    const { id } = useParams();
    const [mainImageIndex, setMainImageIndex] = useState(0);


    const fetchDetailBag = async () => {
        try {
            const data = await fetchViewDetailBag(id);
            setBag(data);
        } catch (error) {
            console.error('Error fetching bag details:', error);
        }
    }

    useEffect(() => {
        fetchDetailBag();


    }, [id])


    const prevImage = () => {
        setMainImageIndex((prev) => (prev === 0 ? bag.bagImages.length - 1 : prev - 1));
    }

    const nextImage = () => {
        setMainImageIndex((prev) => (prev === bag.bagImages.length - 1 ? 0 : prev + 1));
    }

    return (
        <>
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
                                <button className="btn btn-outline-secondary btn-sm me-2" onClick={prevImage}>&lt;</button>
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
                                <button className="btn btn-outline-secondary btn-sm ms-2" onClick={nextImage}>&gt;</button>
                            </div>
                        </div>


                        <div className="col-12 col-lg-6">
                            <h3 className="mt-3 mt-lg-0 mb-2 bagNameDetail">{bag?.name || "Túi xách 1"}</h3>
                            <hr className="custom-divider1" />
                            <p className="mb-2 bagDescription">{bag?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc et tincidunt luctus, ligula arcu pulvinar purus, in fringilla nisl neque ut nisl. Curabitur vitae risus nec nulla ullamcorper tincidunt. Aenean eget sapien sit amet urna facilisis venenatis. Vivamus auctor, justo a dapibus posuere, magna lectus tincidunt libero, sit amet feugiat orci metus a justo. Phasellus eget erat a risus vehicula tincidunt."} </p>
                            <p className="bagDescription">Artwork by {(bag?.author || "HoangLong").toUpperCase()}.</p>

                            <div className="mb-2">
                                <span className="fw-bold fs-1 text-dark bagNameDetail">{bag.price || "120.000"} VND</span>
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




                    </div>

                </div>


            </div>
        </>
    );
};

export default ViewDetailBag;

