import React from "react";
import dayjs from "dayjs";

const PaymentHistoryModal = ({
    historyModalOpen,
    setHistoryModalOpen,
    modalHistory,
    modalPage,
    setModalPage,
    modalTotalPages,
    formatCurrency,
    paymentMethodLabels
}) => {
    if (!historyModalOpen) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal">
                <div className="custom-modal-header">
                    <h2>📄 Lịch sử giao dịch</h2>
                    <button className="modal-close-btn" onClick={() => setHistoryModalOpen(false)}>✕</button>
                </div>

                <div className="custom-modal-body">
                    {modalHistory.length === 0 ? (
                        <p className="no-data">Không có dữ liệu</p>
                    ) : (
                        <table className="payment-history-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Khách hàng</th>
                                    <th>SĐT</th>
                                    <th>Giá trị</th>
                                    <th>Thời gian</th>
                                    <th>Trạng thái</th>
                                    <th>Phương thức</th>
                                </tr>
                            </thead>

                            <tbody>
                                {modalHistory.map((p) => (
                                    <tr key={p.paymentId}>
                                        <td>{p.paymentId.slice(0, 10)}...</td>
                                        <td>{p.fullCustomerName}</td>
                                        <td>{p.phone}</td>
                                        <td>{formatCurrency(p.total)}</td>
                                        <td>{dayjs(p.paymentDate).format("DD/MM/YYYY HH:mm")}</td>
                                        <td><span className="status-pill paid">Đã thanh toán</span></td>
                                        <td>
                                            <span className={`method-pill method-${p.method.toLowerCase()}`}>
                                                {paymentMethodLabels[p.method]}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* PAGINATION */}
                <div className="pagination-number-container">
                    <button
                        className="page-arrow"
                        onClick={() => setModalPage(modalPage - 1)}
                        disabled={modalPage === 1}
                    >
                        ◀
                    </button>

                    <div className="page-numbers">
                        {Array.from({ length: modalTotalPages }, (_, i) => (
                            <span
                                key={i}
                                className={`page-number ${modalPage === i + 1 ? "active" : ""}`}
                                onClick={() => setModalPage(i + 1)}
                            >
                                {i + 1}
                            </span>
                        ))}
                    </div>

                    <button
                        className="page-arrow"
                        onClick={() => setModalPage(modalPage + 1)}
                        disabled={modalPage === modalTotalPages}
                    >
                        ▶
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistoryModal;
