"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { RiMenu3Line } from "react-icons/ri";
import { HiOutlineXMark } from "react-icons/hi2";
import logo from "@/assets/icon.png";

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

      {/* Sidebar */}
      <nav
        className={`sm:flex ${
          isSidebarOpen ? "block" : "hidden"
        } fixed top-14 left-0 h-full w-64 bg-white shadow-md z-10 sm:pt-0 pt-2 sm:static sm:h-auto sm:w-auto sm:bg-transparent sm:shadow-none sm:z-0`}
      >
        <ul className="py-4 px-6 sm:flex sm:gap-6 sm:p-0 sm:space-y-0 space-y-5">
          <li>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 block sm:inline-block"
              prefetch={false}
              onClick={toggleSidebar} // Close sidebar after clicking a link on small screens
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#skills"
              className="text-sm font-medium hover:underline underline-offset-4 block sm:inline-block"
              prefetch={false}
              onClick={toggleSidebar}
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              href="#education"
              className="text-sm font-medium hover:underline underline-offset-4 block sm:inline-block"
              prefetch={false}
              onClick={toggleSidebar}
            >
              Education
            </Link>
          </li>
          <li>
            <Link
              href="#projects"
              className="text-sm font-medium hover:underline underline-offset-4 block sm:inline-block"
              prefetch={false}
              onClick={toggleSidebar}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="text-sm font-medium hover:underline underline-offset-4 block sm:inline-block"
              prefetch={false}
              onClick={toggleSidebar}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
