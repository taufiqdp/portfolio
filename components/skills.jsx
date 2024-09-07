import { Brain, Code, Database, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DevSkillsShowcase() {
  const skills = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Machine Learning",
      tools: [
        "TensorFlow",
        "PyTorch",
        "Jax",
        "Flax",
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "HuggingFace",
      ],
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Front-end",
      tools: ["React", "Vue", "JavaScript", "Tailwind CSS", "Next.js"],
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Back-end",
      tools: ["Next.js", "Python", "PostgreSQL", "Go", "SQLite"],
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Dev Tools",
      tools: ["Git", "Github", "Docker", "VS Code"],
    },
  ];

  return (
    <div className="container space-y-10" id="skills">
      <div className="flex items-center gap-6">
        <hr className="w-full border border-[#42b883]" />
        <h2 className="text-4xl font-bold text-center text-neutral-700">
          Skills
        </h2>
        <hr className="w-full border border-[#42b883]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {skills.map((skill, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center space-x-4 text-neutral-700">
              <div className="bg-primary/10 p-3 rounded-full">{skill.icon}</div>
              <CardTitle>{skill.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skill.tools.map((tool, toolIndex) => (
                  <span
                    key={toolIndex}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full border text-sm font-medium bg-[#42b883] hover:cursor-pointer text-white"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
