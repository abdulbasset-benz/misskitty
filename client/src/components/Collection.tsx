import dress1 from "@/assets/dress-1.jpg";
import dress2 from "@/assets/dress-2.jpg";
import dress3 from "@/assets/dress-3.jpg";
import dress4 from "@/assets/dress-4.jpg";
import { Link } from "react-router"; // <-- fixed import
import { Button } from "./ui/button";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP); // <-- DON'T register useGSAP here

const Collection = () => {
  const { t } = useTranslation();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // wait for fonts (your existing approach)
      document.fonts.ready.then(() => {
        // create splits — using SplitText.create is fine as you had it
        const headingSplit = SplitText.create(".colheading", {
          type: "words",
          mask: "words",
        });
        const subHeadingSplit = SplitText.create(".colsubheading", {
          type: "words",
          mask: "words",
        });

        gsap.from(subHeadingSplit.words, {
          yPercent: 120,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".colsubheading",
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
          },
        });
        gsap.from(headingSplit.words, {
          yPercent: 120,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".colheading",
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
          },
        });

        // important: refresh ScrollTrigger when fonts/images/layout settle
        // this makes sure triggers calculate correct positions
        // a small timeout helps if images take a moment to layout
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 120);
      });
    },
    { scope: container } // keep your scope/ref approach
  );

  const featuredImages = [
    { src: dress1, alt: "Elegant Evening Gown", category: "Evenwear" },
    { src: dress2, alt: "Classic Cocktail Dress", category: "Cocktail" },
    { src: dress3, alt: "Vintage Inspired Gown", category: "Vintage" },
    { src: dress4, alt: "Modern Chic Dress", category: "Contemporary" },
  ];

  return (
    <div
      className="relative bg-gradient-to-b from-white to-[#fefaf2] py-24 overflow-hidden"
      ref={container}
    >
      {/* ... rest of your JSX unchanged ... */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#f7ce83] to-transparent mb-6"></div>
          <h2 className="uppercase text-sm tracking-[0.3em] text-gray-600 mb-4 font-light">
            {t("selection.CuratedSelection")}
          </h2>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-center mb-6 leading-tight colheading">
            {t("selection.title")}
          </h1>
          <p className="font-sans max-w-2xl text-gray-600 text-lg text-center leading-relaxed mb-8 colsubheading">
            {t("selection.subtitle")}
          </p>
        </div>

        {/* Gallery */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 md:gap-8 space-y-6 md:space-y-8 mb-16">
          {featuredImages.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid-column group relative overflow-hidden rounded-sm"
            >
              <Link to="/products" className="block w-full h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center collection-cta">
          <div className="mb-8">
            <p className="text-gray-600 text-lg mb-4">
              {t("selection.FindYourDress")}
            </p>
            <h3 className="text-2xl font-serif italic text-gray-800 mb-2">
              {t("selection.FullCollection")}
            </h3>
          </div>

          <Button
            asChild
            className="relative bg-transparent border border-[#d4b985] text-[#724f0e] px-12 py-6 rounded-none font-light tracking-widest hover:bg-[#f7ce83] hover:text-black transition-all duration-500 group overflow-hidden"
          >
            <Link to="/products">
              <span className="relative z-10"> {t("selection.explore")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 transition-all duration-700 group-hover:translate-x-full opacity-0 group-hover:opacity-20"></div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Collection;
