import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef, useState } from "react";
import { Link } from "react-router";
import pic1 from "@/assets/pic1.jpg";
import pic2 from "@/assets/pic2.png";
import pic3 from "@/assets/pic3.png";
import pic4 from "@/assets/pic4.jpg";
import pic5 from "@/assets/pic5.jpg";

gsap.registerPlugin(useGSAP, SplitText);

const HeroSection = () => {
  const heroContainer = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useGSAP(
    () => {
      // Split main hero title into words
      const titleSplit = SplitText.create(".heroTitle", {
        type: "words",
        wordsClass: "word",
        mask: "words",
      });

      // Animate hero title words upward
      gsap.from(titleSplit.words, {
        yPercent: 140,
        duration: 1.5,
        ease: "power4.inOut",
        stagger: 0.05,
      });

      const sideTitles = gsap.utils.toArray<HTMLElement>(".sidetitle");

      const splits = sideTitles.map((el) =>
        // create a SplitText for each element
        SplitText.create(el, {
          type: "words",
          wordsClass: "word",
          mask: "words",
        })
      );

      splits.forEach((split) => {
        gsap.from(split.words, {
          yPercent: 120,
          duration: 1.5,
          ease: "power4.inOut",
        });
      });

      const images = gsap.utils.toArray<HTMLElement>(".image");
      gsap.set(images, { yPercent: 250, autoAlpha: 0 });

      // Animate images with a staggered effect
      gsap.to(images, {
        yPercent: 0,
        rotation: (i) => {
          // final subtle rotation per image
          const rotations = [-4, 4, -5, 6, -8]; // you can tweak this list
          return rotations[i % rotations.length];
        },
        autoAlpha: 1,
        duration: 1,
        ease: "power4.inOut",
        stagger: 0.4,
      });
    },
    { scope: heroContainer }
  );

  return (
    <section
      ref={heroContainer}
      className="min-h-screen flex flex-col items-center justify-center bg-[#f5f3ef] text-center overflow-hidden font-sans relative"
    >
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <a
            href="#home"
            className="font-semibold text-black text-xl md:text-2xl z-50"
          >
            Miss Kitty
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-8 text-sm tracking-wide text-gray-700 uppercase">
            {["About", "Works", "Products", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-black transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="lg:hidden z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
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
          className={`fixed top-0 right-0 h-screen w-full sm:w-80 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out lg:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "white" }} // ensures white background no override
        >
          <div className="flex flex-col items-start gap-8 p-12 pt-24">
            {["About", "Works", "Products", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={toggleMenu}
                className="text-2xl font-medium text-gray-800 hover:text-black transition-all duration-300 uppercase tracking-wide"
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
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
            aria-hidden="true"
          ></div>
        )}
      </nav>

      {/* Hero content */}
      <div className="flex flex-col items-center justify-center mt-24 relative w-full px-8">
        <h2 className="text-5xl md:text-9xl font-bold uppercase italic mb-4 heroTitle">
          Grace
        </h2>

        <div className="flex items-center justify-center gap-3 md:gap-12 leading-none mt-4">
          <h1 className="text-4xl md:text-6xl font-semibold uppercase tracking-tight sidetitle">
            In every
          </h1>

          <div className="relative w-[240px] md:w-[340px] h-[320px] md:h-[420px] flex-shrink-0 mx-2">
            {[pic1, pic2, pic3, pic4, pic5].map((pic, index) => (
              <img
                key={index}
                src={pic}
                alt={`fashion-${index}`}
                className={`absolute w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out shadow-lg
                  ${
                    index === 0
                      ? "rotate-[-8deg] scale-95"
                      : index === 1
                      ? "rotate-[6deg] scale-95"
                      : index === 2
                      ? "rotate-[3deg] scale-100"
                      : index === 3
                      ? "rotate-[-3deg]"
                      : "rotate-[2deg]"
                  } top-0 left-0 image`}
              />
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold uppercase tracking-tight sidetitle">
            detail
          </h1>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 flex flex-col items-center gap-4">
        <button className="bg-black text-white px-10 py-3 text-sm tracking-wider hover:bg-gray-800 transition-all">
          <Link to="/products">SHOP NOW →</Link>
        </button>
        <p className="text-gray-600 text-sm md:text-base">
          Find your perfect escape on{" "}
          <span className="font-medium text-black">Elegance</span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
