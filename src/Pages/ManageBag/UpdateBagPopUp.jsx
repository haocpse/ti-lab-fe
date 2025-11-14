import React, { useState, useEffect } from "react";
import "./UpdateBagPopUp.css";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateBagPopUp = ({ onClose, onSubmit, bag }) => {
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
        mainPosition: 0,
    });

    // Khởi tạo formData khi popup mở
    useEffect(() => {
        if (bag) {
            setFormData({
                name: bag.name || "",
                description: bag.description || "",
                author: bag.author || "",
                price: bag.price || 0,
                quantity: bag.quantity || 0,
                length: bag.length || 0,
                weight: bag.weight || 0,
                type: bag.type || "CORE_COLLECTION",
                bagImages: bag.bagImages
                    ? bag.bagImages.map(img => ({ ...img, file: null }))
                    : [],
                mainImageId: bag.bagImages?.[0]?.id || null,
            });
        }
    }, [bag]);

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

        console.log("➕ ADD NEW IMAGES:", newFiles);

        setFormData(prev => {
            const updated = {
                ...prev,
                bagImages: [...prev.bagImages, ...newFiles],
                mainImageId: prev.mainImageId || newFiles[0].id,
            };

            console.log("📂 ALL IMAGES AFTER ADD:", updated.bagImages);
            console.log("⭐ MAIN IMAGE ID:", updated.mainImageId);

            return updated;
        });

        e.target.value = null;
    };

    const handleRemoveImage = (id) => {
        console.log("❌ REMOVE IMAGE:", id);

        setFormData(prev => {
            const newImages = prev.bagImages.filter(img => img.id !== id);

            const updated = {
                ...prev,
                bagImages: newImages,
                mainImageId: prev.mainImageId === id ? (newImages[0]?.id || null) : prev.mainImageId
            };

            console.log("📂 ALL IMAGES AFTER REMOVE:", newImages);
            console.log("⭐ MAIN IMAGE ID AFTER REMOVE:", updated.mainImageId);

            return updated;
        });
    };

    const handleSetMainImage = (id) => {
        console.log("⭐ SET MAIN IMAGE:", id);

        setFormData(prev => {
            const updated = {
                ...prev,
                mainImageId: id
            };

            console.log("➡️ mainImageId UPDATED:", updated.mainImageId);
            console.log("📂 CURRENT IMAGE ORDER:", updated.bagImages);

            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();

            const removeIds = bag.bagImages
                ?.filter(img => !formData.bagImages.find(f => f.id === img.id))
                .map(img => img.id) || [];

            const mainPosition = formData.bagImages.findIndex(
                img => img.id === formData.mainImageId
            );

            // Dữ liệu chính
            const bagsData = {
                name: formData.name,
                description: formData.description,
                author: formData.author,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity),
                length: parseFloat(formData.length),
                weight: parseFloat(formData.weight),
                type: formData.type,
                removeIds,
                mainPosition
            };

            console.log("👉 bagsData (JSON):", bagsData);

            formDataToSend.append(
                "bags",
                new Blob([JSON.stringify(bagsData)], { type: "application/json" })
            );

            // Append chỉ file mới
            formData.bagImages.forEach(img => {
                if (!img.file) return; // bỏ qua ảnh cũ
                formData.bagImages.forEach(img => {
                    if (img.file) {
                        formDataToSend.append("imageBagRequest", img.file);
                    }
                });
            });

            console.log("👉 FormData gửi lên:");
            for (let [key, value] of formDataToSend.entries()) {
                if (value instanceof File) {
                    console.log(
                        `${key}: File -> name=${value.name}, type=${value.type}, size=${value.size}`
                    );
                } else if (value instanceof Blob) {
                    value.text().then(text => {
                        console.log(`${key}: Blob(JSON) ->`, JSON.parse(text));
                    });
                } else {
                    console.log(`${key}:`, value);
                }
            }

            const token = localStorage.getItem("token");

            console.log("============== 🚀 DEBUG BEFORE SENDING TO BACKEND ==============");
            console.log("📌 Bag ID:", bag.id);

            console.log("📝 BAGS JSON DATA (bagsData):", bagsData);

            console.log("🗑️ REMOVE IDS:", removeIds);

            console.log("⭐ MAIN IMAGE ID:", formData.mainImageId);
            console.log("⭐ MAIN POSITION (index):", mainPosition);

            console.log("📂 ALL IMAGES CURRENT ORDER:");
            formData.bagImages.forEach((img, index) => {
                console.log(`   [${index}] => id=${img.id}, name=${img.name}, file? ${img.file ? "YES" : "NO"}`);
            });

            console.log("📤 FILES TO UPLOAD (imageBagRequest):");
            formData.bagImages
                .filter(img => img.file)
                .forEach((img, index) => {
                    console.log(
                        `   file[${index}]: name=${img.file.name}, size=${img.file.size}, type=${img.file.type}`
                    );
                });

            console.log("📦 FINAL FORMDATA ENTRIES:");
            for (let [key, value] of formDataToSend.entries()) {
                if (value instanceof File) {
                    console.log(`   ${key} => FILE: name=${value.name}, size=${value.size}, type=${value.type}`);
                } else {
                    console.log(`   ${key} =>`, value);
                }
            }

            console.log("===============================================================");


            const response = await axios.put(
                //     `https://tilab.com.vn/api/bags/${bag.id}`,
                `http://localhost:8080/api/bags/${bag.id}`,
                formDataToSend,
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            toast.success("Bag updated successfully!");
            onSubmit(response.data.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("❌ Error updating bag:", error.response?.data || error.message);
            toast.error("Update bag failed");
        }
    };

    return (
        <div className="popup-overlay">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
                            <div className="card-body p-4">
                                <h5 className="fw-semibold mb-4">Update Bag</h5>
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
                                            Update Bag
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

export default UpdateBagPopUp;
