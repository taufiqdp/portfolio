import Image from "next/image";
import profileImg from "@/assets/icon.png";
import NavLink from "./nav-link";
import Time from "./time";
import { FaGithub } from "react-icons/fa";
import hfIcon from "@/assets/hf-logo.svg";

export default function MainHeader() {
  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-0 mb-4 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-8 text-center sm:text-left">
          <Image
            src={profileImg}
            alt="Profile picture"
            className="rounded-full border border-gray-300 w-[50px] h-[50px] sm:w-[80px] sm:h-[80px]"
          />
          <div>
            <h1 className="text-lg sm:text-2xl font-bold">
              Taufiq Dwi Purnomo
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              ML Engineer | Fullstack Developer
            </p>
            <div className="flex justify-center sm:justify-start items-center gap-2 mt-4">
              <a
                href="https://github.com/taufiqdp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://www.huggingface.co/taufiqdp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Image src={hfIcon} alt="HF" width={30} height={30} />
              </a>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Time />
        </div>
      </header>
      <div className="flex sm:justify-start justify-center">
        <NavLink />
      </div>
    </>
  );
}
