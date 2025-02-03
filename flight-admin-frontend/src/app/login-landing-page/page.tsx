/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/flight-admin-login/login",
        {
          username,
          password,
        }
      );
      const token = response.data.access_token; // Adjust based on your backend response structure
      localStorage.setItem("token", token);
      router.push("./admin-dashboard-page"); // Redirect to dashboard after login
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError("Invalid username or password. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side: Plane Image */}
      <div className="w-1/2 h-full">
        <img
          src="/images/plane_image_login_page.jpg"
          alt="Plane"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side: Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white opacity-95">
        <div className="text-5xl absolute top-4 right-8 flex gap-4 p-4">
          <img
            src="/images/flying-airplane.png"
            alt="Building"
            className="h-20"
          />
        </div>
        {/* Animated Login Form */}
        <div className="w-3/4 max-w-md bg-blue-50 p-8 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate__animated animate__fadeInUp">
          {/* Airplane Icon */}

          {/* Welcome Text */}
          <h1 className="text-5xl font text-center text-blue-500 mb-2 animate__animated animate__fadeIn">
            Welcome
          </h1>
          <p className="text-center text-gray-600 mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Login with Your Account
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full transition-all duration-300 ease-in-out transform hover:scale-105"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full transition-all duration-300 ease-in-out transform hover:scale-105"
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex justify-center">
              <span
                className="text-sm text-blue-500 cursor-pointer hover:underline"
                onClick={() => router.push("/forgot-password-page")} // Redirect to Forgot Password Page
              >
                Forgot Password?
              </span>
            </div>
            <button className="btn btn-primary w-full transition-all duration-300 ease-in-out hover:bg-blue-700 animate__animated animate__zoomIn">
              LOGIN
            </button>
          </form>
        </div>
        <div className="text-5xl absolute bottom-4 right-8 flex gap-4 p-4">
          <img src="/images/paper-plane.png" alt="Building" className="h-20" />
        </div>

        {/* Footer Icons (Add social media or other icons here) */}
      </div>
    </div>
  );
}
