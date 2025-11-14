import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend
} from "recharts";
import dayjs from "dayjs";

const PaymentChart = ({ paymentStat, paymentTypePeriod, formatCurrency }) => {
    if (!paymentStat || paymentStat.length === 0)
        return <p className="no-data">Không có dữ liệu</p>;

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart
                data={paymentStat}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: paymentTypePeriod === "DAY" ? 60 : 20
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    dataKey="period"
                    tickLine={false}
                    angle={paymentTypePeriod === "DAY" ? -45 : 0}
                    textAnchor={paymentTypePeriod === "DAY" ? "end" : "middle"}
                    interval={0}
                />

                <YAxis
                    domain={[0, "dataMax"]}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />

                <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    labelFormatter={(label, payload) => {
                        if (payload && payload[0]) {
                            const data = payload[0].payload;
                            if (paymentTypePeriod === "DAY") return data.fullDate || label;
                            if (paymentTypePeriod === "WEEK") return data.fullPeriod || label;
                        }
                        return label;
                    }}
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                                <div
                                    style={{
                                        backgroundColor: "white",
                                        padding: "10px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "6px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                    }}
                                >
                                    <p
                                        style={{
                                            margin: "0 0 6px 0",
                                            fontWeight: 600,
                                            fontSize: "0.875rem"
                                        }}
                                    >
                                        {paymentTypePeriod === "DAY"
                                            ? data.fullDate
                                            : paymentTypePeriod === "WEEK"
                                            ? data.fullPeriod
                                            : payload[0].name}
                                    </p>

                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#10b981",
                                            fontWeight: 600
                                        }}
                                    >
                                        {formatCurrency(data.amount)}
                                    </p>

                                    {data.totalPayments !== undefined && (
                                        <p
                                            style={{
                                                margin: "4px 0 0 0",
                                                color: "#6b7280",
                                                fontSize: "0.75rem"
                                            }}
                                        >
                                            {data.totalPayments} giao dịch
                                        </p>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    }}
                />

                <Legend />

                <Bar
                    dataKey="amount"
                    fill="#10b981"
                    name="Tổng giá trị"
                    barSize={20}
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default PaymentChart;
