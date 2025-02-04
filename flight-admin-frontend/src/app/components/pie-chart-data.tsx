"use client";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useRouter } from "next/navigation";
import FlightNumberBox from "./scrollable-flightNumber";


ChartJS.register(ArcElement, Tooltip, Legend);

const FlightStatistics: React.FC = () => {
  const [totalFlights, setTotalFlights] = useState(0);
  const [availableFlights, setAvailableFlights] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchFlightStatistics = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login-landing-page"); // Redirecting to login page
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/flights/statistics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTotalFlights(response.data.totalFlights);
        setAvailableFlights(response.data.availableFlights);
      } catch (error) {
        console.error("Error fetching flight statistics:", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchFlightStatistics();
    }

    const intervalId = setInterval(fetchFlightStatistics, 2000);


    return () => clearInterval(intervalId);
  }, [router]);

  // Data for the Doughnut chart
  const chartData = {
    labels: ["Total Flights", "Available Flights"],
    datasets: [
      {
        data: [availableFlights, totalFlights - availableFlights],
        backgroundColor: ["#A5B4FC", "#34D399"], 
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="bg-blue-100 text-center p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Flights
            </h2>
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
        <FlightNumberBox />
      </div>

      <div className="bg-indigo-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-12 text-center">
          Flight Statistics
        </h2>
        <div className="relative w-[300px] h-[300px] mx-auto">
          
          <Doughnut data={chartData} />
         
          <div className="absolute inset-0 flex flex-col justify-center items-center text-gray-700">
            <p className="text-2xl font-bold">{availableFlights}</p>
            <p className="text-sm font-medium">Available Flights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightStatistics;
