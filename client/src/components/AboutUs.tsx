import woman from "@/assets/woman.png";
import scissors from "@/assets/scissors.png";

const AboutUs = () => {
  return (
    <div className="mt-8 flex flex-col gap-16">
      {/* Section title (centered, still inside max-width container) */}
      <div className="w-[90%] mx-auto mb-8">
        <h1 className="uppercase text-4xl md:text-5xl font-bold text-center">
          About Us
        </h1>
      </div>

      <div className="w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Image */}
        <div className="md:w-1/2 w-full aspect-[4/3] overflow-hidden">
          <img
            src={scissors}
            alt="Scissors symbolizing craftsmanship"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2 w-full p-8 md:p-16">
          <h2 className="text-2xl font-semibold mb-3">
            The Beginning of the Journey
          </h2>
          <p className=" leading-relaxed">
            Our story began here — in the heart of Algeria, where tradition
            meets creativity. What started as a small dream quickly became a
            mission: to celebrate our culture through fashion, to honor the
            craftsmanship of our land, and to design clothing that speaks to
            both our past and our modern spirit. Each collection carries a piece
            of our identity — woven with passion, purpose, and pride.
          </p>
        </div>
      </div>

      {/* Second section (full-width) */}
      <div className="w-[80%] mx-auto flex flex-col md:flex-row-reverse items-center justify-between">
        {/* Image */}
        <div className="md:w-1/2 w-full aspect-[4/3] overflow-hidden">
          <img
            src={woman}
            alt="Algerian fashion designer"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2 w-full p-8 md:p-16">
          <h2 className="text-2xl font-semibold mb-3">Who Are We?</h2>
          <p className=" leading-relaxed">
            We are more than just a brand — we are a reflection of Algerian
            elegance, energy, and resilience. Our designs are inspired by the
            strength of our people, the beauty of our landscapes, and the
            timeless charm of our heritage. Every piece we create tells a story
            — one that connects you to who you are and where you come from,
            while embracing the future with confidence and style.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
