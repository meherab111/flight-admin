/* eslint-disable @next/next/no-img-element */
"use client";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminInfoPopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("admin@example.com"); // Default email

  // Dummy admin data
  const adminInfo = {
    username: "admin_user",
    id: "12345",
    password: "admin_password",
    email: email,
  };

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setEmail(e.target.value); // Update email state
  };

  const handleEmailUpdate = () => {
    toast.success(`Email updated to: ${email}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleCloseModal = () => {
    toast.dismiss(); // Dismiss all active toasts
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="relative">
      {/* Toast Container */}
      <ToastContainer />

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-1/2 md:w-1/3 max-h-[80vh] overflow-y-auto shadow-lg">
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
            <div className="flex items-center mb-6">
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
                    {adminInfo.id}
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
