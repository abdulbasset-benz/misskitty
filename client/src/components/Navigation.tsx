import { useState } from "react";
import { Link } from "react-router";
import { Globe } from "lucide-react"; // optional icon

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleLang = () => setIsLangOpen((prev) => !prev);

  const navLinksLeft = [
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const navLinksRight = [{ name: "Products", href: "/products" }];

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "ar", label: "العربية" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f3ef]/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Left Links */}
        <div className="hidden md:flex gap-8 text-sm tracking-wide text-gray-700 uppercase flex-1 justify-start">
          {navLinksLeft.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-black transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Center Logo */}
        <div className="flex-1 flex justify-center">
          <Link
            to="/"
            className="font-semibold text-black text-xl md:text-2xl tracking-tight"
          >
            Miss Kitty
          </Link>
        </div>

        {/* Right Links */}
        <div className="hidden md:flex gap-8 text-sm tracking-wide text-gray-700 uppercase flex-1 justify-end items-center">
          {navLinksRight.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.name}
                to={item.href}
                className="hover:text-black transition-colors duration-300"
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-black transition-colors duration-300"
              >
                {item.name}
              </a>
            )
          )}

          {/* Languages Dropdown */}
          <div className="relative">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 hover:text-black transition-colors duration-300"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase text-sm">Languages</span>
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setIsLangOpen(false);
                      // handle language switch here
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
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

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-500 ease-in-out md:hidden z-[55] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start gap-8 p-12 pt-24">
          {[...navLinksLeft, ...navLinksRight].map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.name}
                to={item.href}
                onClick={toggleMenu}
                className="text-2xl font-medium text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-wide"
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                onClick={toggleMenu}
                className="text-2xl font-medium text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-wide"
              >
                {item.name}
              </a>
            )
          )}

          {/* Languages inside Mobile */}
          <div className="mt-4">
            <p className="text-lg font-medium mb-2 text-gray-700">Languages</p>
            <div className="flex flex-col gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setIsMenuOpen(false);
                    // handle language switch
                  }}
                  className="text-xl text-gray-700 hover:text-black transition-colors duration-300"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
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
