import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "@/components/ProductCard";
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

type ProductImage = {
  id: number;
  filename: string;
  url: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: ProductImage[];
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mt-20">
      {/* Hero Section */}
      <div className="bg-[#F0ECE6] flex flex-col items-center justify-center w-full p-6 gap-4">
        <h1 className="font-aboreto font-bold text-4xl md:text-7xl">
          Our Collection
        </h1>
        <p className="text-center font-poppins text-gray-500 max-w-2xl">
          Explore our curated selection of luxury gowns and dresses, each piece
          meticulously crafted to celebrate your unique style and grace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-[90%] mx-auto my-10 h-screen">
        {/* Filters Sidebar */}
        <aside className="md:col-span-1 font-poppins md:sticky">
          <div className="border border-[#F0ECE6] p-4 rounded-lg">
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
                    <Label htmlFor="in-stock">Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="out-stock" />
                    <Label htmlFor="out-stock">Out of Stock</Label>
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
                  <div className="p-2">
                    <Slider defaultValue={[100]} max={500} step={10} />
                    <p className="text-sm text-gray-500 mt-2">Up to $500</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </aside>

        {/* Products Grid */}
        <section className="md:col-span-3">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.images[0]?.url || "/placeholder.png"}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  inStock={product.stock > 0}
                  images={product.images} // Pass all images for lightbox
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Products;
