import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PriorApprovalsChart = () => {
    const layeredData = {
        labels: ["Pending", "Approved", "Rejected"],
        datasets: [
            {
                label: "Approved",
                data: [75, 25],
                backgroundColor: ["#007AFF", "#f3f3f3"],
                radius: "100%",
                borderRadius: 20,
                cutout: "50%",
                circumference: 360,
            },
            {
                label: "Pending",
                data: [55, 45],
                backgroundColor: ["#FFA500", "#f3f3f3"],
                radius: "85%",
                cutout: "45%",
                borderRadius: 20,
            },
            {
                label: "Rejected",
                data: [73, 27],
                backgroundColor: ["#FF3333", "#f3f3f3"],
                radius: "70%",
                cutout: "40%",
                borderRadius: 20,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.parsed}%`,
                },
            },
        },
    };

    const customLegend = layeredData.datasets.map((dataset, index) => {
        const label = dataset.label;
        const color = dataset.backgroundColor[0];
        const percentage = dataset.data[0];

        return (
            <div
                key={index}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                }}
            >
                <div
                    style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: color,
                        borderRadius: "50%",
                    }}
                ></div>
                <span style={{ color: "#615E83", fontWeight: 600 }}>{label}</span>
                <span style={{ marginLeft: "auto", fontWeight: 600 }}>
                    {percentage}%
                </span>
            </div>
        );
    });

    return (
        <div className="dashboard-prior-doughnut-chart">
            <Doughnut data={layeredData} options={options} />
            <div>{customLegend}</div>
        </div>
    );
};

export default PriorApprovalsChart;