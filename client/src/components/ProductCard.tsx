import { Link } from "react-router";

type ProductCardProps = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  inStock?: boolean;
};

const ProductCard = ({
  id,
  image,
  name,
  description,
  price,
  inStock = true,
}: ProductCardProps) => {
  return (
    <div className="relative bg-white rounded-lg shadow-sm overflow-hidden w-full max-w-xs mx-auto border border-gray-200">
      {/* Image Container */}
      <Link
        to={inStock ? `/products/${id}` : "#"}
        className="relative bg-gray-100 block h-64 w-full overflow-hidden"
      >
        <img
          src={image}
          alt={name}
          className={`h-full w-full object-cover ${
            !inStock ? "grayscale opacity-75" : ""
          }`}
        />

        {/* Stock badge */}
        {!inStock && (
          <>
            <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded">
              OUT OF STOCK
            </span>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                Out of Stock
              </span>
            </div>
          </>
        )}
      </Link>

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
