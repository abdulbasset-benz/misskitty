import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import pic1 from "@/assets/pic1.jpg";
import pic2 from "@/assets/pic2.png";
import pic3 from "@/assets/pic3.png";
import pic4 from "@/assets/pic4.jpg";
import pic5 from "@/assets/pic5.jpg";

gsap.registerPlugin(useGSAP, SplitText);

const HeroSection = () => {
  const { t } = useTranslation();
  const heroContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      document.fonts.ready.then(() => {
        const titleSplit = SplitText.create(".heroTitle", {
          type: "words",
          wordsClass: "word",
          mask: "words",
        });

        gsap.from(titleSplit.words, {
          yPercent: 140,
          duration: 1.5,
          ease: "power4.inOut",
          stagger: 0.05,
        });

        const sideTitles = gsap.utils.toArray<HTMLElement>(".sidetitle");

        const splits = sideTitles.map((el) =>
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
      });

      const images = gsap.utils.toArray<HTMLElement>(".image");
      gsap.set(images, { yPercent: 250, autoAlpha: 0 });

      gsap.to(images, {
        yPercent: 0,
        rotation: (i) => {
          const rotations = [-4, 4, -5, 6, -8];
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
      {/* Hero content */}
      <div className="flex flex-col items-center justify-center mt-16 md:mt-24 relative w-full px-8">
        {/* Main title */}
        <h2 className="text-4xl sm:text-8xl md:text-9xl font-bold uppercase leading-tight text-center mb-1 md:mb-4 heroTitle">
          {t("hero.grace")}
        </h2>

        {/* Side titles + images */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-12">
          {/* Left title */}
          <h1 className="text-2xl md:text-6xl font-semibold uppercase sidetitle leading-tight order-1 md:order-1">
            {t("hero.inEvery")}
          </h1>

          {/* Images */}
          <div className="relative w-[200px] md:w-[340px] h-[250px] md:h-[420px] flex-shrink-0 mx-2 order-3 md:order-2 my-2 md:my-0">
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

          {/* Right title */}
          <h1 className="text-2xl md:text-6xl font-semibold uppercase leading-tight sidetitle order-2 md:order-3">
            {t("hero.detail")}
          </h1>
        </div>

        {/* CTA section */}
        <div className="mt-8 md:mt-10 flex flex-col items-center gap-3 md:gap-4 order-4 pb-8 md:pb-0">
          <button className="bg-black text-white px-6 py-3 text-sm tracking-wider hover:bg-gray-800 transition-all">
            <Link to="/products">{t("hero.shopNow")} →</Link>
          </button>
          <p className="text-gray-600 text-sm md:text-base">
            {t("hero.escape")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;