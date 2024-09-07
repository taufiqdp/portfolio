import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-4xl">
      <h1>Hello 👋, I am Taufiq</h1>
      <div className="py-10 flex flex-row gap-6">
        <Link href="https://github.com/taufiqdp" className="">
          <FaGithub />
        </Link>
        <Link href="https://hf.co/taufiqdp" className="">
          <SiHuggingface />
        </Link>
      </div>
    </div>
  );
}
