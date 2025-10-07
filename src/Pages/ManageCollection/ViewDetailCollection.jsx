import React, { useEffect, useState } from "react";
import AxiosSetup from "../../Services/AxiosSetup";
import { useNavigate, useParams } from "react-router-dom";

const ViewDetailCollection = () => {
    const [collection, setCollection] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchCollectionDetail = async (id) => {
        try {
            const response = await AxiosSetup.get(`/collections/${id}`);
            setCollection(response.data.data);
        } catch (error) {
            console.error("Error fetching collection details:", error);
        }
    };

    useEffect(() => {
        fetchCollectionDetail(id);
    }, [id]);

    if (!collection) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading collection details...</p>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="row mb-4">

                <div className="col-md-4 text-center">
                    <img
                        src={collection.urlThumbnail}
                        alt={collection.name}
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: 250, objectFit: "cover" }}
                    />
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-center">
                    <h2 className="fw-bold">{collection.name}</h2>

                    <p className="mb-2"><strong>ID:</strong> {collection.id}</p>
                    <span className="badge bg-success px-3 py-2">
                        Active Collection
                    </span>

                </div>
            </div>


            <h4 className="mb-3">Bags in this Collection</h4>
            <div className="row">
                {collection.bags && collection.bags.length > 0 ? (
                    collection.bags.map((bag) => (
                        <div className="col-lg-6 mb-4" key={bag.id}>
                            <div className="card shadow-sm h-100 border-0">
                                <div className="row g-0">
                                    <div className="col-5">
                                        {bag.bagImages && bag.bagImages.length > 0 ? (
                                            <img
                                                src={bag.bagImages[0].url}
                                                alt={bag.name}
                                                className="img-fluid rounded-start h-100"
                                                style={{ objectFit: "cover", minHeight: 180 }}
                                            />
                                        ) : (
                                            <div
                                                className="bg-light text-secondary d-flex align-items-center justify-content-center h-100 rounded-start"
                                                style={{ minHeight: 180 }}
                                            >
                                                No Image
                                            </div>
                                        )}
                                    </div>


                                    <div className="col-7">
                                        <div className="card-body p-3">
                                            <h5 className="card-title fw-semibold mb-2">{bag.name}</h5>
                                            <p className="mb-1"><strong>Price:</strong> {bag.price?.toLocaleString() || "N/A"}₫</p>
                                            <p className="mb-1"><strong>Description:</strong> {bag.description || "N/A"}</p>
                                            <p className="mb-1"><strong>Author:</strong> {bag.author || "N/A"}</p>
                                            <p className="mb-1"><strong>Quantity:</strong> {bag.quantity || 0}</p>
                                            <p className="mb-1"><strong>Type:</strong> {bag.type || "N/A"}</p>
                                            <p className="mb-1">
                                                <strong>Status:</strong>{" "}
                                                <span
                                                    className={`badge ${bag.status === "IN_STOCK" ? "bg-success" : "bg-secondary"}`}
                                                >
                                                    {bag.status}
                                                </span>
                                            </p>
                                            {bag.bagImages && bag.bagImages.length > 0 && (
                                                <div className="d-flex flex-wrap gap-1 mt-2">
                                                    {bag.bagImages.map((img) => (
                                                        <img
                                                            key={img.id}
                                                            src={img.url}
                                                            alt="bag-thumbnail"
                                                            className="img-thumbnail"
                                                            style={{ width: 40, height: 40, objectFit: "cover" }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">No bags found in this collection.</p>
                )}
            </div>
            <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>
        </div>
    );
};

export default ViewDetailCollection;
