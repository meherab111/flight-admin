import React, { useState } from "react";
import {
  faChevronRight,
  faPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";
import Notification from "./notification"; 

const AddFlightForm: React.FC = () => {
  const [flightData, setFlightData] = useState({
    flightNumber: "",
    airline: "",
    departureCity: "",
    arrivalCity: "",
    departureDate: "",
    arrivalDate: "",
    ticketPrice: "",
    availability: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(""); 
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFlightData({ ...flightData, [name]: value });
  };

  const validateFields = () => {
    const {
      flightNumber,
      airline,
      departureCity,
      arrivalCity,
      departureDate,
      arrivalDate,
      ticketPrice,
      availability,
    } = flightData;

    if (!flightNumber.trim()) {
      setNotification("Flight Number is required.");
      return false;
    }
    if (!airline.trim()) {
      setNotification("Airline is required.");
      return false;
    }
    if (!departureCity.trim()) {
      setNotification("Departure City is required.");
      return false;
    }
    if (!arrivalCity.trim()) {
      setNotification("Arrival City is required.");
      return false;
    }
    if (
      !departureDate.trim() ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(departureDate)
    ) {
      setNotification("Valid Departure Date is required (YYYY-MM-DDTHH:MM).");
      return false;
    }
    if (
      !arrivalDate.trim() ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(arrivalDate)
    ) {
      setNotification("Valid Arrival Date is required (YYYY-MM-DDTHH:MM).");
      return false;
    }
    if (
      !ticketPrice.trim() ||
      isNaN(Number(ticketPrice)) ||
      Number(ticketPrice) <= 0 ||
      Number(ticketPrice) > 1000
    ) {
      setNotification("Valid Ticket Price is required (0 < price <= 1000).");
      return false;
    }
    if (
      !availability.trim() ||
      !["available", "unavailable"].includes(availability)
    ) {
      setNotification(
        "Valid Availability is required (available/unavailable)."
      );
      return false;
    }
    return true;
  };

  const handleAddFlight = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login-landing-page"); // Redirecting to login page
        return;
      }

     
      const flightDataWithNumberPrice = {
        ...flightData,
        ticketPrice: Number(flightData.ticketPrice),
      };

      await axios.post(
        "http://localhost:3000/flights",
        flightDataWithNumberPrice,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      setNotification(`Flight ${flightData.flightNumber} added successfully!`);

     
      setFlightData({
        flightNumber: "",
        airline: "",
        departureCity: "",
        arrivalCity: "",
        departureDate: "",
        arrivalDate: "",
        ticketPrice: "",
        availability: "",
      });

      
      setTimeout(() => {
        setIsModalOpen(false);
        setNotification(""); 
      }, 3000);
    } catch (error) {
      if (error) {
        console.error("Error response data:", error);
      }
      setNotification("Error adding flight. Please try again.");
    }
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
   
    setFlightData({
      flightNumber: "",
      airline: "",
      departureCity: "",
      arrivalCity: "",
      departureDate: "",
      arrivalDate: "",
      ticketPrice: "",
      availability: "",
    });
    setNotification(""); 
    setIsModalOpen(false); 
  };

  return (
    <div>
     
      <button
        onClick={handleModalOpen}
        className="btn btn-primary w-full mb-4 flex justify-between items-center hover:bg-blue-700"
      >
        <FontAwesomeIcon icon={faPlane} className="h-5 w-5 mr-2" />
        Add New Flight
        <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5 ml-2" />
      </button>

      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/2 xl:w-9/11 relative">
            {/* Notification added */}
            {notification && (
              <Notification
                message={notification}
                onClose={() => setNotification("")}
              />
            )}
           
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

           
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                {
                  label: "Ticket Price (USD)",
                  name: "ticketPrice",
                  type: "number",
                },
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
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
            </div>

           
            <button
              onClick={handleAddFlight}
              className="btn btn-primary mt-6 w-full bg-green-500 py-2 px-4 rounded-lg border-0 hover:bg-green-700"
            >
              Add Flight
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFlightForm;
