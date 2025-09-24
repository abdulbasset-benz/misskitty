// src/pages/ProductDetails.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

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

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios
      .get<Product>(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("❌ Error fetching product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading product...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8 mt-20 h-screen">
      {/* Images */}
      <div>
        <img
          src={product.images[0]?.url || "/placeholder.png"}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />
        {product.images.length > 1 && (
          <div className="flex gap-3 mt-4">
            {product.images.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt={img.filename}
                className="w-20 h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <h1 className="text-3xl font-bold font-aboreto mb-4">
          {product.name}
        </h1>
        <p className="text-gray-600 font-poppins mb-4">
          {product.description}
        </p>
        <p className="text-2xl font-semibold mb-2">DZD {product.price}</p>
        <p
          className={`mb-6 ${
            product.stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.stock > 0
            ? `${product.stock} in stock`
            : "Out of stock"}
        </p>

        <button
          disabled={product.stock <= 0}
          className={`px-6 py-3 rounded-lg text-lg font-medium transition ${
            product.stock > 0
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
