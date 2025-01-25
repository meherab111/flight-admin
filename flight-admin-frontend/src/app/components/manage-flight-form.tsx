import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faChevronRight, faTimes, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"; // Added faTrash icon
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  departureCity: string;
  arrivalCity: string;
  depDate: string;
  arrDate: string;
  price: string;
  availability: string;
}

const ManageFlightsModal: React.FC<{
  flights: Flight[];
  onClose: () => void;
  onUpdate: (updatedFlight: Flight) => void;
  onDelete: (flightId: number) => void; // Added onDelete prop
}> = ({ flights, onClose, onUpdate, onDelete }) => {
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!editingFlight) return;
    const { name, value } = e.target;
    setEditingFlight({ ...editingFlight, [name]: value });
  };

  const saveChanges = () => {
    if (editingFlight) {
      onUpdate(editingFlight);
      setEditingFlight(null);
      toast.success("Flight Details Updated Successfully!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-600">Manage Flight Details</h2>
          <button onClick={onClose} className="text-red-600 font-bold text-2xl cursor-pointer">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <table className="table-auto w-full border-collapse border border-gray-600">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-600 text-gray-700 px-4 py-2">Flight Number</th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">Airline</th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">Departure City</th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">Arrival City</th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">Dep Date</th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">Arr Date</th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">Price</th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">Availability</th>
              <th className="border border-gray-600 text-gray-700 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id} className="hover:bg-gray-100">
                <td className="border border-gray-600 text-gray-700 px-4 py-2">{flight.flightNumber}</td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2">{flight.airline}</td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2">{flight.departureCity}</td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2">{flight.arrivalCity}</td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2">{flight.depDate}</td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2">{flight.arrDate}</td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2">${flight.price}</td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2">{flight.availability}</td>
                <td className="border border-gray-600 text-gray-700 px-4 py-2 space-x-2">
                  <button
                    onClick={() => setEditingFlight(flight)}
                    className="btn btn-sm btn-primary bg-green-500 border-0 hover:bg-green-700"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => onDelete(flight.id)} // Added onDelete click handler
                    className="btn btn-sm btn-primary bg-red-500 border-0 hover:bg-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingFlight && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Edit Flight</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Flight Number", name: "flightNumber" },
                { label: "Airline", name: "airline" },
                { label: "Departure City", name: "departureCity" },
                { label: "Arrival City", name: "arrivalCity" },
                { label: "Departure Date", name: "depDate", type: "date" },
                { label: "Arrival Date", name: "arrDate", type: "date" },
                { label: "Price", name: "price", type: "number" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name}>
                  <label className="block font-semibold mb-2">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={editingFlight[name as keyof Flight]}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
              ))}
              <div>
                <label className="block font-semibold mb-2">Availability</label>
                <select
                  name="availability"
                  value={editingFlight.availability}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={() => setEditingFlight(null)} className="btn btn-secondary bg-red-500 hover:bg-red-700">
                Cancel
              </button>
              <button onClick={saveChanges} className="btn btn-primary bg-green-500 border-0 hover:bg-green-700">
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ManageFlights: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: 1,
      flightNumber: "AA123",
      airline: "American Airlines",
      departureCity: "New York",
      arrivalCity: "Los Angeles",
      depDate: "2025-01-30",
      arrDate: "2025-01-30",
      price: "300",
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
      price: "200",
      availability: "Unavailable",
    },
  ]);

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
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
          onDelete={handleDelete} // Added onDelete prop
        />
      )}

      <ToastContainer />
    </>
  );
};

export default ManageFlights;
