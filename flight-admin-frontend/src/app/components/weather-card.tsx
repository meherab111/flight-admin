/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import RealTimeClock from "./real-time-clock";

interface WeatherCardProps {
  city: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  const [weather, setWeather] = useState<{
    temp: number | null;
    description: string;
    icon: string;
  }>({
    temp: null,
    description: "",
    icon: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const apiKey = "aa75a18ce472ab88c0c371329b976974";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found or API error.");
        }
        return response.json();
      })
      .then((data) => {
        setWeather({
          temp: Math.round(data.main.temp),
          description: data.weather[0].main,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
        setError("");
      })
      .catch(() => {
        setError("Unable to fetch weather data.");
        setWeather({ temp: null, description: "", icon: "" });
      });
  }, [city]);

  return (
    <div className="bg-rose-100 text-center p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Weather</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : weather.temp !== null ? (
        <div className="flex justify-between mt-4">
          <div className="flex justify-content-center flex-col gap-4">
            <p className="text-4xl font-bold text-rose-600 ml-10 mt-4">
              {weather.temp}°C
            </p>
            <p className="text-lg text-rose-600 ml-10">{weather.description}</p>
            <RealTimeClock />
          </div>

          <div className="bg-rose-100 text-center p-4 rounded-full shadow-lg mr-20">
            <img
              src={weather.icon}
              alt="Weather Icon"
              className=" h-[110px] w-[110px]"
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default WeatherCard;
