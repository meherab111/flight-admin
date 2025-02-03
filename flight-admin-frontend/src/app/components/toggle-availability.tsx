/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  faChevronRight,
  faCogs,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface Flight {
  id: number;
  flightNumber: string;
  availability: string;
  departureDate: string;
  arrivalDate: string;
}

const ToggleAvailability: React.FC = () => {
  const router = useRouter();
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Added state for search term
  const [searchResults, setSearchResults] = useState<Flight[]>([]); // Added state for search results

  const fetchFlights = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login-landing-page"); // Redirect to login page if no token
        return;
      }

      const response = await axios.get("http://localhost:3000/flights", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFlights(response.data);
      setSearchResults(response.data); // Update search results with fetched flights
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

  useEffect(() => {
    fetchFlights();
  }, []);

  const toggleAvailability = async (flightId: number) => {
    const flight = flights.find((flight) => flight.id === flightId);
    if (!flight) return;

    const newAvailability =
      flight.availability === "available" ? "unavailable" : "available";

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login-landing-page"); // Redirect to login page if no token
        return;
      }

      await axios.patch(
        `http://localhost:3000/flights/${flightId}/toggle-availability`,
        { availability: newAvailability },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFlights(
        flights.map((flight) =>
          flight.id === flightId
            ? { ...flight, availability: newAvailability }
            : flight
        )
      );
      setSearchResults(
        searchResults.map((flight) =>
          flight.id === flightId
            ? { ...flight, availability: newAvailability }
            : flight
        )
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          toast.error("Endpoint not found. Please check the URL.");
        } else {
          toast.error("Error toggling flight availability. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Error toggling flight availability:", error);
    }
  };

  const handleCloseModal = () => {
    setSearchResults(flights); // Reset search results to all flights
    setSearchTerm(""); // Clear the search term
    setIsToggleModalOpen(false); // Close the modal
  };
  // Function to handle search
  const searchBarRef = useRef<HTMLInputElement>(null);
  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login-landing-page");
        return;
      }

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
        setSearchResults(flights); // Set search results in the state
        setSearchTerm(""); // Clear the search term
      } else {
        toast.error("Flight Details Not Found!");
        setSearchTerm("");
      }
    } catch {
      alert("An error occurred while fetching flight data.");
      setSearchTerm("");
    }
  };
  // Function to reset search and fetch all flights
  const resetSearch = () => {
    setSearchResults(flights); // Reset search results to all flights
    setSearchTerm(""); // Clear the search term
  };

  return (
    <div>
      <button
        className="btn btn-primary w-full mb-4 flex justify-between items-center hover:bg-blue-700"
        onClick={() => setIsToggleModalOpen(true)}
      >
        <FontAwesomeIcon icon={faCogs} className="h-5 w-5 mr-2" />
        Toggle Availability
        <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5 ml-2" />
      </button>

      {isToggleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-h-[80vh] overflow-auto transform scale-105">
            <div
              ref={searchBarRef}
              className="flex justify-between items-center mb-4"
            >
              <h2 className="text-2xl font-bold text-blue-600">
                Toggle Flight Availability
              </h2>

              <button
                onClick={handleCloseModal}
                className="text-red-600 font-bold text-2xl cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            {/* search bar */}
            <div className="relative flex mb-4">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Flight Number"
                className="input input-bordered rounded-lg border-blue-400 pl-10 w-full"
              />
              <button
                onClick={handleSearch}
                className="btn btn-primary bg-green-500 border-0 ml-2 hover:bg-green-700"
              >
                Search
              </button>
              <button
                onClick={resetSearch}
                className="btn btn-primary ml-2 hover:bg-blue-700"
              >
                Reset
              </button>
            </div>
            <table className="table-auto w-full border-collapse border border-gray-600">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-600 text-gray-700 px-4 py-2">
                    Flight Number
                  </th>
                  <th className="border border-gray-600 text-gray-700 px-4 py-2">
                    Departure Date
                  </th>
                  <th className="border border-gray-600 text-gray-700 px-4 py-2">
                    Arrival Date
                  </th>
                  <th className="border border-gray-600 text-gray-700 px-4 py-2">
                    Availability
                  </th>
                  <th className="border border-gray-600 text-gray-700 px-4 py-2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((flight) => (
                  <tr key={flight.id} className="hover:bg-gray-100">
                    <td className="border border-gray-600 text-gray-700 px-4 py-2">
                      {flight.flightNumber}
                    </td>
                    <td className="border border-gray-600 text-gray-700 px-4 py-2">
                      {new Date(flight.departureDate).toLocaleString()}
                    </td>
                    <td className="border border-gray-600 text-gray-700 px-4 py-2">
                      {new Date(flight.arrivalDate).toLocaleString()}
                    </td>
                    <td className="border border-gray-600 text-gray-700 px-4 py-2">
                      {flight.availability}
                    </td>
                    <td className="border border-gray-600 text-gray-700 px-4 py-2">
                      <div
                        className={`relative inline-block w-12 h-6 ${
                          flight.availability === "available"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } rounded-full cursor-pointer`}
                        onClick={() => {
                          if (searchBarRef.current) {
                            searchBarRef.current.scrollIntoView({
                              behavior: "smooth",
                            });
                          }
                          toggleAvailability(flight.id);
                        }}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
                            flight.availability === "available"
                              ? "translate-x-6"
                              : "translate-x-0"
                          }`}
                        ></span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ToggleAvailability;
