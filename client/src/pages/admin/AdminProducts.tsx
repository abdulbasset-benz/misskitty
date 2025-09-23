import axios from "axios";
import { useEffect, useState } from "react";

// You can keep the types outside the component
type Image = {
  url: string;
  id?: number; // Added id as it's common in API responses
};

type Product = {
  id: number;
  images: Image[];
  description: string;
  name: string;
  price: number;
  inStock?: boolean;
};

const ProductsPage = () => {
  // Correctly type the state to hold an array of Product objects
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        // Ensure the data matches the Product[] type
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error("Error fetching products:", err);
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
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <li key={product.id} className="border rounded-lg shadow-md overflow-hidden bg-white">
            {/* Display the first image if it exists */}
            {product.images && product.images.length > 0 && (
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <p className="text-lg font-bold text-green-600">${product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;