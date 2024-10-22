import Content from "@/components/content";
import Profile from "@/components/profile";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Profile />
      <Content />
    </main>
  );
}
