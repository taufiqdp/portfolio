import logo from "@/assets/icon.png";
import Image from "next/image";
import Link from "next/link";

import { AiOutlineMail } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLastfm } from "react-icons/fa";
import { FaLetterboxd } from "react-icons/fa6";

export default function SocialMedia() {
  return (
    <section className="flex flex-col items-center justify-center gap-6">
      <span>
        <Image
          src={logo}
          alt="logo"
          height={80}
          width={80}
          className="border shadow-md rounded-full"
        />
      </span>
      <p className="w-1/2 text-center text-gray-600">
        My inbox is always open. Whether you have a question or just want to say
        hi, I’ll try my best to get back to you!
      </p>

      <div className="flex items-center gap-3">
        <Link
          href="mailto:topexdw@gmail.com"
          className="border border-[#42b883] text-xl text-[#42b883] p-2 rounded-full hover:text-white hover:bg-[#42b883]"
        >
          <AiOutlineMail />
        </Link>
        <Link
          href="https://linkedin.com/in/taufiq-dwi-purnomo"
          className="border border-[#42b883] text-xl text-[#42b883] p-2 rounded-full hover:text-white hover:bg-[#42b883]"
        >
          <FaLinkedinIn />
        </Link>
        <Link
          href="https://x.com/taufiqdp"
          className="border border-[#42b883] text-xl text-[#42b883] p-2 rounded-full hover:text-white hover:bg-[#42b883]"
        >
          <FaXTwitter />
        </Link>
        <Link
          href="https://instagram.com/taufiqdp_"
          className="border border-[#42b883] text-xl text-[#42b883] p-2 rounded-full hover:text-white hover:bg-[#42b883]"
        >
          <FaInstagram />
        </Link>
        <Link
          href="https://letterboxd.com/taufiqdp"
          className="border border-[#42b883] text-xl text-[#42b883] p-2 rounded-full hover:text-white hover:bg-[#42b883]"
        >
          <FaLetterboxd />
        </Link>
        <Link
          href="https://www.last.fm/user/taufiqdp"
          className="border border-[#42b883] text-xl text-[#42b883] p-2 rounded-full hover:text-white hover:bg-[#42b883]"
        >
          <FaLastfm />
        </Link>
      </div>
    </section>
  );
}
