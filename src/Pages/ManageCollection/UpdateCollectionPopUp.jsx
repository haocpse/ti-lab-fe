import React, { useState, useEffect } from "react";
import AxiosSetup from "../../Services/AxiosSetup";
import { toast, ToastContainer } from "react-toastify";

const UpdateCollectionPopUp = ({ collectionId, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    addBagIds: [],
    deleteBagIds: []
  });
  const [availableBags, setAvailableBags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBags, setLoadingBags] = useState(false);

  useEffect(() => {
    fetchCollection();
    fetchBags();
  }, [collectionId]);

  const fetchCollection = async () => {
    try {
      const res = await AxiosSetup.get(`/collections/${collectionId}`);
      if (res.data?.data) {
        const collection = res.data.data;
        setFormData({
          name: collection.name,
          addBagIds: [], // khi thêm mới sẽ push vào
          deleteBagIds: []
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load collection details!");
    }
  };

  const fetchBags = async () => {
    try {
      setLoadingBags(true);
      const res = await AxiosSetup.get("/bags?page=0&size=500");
      setAvailableBags(res.data.data.content || res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bags list!");
    } finally {
      setLoadingBags(false);
    }
  };

  const handleToggleBag = (bagId, alreadyInCollection) => {
    setFormData(prev => {
      if (alreadyInCollection) {
        // Nếu bag đã có sẵn trong collection => cho phép xóa
        const isMarkedForDelete = prev.deleteBagIds.includes(bagId);
        return {
          ...prev,
          deleteBagIds: isMarkedForDelete
            ? prev.deleteBagIds.filter(id => id !== bagId)
            : [...prev.deleteBagIds, bagId]
        };
      } else {
        // Nếu bag chưa có => cho phép add
        const isMarkedForAdd = prev.addBagIds.includes(bagId);
        return {
          ...prev,
          addBagIds: isMarkedForAdd
            ? prev.addBagIds.filter(id => id !== bagId)
            : [...prev.addBagIds, bagId]
        };
      }
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const payload = {
        name: formData.name,
        addBagIds: formData.addBagIds.map(String),
        deleteBagIds: formData.deleteBagIds.map(String)
      };

      const res = await AxiosSetup.put(`/collections/${collectionId}`, payload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined
        }
      });

      if (res.data.code === 200) {
        toast.success("Collection updated successfully!");
        onSubmit && onSubmit();
        onClose();
      } else {
        toast.error("Update failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating collection!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <ToastContainer />
      <div className="card shadow-lg p-4">
        <h5 className="fw-bold mb-3">Update Collection</h5>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <label>Collection Name</label>
          </div>

          {/* Bag list */}
          <div className="mb-3">
            <h6>Select Bags</h6>
            <div
              className="border rounded p-2"
              style={{ maxHeight: 300, overflowY: "auto" }}
            >
              {loadingBags ? (
                <p>Loading bags...</p>
              ) : (
                availableBags.map(bag => {
                  const alreadyInCollection =
                    bag.collectionId === collectionId; // tùy backend có trả về quan hệ hay không
                  const selected =
                    alreadyInCollection
                      ? formData.deleteBagIds.includes(bag.id)
                      : formData.addBagIds.includes(bag.id);

                  return (
                    <div
                      key={bag.id}
                      className={`d-flex align-items-center mb-2 p-2 border rounded ${
                        selected ? "bg-warning bg-opacity-25" : ""
                      }`}
                      onClick={() => handleToggleBag(bag.id, alreadyInCollection)}
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={selected}
                        readOnly
                      />
                      <span>{bag.name}</span>
                      <small className="ms-auto text-muted">ID: {bag.id}</small>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2 border-top pt-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCollectionPopUp;
