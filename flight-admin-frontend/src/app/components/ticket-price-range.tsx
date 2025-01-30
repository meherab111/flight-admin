/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useRouter } from 'next/navigation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

const PriceBarChart = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFlightData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push('/login-landing-page'); // Redirect to login page
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/flights", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const flights = response.data;

        // Define the type for the price frequency map
        interface PriceFrequency {
          [key: string]: number;
        }

        // Extract prices and create a frequency map
        const priceFrequency: PriceFrequency = flights.reduce((acc: PriceFrequency, flight: { airline: string, ticketPrice: number }) => {
          const key = flight.airline;
          acc[key] = (acc[key] || 0) + Number(flight.ticketPrice); // Ensure ticketPrice is treated as a number
          return acc;
        }, {});

        // Debugging: Log the price frequency map
        console.log("Price Frequency Map:", priceFrequency);

        // Convert the frequency map to arrays for the bar chart
        const labels = Object.keys(priceFrequency);
        const data = Object.values(priceFrequency);

        // Debugging: Log the labels and data
        console.log("Labels:", labels);
        console.log("Data:", data);

        const chartData = {
          labels,
          datasets: [
            {
              label: "Flight Prices",
              data,
              backgroundColor: "rgba(75, 192, 192)",
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    if (typeof window !== 'undefined') {
      fetchFlightData();
    }
  }, [router]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) => {
            return tooltipItems[0].label;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90,
          autoSkip: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-teal-50 pl-16 pt-6 pb-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-10 text-center">
        Price Range Bar
      </h2>
      <div style={{ height: 300, width: "100%" }}>
        {chartData ? <Bar data={chartData} options={options} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default PriceBarChart;