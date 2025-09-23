import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

type Image = {
  id: number;
  filename: string;
  url: string;
  productId: number;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: Image[];
  createdAt: string;
  updatedAt: string;
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        
        
        if (response.data[0]?.images) {
          console.log("First product images:", response.data[0].images);
          console.log("First image URL:", response.data[0].images[0]?.url);
        }
        
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

 

  if (loading) {
    return <div className="text-center p-4">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
      
      <div className="flex justify-end mb-4">
        <Button asChild>
          <Link to={"/admin/products/add"}>Add Product +</Link>
        </Button>
      </div>

      

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="border rounded-lg shadow-md overflow-hidden bg-white"
          >
            <div className="relative bg-gray-200">
              {product.images && product.images.length > 0 ? (
                <>
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onLoad={() => console.log("Image loaded successfully:", product.images[0].url)}
                  />
                  {/* Debug overlay */}
                  <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs p-1 max-w-full truncate">
                    {product.images[0].filename}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>
              <p className="text-lg font-bold text-green-600">
                ${product.price}
              </p>
              <p className="text-sm text-gray-500">
                Stock: {product.stock} | Images: {product.images?.length || 0}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;