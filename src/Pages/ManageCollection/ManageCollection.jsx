import React from "react";
import { useState, useEffect } from "react";
import AxiosSetup from "../../Services/AxiosSetup";
import AddCollectionPopUp from "./AddCollectionPopUp";
import { useNavigate } from "react-router-dom";

const ManageCollection = () => {
    const [collections, setCollections] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    // const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [searchFunction, setSearchFunction] = useState("");
    const navigate = useNavigate();

    const fetchCollection = async (page = 0) => {
        try {
            setLoading(true);
            const response = await AxiosSetup.get(`/collections?page=${page}&size=8`);

            setCollections(response.data.data.content);
            setPage(response.data.data.number);
            setTotalPages(response.data.data.totalPages);
            setTotalElements(response.data.data.totalElements);

        } catch (error) {
            console.log("Lỗi khi fetch dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCollections = collections.filter((collection) =>
        collection.name.toLowerCase().includes(searchFunction.toLowerCase())
    );

    const handleCreateNewCollection = async () => {
        fetchCollection(page);
    };
    const handleViewClick = (id) => {
        navigate(`/admin/manage-collection/view/${id}`);
    };


    const hadleDelteClick = async (id) => {
        const confirmDelete = window.confirm("Are you sure when deleting this?");
        if (!confirmDelete) return;
        try {
            await AxiosSetup.delete(`/collections/${id}`);
            fetchCollection(page);
        } catch (error) {
            console.error("There was an error deleting the collection!", error);
        }
    }

    useEffect(() => {
        fetchCollection(page);
    }, [page]);

    return (
        <div className="container-fluid py-4">
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="">
                            Manage Collection
                        </h2>
                        <div className="input-group w-25">
                            <span className="input-group-text bg-white border-end-0">
                                <i className="bi bi-search-heart"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0"
                                placeholder="Search..."
                                value={searchFunction}
                                onChange={(e) => setSearchFunction(e.target.value)}
                            />
                        </div>

                        <div className="buttons mb-2">
                            <button className="btn" onClick={() => setShowAddModal(true)}>
                                <span></span>
                                <p data-start="good luck!" data-text="start!" data-title="Create new"></p>
                            </button>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="badge bg-info fs-6">
                            <i className="fas fa-info-circle"></i> Total: {totalElements} Collections
                        </div>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="row">
                    <div className="col-12 text-center py-5">
                        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading...</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="row">
                        {filteredCollections.map((collection) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={collection.id}>
                                <div className="card h-100 shadow-sm bag-card">
                                    <img
                                        src={collection.urlThumbnail}
                                        alt={collection.name}
                                        className="card-img-top bag-img"
                                    />
                                    <div className="card-body p-3">
                                        <h6 className="card-title mb-2 fw-bold">{collection.name}</h6>
                                        <p className="card-text text-muted mb-2 small"> ID: {collection.id}</p>
                                        <div className="d-flex gap-2 mt-2 justify-content-start">
                                            <button
                                                className="btn btn-sm btn-primary d-flex align-items-center justify-content-center"
                                                onClick={() => handleViewClick(collection.id)}
                                                title="View"
                                            >
                                                <i class="bi bi-eye"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-warning d-flex align-items-center justify-content-center"
                                                // onClick={() => handleEditClick(bag)}
                                                title="Edit"
                                            >
                                                <i class="bi bi-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
                                                onClick={() => hadleDelteClick(collection.id)}
                                                title="Delete"
                                            >
                                                <i class="bi bi-trash3"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {showAddModal && (
                            <AddCollectionPopUp
                                onClose={() => setShowAddModal(false)}
                                onSubmit={handleCreateNewCollection}
                            />
                        )}


                        <nav>
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(page - 1)}
                                        disabled={page === 0}
                                    >
                                        <i class="bi bi-caret-left"></i>
                                    </button>
                                </li>

                                {[...Array(totalPages)].map((_, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${page === index ? "active" : ""}`}
                                    >
                                        <button className="page-link" onClick={() => setPage(index)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}

                                <li
                                    className={`page-item ${page === totalPages - 1 ? "disabled" : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(page + 1)}
                                        disabled={page === totalPages - 1}
                                    >
                                        <i class="bi bi-caret-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageCollection;

