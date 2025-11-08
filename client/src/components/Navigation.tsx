import { useState } from "react";
import { Link } from "react-router";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleLang = () => setIsLangOpen((prev) => !prev);

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "ar", label: "العربية" },
  ];

  // Language change handler
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
    setIsMenuOpen(false);

    // Set HTML dir attribute for RTL support (for Arabic)
    document.documentElement.dir = langCode === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = langCode;
  };

  // Get current language
  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  // Dynamic nav links using translations
  const navLinksLeft = [
    { name: t("nav.aboutUs"), href: "#about" },
    { name: t("nav.testimonials"), href: "#testimonials" },
  ];

  const navLinksRight = [{ name: t("nav.products"), href: "/products" }];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[70] bg-[#f5f3ef]/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 md:py-5 flex items-center justify-between">
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
              <span className="uppercase text-sm">{t("nav.languages")}</span>
            </button>
            {isLangOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsLangOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg overflow-hidden z-20">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors ${
                        currentLanguage.code === lang.code
                          ? "bg-gray-50 font-medium"
                          : ""
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Hamburger Button (Mobile) - Now with relative positioning */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative z-[80] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 transition-all duration-300 ${
              isMenuOpen ? "bg-gray-800 rotate-45 translate-y-2" : "bg-gray-800"
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 transition-all duration-300 ${
              isMenuOpen ? "opacity-0 bg-gray-800" : "bg-gray-800"
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 transition-all duration-300 ${
              isMenuOpen ? "bg-gray-800 -rotate-45 -translate-y-2" : "bg-gray-800"
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-500 ease-in-out md:hidden z-[60] ${
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
            <p className="text-lg font-medium mb-2 text-gray-700">
              {t("nav.languages")}
            </p>
            <div className="flex flex-col gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`text-xl text-gray-700 hover:text-black transition-colors duration-300 text-left ${
                    currentLanguage.code === lang.code ? "font-bold" : ""
                  }`}
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