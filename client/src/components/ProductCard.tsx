import { Link } from "react-router";
import LightboxModal from "@/components/LightboxModal";

type ProductImage = {
  id: number;
  filename: string;
  url: string;
};

export type ProductCardProps = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  images: ProductImage[];
  sizes?: string[];
  colors?: string[];
};

const ProductCard = ({
  id,
  image,
  name,
  description,
  price,
  inStock = true,
  images = [],
  sizes = [],
  colors = [],
}: ProductCardProps) => {
  // Transform images for lightbox
  const lightboxImages = images.map((img) => ({
    id: img.id,
    url: img.url,
    alt: name,
  }));

  return (
    <div className="relative bg-white rounded-lg shadow-sm overflow-hidden w-full max-w-xs mx-auto border border-gray-200">
      {/* Image Container */}
      <div className="relative bg-gray-100 h-64 w-full overflow-hidden">
        {lightboxImages.length > 1 ? (
          <LightboxModal
            images={lightboxImages}
            trigger={
              <button className="w-full h-full">
                <img
                  src={image}
                  alt={name}
                  className={`h-full w-full object-cover hover:scale-105 transition-transform duration-300 ${
                    !inStock ? "grayscale opacity-75" : ""
                  }`}
                />
              </button>
            }
          />
        ) : (
          <Link
            to={inStock ? `/products/${id}` : "#"}
            className="block h-full w-full"
          >
            <img
              src={image}
              alt={name}
              className={`h-full w-full object-cover hover:scale-105 transition-transform duration-300 ${
                !inStock ? "grayscale opacity-75" : ""
              }`}
            />
          </Link>
        )}

        {/* Stock badge */}
        {!inStock && (
          <>
            <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded z-10">
              OUT OF STOCK
            </span>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
              <span className="text-white font-semibold text-lg">
                Out of Stock
              </span>
            </div>
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col gap-3">
        <h3
          className={`line-clamp-2 font-aboreto font-bold ${
            inStock ? "text-gray-900" : "text-gray-500"
          }`}
        >
          {name}
        </h3>

        <p className="text-gray-600 font-poppins line-clamp-2 text-sm">
          {description}
        </p>

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="font-medium text-gray-700">Sizes:</span>
            {sizes.map((size, idx) => (
              <span
                key={idx}
                className="px-2 py-1 border rounded-md text-gray-700 bg-gray-50"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700 text-xs">Colors:</span>
            <div className="flex gap-2">
              {colors.map((color, idx) => (
                <span
                  key={idx}
                  title={color}
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          </div>
        )}

        <span
          className={`text-lg font-semibold ${
            inStock ? "text-gray-900" : "text-gray-500"
          }`}
        >
          DZD {price}
        </span>

        {/* Full-width Order Button */}
        <Link
          to={inStock ? `/products/${id}` : "#"}
          className={`w-full py-2 text-sm font-medium rounded-md text-center ${
            inStock
              ? "bg-[#f7ce83] text-black"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {inStock ? "Order Now" : "Unavailable"}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
