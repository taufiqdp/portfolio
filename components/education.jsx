import { GraduationCap, Award, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const degrees = [
  {
    title: "Bachelor of Informatics",
    institution: "Universitas Teknologi Yogyakarta",
    institutionLogo: "/uty.png",
    year: "2021 - Present",
  },
];

const certificates = [
  {
    title: "Google Cloud Skill Badge",
    institution: "Google",
    institutionLogo: "/g.png",
    year: "Completed in 2024",
    credentialLink: "https://www.credly.com/users/taufiq-dwi-purnomo",
  },
  {
    title: "PyTorch for Deep Learning Bootcamp",
    institution: "Zero To Mastery",
    institutionLogo: "/ztm.png",
    year: "Completed in 2023",
    credentialLink:
      "https://www.udemy.com/certificate/UC-0bf3d424-39d9-4dd6-b30a-8d4d84a051d0/",
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="space-y-10 pt-20">
      <div className="flex items-center gap-6">
        <hr className="w-full border border-[#42b883]" />
        <h2 className="text-4xl font-bold text-center">Education</h2>
        <hr className="w-full border border-[#42b883]" />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {/* Degrees Column */}
        <div>
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="w-6 h-6 mr-2 text-primary" />
            <h3 className="text-2xl font-semibold">Degrees</h3>
          </div>
          <div className="space-y-6">
            {degrees.map((degree, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <p className="font-medium">{degree.title}</p>
                <div className="flex gap-2">
                  <Image
                    src={degree.institutionLogo}
                    height={22}
                    width={22}
                    className="rounded-full"
                    alt={degree.institution}
                  />
                  <p className="text-sm text-gray-600">{degree.institution}</p>
                </div>
                <p className="text-sm text-gray-600">{degree.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Column */}
        <div>
          <div className="flex items-center justify-center mb-6">
            <Award className="w-6 h-6 mr-2 text-primary" />
            <h3 className="text-2xl font-semibold">Certificates</h3>
          </div>
          <div className="space-y-6">
            {certificates.map((certificate, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <p className="font-medium">{certificate.title}</p>
                <div className="flex gap-2">
                  <Image
                    src={certificate.institutionLogo}
                    height={20}
                    width={20}
                    alt={certificate.title}
                  ></Image>
                  <p className="text-sm text-gray-600">
                    {certificate.institution}
                  </p>
                </div>
                <p className="text-sm text-gray-600">{certificate.year}</p>
                {certificate.credentialLink && (
                  <Link
                    href={certificate.credentialLink}
                    target="_blank"
                    variant="outline"
                    size="sm"
                    className="flex items-center mt-3"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Verify Certificate
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
