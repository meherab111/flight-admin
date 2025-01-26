"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components for the Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

export default function FlightStatistics() {
  const totalFlights = 120;
  const availableFlights = 30;

  // Data for the Doughnut chart
  const chartData = {
    labels: ["Available Flights", "Total Flights"],
    datasets: [
      {
        data: [availableFlights, totalFlights - availableFlights],
        backgroundColor: ["#34D399", "#A5B4FC"], // Green for available, blue for others
        borderWidth: 1,
        hoverOffset: 10, // Adds some animation effect on hover
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col gap-4">
        <div className="bg-blue-100 text-center p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Flights</h2>
          <p className="text-5xl font-bold text-blue-600 mt-2">
            {totalFlights}
          </p>
        </div>
        <div className="bg-blue-100 text-center p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Available Flights
          </h2>
          <p className="text-5xl font-bold text-blue-600 mt-2">
            {availableFlights}
          </p>
        </div>
      </div>

      <div className="bg-indigo-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-12 text-center">
          Flight Statistics
        </h2>
        <div className="relative w-[300px] h-[300px] mx-auto">
          {/* Doughnut chart */}
          <Doughnut data={chartData} />
          {/* Center content inside the doughnut */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-gray-700">
            <p className="text-2xl font-bold">{availableFlights}</p>
            <p className="text-sm font-medium">Available Flights</p>
          </div>
        </div>
      </div>
    </div>
  );
}
