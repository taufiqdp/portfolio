import Link from "next/link";

export default function SideBar({ toggleSidebar, isSidebarOpen }) {
  return (
    <nav
      className={`sm:flex ${
        isSidebarOpen ? "block" : "hidden"
      } fixed top-14 left-0 h-full w-64 bg-white shadow-md z-10 sm:pt-0 pt-2 sm:static sm:h-auto sm:w-auto sm:bg-transparent sm:shadow-none sm:z-0`}
    >
      <ul className="py-4 px-6 sm:flex sm:gap-6 sm:p-0 sm:space-y-0 space-y-5">
        <li>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 block sm:inline-block"
            prefetch={false}
            onClick={toggleSidebar}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="#skills"
            className="text-sm font-medium hover:underline underline-offset-4 block sm:inline-block"
            prefetch={false}
            onClick={toggleSidebar}
          >
            Skills
          </Link>
        </li>
        <li>
          <Link
            href="#education"
            className="text-sm font-medium hover:underline underline-offset-4 block sm:inline-block"
            prefetch={false}
            onClick={toggleSidebar}
          >
            Education
          </Link>
        </li>
        <li>
          <Link
            href="#projects"
            className="text-sm font-medium hover:underline underline-offset-4 block sm:inline-block"
            prefetch={false}
            onClick={toggleSidebar}
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="#contact"
            className="text-sm font-medium hover:underline underline-offset-4 block sm:inline-block"
            prefetch={false}
            onClick={toggleSidebar}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
