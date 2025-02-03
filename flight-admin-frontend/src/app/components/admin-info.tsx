/* eslint-disable @next/next/no-img-element */
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "./notification"; // Import the Notification component

const AdminInfoPopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState(""); // Default email
  const [adminInfo, setAdminInfo] = useState({
    username: "",
    ID: "",
    password: "",
    email: "",
  });
  const [notification, setNotification] = useState(""); // Added state for notification
  const [error, setError] = useState(""); // Added state for error

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No access token found");
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const adminId = decodedToken.sub;

        const response = await axios.post(
          "http://localhost:3000/flight-admin-login/admin-info",
          { id: adminId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAdminInfo(response.data);
        setEmail(response.data.email);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setNotification("Error fetching admin info.");
        } else {
          setNotification("Error decoding token or fetching admin info.");
        }
      }
    };

    fetchAdminInfo();
  }, []);

  const handleEmailUpdate = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No access token found");
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const adminId = decodedToken.sub;

      const response = await axios.patch(
        "http://localhost:3000/flight-admin-login/update-email",
        { id: adminId, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Update Response:", response.data); // Debugging

      setNotification(`Email updated to: ${email}`);
    } catch (error) {
      let errorMessage = "Error updating email. Please try again.";
      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = error.response.data.message || errorMessage;
        }
      } else {
        // Non-Axios error
        console.error("Error:", error);
      }

      setNotification(errorMessage);
    }
  };

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value); // Update email state
  };

  const handleCloseModal = () => {
    setNotification(""); // Clear notification
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="relative">
      {/* User Icon */}
      <div className="flex items-center">
        <img
          src="/images/user-icon.png"
          alt="User"
          className="h-20 w-20 rounded-full m-2 cursor-pointer hover:opacity-80"
          onClick={() => setIsModalOpen(true)} // Open modal on click
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg w-1/2 md:w-1/3 max-h-[80vh] overflow-y-auto shadow-lg transform scale-105">
            {/* Notification */}
            {notification && (
              <Notification
                message={notification}
                onClose={() => setNotification("")}
              />
            )}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-600">
                Admin Information
              </h2>
              <button
                onClick={handleCloseModal} // Call the modal close handler
                className="text-red-600 font-bold text-2xl cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <img
                src="/images/user-icon.png"
                alt="User"
                className="h-20 w-20 rounded-full m-2"
              />
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-2">
                <div>
                  <hr className="my-2" />
                  <p className="font-semibold text-gray-700">Username</p>
                  <hr className="my-2" />
                </div>
                <div>
                  <hr className="my-2" />
                  <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                    {adminInfo.username}
                  </p>
                  <hr className="my-2" />
                </div>
                <div>
                  <hr className="my-2" />
                  <p className="font-semibold text-gray-700">ID</p>
                  <hr className="my-2" />
                </div>
                <div>
                  <hr className="my-2" />
                  <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                    {adminInfo.ID}
                  </p>
                  <hr className="my-2" />
                </div>
                <div>
                  <hr className="my-2" />
                  <p className="font-semibold text-gray-700">Password</p>
                  <hr className="my-2" />
                </div>
                <div>
                  <hr className="my-2" />
                  <p className="font-semibold bg-blue-200 text-center rounded-lg text-gray-700">
                    {adminInfo.password}
                  </p>
                  <hr className="my-2" />
                </div>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={handleEmailUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
              >
                Update Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInfoPopup;
