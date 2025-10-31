import HeroSection from "@/components/HeroSection";
import Collection from "@/components/Collection";
import Banner from "@/components/Banner";
import AboutUs from "@/components/AboutUs";
import Review from "@/components/Review";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <Collection/>
      <Review />
      <Banner/>
    </div>
  );
};

export default Home;
