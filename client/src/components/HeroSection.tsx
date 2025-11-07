import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next"; // Add this import
import pic1 from "@/assets/pic1.jpg";
import pic2 from "@/assets/pic2.png";
import pic3 from "@/assets/pic3.png";
import pic4 from "@/assets/pic4.jpg";
import pic5 from "@/assets/pic5.jpg";

gsap.registerPlugin(useGSAP, SplitText);

const HeroSection = () => {
  const { t } = useTranslation(); // Add this hook
  const heroContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Split main hero title into words
      document.fonts.ready.then(() => {
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
      {/* Hero content */}
      <div className="flex flex-col items-center justify-center mt-24 relative w-full px-8">
        <h2 className="text-8xl md:text-9xl font-bold uppercase leading-tight text-center mb-4 heroTitle">
          {t('hero.grace')}
        </h2>

        <div className="flex items-center justify-center gap-3 md:gap-12 mt-4">
          <h1 className="text-3xl md:text-6xl font-semibold uppercase sidetitle leading-20">
            {t('hero.inEvery')}
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

          <h1 className="text-3xl md:text-6xl font-semibold uppercase leading-tight sidetitle">
            {t('hero.detail')}
          </h1>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 flex flex-col items-center gap-4">
        <button className="bg-black text-white px-10 py-3 text-sm tracking-wider hover:bg-gray-800 transition-all">
          <Link to="/products">{t('hero.shopNow')} →</Link>
        </button>
        <p className="text-gray-600 text-sm md:text-base">
          {t('hero.escape')}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;