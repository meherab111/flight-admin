import React, { useState, useEffect } from "react";

function RealTimeClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <p className="text-lg text-gray-800 ml-20">
        Current Time: {formattedTime}
      </p>
    </div>
  );
}

export default RealTimeClock;
