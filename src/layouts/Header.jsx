import { useState, useEffect } from "react";

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
        <a href="/" className="flex items-center text-2xl font-bold text-white">
          <img
            src="./img/logo-green.png"
            alt="Natours Logo"
            className="h-12 w-40 object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-6 text-white md:flex">
          <a href="#tours" className="hover:text-[#FFD166]">
            Tours
          </a>
          <a href="#about" className="hover:text-[#FFD166]">
            About
          </a>
          <a href="#contact" className="hover:text-[#FFD166]">
            Contact
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden space-x-4 md:flex">
          <button className="rounded-lg border border-white px-4 py-2 text-white transition hover:bg-white hover:text-[#2D6A4F]">
            Sign In
          </button>
          <button className="rounded-lg bg-[#FFD166] px-4 py-2 text-black transition hover:bg-yellow-500">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="text-white focus:outline-none md:hidden">
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
