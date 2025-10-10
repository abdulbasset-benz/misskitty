import { Button } from "@/components/ui/button";
import api from "@/api/axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Eye, Plus, X } from "lucide-react";
import { toast } from "sonner";

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
  sizes: string[];
  colors: string[];
  images: Image[];
};

const AdminProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    sizes: "",
    colors: "",
    newImages: [] as File[],
    removedImages: [] as number[]
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
const response = await api.get(`/products/${id}`); // ✅ uses baseURL from api.ts

      const productData = response.data;
      
      setProduct(productData);
      setFormData({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        sizes: productData.sizes.join(", "),
        colors: productData.colors.join(", "),
        newImages: [],
        removedImages: []
      });
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product data");
      toast.error("Failed to load product data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageRemove = (imageId: number) => {
    setFormData(prev => ({
      ...prev,
      removedImages: [...prev.removedImages, imageId]
    }));
  };

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        newImages: [...prev.newImages, ...Array.from(e.target.files!)]
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    const formDataToSend = new FormData();

    // Add text fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("stock", formData.stock.toString());

    // Convert comma-separated strings into arrays
    const sizesArray = formData.sizes
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
    const colorsArray = formData.colors
      .split(",")
      .map(c => c.trim())
      .filter(Boolean);

    // Send them as JSON strings (so backend can parse)
    formDataToSend.append("sizes", JSON.stringify(sizesArray));
    formDataToSend.append("colors", JSON.stringify(colorsArray));

    // Add new images
    formData.newImages.forEach(image => {
      formDataToSend.append("images", image);
    });

    // Add removed image IDs
    formData.removedImages.forEach(id => {
      formDataToSend.append("removedImages", id.toString());
    });

    await api.put(`/products/${id}`, formDataToSend, { // ✅ automatically adds baseURL
  headers: { "Content-Type": "multipart/form-data" },
});

    toast.success("Product updated successfully");
    window.location.href = `/admin/products/${id}`;
  } catch (err) {
    console.error("Error updating product:", err);
    setError("Failed to update product");
    toast.error("Failed to update product. Please check your inputs.");
  } finally {
    setSubmitting(false);
  }
};


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading product data...</p>
        </div>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-500 text-lg">Error: {error}</p>
          <Button onClick={fetchProduct} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Product not found</h3>
          <Button asChild>
            <Link to="/admin/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <Link to={`/admin/products/${id}`}>
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            View Product
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Product Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Sizes (comma separated)</label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleInputChange}
                placeholder="S, M, L, XL"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Colors (comma separated)</label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleInputChange}
                placeholder="Red, Blue, Green"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          
          {/* Current Images */}
          {product.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {product.images
                .filter(img => !formData.removedImages.includes(img.id))
                .map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt={`Product ${image.id}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(image.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="mt-2 text-center text-sm text-gray-500">
                      Current Image
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* New Images Preview */}
          {formData.newImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {formData.newImages.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`New ${index}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <div className="mt-2 text-center text-sm text-gray-500">
                    New Image
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Image Upload Control */}
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageAdd}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Plus className="h-10 w-10 text-blue-500 mb-2" />
              <p className="text-sm text-gray-600">
                {formData.newImages.length > 0 
                  ? `${formData.newImages.length} image(s) selected` 
                  : "Click to upload images or drag and drop"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB each
              </p>
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Product description..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link to={`/admin/products/${id}`}>Cancel</Link>
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Updating...
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductEdit;