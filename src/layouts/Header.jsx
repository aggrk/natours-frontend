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
        scrolled
          ? "bg-[#1B4332]/95 shadow-lg"
          : "bg-gradient-to-b from-[#2D6A4F] to-[#1B4332]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo - responsive sizing */}
          <NavLink to="/" className="flex-shrink-0">
            <img
              src="./img/favicon.png"
              alt="Natours Logo"
              className="h-10 w-auto md:h-12"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink
              to="/signin"
              className="rounded-lg px-3 py-1.5 text-sm text-white md:px-4 md:py-2 md:text-base"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className="rounded-lg bg-gradient-to-r from-[#FFD166] to-[#FFB700] px-3 py-1.5 text-sm font-medium text-gray-900 md:px-4 md:py-2 md:text-base"
            >
              Sign Up
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-1 text-white md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-64 bg-gradient-to-b from-[#2D6A4F] to-[#1B4332] p-6 shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="mb-6 flex cursor-pointer items-center text-white focus:outline-none"
        >
          <svg
            className="h-6 w-6 transition-transform hover:scale-110"
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
          <span className="ml-2 text-lg">Close</span>
        </button>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/signin"
            className="rounded-lg border-2 border-white/50 px-6 py-2 text-center text-white transition-all hover:border-white hover:bg-white/10 hover:shadow-md"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </NavLink>
          <NavLink
            to="/signup"
            className="rounded-lg bg-gradient-to-r from-[#FFD166] to-[#FFB700] px-6 py-2 text-center font-semibold text-black transition-all hover:from-[#FFB700] hover:to-[#FFD166] hover:shadow-md"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
