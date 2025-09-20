import ProductCard from "@/components/ProductCard";
import dress1 from "@/assets/dress-1.jpg";
import dress2 from "@/assets/dress-2.jpg";
import dress3 from "@/assets/dress-3.jpg";
import dress4 from "@/assets/dress-4.jpg";
import { Link } from "react-router";
import { Button } from "./ui/button";

type Product = {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  inStock?: boolean;
  isNew?: boolean;
  onSale?: boolean;
};

const Collection = () => {
  const featuredProducts: Product[] = [
    {
      id: 1,
      image: dress1,
      name: "Elegant Evening Gown",
      category: "Evening Wear",
      price: 20000,
      originalPrice: 399,
      inStock: true,
      isNew: true,
      onSale: true,
    },
    {
      id: 2,
      image: dress2,
      name: "Classic Cocktail Dress",
      category: "Cocktail",
      price: 30000,
      inStock: true,
      isNew: false,
      onSale: false,
    },
    {
      id: 3,
      image: dress3,
      name: "Vintage Inspired Gown",
      category: "Vintage",
      price: 15000,
      originalPrice: 299,
      inStock: false, 
      isNew: false,
      onSale: true,
    },
    {
      id: 4,
      image: dress4,
      name: "Modern Chic Dress",
      category: "Modern",
      price: 25000,
      inStock: true,
      isNew: true,
      onSale: false,
    },
  ];

  const handleOrderClick = (productId: number) => {
    const product = featuredProducts.find((p) => p.id === productId);
    console.log("Order clicked for product:", product);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="uppercase text-xl text-[#f7ce83] mb-2 tracking-wide">
          Curated Collection
        </h2>
        <h1 className="capitalize font-aboreto text-4xl md:text-6xl font-bold mb-4 text-center">
          Featured Collection
        </h1>
        <p className="capitalize font-poppins max-w-2xl text-gray-500 text-center leading-relaxed">
          Discover our handcrafted selection of exquisite gowns and dresses,
          each piece is crafted with meticulous attention to detail and timeless
          elegance
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 ">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            category={product.category}
            price={product.price}
            originalPrice={product.originalPrice}
            inStock={product.inStock}
            isNew={product.isNew}
            onSale={product.onSale}
            onOrderClick={handleOrderClick}
          />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button
          asChild
          className="bg-transparent border-2 border-[#f7ce83] text-[#724f0e] px-8 py-6 rounded-full font-medium hover:bg-[#f7ce83] hover:text-black transition-all duration-300 font-aboreto"
        >
          <Link to={"/products"}>View All Collection</Link>
        </Button>
      </div>
    </div>
  );
};

export default Collection;
