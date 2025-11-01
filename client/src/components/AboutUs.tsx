import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import woman from "@/assets/woman.png";
import scissors from "@/assets/scissors.png";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const AboutUs = () => {
  return (
    <div className="mt-8 flex flex-col gap-24 bg-gradient-to-b from-white to-[#fefaf2] text-gray-800">
      {/* Intro Section */}
      <div className="flex flex-col items-center text-center px-6">
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#f7ce83] to-transparent mb-6"></div>
        <h2 className="uppercase text-xs md:text-sm tracking-[0.3em] text-gray-500 mb-4">
          Get to know us
        </h2>
        <h1 className="font-serif text-5xl md:text-7xl font-light mb-6 leading-tight">
          Where <span className="italic font-light">Comfort</span> Meets Charm
        </h1>
        <p className="font-sans max-w-2xl text-gray-600 text-lg leading-relaxed">
          Rooted in Algerian heritage, we craft everyday garments that blend
          softness, confidence, and effortless grace — made for real moments and
          timeless style.
        </p>
      </div>

      {/* Main Sections */}
      <section className="container mx-auto px-4 py-8 space-y-32">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
          {/* Image Left */}
          <div className="md:w-1/2 w-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 ease-in-out">
            <img
              src={scissors}
              alt="Scissors symbolizing craftsmanship"
              className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              decoding="async"
              id="image"
            />
          </div>

          {/* Text Right */}
          <div className="md:w-1/2 w-full space-y-4">
            <h2
              className="text-3xl md:text-4xl font-normal font-serif tracking-wide"
              id="title"
            >
              The Beginning of Our Journey
            </h2>
            <div className="w-16 h-[2px] bg-[#f7ce83] mb-4"></div>
            <p className="text-gray-700 leading-relaxed text-lg" id="subtitle">
              Our story began in the heart of Algeria — where craftsmanship is a
              heritage and style is a way of life. Inspired by local artisans
              and everyday beauty, we design clothing that celebrates tradition
              while embracing modern comfort. Every stitch tells a story of
              pride, patience, and passion.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 max-w-7xl mx-auto">
          {/* Text Left */}
          <div className="md:w-1/2 w-full space-y-4">
            <h2
              className="text-3xl md:text-4xl font-normal font-serif tracking-wide"
              id="title"
            >
              Who We Are
            </h2>
            <div className="w-16 h-[2px] bg-[#f7ce83] mb-4"></div>
            <p className="text-gray-700 leading-relaxed text-lg" id="subtitle">
              We’re more than a fashion brand — we’re a reflection of Algeria’s
              spirit. Our collections blend everyday ease with timeless
              elegance, crafted for women who move with confidence and live with
              purpose. From morning markets to evening gatherings, we dress the
              rhythm of real life with authenticity and charm.
            </p>
          </div>

          {/* Image Right */}
          <div className="md:w-1/2 w-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 ease-in-out">
            <img
              src={woman}
              alt="Algerian fashion designer"
              className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              decoding="async"
              id="image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
