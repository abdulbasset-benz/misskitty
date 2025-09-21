import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ProductCard from "@/components/ProductCard";
import dress1 from "@/assets/dress-1.jpg";
import dress2 from "@/assets/dress-2.jpg";
import dress3 from "@/assets/dress-3.jpg";
import dress4 from "@/assets/dress-4.jpg";
import { Link } from "react-router";
import { Button } from "../components/ui/button";

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

const Products = () => {
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
  return (
    <div className="mt-20">
      {/* Hero Section */}
      <div className="bg-[#F0ECE6] flex flex-col items-center justify-center w-full p-6 gap-4">
        <h1 className="font-aboreto font-bold text-4xl">Our Collection</h1>
        <p className="text-center font-poppins text-gray-500 max-w-2xl">
          Explore our curated selection of luxury gowns and dresses, each piece
          meticulously crafted to celebrate your unique style and grace.
        </p>
      </div>

      {/* Main Layout */}
      {/* Main Layout */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-[90%] mx-auto my-10">
  {/* Filters Sidebar */}
  <aside className="border-r border-gray-200 p-4 md:col-span-1">
    <h2 className="font-bold text-lg mb-4">Filters</h2>

    <Accordion type="multiple">
      {/* Size */}
      <AccordionItem value="size">
        <AccordionTrigger>Size</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2">
            {["XS", "S", "M", "L", "XL", "2X"].map((size) => (
              <button
                key={size}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 text-sm"
              >
                {size}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Availability */}
      <AccordionItem value="availability">
        <AccordionTrigger>Availability</AccordionTrigger>
        <AccordionContent>
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox id="in-stock" />
            <Label htmlFor="in-stock">Available (450)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="out-stock" />
            <Label htmlFor="out-stock">Out of Stock (18)</Label>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Category */}
      <AccordionItem value="category">
        <AccordionTrigger>Category</AccordionTrigger>
        <AccordionContent>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shirts">Shirts</SelectItem>
              <SelectItem value="tshirts">T-Shirts</SelectItem>
              <SelectItem value="jackets">Jackets</SelectItem>
            </SelectContent>
          </Select>
        </AccordionContent>
      </AccordionItem>

      {/* Price Range */}
      <AccordionItem value="price">
        <AccordionTrigger>Price Range</AccordionTrigger>
        <AccordionContent>
          <Slider defaultValue={[100]} max={500} step={10} />
          <p className="text-sm text-gray-500 mt-2">Up to $500</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </aside>

  {/* Products Grid */}
  <section className="md:col-span-3">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
        />
      ))}
    </div>

    {/* View All Button */}
    <div className="flex justify-center mt-12">
      <Button
        asChild
        className="bg-transparent border-2 border-[#f7ce83] text-[#724f0e] px-8 py-6 rounded-full font-medium hover:bg-[#f7ce83] hover:text-black transition-all duration-300 font-aboreto"
      >
        <Link to={"/products"}>View All Collection</Link>
      </Button>
    </div>
  </section>
</div>

    </div>
  );
};

export default Products;
