"use client";

import React from "react";
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

const dummyFlights = [
  {
    flightNumber: "FLY123",
    airline: "Delta Airlines",
    departureCity: "New York",
    arrivalCity: "London",
    depDate: "2024-12-20",
    arrDate: "2024-12-25",
    price: 130,
    availability: "Available",
  },
  {
    flightNumber: "FLY456",
    airline: "American Airlines",
    departureCity: "Chicago",
    arrivalCity: "Paris",
    depDate: "2024-12-22",
    arrDate: "2024-12-28",
    price: 130,
    availability: "Available",
  },
  {
    flightNumber: "FLY456",
    airline: "American Airlines 2.0",
    departureCity: "Chicago 2.0",
    arrivalCity: "Paris 2.0",
    depDate: "2024-12-22",
    arrDate: "2024-12-28",
    price: 130,
    availability: "Available",
  },
  {
    flightNumber: "FLY456",
    airline: "American Airlines 3.0",
    departureCity: "Chicago 3.0",
    arrivalCity: "Paris 3.0",
    depDate: "2024-12-22",
    arrDate: "2024-12-28",
    price: 130,
    availability: "Available",
  },
  {
    flightNumber: "FLY456",
    airline: "American Airlines 3.0",
    departureCity: "Chicago 3.0",
    arrivalCity: "Paris 3.0",
    depDate: "2024-12-22",
    arrDate: "2024-12-28",
    price: 150,
    availability: "Available",
  },
  {
    flightNumber: "FLY456",
    airline: "American Airlines 3.0",
    departureCity: "Chicago 3.0",
    arrivalCity: "Paris 3.0",
    depDate: "2024-12-22",
    arrDate: "2024-12-28",
    price: 160,
    availability: "Available",
  },
  {
    flightNumber: "FLY456",
    airline: "American Airlines 3.0",
    departureCity: "Chicago 3.0",
    arrivalCity: "Paris 3.0",
    depDate: "2024-12-22",
    arrDate: "2024-12-28",
    price: 170,
    availability: "Available",
  },
  {
    flightNumber: "FLY456",
    airline: "American Airlines 3.0",
    departureCity: "Chicago 3.0",
    arrivalCity: "Paris 3.0",
    depDate: "2024-12-22",
    arrDate: "2024-12-28",
    price: 180,
    availability: "Available",
  },
  {
    flightNumber: "FLY456",
    airline: "American Airlines 3.0",
    departureCity: "Chicago 3.0",
    arrivalCity: "Paris 3.0",
    depDate: "2024-12-22",
    arrDate: "2024-12-28",
    price: 190,
    availability: "Available",
  },
  {
    flightNumber: "FLY456",
    airline: "American Airlines 3.0",
    departureCity: "Chicago 3.0",
    arrivalCity: "Paris 3.0",
    depDate: "2024-12-22",
    arrDate: "2024-12-28",
    price: 200,
    availability: "Available",
  },
  {
    flightNumber: "FLY456",
    airline: "American Airlines 3.0",
    departureCity: "Chicago 3.0",
    arrivalCity: "Paris 3.0",
    depDate: "2024-12-22",
    arrDate: "2024-12-28",
    price: 210,
    availability: "Available",
  },
  {
    flightNumber: "FLY456",
    airline: "American Airlines 3.0",
    departureCity: "Chicago 3.0",
    arrivalCity: "Paris 3.0",
    depDate: "2024-12-22",
    arrDate: "2024-12-28",
    price: 220,
    availability: "Available",
  },
  {
    flightNumber: "FLY456",
    airline: "American Airlines 3.0",
    departureCity: "Chicago 3.0",
    arrivalCity: "Paris 3.0",
    depDate: "2024-12-22",
    arrDate: "2024-12-28",
    price: 230,
    availability: "Available",
  },
  {
    flightNumber: "FLY456",
    airline: "American Airlines 3.0",
    departureCity: "Chicago 3.0",
    arrivalCity: "Paris 3.0",
    depDate: "2024-12-22",
    arrDate: "2024-12-28",
    price: 240,
    availability: "Available",
  },
];

// Define the type for the price frequency map
interface PriceFrequency {
  [key: number]: number;
}

// Extract prices and create a frequency map
const priceFrequency: PriceFrequency = dummyFlights.reduce(
  (acc: PriceFrequency, flight) => {
    acc[flight.price] = (acc[flight.price] || 0) + 1;
    return acc;
  },
  {}
);

// Convert the frequency map to arrays for the bar chart
const labels = Object.keys(priceFrequency).map((price) => `$${price}`);
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

const PriceBarChart = () => {
  return (
    <div className="bg-teal-50 pl-16 pt-6 pb-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-10 text-center">
        Price Range Bar
      </h2>
      <div style={{ height: 300, width: "100%" }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default PriceBarChart;
