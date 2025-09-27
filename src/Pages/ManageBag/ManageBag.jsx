import React, { useEffect, useState } from "react";
import "./ManageBag.css";
import AxiosSetup from "../../Services/AxiosSetup";
import { useNavigate } from "react-router-dom";
import AddBagPopUp from "./AddBagPopUp";
import { ToastContainer } from "react-toastify";
import UpdateBagPopUp from "./UpdateBagPopUp";
import { fetchViewDetailBag } from "../../Services/ShopViewDetail";

const ManageBag = () => {
    const [bags, setBags] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchFunction, setSearchFunction] = useState("");
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [bagToEdit, setBagToEdit] = useState(null);
    const navigate = useNavigate();
    const [totalElements, setTotalElements] = useState(0);

    const fetchBags = async (page = 0) => {
        try {
            const response = await AxiosSetup.get(`/bags?page=${page}&size=8`);
            setBags(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
            setPage(response.data.data.number);
            setTotalElements(response.data.data.totalElements);
        } catch (error) {
            console.error("Error fetching bags:", error);
        }
    };

    useEffect(() => {
        fetchBags(page);
    }, [page]);



    const handleCreateNewBag = async () => {
        fetchBags(page);
    };


    // ê đít
    const handleEditClick = async (bag) => {
        try {
            const detailedBag = await fetchViewDetailBag(bag.id);
            setBagToEdit(detailedBag);
            setShowUpdateModal(true);
        } catch (error) {
            console.error("Failed to fetch bag details:", error);
        }
    };
    const handleViewClick = (id) => {
        navigate(`/admin/manage-bag/view/${id}`);
    };

    const hadleDelteClick = async (id) => {
        const confirmDelete = window.confirm("Are you sure when deleting this?");
        if (!confirmDelete) return;
        try {
            const response = await AxiosSetup(`/bag/${id}`)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const filteredBags = bags.filter((bag) =>
        bag.name.toLowerCase().includes(searchFunction.toLowerCase()) ||
        bag.status.toLowerCase().includes(searchFunction.toLowerCase())
    );


    return (
        <div className="container mt-4 textDmSan">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Manage Bags</h2>

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
            <div className="d-flex justify-content-between align-items-center py-2">
                <div className="badge bg-info fs-6">
                    <i className="fas fa-info-circle"></i> Total: {totalElements} Bags
                </div>
            </div>
            <div className="row">
                <div className="row">
                    {filteredBags.map((bag) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={bag.id}>
                            <div className="card h-100 shadow-sm bag-card">
                                <img
                                    src={
                                        bag.bagImages && bag.bagImages.length > 0
                                            ? bag.bagImages[0].url
                                            : `https://picsum.photos/600/500?random=${bag.id}`
                                    }
                                    alt={bag.name}
                                    className="card-img-top bag-img"
                                />
                                <div className="card-body p-3">
                                    <h6 className="card-title mb-2 fw-bold">{bag.name}</h6>
                                    <p className="card-text text-muted mb-2 small">{bag.description}</p>

                                    <p className="mb-1">
                                        <strong>Price:</strong>{" "}
                                        <span className="text-success fw-bold">{bag.price.toLocaleString()} VND</span>
                                    </p>
                                    <p className="mb-1">
                                        <strong>Quantity:</strong> {bag.quantity} items
                                    </p>
                                    <p className="mb-1">
                                        <strong>Type:</strong> {bag.type}
                                    </p>
                                    <p className="mb-0">
                                        <strong>Status:</strong>{" "}
                                        <span className={`badge ${bag.status === 'IN_STOCK' ? 'bg-success' : 'bg-danger'}`}>
                                            {bag.status}
                                        </span>
                                    </p>

                                    <div className="d-flex gap-2 mt-2 justify-content-start">
                                        <button
                                            className="btn btn-sm btn-primary d-flex align-items-center justify-content-center"
                                            onClick={() => handleViewClick(bag.id)}
                                            title="View"
                                        >
                                            <i class="bi bi-eye"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-warning d-flex align-items-center justify-content-center"
                                            onClick={() => handleEditClick(bag)}
                                            title="Edit"
                                        >
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
                                            onClick={() => hadleDelteClick(bag.id)}
                                            title="Delete"
                                        >
                                            <i class="bi bi-trash3"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showAddModal && (
                <AddBagPopUp
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleCreateNewBag}
                    fetchBags
                />
            )}

            {showUpdateModal && bagToEdit && (
                <UpdateBagPopUp
                    bag={bagToEdit}
                    onClose={() => setShowUpdateModal(false)}
                    onSubmit={handleEditClick}
                />
            )}


            {/* paging */}
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
    );
};

export default ManageBag;
