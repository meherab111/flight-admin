"use client";

import React, { useState } from "react";
import axios from "axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

// Define the type for flight data
interface FlightData {
  flightNumber: string;
  airline: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  arrivalDate: string;
  ticketPrice: string;
  availability: string;
}

export default function SearchBar() {
  const router = useRouter();
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // State for flight details in the modal
  const [modalData, setModalData] = useState<FlightData[]>([]);

  // Handle search functionality
  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login-landing-page"); // Redirect to login page
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/flights/search",
        {
          flightNumber: searchTerm.toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const flights = response.data;

      if (flights.length > 0) {
        setModalData(flights); // Set flight details in the modal
        setShowModal(true); // Show the modal
        setSearchTerm("");
      } else {
        alert("Flight Details Not Found!");
        setSearchTerm("");
      }
    } catch {
      setSearchTerm("");
      alert("Wrong Input ! Can't find Data.");
    }
  };

  // Handle key press in the input field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      handleSearch(); // Trigger search on Enter
    }
  };

  return (
    <div className="flex items-center flex-col">
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.6 0 7.5 7.5 0 0010.6 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search (Flight No.)..."
          className="input input-bordered rounded-lg border-blue-400 pl-10 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          onKeyDown={handleKeyDown} // Handle Enter key
        />
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg w-1/2 md:w-1/3 max-h-[80vh] overflow-y-auto shadow-lg transform scale-105">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-600">
                Searched Flight Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-red-600 font-bold text-2xl cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            {modalData.map((flight, index) => (
              <div key={index} className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <hr className="my-2" />
                    <p className="font-semibold text-gray-700">Flight Number</p>
                    <hr className="my-2" />
                    <p className="font-semibold text-gray-700">Airline</p>
                    <hr className="my-2" />
                    <p className="font-semibold text-gray-700">
                      Departure City
                    </p>
                    <hr className="my-2" />
                    <p className="font-semibold text-gray-700">Arrival City</p>
                    <hr className="my-2" />
                    <p className="font-semibold text-gray-700">Dep Date</p>
                    <hr className="my-2" />
                    <p className="font-semibold text-gray-700">Arrive Date</p>
                    <hr className="my-2" />
                    <p className="font-semibold text-gray-700">Price (USD)</p>
                    <hr className="my-2" />
                    <p className="font-semibold text-gray-700">Availability</p>
                    <hr className="my-2" />
                  </div>
                  <div>
                    <hr className="my-2" />
                    <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                      {flight.flightNumber}
                    </p>
                    <hr className="my-2" />
                    <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                      {flight.airline}
                    </p>
                    <hr className="my-2" />
                    <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                      {flight.departureCity}
                    </p>
                    <hr className="my-2" />
                    <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                      {flight.arrivalCity}
                    </p>
                    <hr className="my-2" />
                    <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                      {new Date(flight.departureDate).toLocaleDateString()}
                    </p>
                    <hr className="my-2" />
                    <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                      {new Date(flight.arrivalDate).toLocaleDateString()}
                    </p>
                    <hr className="my-2" />
                    <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                      ${flight.ticketPrice}
                    </p>
                    <hr className="my-2" />
                    <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                      {flight.availability}
                    </p>
                    <hr className="my-2" />
                  </div>
                </div>
                {index < modalData.length - 1 && (
                  <hr className="border-2 border-blue-700 my-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
