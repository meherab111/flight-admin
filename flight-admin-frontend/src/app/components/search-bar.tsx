import React, { useState } from "react";
import FlightDetailsModal from "./flight-details-modal";

export default function SearchBar() {
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // State for flight details in the modal
  const [modalData, setModalData] = useState({
    flightNumber: "",
    airline: "",
    departureCity: "",
    arrivalCity: "",
    depDate: "",
    arrDate: "",
    price: "",
    availability: "",
  });

  // Dummy flight data
  const dummyFlights = [
    {
      flightNumber: "FLY123",
      airline: "Delta Airlines",
      departureCity: "New York",
      arrivalCity: "London",
      depDate: "2024-12-20",
      arrDate: "2024-12-25",
      price: "600",
      availability: "Available",
    },
    {
      flightNumber: "FLY456",
      airline: "American Airlines",
      departureCity: "Chicago",
      arrivalCity: "Paris",
      depDate: "2024-12-22",
      arrDate: "2024-12-28",
      price: "850",
      availability: "Available",
    },
    // Add more dummy flights as needed
  ];

  // Handle search functionality
  const handleSearch = () => {
    const flight = dummyFlights.find(
      (f) => f.flightNumber === searchTerm.toUpperCase()
    );

    if (flight) {
      setModalData(flight); // Set flight details in the modal
      setShowModal(true); // Show the modal
      setSearchTerm(""); 
    } else {
      alert("Flight Details Not Found!");
      setSearchTerm(""); 
    }
  };

  // Handle key press in the input field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      handleSearch(); // Trigger search on Enter
    }
  };

  return (

      <div className="flex items-center">
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
            placeholder="Search..."
            className="input input-bordered rounded-lg border-blue-400 pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            onKeyDown={handleKeyDown} // Handle Enter key
          />
        </div>
        {/* Modal Popup */}
      <FlightDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={modalData}
      />
      </div>

   
  );
}
