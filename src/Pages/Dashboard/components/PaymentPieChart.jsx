import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const PaymentPieChart = ({ paymentMethodStat, paymentMethodLabels }) => {
    if (!paymentMethodStat || paymentMethodStat.length === 0)
        return <p className="no-data">Không có dữ liệu</p>;

    const COLORS = ["#6366F1", "#10B981", "#FACC15", "#EF4444"];

    return (
        <div className="payment-pie-chart">
            <h3 className="pie-title">Tỷ lệ phương thức thanh toán</h3>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={paymentMethodStat}
                        dataKey="total"
                        nameKey="payMethod"
                        outerRadius={100}
                        label={({ name, percent }) =>
                            `${paymentMethodLabels[name] || name} ${(percent * 100).toFixed(1)}%`
                        }
                    >
                        {paymentMethodStat.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % 4]} />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(val, name) => [
                            `${val} giao dịch`,
                            paymentMethodLabels[name] || name,
                        ]}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PaymentPieChart;
