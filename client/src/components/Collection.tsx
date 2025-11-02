import dress1 from "@/assets/dress-1.jpg";
import dress2 from "@/assets/dress-2.jpg";
import dress3 from "@/assets/dress-3.jpg";
import dress4 from "@/assets/dress-4.jpg";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

const Collection = () => {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const headingSplit = SplitText.create(".heading", {
      type: "words",
      mask: "words",
    });
    const subHeadingSplit = SplitText.create(".subheading", {
      type: "words",
      mask: "words",
    });

    gsap.from(subHeadingSplit.words, {
      yPercent: 120,
      duration: 1,
      ease: "power4.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".subheading",
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
        trigger: ".heading",
        start: "top 80%",
        end: "bottom 50%",
        scrub: 1,
      },
    });
  }, {scope: container});
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
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmNWY1ZjUiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section - More refined */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#f7ce83] to-transparent mb-6"></div>
          <h2 className="uppercase text-sm tracking-[0.3em] text-gray-600 mb-4 font-light">
            Curated Selection
          </h2>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-center mb-6 leading-tight heading">
            Timeless <span className="italic font-light">Elegance</span>
          </h1>
          <p className="font-sans max-w-2xl text-gray-600 text-lg text-center leading-relaxed mb-8 subheading">
            Each piece in our collection tells a story of craftsmanship and
            sophistication, designed to make you feel effortlessly beautiful.
          </p>
        </div>

        {/* Enhanced Masonry Gallery */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 md:gap-8 space-y-6 md:space-y-8 mb-16">
          {featuredImages.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid-column group relative overflow-hidden rounded-sm"
            >
              <Link to="/products" className="block w-full h-full">
                {/* Image with enhanced hover effects */}
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  {/* Overlay with category */}
                  {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 flex items-end justify-start p-6">
                    <span className="text-white text-sm font-light tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                      {image.category}
                    </span>
                  </div> */}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="mb-8">
            <p className="text-gray-600 text-lg mb-4">
              Ready to find your perfect dress?
            </p>
            <h3 className="text-2xl font-serif italic text-gray-800 mb-2">
              Discover the full collection
            </h3>
          </div>

          <Button
            asChild
            className="relative bg-transparent border border-[#d4b985] text-[#724f0e] px-12 py-6 rounded-none font-light tracking-widest hover:bg-[#f7ce83] hover:text-black transition-all duration-500 group overflow-hidden"
          >
            <Link to="/products">
              <span className="relative z-10">EXPLORE COLLECTION</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 transition-all duration-700 group-hover:translate-x-full opacity-0 group-hover:opacity-20"></div>
            </Link>
          </Button>

          {/* Additional enticing text */}
          <p className="text-sm text-gray-500 mt-6 font-light">
            Limited pieces available • Complimentary styling consultation
          </p>
        </div>
      </div>
    </div>
  );
};

export default Collection;
