import {
  faChevronRight,
  faCogs,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface Flight {
  id: number;
  flightNumber: string;
  availability: string;
}

const ToggleAvailability: React.FC = () => {
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: 1,
      flightNumber: "AA123",
      availability: "Available",
    },
    {
      id: 2,
      flightNumber: "BA456",
      availability: "Unavailable",
    },
  ]);

  const toggleAvailability = (flightId: number) => {
    setFlights(
      flights.map((flight) =>
        flight.id === flightId
          ? {
              ...flight,
              availability:
                flight.availability === "Available"
                  ? "Unavailable"
                  : "Available",
            }
          : flight
      )
    );
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-600">
                Toggle Flight Availability
              </h2>

              <button
                onClick={() => setIsToggleModalOpen(false)}
                className="text-red-600 font-bold text-2xl cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <table className="table-auto w-full border-collapse border border-gray-600">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-600 text-gray-700 px-4 py-2">
                    Flight Number
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
                {flights.map((flight) => (
                  <tr key={flight.id} className="hover:bg-gray-100">
                    <td className="border border-gray-600 text-gray-700 px-4 py-2">
                      {flight.flightNumber}
                    </td>
                    <td className="border border-gray-600 text-gray-700 px-4 py-2">
                      {flight.availability}
                    </td>
                    <td className="border border-gray-600 text-gray-700 px-4 py-2">
                      <div
                        className={`relative inline-block w-12 h-6 ${
                          flight.availability === "Available"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } rounded-full cursor-pointer`}
                        onClick={() => toggleAvailability(flight.id)}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
                            flight.availability === "Available"
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
    </div>
  );
};

export default ToggleAvailability;
