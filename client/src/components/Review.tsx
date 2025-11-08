import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import quoteSign from "@/assets/quote.svg";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);



const Review = () => {
  const { t } = useTranslation();
  const testimonials = t('testimonials.list', { returnObjects: true }) as {
    id: number;
    name: string;
    quote: string;
  }[];
  useGSAP(() => {
    document.fonts.ready.then(() => {
      const splitHeading = SplitText.create(".testheading", {
        type: "words",
        wordsClass: "word",
        mask: "words",
      });

      gsap.from(splitHeading.words, {
        yPercent: 140,
        duration: 1.5,
        ease: "power4.inOut",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".testheading",
          start: "top 80%",
          end: "bottom 50%",
          scrub: 1,
        },
      });
    });
  });
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [current, isPaused]);

  return (
    <div className="flex flex-col gap-24 bg-gradient-to-b from-white to-[#fefaf2] text-gray-800 py-20">
      {/* Header */}
      <div className="flex flex-col items-center text-center px-6">
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#f7ce83] to-transparent mb-6"></div>
        <h2 className="uppercase text-xs md:text-sm tracking-[0.3em] text-gray-500 mb-4">
          {t("testimonials.customerReviews")}
        </h2>
        <h1 className="font-serif text-5xl md:text-7xl font-light mb-6 leading-tight testheading">
          {t("testimonials.honestTestimonials")}

        </h1>
      </div>

      {/* Carousel Container */}
      <div
        className="relative flex items-center justify-center w-full px-6 md:px-24"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Previous Button */}
        <button
          onClick={goToPrev}
          className="absolute left-4 md:left-12 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-[#fefaf2] transition-all duration-300 group"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4 md:w-6 md:h-6 text-gray-600 group-hover:text-[#f7ce83] transition-colors" />
        </button>

        {/* Testimonial Card - Fixed Height */}
        <div className="max-w-4xl w-full">
          <div
            key={current}
            className="bg-white shadow-xl rounded-2xl p-10 md:p-16 relative min-h-[280px] flex flex-col justify-center"
          >
            {/* Decorative Quote Icon */}
            <div className="absolute -top-3 -left-4 md:top-2 md:left-2 opacity-70">
              <img className="" src={quoteSign} alt="" />
            </div>

            {/* Quote Text */}
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                "{testimonials[current].quote}"
              </p>

              {/* Author */}
              <p className="text-right text-base font-semibold text-gray-600">
                — {testimonials[current].name}
              </p>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-4 md:right-12 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-[#fefaf2] transition-all duration-300 group"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4 md:w-6 md:h-6 text-gray-600 group-hover:text-[#f7ce83] transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default Review;
