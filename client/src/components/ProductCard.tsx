
type ProductCardProps = {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  inStock?: boolean;
  isNew?: boolean;
  onSale?: boolean;
  onOrderClick?: (productId: number) => void;
};

const ProductCard = ({
  id,
  image,
  name,
  category,
  price,
  originalPrice,
  inStock = true,
  isNew = false,
  onSale = false,
  onOrderClick,
}: ProductCardProps) => {
  
  const handleOrderClick = () => {
    if (inStock && onOrderClick) {
      onOrderClick(id);
    }
  };
  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            inStock ? 'group-hover:scale-105' : 'grayscale opacity-75'
          }`}
        />

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {!inStock && (
            <span className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded">
              OUT OF STOCK
            </span>
          )}
          {inStock && isNew && (
            <span className="bg-[#f7ce83] text-black text-xs font-medium px-2 py-1 rounded">
              NEW
            </span>
          )}
          {inStock && onSale && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              SALE
            </span>
          )}
        </div>

        {/* Hover Overlay - Only show if in stock */}
        {inStock && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button 
              onClick={handleOrderClick}
              className="bg-white text-black px-6 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#f7ce83]"
            >
              Quick Order
            </button>
          </div>
        )}

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-1 font-poppins">
          {category}
        </p>
        
        <h3 className={` mb-2 line-clamp-2 transition-colors font-aboreto font-bold ${
          inStock 
            ? 'text-gray-900 group-hover:text-[#f7ce83]' 
            : 'text-gray-500'
        }`}>
          {name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-lg font-semibold ${
              inStock ? 'text-gray-900' : 'text-gray-500'
            }`}>
              DZD {price}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-500 line-through">
                DZD {originalPrice}
              </span>
            )}
          </div>
          
          {/* Order Button */}
          <button
            onClick={handleOrderClick}
            disabled={!inStock}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              inStock
                ? 'bg-[#f7ce83] text-black hover:bg-[#f5c563] hover:shadow-md transform hover:scale-105 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {inStock ? 'Order Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;