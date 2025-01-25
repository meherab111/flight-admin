import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          placeholder="Search..."
          className="input input-bordered rounded-lg border-blue-400 pl-10 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          onKeyDown={handleKeyDown} // Handle Enter key
        />
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-1/2 md:w-1/3 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-600">Searched Flight Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-red-600 font-bold text-2xl cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <hr className="my-2" />
                <p className="font-semibold text-gray-700">Flight Number</p>
                <hr className="my-2" />
                <p className="font-semibold text-gray-700">Airline</p>
                <hr className="my-2" />
                <p className="font-semibold text-gray-700">Departure City</p>
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
                  {modalData.flightNumber}
                </p>
                <hr className="my-2" />
                <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                  {modalData.airline}
                </p>
                <hr className="my-2" />
                <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                  {modalData.departureCity}
                </p>
                <hr className="my-2" />
                <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                  {modalData.arrivalCity}
                </p>
                <hr className="my-2" />
                <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                  {modalData.depDate}
                </p>
                <hr className="my-2" />
                <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                  {modalData.arrDate}
                </p>
                <hr className="my-2" />
                <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                  ${modalData.price}
                </p>
                <hr className="my-2" />
                <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                  {modalData.availability}
                </p>
                <hr className="my-2" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}