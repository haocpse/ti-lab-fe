import React from "react";

const PaymentOverview = ({ paymentOverview, formatCurrency }) => {
    if (!paymentOverview) return null;

    return (
        <div className="payment-summary-section">
            <div className="payment-overview-column">

                <div className="status-card overview-card">
                    <div className="status-icon status-blue"></div>
                    <div>
                        <p className="status-label">Tổng số giao dịch</p>
                        <p className="status-total">{paymentOverview.total}</p>
                    </div>
                </div>

                <div className="status-card overview-card">
                    <div className="status-icon status-green"></div>
                    <div>
                        <p className="status-label">Tổng giá trị</p>
                        <p className="status-total">
                            {formatCurrency(paymentOverview.totalPrice)}
                        </p>
                    </div>
                </div>

                <div className="status-card overview-card">
                    <div className="status-icon status-yellow"></div>
                    <div>
                        <p className="status-label">Giá trị trung bình</p>
                        <p className="status-total">
                            {formatCurrency(paymentOverview.avgPrice)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentOverview;
