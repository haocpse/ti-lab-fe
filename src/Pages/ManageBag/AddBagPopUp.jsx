import React, { useState } from "react";
import AxiosSetup from "../../Services/AxiosSetup";
import "./AddBagPopUp.css";
import axios from "axios";
import { toast } from "react-toastify";

const AddBagPopUp = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        author: "",
        price: 0,
        quantity: 0,
        length: 0,
        weight: 0,
        type: "CORE_COLLECTION",
        bagImages: [],
        mainImageId: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files).map(file => ({
            id: `${file.name}-${Date.now()}`,
            url: URL.createObjectURL(file),
            file,
            name: file.name,
        }));
        setFormData(prev => ({
            ...prev,
            bagImages: [...prev.bagImages, ...newFiles],
            mainImageId: prev.mainImageId || newFiles[0].id,
        }));
        e.target.value = null;
    };

    const handleRemoveImage = (id) => {
        setFormData(prev => {
            const newImages = prev.bagImages.filter(img => img.id !== id);
            return {
                ...prev,
                bagImages: newImages,
                mainImageId: prev.mainImageId === id ? (newImages[0]?.id || null) : prev.mainImageId
            };
        });
    };

    const handleSetMainImage = (id) => {
        setFormData(prev => ({ ...prev, mainImageId: id }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();

            const bagData = {
                name: formData.name,
                description: formData.description,
                author: formData.author,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity),
                length: parseFloat(formData.length),
                weight: parseFloat(formData.weight),
                type: formData.type,
            };

            formDataToSend.append("bags", new Blob([JSON.stringify(bagData)], { type: "application/json" }));

            formData.bagImages.forEach(img => {
                let fileToSend = img.file;

                if (img.id === formData.mainImageId) {
                    const safeName = img.file.name.replace(/\s/g, "_");
                    fileToSend = new File([img.file], `_main_${safeName}`, { type: img.file.type });
                }

                formDataToSend.append("imageBagRequest", fileToSend);
            });

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "https://tilab.com.vn/api/bags",
                formDataToSend,
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log("Bag added:", response.data);
            onClose();
            toast.success("Add new bag successfully")
            onSubmit(response.data.data);
         
        } catch (error) {
            console.error("Error adding bag:", error.response?.data || error.message);
            toast.warn("Add new bag failed")
        }
    };

    
    return (
        <div className="popup-overlay">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
                            <div className="card-body p-4">
                                <h5 className="fw-semibold mb-4">Add New Bag</h5>
                                <form onSubmit={handleSubmit}>

                                    {/* Name */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="name">Name</label>
                                    </div>

                                    {/* Description */}
                                    <div className="form-floating mb-3">
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            placeholder="Description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            style={{ height: "100px" }}
                                            required
                                        />
                                        <label htmlFor="description">Description</label>
                                    </div>

                                    {/* Author */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="author"
                                            placeholder="Author"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="author">Author</label>
                                    </div>

                                    {/* Price & Quantity */}
                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-floating">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="price"
                                                    placeholder="Price"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="price">Price</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="quantity"
                                                    placeholder="Quantity"
                                                    name="quantity"
                                                    value={formData.quantity}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="quantity">Quantity</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Length & Weight */}
                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-floating">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="length"
                                                    placeholder="Length"
                                                    name="length"
                                                    value={formData.length}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="length">Length</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="weight"
                                                    placeholder="Weight"
                                                    name="weight"
                                                    value={formData.weight}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="weight">Weight</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Type */}
                                    <div className="mb-3">
                                        <select
                                            className="form-select"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                        >
                                            <option value="CORE_COLLECTION">CORE_COLLECTION</option>
                                            <option value="ARTIST_COLLECTION">ARTIST_COLLECTION</option>
                                        </select>
                                    </div>

                                    {/* Upload Images */}
                                    <div className="mb-3">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="form-control"
                                        />
                                    </div>

                                    {/* Preview Images */}
                                    {formData.bagImages.length > 0 && (
                                        <div className="mb-3 d-flex flex-wrap gap-2">
                                            {formData.bagImages.map(img => (
                                                <div key={img.id} className="position-relative text-center" style={{ width: "100px" }}>
                                                    <img
                                                        src={img.url}
                                                        alt="preview"
                                                        style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                                                    />
                                                    <div style={{ fontSize: "10px", overflow: "hidden", textOverflow: "ellipsis" }}>{img.name}</div>

                                                    {/* Chọn ảnh chính */}
                                                    <input
                                                        type="radio"
                                                        name="mainImage"
                                                        checked={formData.mainImageId === img.id}
                                                        onChange={() => handleSetMainImage(img.id)}
                                                        style={{ position: "absolute", bottom: "0", left: "0" }}
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(img.id)}
                                                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                                        style={{ borderRadius: "50%", padding: "2px 6px" }}
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Buttons */}
                                    <div className="d-flex justify-content-end gap-2">
                                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Add Bag
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

export default AddBagPopUp;
