"use client";

import { useEffect, useState } from "react";

export default function Time() {
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent memory leaks by tracking mounted state
    let isMounted = true;

    const updateTime = () => {
      try {
        const now = new Date();
        if (isMounted) {
          setTime(
            now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error updating time:", error);
        if (isMounted) {
          setTime("--:--");
          setIsLoading(false);
        }
      }
    };

    updateTime();

    let intervalId;
    try {
      intervalId = setInterval(updateTime, 10000);
    } catch (error) {
      console.error("Error setting up time interval:", error);
    }

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  if (isLoading) {
    return <p className="text-sm text-gray-400">Loading...</p>;
  }

  return (
    <time
      dateTime={new Date().toISOString()}
      className="text-sm text-gray-600 font-medium select-none"
      title="Current time in 24-hour format"
    >
      {time}
    </time>
  );
}
