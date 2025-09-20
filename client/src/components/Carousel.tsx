import Marquee from "react-fast-marquee";

const Carousel = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden py-6 bg-transparent">
      <div className="flex whitespace-nowrap items-center gap-8 text-4xl overflow-hidden font-fatface">
        <Marquee className="overflow-hidden" pauseOnHover autoFill>
          <span className="md:text-7xl text-[#FFDBB6] pl-3">
            ELEGANCE • STYLE • LUXURY • FOREVER •
          </span>
          <span className="md:text-7xl text-[#FFDBB6] pl-7">
            ELEGANCE • STYLE • LUXURY • FOREVER •
          </span>
          <span className="md:text-7xl text-[#FFDBB6] pl-7">
            ELEGANCE • STYLE • LUXURY • FOREVER •
          </span>
        </Marquee>
      </div>
    </div>
  );
};

export default Carousel;
