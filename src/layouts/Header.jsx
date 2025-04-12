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
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          isOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-gradient-to-b from-[#2D6A4F] to-[#1B4332] shadow-2xl transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="flex items-center justify-between p-6">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close menu"
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
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="mt-6 flex flex-col space-y-3 px-6">
            <NavLink
              to="/signin"
              className="flex items-center rounded-lg px-6 py-3 text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              onClick={() => setIsOpen(false)}
              activeClassName="bg-white/10 font-semibold"
            >
              <span className="flex-1 text-center">Sign In</span>
            </NavLink>
            <NavLink
              to="/signup"
              className="flex items-center rounded-lg bg-gradient-to-r from-[#FFD166] to-[#FFB700] px-6 py-3 font-semibold text-gray-900 transition-all hover:from-[#FFB700] hover:to-[#FFD166] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFD166]/50"
              onClick={() => setIsOpen(false)}
              activeClassName="from-[#FFB700] to-[#FFD166] shadow-md"
            >
              <span className="flex-1 text-center">Sign Up</span>
            </NavLink>
          </nav>

          {/* Additional Menu Items (optional) */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-6">
            <p className="text-center text-sm text-white/80">
              &copy; {new Date().getFullYear()} Natours
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
