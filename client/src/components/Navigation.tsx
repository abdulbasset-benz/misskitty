import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinksLeft = ["About", "Works"];
  const navLinksRight = ["Products", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f3ef]/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Left Links (Desktop) */}
        <div className="hidden md:flex gap-8 text-sm tracking-wide text-gray-700 uppercase flex-1 justify-start">
          {navLinksLeft.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-black transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Center Logo */}
        <div className="flex-1 flex justify-center">
          <a
            href="#home"
            className="font-semibold text-black text-xl md:text-2xl tracking-tight"
          >
            Miss Kitty
          </a>
        </div>

        {/* Right Links (Desktop) */}
        <div className="hidden md:flex gap-8 text-sm tracking-wide text-gray-700 uppercase flex-1 justify-end">
          {navLinksRight.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-black transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-500 ease-in-out md:hidden z-[55] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start gap-8 p-12 pt-24">
          {[...navLinksLeft, ...navLinksRight].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={toggleMenu}
              className="text-2xl font-medium text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-[50]"
          aria-hidden="true"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
