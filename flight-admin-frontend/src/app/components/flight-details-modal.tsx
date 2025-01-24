import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface FlightDetailsModalProps {
  isOpen: boolean; // Determines whether the modal is visible
  onClose: () => void; // Function to close the modal
  data: {
    flightNumber: string;
    airline: string;
    departureCity: string;
    arrivalCity: string;
    depDate: string;
    arrDate: string;
    price: string;
    availability: string;
  };
}

const FlightDetailsModal: React.FC<FlightDetailsModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg w-1/2 md:w-1/3 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">Searched Flight Details</h2>
        <button onClick={onClose} className="text-red-600 font-bold text-2xl cursor-pointer">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
        <hr className="my-2" />
          <p className="font-semibold text-gray-700">Flight Number</p><hr className="my-2" />
          <p className="font-semibold text-gray-700">Airline</p><hr className="my-2" />
          <p className="font-semibold text-gray-700">Departure City</p><hr className="my-2" />
          <p className="font-semibold text-gray-700">Arrival City</p><hr className="my-2" />
          <p className="font-semibold text-gray-700">Dep Date</p><hr className="my-2" />
          <p className="font-semibold text-gray-700">Arrive Date</p><hr className="my-2" />
          <p className="font-semibold text-gray-700">Price (USD)</p><hr className="my-2" />
          <p className="font-semibold text-gray-700">Availability</p><hr className="my-2" />
        </div>
        <div>
        <hr className="my-2" />
          <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">{data.flightNumber}</p><hr className="my-2" />
          <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">{data.airline}</p><hr className="my-2" />
          <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">{data.departureCity}</p><hr className="my-2" />
          <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">{data.arrivalCity}</p><hr className="my-2" />
          <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">{data.depDate}</p><hr className="my-2" />
          <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">{data.arrDate}</p><hr className="my-2" />
          <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">${data.price}</p><hr className="my-2" />
          <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">{data.availability}</p><hr className="my-2" />
        </div>
      </div>
    </div>
  </div>

  );
};

export default FlightDetailsModal;
