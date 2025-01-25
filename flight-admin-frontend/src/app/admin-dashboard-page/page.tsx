/* eslint-disable @next/next/no-img-element */
"use client";

import WeatherCard from "../components/weather-card";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PieChart from "../components/piechart-data";
import TicketPriceRange from "../components/ticket-price-range";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/search-bar";

import ManageFlight from "../components/manage-flight-form";
import ToggleAvailability from "../components/toggle-availability";
import AddFlightForm from "../components/add-flight-form";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardPage() {
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

        {/* User Icon */}
        <div className="flex items-center">
          <img
            src="/images/user-icon.png"
            alt="User"
            className="h-20 w-20 rounded-full m-2"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="flex flex-col justify-between bg-blue-50 p-4">
          <div>
            {/* Sidebar Buttons */}

            <AddFlightForm />
            

            <ManageFlight />

            <ToggleAvailability />
          </div>

          {/* Logout Button */}
          <button className="btn btn-error w-full mb-4 flex justify-between items-center hover:bg-red-700">
            <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 mr-2" />{" "}
            {/* Logout Icon */}
            Logout
            <FontAwesomeIcon
              icon={faChevronRight}
              className="h-5 w-5 ml-2"
            />{" "}
            {/* Chevron icon */}
          </button>
        </div>

        {/* Dashboard Cards */}
        <main className="flex-1 p-6 bg-white">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            Flight Overview
          </h1>
          <div className="flex flex-col gap-10">
            {/* Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-100 text-center p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-600">
                  Total Flights
                </h2>
                <p className="text-4xl font-bold text-blue-600 mt-2">120</p>
              </div>
              <div className="bg-blue-100 text-center p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-600">
                  Available Flights
                </h2>
                <p className="text-4xl font-bold text-blue-600 mt-2">30</p>
              </div>
            </div>

            {/* Weather and Pie Chart Section */}
            <div className="grid grid-cols-2 gap-6">
              {/* Pie Chart */}

              <PieChart />

              <div className="grid grid-col gap-6">
                {/* Weather Card */}
                <TicketPriceRange />
                {/* Ticket Price Range*/}
                <WeatherCard city="Dhaka" />
              </div>

              {/* Weather Component */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
