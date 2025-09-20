import heroImg from "@/assets/heroim.jpg";
import { Button } from "./ui/button";
import { Link } from "react-router";
import Carousel from "./Carousel";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col items-center overflow-hidden font-aboreto">
      {/* Background */}
      <div className="h-screen w-screen relative z-0">
        <img
          src={heroImg}
          alt="Fashion gowns and dresses"
          className="w-full h-full object-cover scale-105 brightness-90"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-wide text-[#F8FAFC] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
  Grace in Every Detail
</h1>

        {/* Accent underline */}
        <div className="mt-5 h-[4px] w-32 bg-gradient-to-r from-[#D4AF37] via-[#F5DEB3] to-[#D4AF37] rounded-full shadow-lg"></div>


       <p className="mt-8 text-lg md:text-2xl text-[#D1D5DB] max-w-2xl leading-relaxed">
  Exclusive gowns crafted for <span className="text-[#f7ce83] font-semibold">timeless sophistication</span>.
</p>


        {/* CTA */}
        <div className="pt-12">
          <Button
  asChild
  className="px-10 py-5 text-lg font-semibold tracking-wider rounded-full 
             bg-[#D4AF37] text-black 
             border border-transparent 
             hover:bg-transparent hover:text-[#F8FAFC] hover:border-[#D4AF37] 
             transition-all duration-500 shadow-xl backdrop-blur-sm"
>
  <Link to="/collection">See our Collection</Link>
</Button>

        </div>

        {/* Carousel at the bottom */}
        <Carousel />
      </div>
    </div>
  );
};

export default HeroSection;