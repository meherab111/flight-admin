"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components for Pie chart
ChartJS.register(ArcElement, Tooltip, Legend); // Removed unnecessary components (CategoryScale, LinearScale)

export default function PieChart() {
  // Hardcoded data for total and available flights
  const totalFlights = 500;
  const availableFlights = 400;

  const data = {
    labels: ["Total Flights", "Available Flights"],
    datasets: [
      {
        data: [totalFlights, availableFlights],
        backgroundColor: ["#4BC0C0", "#FF9F40"], // Aqua and Orange colors
        borderWidth: 1,
      },
    ],
  };

  return (
<div className="bg-violet-100 text-center p-8 rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold text-gray-600 mb-4">Flights Statistics</h2>
  <div className="flex justify-center items-center h-[400px] w-[400px] mx-auto">
    <Pie data={data} />
  </div>
</div>

  );
}
