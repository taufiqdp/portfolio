import MainHeader from "@/components/main-header";
import Skills from "@/components/skills";
import SocialMedia from "@/components/social-media";

export default function Home() {
  return (
    <main className="flex flex-col gap-32">
      <MainHeader />
      <Skills />
      <SocialMedia />
    </main>
  );
}
