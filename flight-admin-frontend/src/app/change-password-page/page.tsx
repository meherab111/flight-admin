/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Notification from "../components/notification"; 

export default function ChangePasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && token) {
      localStorage.setItem("resetToken", token);
    }
  }, [token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    try {
      const storedToken = localStorage.getItem("resetToken");
      const response = await axios.post(
        "http://localhost:3000/flight-admin-login/validate-reset-token",
        {
          token: storedToken,
        }
      );

      if (response.data.isValid) {
        await axios.post(
          "http://localhost:3000/flight-admin-login/reset-password",
          {
            token: storedToken,
            newPassword,
          }
        );
        setNotification("Password reset successful!");
        localStorage.removeItem("resetToken");
        router.push("/login-landing-page");
      } else {
        setMessage("Invalid or expired reset token.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage("Error resetting password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side part */}
      <div className="w-1/2 h-full">
        <img
          src="/images/plane_image_login_page.jpg"
          alt="Plane"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side part */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white opacity-95">
        <div className="text-5xl absolute top-4 right-8 flex gap-4 p-4">
          <img
            src="/images/flying-airplane.png"
            alt="Building"
            className="h-20"
          />
        </div>

        <div className="w-3/4 max-w-md bg-blue-50 p-8 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate__animated animate__fadeInUp">
          <h1 className="text-3xl font-semibold text-center text-blue-500 mb-2">
            Reset Password
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Enter your new password below.
          </p>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input input-bordered w-full transition-all duration-300 ease-in-out transform hover:scale-105"
            />
            {message && <p className="text-red-500 text-center">{message}</p>}
            <button
              className="btn btn-primary w-full hover:bg-blue-700 animate__animated animate__zoomIn"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>

        <div className="text-5xl absolute bottom-4 right-8 flex gap-4 p-4">
          <img src="/images/paper-plane.png" alt="Building" className="h-20" />
        </div>
      </div>

      {/* Notification added */}
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification("")}
        />
      )}
    </div>
  );
}
