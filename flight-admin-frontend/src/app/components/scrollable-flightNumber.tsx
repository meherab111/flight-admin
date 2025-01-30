"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface FlightData {
  flightNumber: string;
}

export default function FlightNumberBox() {
  const [flightNumbers, setFlightNumbers] = useState<FlightData[]>([]);

  useEffect(() => {
    const fetchFlightNumbers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to view flight numbers.");
        return;
      }

      try {
        const response = await axios.get<FlightData[]>("http://localhost:3000/flights", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Use a Set to filter out duplicate flight numbers
        const uniqueFlightNumbers = Array.from(new Set(response.data.map((flight) => flight.flightNumber)))
          .map(flightNumber => ({ flightNumber }));

        setFlightNumbers(uniqueFlightNumbers);
      } catch (error) {
        console.error("Error fetching flight numbers:", error);
        alert("An error occurred while fetching flight numbers.");
      }
    };

    fetchFlightNumbers();
  }, []);

  return (
    <div className="flex items-center flex-col bg-blue-100 text-center p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        Flight Numbers
      </h2>
      <div className="relative w-48 h-48 overflow-y-auto pt-2 text-1xl font-semibold text-blue-700">
        {flightNumbers.length > 0 ? (
          <ul>
            {flightNumbers.map((flight, index) => (
              <li key={index} className="mb-2">
                {flight.flightNumber}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}