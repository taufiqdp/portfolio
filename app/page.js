import Education from "@/components/education";
import MainHeader from "@/components/main-header";
import Skills from "@/components/skills";
import SocialMedia from "@/components/social-media";

export default function Home() {
  return (
    <main className="flex flex-col">
      <MainHeader />
      <Skills />
      <Education />
      <SocialMedia />
    </main>
  );
}
