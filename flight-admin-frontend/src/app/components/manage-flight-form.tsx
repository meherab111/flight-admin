/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faChevronRight,
  faTimes,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons"; // Added faTrash icon
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  arrivalDate: string;
  ticketPrice: number;
  availability: string;
}

const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  const formattedDate = date.toISOString().slice(0, 10);
  const formattedTime = date.toTimeString().slice(0, 8);
  return `${formattedDate} ${formattedTime}`;
};
// const formatDateTimeLocal = (dateTime: string) => {
//   const date = new Date(dateTime);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   const hours = String(date.getHours()).padStart(2, '0');
//   const minutes = String(date.getMinutes()).padStart(2, '0');
//   return `${year}-${month}-${day}T${hours}:${minutes}`;
// };

const ManageFlightsModal: React.FC<{
  flights: Flight[];
  onClose: () => void;
  onUpdate: (updatedFlight: Flight) => void;
  onDelete: (flightId: number) => void; // Added onDelete prop
}> = ({ flights, onClose, onUpdate, onDelete }) => {
  const router = useRouter();
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Added state for search term
  const [searchResults, setSearchResults] = useState<Flight[]>(flights); // Added state for search results
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditingFlight((prev) => ({ ...prev!, [name]: value })); 
    // Adding "!" ensures prev is not null
  };


  const saveChanges = async () => {
    if (editingFlight) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push('/login-landing-page');
          return;
        }
  
        // Ensure ticketPrice is a number
        const updatedFlight = {
          ...editingFlight,
          ticketPrice: Number(editingFlight.ticketPrice),
        };
  
        console.log("Sending data:", updatedFlight); // Log the data being sent
  
        await axios.put(
          `http://localhost:3000/flights/${updatedFlight.id}`,
          updatedFlight,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        onUpdate(updatedFlight);
        setEditingFlight(null);
        toast.success("Flight Details Updated Successfully!");
      } catch (error) {
        if (error) {
          console.error("Error response data:", error);// Log the error response headers
        } else {
          console.error("Error message:", error); // Log the error message
        }
        toast.error("Error updating flight details. Please try again.");
      }
    }
  };
  // Function to handle search

  const searchBarRef = useRef<HTMLInputElement>(null);
  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push('/login-landing-page');
        return;
      }

      const response = await axios.post("http://localhost:3000/flights/search", {
        flightNumber: searchTerm.toUpperCase()
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const flights = response.data;
      if (flights.length > 0) {
        setEditingFlight(null)
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-h-[80vh] overflow-auto transform scale-105">
        <div ref={searchBarRef} className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-600">
            Manage Flight Details
          </h2>
          <button
            onClick={onClose}
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
        {editingFlight && (
  <div className="mt-6 mb-6">
    <h3 className="text-xl font-semibold text-blue-700 mb-4">Edit Flight</h3>
    <div className="grid grid-cols-2 gap-4">
      {[
        { label: "Flight Number", name: "flightNumber" },
        { label: "Airline", name: "airline" },
        { label: "Departure City", name: "departureCity" },
        { label: "Arrival City", name: "arrivalCity" },
        {
          label: "Departure Date",
          name: "departureDate",
          type: "datetime-local",
        },
        {
          label: "Arrival Date",
          name: "arrivalDate",
          type: "datetime-local",
        },
        { label: "Price", name: "ticketPrice", type: "number" },
        { label: "Availability", name: "availability", type: "enum" },
      ].map(({ label, name, type = "text" }) => (
        <div key={name}>
          <label className="block font-semibold text-gray-700 mb-2">{label}</label>
          {type === "enum" ? (
            // Select input for availability
            <select
              name={name}
              value={editingFlight[name as keyof Flight]} // Ensure fetched data is shown
              onChange={handleInputChange}
              className="select select-bordered w-full"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          ) : (
            // Input for other fields
            <input
              type={type}
              name={name}
              value={
                type === "datetime-local"
                  ? formatDateTime(editingFlight[name as keyof Flight] as string)
                  : editingFlight[name as keyof Flight]
              }
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          )}
        </div>
      ))}
    </div>
    <div className="flex justify-end mt-4 space-x-2">
      <button
        onClick={() => setEditingFlight(null)}
        className="btn btn-secondary bg-red-500 hover:bg-red-700"
      >
        Cancel
      </button>
      <button
        onClick={saveChanges}
        className="btn btn-primary bg-green-500 border-0 hover:bg-green-700"
      >
        Save
      </button>
    </div>
  </div>
)}
        <table className="table-auto w-full border-collapse border border-gray-600">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-600 text-gray-700 px-4 py-2">
                Flight Number
              </th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">
                Airline
              </th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">
                Departure City
              </th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">
                Arrival City
              </th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">
                Departure Date
              </th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">
                Arrival Date
              </th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">
                Price($)
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
                  {flight.airline}
                </td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2">
                  {flight.departureCity}
                </td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2">
                  {flight.arrivalCity}
                </td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2">
                  {formatDateTime(flight.departureDate)}
                </td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2">
                  {formatDateTime(flight.arrivalDate)}
                </td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2">
                  {flight.ticketPrice}
                </td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2">
                  {flight.availability}
                </td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2 space-x-2">
                <button
  onClick={() => {
    if (searchBarRef.current) {
      searchBarRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setEditingFlight(flight);
  }}
  className="btn btn-sm btn-primary bg-green-500 border-0 hover:bg-green-700"
>
  <FontAwesomeIcon icon={faEdit} />
</button>
                  <button
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem("token");
                        if (!token) {
                          router.push('/login-landing-page');
                          return;
                        }

                        await axios.delete(
                          `http://localhost:3000/flights/${flight.id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );

                        onDelete(flight.id);
                      } catch (error) {
                        toast.error(
                          "Error deleting flight details. Please try again."
                        );
                        console.error("Error deleting flight:", error);
                      }
                    }} // Added onDelete click handler
                    className="btn btn-sm btn-primary bg-red-500 border-0 hover:bg-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
      </div>
    </div>
  );
};
const ManageFlights: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);

  const fetchFlights = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push('/login-landing-page');
        return;
      }

      const response = await axios.get("http://localhost:3000/flights", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFlights(response.data);
    } catch (error) {
      toast.error("Error fetching flights. Please try again.");
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleUpdate = (updatedFlight: Flight) => {
    setFlights(
      flights.map((flight) =>
        flight.id === updatedFlight.id ? updatedFlight : flight
      )
    );
  };

  const handleDelete = (flightId: number) => {
    setFlights(flights.filter((flight) => flight.id !== flightId));
    toast.success("Flight Details Deleted Successfully!");
  };

  const handleCloseModal = () => {
    toast.dismiss(); // Dismiss all active toasts
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <button
        className="btn btn-primary w-full mt-4 mb-4 flex justify-between items-center hover:bg-blue-700"
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon icon={faPlane} className="h-5 w-5 mr-2" />
        Manage Flights
        <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5 ml-2" />
      </button>

      {isModalOpen && (
        <ManageFlightsModal
          flights={flights}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
          onDelete={handleDelete} // Added onDelete prop
        />
      )}

      <ToastContainer />
    </>
  );
};

export default ManageFlights;
