import React from "react";
import dayjs from "dayjs";

const PaymentHistory = ({ paymentHistory, formatCurrency, paymentMethodLabels, openHistoryModal }) => {
    if (!paymentHistory || paymentHistory.length === 0)
        return <p className="no-data">Không có dữ liệu giao dịch</p>;

    return (
        <div className="payment-history-section">
            <div className="payment-history-header">
                <h2 className="table-title">📄 Lịch sử giao dịch</h2>

                <span className="see-more-link" onClick={openHistoryModal}>
                    Xem thêm →
                </span>
            </div>

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
                    {paymentHistory.map((p) => (
                        <tr key={p.paymentId}>
                            <td>{p.paymentId.slice(0, 8)}...</td>
                            <td>{p.fullCustomerName}</td>
                            <td>{p.phone}</td>
                            <td>{formatCurrency(p.total)}</td>
                            <td>{dayjs(p.paymentDate).format("DD/MM/YYYY HH:mm")}</td>
                            <td>
                                <span className="status-pill paid">Đã thanh toán</span>
                            </td>
                            <td>
                                <span className={`method-pill method-${p.method.toLowerCase()}`}>
                                    {paymentMethodLabels[p.method] || p.method}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
