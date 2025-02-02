/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PriceBarChartProps {
  flightData: { airline: string; ticketPrice: number }[];
}

const PriceBarChart: React.FC<PriceBarChartProps> = ({ flightData }) => {
  const [chartData, setChartData] = React.useState<any>(null);

  useEffect(() => {
    // Define the type for the price frequency map
    interface PriceFrequency {
      [key: string]: number;
    }

    // Extract prices and create a frequency map
    const priceFrequency: PriceFrequency = flightData.reduce((acc: PriceFrequency, flight) => {
      const key = flight.airline;
      acc[key] = (acc[key] || 0) + Number(flight.ticketPrice); // Ensure ticketPrice is treated as a number
      return acc;
    }, {});

    // Convert the frequency map to arrays for the bar chart
    const labels = Object.keys(priceFrequency);
    const data = Object.values(priceFrequency);

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
  }, [flightData]);

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