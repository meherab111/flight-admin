/* eslint-disable @next/next/no-img-element */
// pages/forgot-password.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Notification from "../components/notification"; 

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(""); 
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setMessage("");
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/flight-admin-login/forgot-password",
        { email }
      );
      setNotification("Password reset email sent. Please check your inbox.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage("Error sending password reset email. Please try again.");
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
            Forgot Password?
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleForgotPassword} className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full transition-all duration-300 ease-in-out transform hover:scale-105"
            />
            {message && <p className="text-red-500 text-center">{message}</p>}
            <button
              className="btn btn-primary w-full hover:bg-blue-700 animate__animated animate__zoomIn"
              disabled={loading}
            >
              {loading ? "Sending..." : "SUBMIT"}
            </button>
          </form>

          
          <div className="mt-4 flex justify-center">
            <button
              className="btn border-0 text-gray-600 bg-red-500 hover:bg-red-700"
              onClick={() => router.push("/login-landing-page")} // Redirecting to Login Page
            >
              Back
            </button>
          </div>
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
