import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import woman from "@/assets/woman.png";
import scissors from "@/assets/scissors.png";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const AboutUs = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const sections = gsap.utils.toArray("#section");
      gsap.set(".image", {
        clipPath: "inset(0 100% 0 0)",
      });
      document.fonts.ready.then(() => {
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
        sections.forEach((section) => {
          const el = section as Element;
          const title = el.querySelector(".abouttitle");
          const subtitle = el.querySelector(".aboutsubtitle");
          const image = el.querySelector(".image");

          const titleSplit = SplitText.create(title, {
            type: "lines",
            mask: "lines",
          });

          const subtitleSplit = SplitText.create(subtitle, {
            type: "lines",
            mask: "lines",
          });

          gsap.to(image, {
            clipPath: "inset(0 0% 0 0)",
            duration: 1,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: image,
              start: "top 80%",
              end: "bottom 50%",
            },
          });

          gsap.from(titleSplit.lines, {
            yPercent: 120,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
              end: "bottom 50%",
              scrub: 1,
            },
          });

          gsap.from(subtitleSplit.lines, {
            yPercent: 120,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: subtitle,
              start: "top 80%",
              end: "bottom 50%",
              scrub: 1,
            },
          });
        });
      });
    },
    { scope: containerRef }
  );
  return (
    <div
      className="mt-8 flex flex-col gap-24 bg-gradient-to-b from-white to-[#fefaf2] text-gray-800"
      ref={containerRef}
    >
      {/* Intro Section */}
      <div className="flex flex-col items-center text-center px-6">
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#f7ce83] to-transparent mb-6"></div>
        <h2 className="uppercase text-xs md:text-sm tracking-[0.3em] text-gray-500 mb-4">
          {t("aboutus.getToKnowUs")}
        </h2>
        <h1 className="font-serif text-center text-5xl md:text-7xl font-light mb-6 leading-tight heading">
          {t("aboutus.title")}
        </h1>
        <p className="font-sans max-w-2xl text-gray-600 text-lg leading-relaxed subheading">
          {t("aboutus.subtitle")}
        </p>
      </div>

      {/* Main Sections */}
      <section className="container mx-auto px-4 py-8 space-y-32">
        {/* Section 1 */}
        <div
          className="flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto"
          id="section"
        >
          {/* Image Left */}
          <div className="md:w-1/2 w-full flex justify-center">
            <div className="relative w-[85%] md:w-[80%] lg:w-[75%] aspect-[4/5] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 ease-in-out">
              <img
                src={scissors}
                alt="Scissors symbolizing craftsmanship"
                className="absolute inset-0 w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700 ease-out image"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Text Right */}
          {/* Text Right */}
          <div className="md:w-1/2 w-full flex justify-start">
            <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-3xl md:text-7xl font-normal font-serif leading-tight tracking-wide abouttitle">
                {t("aboutus.journeyTitle")}
              </h2>
              <div className="w-16 h-[2px] bg-[#f7ce83] mb-4"></div>
              <p className="text-gray-700 leading-relaxed text-lg text-center md:text-right aboutsubtitle">
                {t("aboutus.journeyDescription")}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div
          className="flex flex-col-reverse md:flex-row items-center gap-12 max-w-7xl mx-auto"
          id="section"
        >
          {/* Text Left */}
          <div className="md:w-1/2 w-full flex justify-start">
            <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-3xl md:text-7xl font-normal font-serif tracking-wide abouttitle">
                {t("aboutus.journeyTitleTwo")}
              </h2>
              <div className="w-16 h-[2px] bg-[#f7ce83] mb-4"></div>
              <p className="text-gray-700 leading-relaxed text-lg text-center md:text-right aboutsubtitle">
                {t("aboutus.journeyDescriptionTwo")}
              </p>
            </div>
          </div>

          {/* Image Right */}
          <div className="md:w-1/2 w-full flex justify-center">
            <div className="relative w-[85%] md:w-[80%] lg:w-[75%] aspect-[4/5] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 ease-in-out">
              <img
                src={woman}
                alt="Scissors symbolizing craftsmanship"
                className="absolute inset-0 w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700 ease-out image"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
