import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid
} from "recharts";

const OrderChart = ({ orderStat, typePeriod }) => {
    if (!orderStat || orderStat.length === 0)
        return <p className="no-data">Không có dữ liệu</p>;

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={orderStat}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    dataKey="period"
                    tickLine={false}
                    angle={typePeriod === "DAY" ? -45 : 0}
                    textAnchor={typePeriod === "DAY" ? "end" : "middle"}
                    interval={0}
                />

                <YAxis domain={[0, "dataMax + 1"]} />

                <Tooltip
                    formatter={(value, name, props) => [
                        value,
                        typePeriod === "DAY"
                            ? props.payload.fullDate
                            : props.payload.period
                    ]}
                />

                <Legend />

                <Bar
                    dataKey="totalOrders"
                    fill="#6366F1"
                    name="Tổng số đơn hàng"
                    barSize={20}
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default OrderChart;
