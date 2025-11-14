import React from "react";

const StatusCards = ({ statusStat, statusLabels, statusColors }) => {
    return (
        <div className="status-grid">
            {statusStat.map((status) => (
                <div key={status.status} className="status-card">
                    <div className={`status-icon ${statusColors[status.status]}`}></div>
                    <div>
                        <p className="status-label">
                            {statusLabels[status.status] || status.status}
                        </p>
                        <p className="status-total">{status.total}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatusCards;