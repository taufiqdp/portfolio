import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

import profileImg from "@/public/og-profile-image.png";
import hfIcon from "@/assets/hf-logo.svg";
import linkedinIcon from "@/assets/linkedin-icon.svg";

export default function Profile() {
  return (
    <aside className="bg-white border w-full lg:w-1/4 lg:h-screen lg:fixed lg:left-0 p-8 bg-muted">
      <div className="flex flex-col items-center space-y-6">
        <Image
          src={profileImg}
          alt="Developer"
          width={200}
          height={200}
          className="rounded-full"
        />
        <h1 className="text-2xl font-bold">Taufiq Dwi Purnomo</h1>
        <p className="text-lg text-muted-foreground">
          Machine Learning Engineer
        </p>

        <div className="flex space-x-4">
          <a
            href="https://github.com/taufiqdp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-gray-200 transition-colors duration-200"
            >
              <FaGithub className="h-6 w-6" />
            </Button>
          </a>
          <a
            href="https://www.huggingface.co/taufiqdp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-gray-200 transition-colors duration-200"
            >
              <Image src={hfIcon} alt="HackerRank" width={30} height={30} />
            </Button>
          </a>
          <a
            href="https://www.linkedin.com/in/taufiqdp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-gray-200 transition-colors duration-200"
            >
              <Image src={linkedinIcon} alt="LinkedIn" width={30} height={30} />
            </Button>
          </a>
        </div>
        <p className="text-center text-muted-foreground">
          Passionate ML engineer and web developer with expertise in AI and
          full-stack development.
        </p>
      </div>
    </aside>
  );
}
