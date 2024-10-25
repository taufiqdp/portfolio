import Link from "next/link";

export default function NavLink() {
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skill", href: "/skill" },
    { name: "Project", href: "/project" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="mb-12 sm:my-8 my-6">
      <ul className="flex justify-center bg-gray-100 rounded-2xl w-fit shadow-md border border-gray-300 text-xs sm:text-base">
        {links.map(({ name, href }) => (
          <li
            key={name}
            className="hover:bg-gray-200 hover:rounded-2xl hover:cursor-pointer"
          >
            <Link
              href={href}
              className="text-gray-600 hover:text-gray-900 sm:px-3 px-2 py-2 inline-block"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
