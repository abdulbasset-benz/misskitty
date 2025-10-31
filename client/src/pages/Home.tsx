import HeroSection from "@/components/HeroSection";
import Collection from "@/components/Collection";
import Banner from "@/components/Banner";
import AboutUs from "@/components/AboutUs";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <Collection/>
      <Banner/>
    </div>
  );
};

export default Home;
