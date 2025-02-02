import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

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
        <button className="text-white focus:outline-none sm:hidden md:hidden">
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
    </header>
  );
}
