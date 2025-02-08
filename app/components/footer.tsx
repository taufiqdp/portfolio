import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-12 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0">
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">rss</p>
          </Link>
        </li>
      </ul>
      <div className="flex justify-between items-center mt-8 text-neutral-600">
        <p>copyright © {new Date().getFullYear()}</p>
        <div className="flex space-x-4">
          <Link
            href="https://github.com/taufiqdp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-black"
          >
            <FaGithub className="mr-1" size={20} />
          </Link>
          <Link
            href="https://linkedin.com/in/taufiqdp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-black"
          >
            <FaLinkedin className="mr-1" size={20} />
          </Link>
          <Link
            href="https://huggingface.co/taufiqdp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-black"
          >
            <SiHuggingface className="mr-1" size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
