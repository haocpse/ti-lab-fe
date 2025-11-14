import React from "react";

const BestSellingBags = ({ bestSellingBags }) => {
    if (!bestSellingBags || bestSellingBags.length === 0)
        return <p className="no-data">Không có dữ liệu</p>;

    return (
        <div className="best-selling-section">
            <h2 className="best-selling-title">🏆 Top 3 túi bán chạy nhất</h2>

            <div className="best-selling-grid">
                {bestSellingBags.map((bag, index) => (
                    <div key={bag.bagId} className="best-selling-card">
                        <div className="best-selling-rank">
                            {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                        </div>

                        <div className="best-selling-image-container">
                            <img
                                src={bag.urlMain}
                                alt={bag.bagName}
                                className="best-selling-image"
                                onError={(e) => {
                                    e.target.src =
                                        "https://via.placeholder.com/200x200?text=No+Image";
                                }}
                            />
                        </div>

                        <div className="best-selling-info">
                            <p className="best-selling-name">{bag.bagName}</p>
                            <p className="best-selling-total">
                                <span className="best-selling-count">{bag.total}</span>{" "}
                                đơn hàng
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSellingBags;
