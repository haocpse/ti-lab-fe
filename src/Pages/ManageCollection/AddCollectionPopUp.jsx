import React, { useState, useEffect } from "react";
import AxiosSetup from "../../Services/AxiosSetup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddCollectionPopUp = ({ onClose, onSubmit}) => {
    const [formData, setFormData] = useState({
        name: "",
        thumbnail: null,
        addBagIds: []
    });
    const [availableBags, setAvailableBags] = useState([]);
    const [loadingBags, setLoadingBags] = useState(false);
    const [searchBagTerm, setSearchBagTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    useEffect(() => {
        fetchBags();
    }, []);

    const fetchBags = async () => {
        try {
            setLoadingBags(true);
            const response = await AxiosSetup.get('/bags?page=0&size=500');

            console.log('Bags data:', response.data);

            if (response.data.code === 200) {
                setAvailableBags(response.data.data.content || response.data.data);
            }
        } catch (error) {
            console.error("Lỗi khi fetch bags:", error);
            alert("Không thể tải danh sách bags!");
        } finally {
            setLoadingBags(false);
        }
    };

    // Xử lý thay đổi input text
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                thumbnail: file
            }));
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnailPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Xử lý chọn/bỏ chọn bag
    const handleToggleBag = (bagId) => {
        setFormData(prev => {
            const isSelected = prev.addBagIds.includes(bagId);
            if (isSelected) {
                // Bỏ chọn bag
                return {
                    ...prev,
                    addBagIds: prev.addBagIds.filter(id => id !== bagId)
                };
            } else {
                // Chọn bag
                return {
                    ...prev,
                    addBagIds: [...prev.addBagIds, bagId]
                };
            }
        });
    };

    const handleRemoveThumbnail = () => {
        setFormData(prev => ({
            ...prev,
            thumbnail: null
        }));
        setThumbnailPreview(null);
    };

    const filteredBags = availableBags.filter(bag =>
        bag.name?.toLowerCase().includes(searchBagTerm.toLowerCase()) ||
        bag.id?.toString().includes(searchBagTerm)
    );

    // submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const formDataToSend = new FormData();

            const collectionData = {
                name: formData.name,
                status: "ACTIVE",
                addBagIds: formData.addBagIds.map(id => id.toString())
            };


            const collectionBlob = new Blob([JSON.stringify(collectionData)], { type: "application/json" });
            formDataToSend.append("collection", collectionBlob);
            formDataToSend.append("thumbnail", formData.thumbnail);

            console.log("Gửi dữ liệu:", collectionData, formData.thumbnail);

            const token = localStorage.getItem("token");
            const response = await axios.post("http://103.110.87.196/api/collections", formDataToSend, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                }
            });

            if (response.data.code === 200 || response.data.code === 201) {
                toast.success("Successfully")
                onSubmit && onSubmit();
                onClose();
            } else {
                alert("Fail: " + response.data.message);
            }
        } catch (error) {
            console.error("Fail:", error);
            toast.warning("Failed")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }}>
            <div className="container">
                <ToastContainer position="top-right" autoClose={5000} />
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-12">
                        <div className="card shadow-lg" style={{ borderRadius: "15px", maxHeight: '90vh', overflowY: 'auto' }}>
                            <div className="card-body p-4">
                                {/* Header */}
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="fw-semibold mb-0">
                                        <i className="fas fa-plus-circle text-primary"></i> Add New Collection
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={onClose}
                                        disabled={loading}
                                    ></button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* Tên Collection */}
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Tên collection"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={loading}
                                                />
                                                <label htmlFor="name">
                                                    <i className="fas fa-tag"></i> Collection Name *
                                                </label>
                                            </div>

                                            {/* Upload Thumbnail */}
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">
                                                    <i className="fas fa-image"></i>Thumbnail *
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleThumbnailChange}
                                                    className="form-control"
                                                    disabled={loading}
                                                    required
                                                />
                                                <div className="form-text">
                                                    Select avatar for collection.
                                                </div>
                                            </div>

                                            {/* Preview Thumbnail */}
                                            {thumbnailPreview && (
                                                <div className="mb-3">
                                                    <div className="position-relative d-inline-block">
                                                        <img
                                                            src={thumbnailPreview}
                                                            alt="Preview"
                                                            style={{
                                                                width: "200px",
                                                                height: "150px",
                                                                objectFit: "cover",
                                                                borderRadius: "8px",
                                                                border: "2px solid #dee2e6"
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={handleRemoveThumbnail}
                                                            className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                                            style={{
                                                                borderRadius: "50%",
                                                                padding: "4px 8px",
                                                                transform: "translate(25%, -25%)"
                                                            }}
                                                            disabled={loading}
                                                        >
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Thống kê bags đã chọn */}
                                            <div className="alert alert-info">
                                                <i className="fas fa-info-circle"></i>
                                                <strong> Selected: {formData.addBagIds.length} bags</strong>
                                            </div>
                                        </div>

                                        {/* Cột phải - Chọn bags */}
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">
                                                    <i className="fas fa-shopping-bag"></i> Select Bags for Collection
                                                </label>

                                                {/* Tìm kiếm bags */}
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Searching bags by Name or ID..."
                                                        value={searchBagTerm}
                                                        onChange={(e) => setSearchBagTerm(e.target.value)}
                                                        disabled={loadingBags}
                                                    />
                                                </div>

                                                {/* Danh sách bags */}
                                                <div
                                                    className="border rounded p-2"
                                                    style={{
                                                        height: '400px',
                                                        overflowY: 'auto',
                                                        backgroundColor: '#f8f9fa'
                                                    }}
                                                >
                                                    {loadingBags ? (
                                                        <div className="text-center py-4">
                                                            <div className="spinner-border text-primary" role="status">
                                                                <span className="visually-hidden">Loading bags...</span>
                                                            </div>
                                                            <p className="mt-2">Loading bags list...</p>
                                                        </div>
                                                    ) : filteredBags.length > 0 ? (
                                                        <div className="row g-2">
                                                            {filteredBags.map(bag => (
                                                                <div key={bag.id} className="col-12">
                                                                    <div
                                                                        className={`card h-100 cursor-pointer ${formData.addBagIds.includes(bag.id)
                                                                            ? 'border-primary bg-primary bg-opacity-10'
                                                                            : 'border-light'
                                                                            }`}
                                                                        onClick={() => handleToggleBag(bag.id)}
                                                                        style={{ cursor: 'pointer' }}
                                                                    >
                                                                        <div className="card-body p-2">
                                                                            <div className="d-flex align-items-center">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    className="form-check-input me-2"
                                                                                    checked={formData.addBagIds.includes(bag.id)}
                                                                                    onChange={() => handleToggleBag(bag.id)}
                                                                                />

                                                                                {bag.bagImages && bag.bagImages.length > 0 && (
                                                                                    <img
                                                                                        src={bag.bagImages[0].url}
                                                                                        alt={bag.name}
                                                                                        style={{
                                                                                            width: '40px',
                                                                                            height: '40px',
                                                                                            objectFit: 'cover',
                                                                                            borderRadius: '4px'
                                                                                        }}
                                                                                        className="me-2"
                                                                                        onError={(e) => {
                                                                                            e.target.style.display = 'none';
                                                                                        }}
                                                                                    />
                                                                                )}


                                                                                <div className="flex-grow-1">
                                                                                    <h6 className="card-title mb-1 text-truncate">
                                                                                        {bag.name || `Bag #${bag.id}`}
                                                                                    </h6>
                                                                                    <small className="text-muted">
                                                                                        ID: {bag.id}
                                                                                        {bag.price && ` - ${bag.price.toLocaleString()}đ`}
                                                                                    </small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="text-center py-4 text-muted">
                                                            <i className="fas fa-search fa-2x mb-2"></i>
                                                            <p>
                                                                {searchBagTerm ?
                                                                    "Không tìm thấy bag nào!" :
                                                                    "Không có bags nào!"
                                                                }
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="form-text mt-2">
                                                    <i className="fas fa-lightbulb"></i>
                                                    Click on a bag to select/deselect. Multiple bags can be selected.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={onClose}
                                            disabled={loading}
                                        >
                                            <i className="fas fa-times"></i> Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading || loadingBags}
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="spinner-border spinner-border-sm me-2" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-plus"></i> Create Collection
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCollectionPopUp;