/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faFilter,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  const formattedDate = date.toISOString().slice(0, 10);
  const formattedTime = date.toTimeString().slice(0, 8);
  return `${formattedDate} ${formattedTime}`;
};

const FilterFlight = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [flights, setFlights] = useState<any[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

 
  useEffect(() => {
    const fetchFlights = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view flights.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/flights", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFlights(response.data);
        setFilteredFlights(response.data); 
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 401) {
            toast.error("Unauthorized access. Please log in again.");
          } else {
            toast.error("Error fetching flights. Please try again.");
          }
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);


  const filterFlights = () => {
    if (minPrice !== "" && maxPrice !== "" && minPrice === maxPrice) {
      setErrorMessage("Min and Max prices cannot be the same.");
      setFilteredFlights([]);
      return;
    } else {
      setErrorMessage("");
    }

    const filtered = flights.filter((flight) => {
      const price = flight.ticketPrice;
      return (
        (minPrice === "" || price >= minPrice) &&
        (maxPrice === "" || price <= maxPrice)
      );
    });

    setFilteredFlights(filtered);
  };

  useEffect(() => {
    filterFlights();
  }, [minPrice, maxPrice]);

  return (
    <div>
     
      <button
        className="btn btn-primary w-full mb-4 flex justify-between items-center hover:bg-blue-700"
        onClick={() => setShowFilter(true)}
      >
        <FontAwesomeIcon icon={faFilter} className="h-5 w-5 mr-2" />
        Filter Flights
        <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5 ml-2" />
      </button>

      
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[30%] max-w-2xl h-[70vh] overflow-auto transform scale-105 xl:w-[50%] xl:max-h-[90vh] xl:transform scale-100 xl:p-8">
           
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-600">
                Filter Flights By Price
              </h2>
              <button
                onClick={() => {
                  setShowFilter(false);
                  setMinPrice("");
                  setMaxPrice("");
                  setFilteredFlights(flights); 
                  setErrorMessage("");
                }}
                className="text-red-600 font-bold text-2xl cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

           
            <div className="flex gap-4 mb-4">
              <input
                type="number"
                step="0.01"
                value={minPrice}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || parseFloat(value) <= 100000) {
                    setMinPrice(
                      value === "" ? "" : Math.max(0, parseFloat(value))
                    );
                  }
                }}
                placeholder="Min Price"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                step="0.01"
                value={maxPrice}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || parseFloat(value) <= 100000) {
                    setMaxPrice(
                      value === "" ? "" : Math.max(0, parseFloat(value))
                    );
                  }
                }}
                placeholder="Max Price"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {errorMessage && (
              <p className="text-red-600 text-center mb-4">{errorMessage}</p>
            )}

            
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
                          {formatDateTime(flight.departureDate)}
                        </p>
                        <hr className="my-2" />
                        <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                          {formatDateTime(flight.arrivalDate)}
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

      <ToastContainer />
    </div>
  );
};

export default FilterFlight;
