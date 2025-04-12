import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-gray-300 bg-gray-100 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Logo - now visible on all screens */}
          <NavLink to="/" className="flex-shrink-0">
            <img
              src="/img/logo-green.png"
              alt="Natours Logo"
              className="h-10 w-32 transition-opacity hover:opacity-90"
            />
          </NavLink>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center sm:items-end">
            <ul className="flex flex-wrap justify-center gap-6 text-base font-medium text-gray-700">
              {["About us", "Become a guide", "Careers", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="transition-colors hover:text-green-600"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
            <p className="mt-4 text-sm text-gray-500 sm:mt-2">
              &copy; {new Date().getFullYear()} Kennedy Phinias. All rights
              reserved.
            </p>
          </nav>
        </div>
      </div>
    </footer>
  );
}
