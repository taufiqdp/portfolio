"use client";

import Image from "next/image";
import { useState } from "react";

import { RiMenu3Line } from "react-icons/ri";
import { HiOutlineXMark } from "react-icons/hi2";
import logo from "@/assets/icon.png";
import SideBar from "./sidebar";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="fixed top-0 h-14 lg:px-40 md:px-20 sm:px-10 px-5 flex items-center justify-between gap-16 shadow-sm w-full border-gray-700 bg-white">
      <span>
        <Image
          src={logo}
          height={50}
          width={50}
          alt="logo"
          className="border rounded-full hover:cursor-pointer"
        />
      </span>

      <button
        className="sm:hidden block"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {!isSidebarOpen ? (
          <RiMenu3Line className="text-xl" />
        ) : (
          <HiOutlineXMark className="text-2xl" />
        )}
      </button>

      <SideBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
    </header>
  );
}
