import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const AddProductsPage: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);

    images.forEach((file) => {
      formData.append("images", file); 
    });

    try {
      const res = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Product created:", res.data);
    } catch (err: any) {
      console.error("❌ Error creating product:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg space-y-6 border border-gray-200">
        <h2 className="text-3xl font-serif font-semibold text-center text-gray-800 mb-6">Create New Product ✨</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 placeholder-gray-500 text-gray-700"
            aria-label="Product Name"
          />
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 resize-none placeholder-gray-500 text-gray-700"
            aria-label="Product Description"
          />
          <input
            type="number"
            placeholder="Price (DZD)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 placeholder-gray-500 text-gray-700"
            aria-label="Price"
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 placeholder-gray-500 text-gray-700"
            aria-label="Stock Quantity"
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-gray-700 font-medium mb-2">
            Product Images 🖼️
          </label>
          <input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            title="Select product images"
            className="w-full text-gray-700 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gray-800 text-white font-bold py-5 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300 transform active:scale-95"
        >
          Create Product
        </Button>
      </form>
    </div>
  );
};

export default AddProductsPage;