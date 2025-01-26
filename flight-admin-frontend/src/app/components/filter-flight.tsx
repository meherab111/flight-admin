"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faFilter,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const FilterFlight = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const flights = [
    {
      id: 1,
      flightNumber: "AA123",
      airline: "American Airlines",
      departureCity: "New York",
      arrivalCity: "Los Angeles",
      depDate: "2025-01-30",
      arrDate: "2025-01-30",
      price: 300,
      availability: "Available",
    },
    {
      id: 2,
      flightNumber: "BA456",
      airline: "British Airways",
      departureCity: "London",
      arrivalCity: "Paris",
      depDate: "2025-02-01",
      arrDate: "2025-02-01",
      price: 200,
      availability: "Unavailable",
    },
    {
      id: 3,
      flightNumber: "NA456",
      airline: "Nepal Airways",
      departureCity: "Nepal",
      arrivalCity: "Bangladesh",
      depDate: "2025-03-12",
      arrDate: "2025-03-14",
      price: 180,
      availability: "Available",
    },
    // Add more flights here if needed
  ];

  const filteredFlights = flights.filter((flight) => {
    if (minPrice !== "" && flight.price < minPrice) return false;
    if (maxPrice !== "" && flight.price > maxPrice) return false;
    return true;
  });

  return (
    <div>
      {/* Filter Button */}
      <button
        className="btn btn-primary w-full mb-4 flex justify-between items-center hover:bg-blue-700"
        onClick={() => setShowFilter(true)}
      >
        <FontAwesomeIcon icon={faFilter} className="h-5 w-5 mr-2" />
        Filter Flights
        <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5 ml-2" />
      </button>

      {/* Filter Popup */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[30%] max-w-2xl h-[70vh] overflow-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-600">
                Filter Flights By Price
              </h2>
              <button
                onClick={() => {
                  setShowFilter(false);
                  setMinPrice("");
                  setMaxPrice("");
                }}
                className="text-red-600 font-bold text-2xl cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Price Range Inputs */}
            <div className="flex gap-4 mb-4">
              <input
                type="number"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(
                    e.target.value === ""
                      ? ""
                      : Math.max(0, parseInt(e.target.value))
                  )
                }
                placeholder="Min Price"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value === ""
                      ? ""
                      : Math.max(0, parseInt(e.target.value))
                  )
                }
                placeholder="Max Price"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Scrollable Flight List */}
            <div className="space-y-4">
              {filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className="border border-black rounded-md p-4 shadow-sm"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <hr className="my-2" />
                        <p className="font-semibold text-gray-700">
                          Flight Number
                        </p>
                        <hr className="my-2" />
                        <p className="font-semibold text-gray-700">Airline</p>
                        <hr className="my-2" />
                        <p className="font-semibold text-gray-700">
                          Departure City
                        </p>
                        <hr className="my-2" />
                        <p className="font-semibold text-gray-700">
                          Arrival City
                        </p>
                        <hr className="my-2" />
                        <p className="font-semibold text-gray-700">Dep Date</p>
                        <hr className="my-2" />
                        <p className="font-semibold text-gray-700">
                          Arrive Date
                        </p>
                        <hr className="my-2" />
                        <p className="font-semibold text-gray-700">
                          Price (USD)
                        </p>
                        <hr className="my-2" />
                        <p className="font-semibold text-gray-700">
                          Availability
                        </p>
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
                          {flight.depDate}
                        </p>
                        <hr className="my-2" />
                        <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                          {flight.arrDate}
                        </p>
                        <hr className="my-2" />
                        <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                          ${flight.price}
                        </p>
                        <hr className="my-2" />
                        <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                          {flight.availability}
                        </p>
                        <hr className="my-2" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">
                  No Flights Match The Filter Criteria.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterFlight;
