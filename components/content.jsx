"use client";

import React, { useState, useEffect } from "react";

const Content = () => {
  const spinChars = ["/", "—", "\\", "|"];
  const [spinIndex, setSpinIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpinIndex((current) => (current + 1) % spinChars.length);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full lg:w-3/4 lg:ml-[25%] p-8 flex items-center justify-center h-screen relative">
      <p className="text-lg px-1">
        Site is under maintenance
        <span className="ml-2 bg-gray-100 font-mono text-gray-500">
          {spinChars[spinIndex]}
        </span>
      </p>
    </main>
  );
};

export default Content;
