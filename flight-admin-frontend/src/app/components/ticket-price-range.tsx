"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

// Register necessary components for Bar chart
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

export default function BarChart() {
  const data = {
    labels: ["$100-$200", "$200-$300", "$300-$400", "$400-$500", "$500+"],
    datasets: [
      {
        label: "Number of Tickets",
        data: [10, 20, 15, 25, 30],
        backgroundColor: "#5c5f91", // Single consistent color
        borderRadius: 5, // Rounded bars for a modern look
      },
    ],
  };

  return (
    <div className="bg-green-100 text-center p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">Ticket Price Range</h2>
      <div className="flex justify-center items-center h-48">
        <Bar data={data} />
      </div>
    </div>
  );
}
