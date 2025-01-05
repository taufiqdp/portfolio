import { BlogPosts } from "app/components/posts";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Page() {
  return (
    <section>
      <div className="flex flex-col mb-4">
        <img
          src="https://taufiqdp.com/og-profile-image.png"
          alt="Taufiq Dwi Purnomo"
          className="mb-4 rounded-full w-20 h-20 xl:w-28 xl:h-28"
        />
        <h1 className="text-2xl font-semibold tracking-tighter">
          Taufiq Dwi Purnomo
        </h1>
      </div>
      <p className="mb-4">
        {`I am a passionate machine learning engineer and web developer with a strong
        background in artificial intelligence technologies and full-stack
        development.`}
      </p>

      <div className="flex mb-12">
        <Link
          href="https://github.com/taufiqdp"
          target="_blank"
          className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
        >
          <FaGithub size={24} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/taufiqdp/"
          target="_blank"
          className="ml-4 transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
        >
          <FaLinkedin size={24} />
        </Link>
      </div>

      <div className="my-10">
        <BlogPosts />
      </div>
    </section>
  );
}
