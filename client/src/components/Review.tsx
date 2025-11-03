import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import quoteSign from "@/assets/quote.svg";

const testimonials = [
  {
    id: 1,
    name: "Rania",
    quote:
      "Thank you for the excellent product, I'm very satisfied, and wish you all the best!",
  },
  {
    id: 2,
    name: "Souna",
    quote:
      "Mashallah, everything is exactly as described. Perfect! The price does not reflect the quality. May Allah bless you!",
  },
  {
    id: 3,
    name: "Cheri Fa",
    quote:
      "I am extremely happy with my purchase — the quality exceeded my expectations. Highly recommend to everyone!",
  },
  {
    id: 4,
    name: "Meriem B.",
    quote:
      "I have received my order, and I love it! Great quality. All the best to come!",
  },
  {
    id: 5,
    name: "Manar_Manar",
    quote:
      "CouCou! I have just received my order and I am very satisfied. The quality is top-notch — thank you!",
  },
  {
    id: 6,
    name: "Meriem M.",
    quote:
      "I'm telling the truth when I say that the product exceeds its price. May Allah reward you for your honesty and integrity.",
  },
];

const Review = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
          What our customers say
        </h2>
        <h1 className="font-serif text-5xl md:text-7xl font-light mb-6 leading-tight">
          Honest <span className="italic font-light">Testimonials</span>
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