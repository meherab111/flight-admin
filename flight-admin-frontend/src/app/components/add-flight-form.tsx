import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { faChevronRight, faPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";

const AddFlightForm: React.FC = () => {
  const [flightData, setFlightData] = useState({
    flightNumber: "",
    airline: "",
    departureCity: "",
    arrivalCity: "",
    depDate: "",
    arrDate: "",
    price: "",
    availability: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFlightData({ ...flightData, [name]: value });
  };

  const handleAddFlight = () => {
    const isEmptyField = Object.values(flightData).some(
      (value) => value.trim() === ""
    );
    if (isEmptyField) {
      toast.error("Please fill in all fields before adding the flight.", {
        autoClose: 3000,
      });
      return;
    }

    // Display toast notification
    toast.success(`Flight ${flightData.flightNumber} added successfully!`, {
      autoClose: 3000,
    });

    // Reset input fields
    setFlightData({
      flightNumber: "",
      airline: "",
      departureCity: "",
      arrivalCity: "",
      depDate: "",
      arrDate: "",
      price: "",
      availability: "",
    });

    // Close modal
    setIsModalOpen(false);
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    toast.dismiss(); // Dismiss all active toast notifications
    setIsModalOpen(false); // Close the modal
  };
  

  return (
    <div>
      {/* Button to Open Modal */}
      <button
        onClick={handleModalOpen}
        className="btn btn-primary w-full mb-4 flex justify-between items-center hover:bg-blue-700"
      >
        <FontAwesomeIcon icon={faPlane} className="h-5 w-5 mr-2" />
        Add New Flight
        <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5 ml-2" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/2 relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-600">
                Add New Flight Details
              </h2>
              <button
                onClick={handleModalClose}
                className="text-red-600 font-bold text-2xl cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Flight Number", name: "flightNumber" },
                { label: "Airline", name: "airline" },
                { label: "Departure City", name: "departureCity" },
                { label: "Arrival City", name: "arrivalCity" },
                { label: "Departure Date", name: "depDate", type: "date" },
                { label: "Arrival Date", name: "arrDate", type: "date" },
                { label: "Price (USD)", name: "price", type: "number" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name}>
                  <label className="block font-semibold text-gray-700 mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={flightData[name as keyof typeof flightData]}
                    onChange={handleInputChange}
                    className="input input-bordered w-full rounded-lg border-blue-400"
                  />
                </div>
              ))}

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  name="availability"
                  value={flightData.availability}
                  onChange={handleInputChange}
                  className="select select-bordered w-full rounded-lg border-blue-400"
                >
                  <option value="">Select Availability</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleAddFlight}
              className="btn btn-primary mt-6 w-full bg-green-500 py-2 px-4 rounded-lg border-0 hover:bg-green-700"
            >
              Add Flight
            </button>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddFlightForm;
