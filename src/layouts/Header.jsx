import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-[#1B4332] shadow-lg" : "bg-[#2D6A4F]"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center text-2xl font-bold text-white"
        >
          <img
            src="./img/favicon.png"
            alt="Natours Logo"
            className="h-18 w-40 object-contain"
          />
        </NavLink>

        {/* Auth Buttons */}
        <div className="hidden space-x-4 md:flex">
          <NavLink
            to="/signin"
            className="rounded-lg border border-white px-4 py-2 text-white transition hover:bg-white hover:text-[#2D6A4F]"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/signup"
            className="rounded-lg bg-[#FFD166] px-4 py-2 text-black transition hover:bg-yellow-500"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer text-white focus:outline-none sm:hidden md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-white bg-opacity-50 transition-opacity ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setIsOpen(false)} // Close when clicking outside
      ></div>

      <div
        className={`fixed right-0 top-0 z-50 h-full w-64 bg-[#2D6A4F] p-5 shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="mb-4 flex cursor-pointer items-center text-white focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="ml-2">Close</span>
        </button>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/signin"
            className="rounded-lg border border-white px-4 py-2 text-white transition hover:bg-white hover:text-[#2D6A4F]"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </NavLink>
          <NavLink
            to="/signup"
            className="rounded-lg bg-[#FFD166] px-4 py-2 text-black transition hover:bg-yellow-500"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
