/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import WeatherCard from "../components/weather-card";
import SearchBar from "../components/search-bar";
import ToggleAvailability from "../components/toggle-availability";
import AddFlightForm from "../components/add-flight-form";
import FilterFlight from "../components/filter-flight";
import PriceBarChart from "../components/ticket-price-range";
import FlightStatistics from "../components/pie-chart-data";
import ManageFlights from "../components/manage-flight-form";
import AdminInfoPopup from "../components/admin-info";
import addAuth from "../components/add-auth";

function DashboardPage() {
  const [flightData, setFlightData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch initial data when the component mounts
    const fetchFlightData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push('/login-landing-page'); // Redirect to login page if no token
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/flights", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFlightData(response.data);
      } catch (error) {
        if (error) {
          // Handle unauthorized error
          console.error("Unauthorized access - redirecting to login.");
          router.push('/login-landing-page'); // Redirect to login page
        } else {
          console.error("Error fetching flight data:", error);
        }
      }
    };

    fetchFlightData();

    // Set up polling to fetch updates periodically
    const intervalId = setInterval(fetchFlightData, 5000); // Fetch updates every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login-landing-page');
      }

      await axios.post('http://localhost:3000/flight-admin-login/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('token');
      router.push('/login-landing-page'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-blue-100">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/images/flight-logo.png"
            alt="Logo"
            className="h-16 rounded-full"
          />
          <h1 className="text-xl font-bold text-blue-600">
            Flight Admin Dashboard
          </h1>
        </div>

        {/* Search Bar */}
        <SearchBar />

        <AdminInfoPopup />
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="flex flex-col justify-between bg-blue-100 p-4">
          <div>
            {/* Sidebar Buttons */}
            <AddFlightForm />
            <ManageFlights />
            <ToggleAvailability />
            <FilterFlight />
          </div>

          {/* Logout Button */}
          <button
            className="btn btn-error w-full mb-4 flex justify-between items-center hover:bg-red-700"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 mr-2" />{" "}
            Logout
            <FontAwesomeIcon
              icon={faChevronRight}
              className="h-5 w-5 ml-2"
            />{" "}
          </button>
        </div>

        {/* Dashboard Cards */}
        <main className="flex-1 p-4 bg-white">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            Flight Overview
          </h1>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Pie Chart */}
            <FlightStatistics />
            <div className="grid grid-col gap-4">
              {/* Weather Card */}
              <PriceBarChart flightData={flightData} />
              <WeatherCard city="Dhaka" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default addAuth(DashboardPage);