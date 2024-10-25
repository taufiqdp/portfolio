import Image from "next/image";
import illustrationImg from "@/public/rb_82523.png";

export default function Home() {
  return (
    <>
      <p className="">
        A passionate machine learning engineer and web developer with a strong
        background in artificial intelligence technologies and full-stack
        development.
      </p>

      <div className="flex justify-center mt-16">
        <Image
          src={illustrationImg}
          alt="Desk setup illustration"
          className="max-w-full h-auto w-[200px] sm:w-[350px]"
          priority
        />
      </div>
    </>
  );
}
