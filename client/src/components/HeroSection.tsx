import heroImg from "@/assets/heroim.jpg";
import { Button } from "./ui/button";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col items-center overflow-hidden">
      {/* Background */}
      <div className="h-screen w-screen relative z-0">
        <img
          src={heroImg}
          alt="Fashion gowns and dresses"
          className="w-full h-full object-cover scale-105 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 font-aboreto">
        <h1 className="text-6xl md:text-8xl md:max-w-5xl font-extrabold text-white uppercase drop-shadow-lg">
          Grace in Every Detail
        </h1>

        {/* Accent underline */}
        <div className="mt-4 h-[3px] w-24 bg-gradient-to-r from-white/90 via-gray-300 to-white/90 rounded-full"></div>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
          Exclusive gowns crafted for timeless sophistication.
        </p>

        <div className="pt-10">
          <Button
            asChild
            className="px-10 py-5 text-lg font-semibold tracking-wider rounded-full bg-white text-black border border-transparent hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 shadow-lg"
          >
            <Link to="/collection">See our Collection</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
