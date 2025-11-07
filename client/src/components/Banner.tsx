import mesh from "@/assets/mesh-gradient.svg";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation();
  return (
    <div className="relative w-screen md:w-[50rem] mx-auto h-48 md:h-64 lg:h-80 overflow-hidden md:rounded-3xl  flex justify-center my-10">
      {/* Background Image */}
      <img src={mesh} alt="" className="w-full h-full object-cover" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-aboreto">
          {t("banner.title")}
        </h2>

        <Button
          asChild
          className="bg-[#f7ce83] text-black px-6 py-3 md:px-8 md:py-6 rounded-full font-medium hover:bg-[#f5c563] transition-colors"
        >
          <Link to="/products" className="text-lg md:text-xl">
            {t("banner.shopNow")}{" "}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Banner;
