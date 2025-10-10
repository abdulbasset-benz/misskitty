import { Button } from "@/components/ui/button";
import api from "@/api/axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Trash2, Edit, Eye } from "lucide-react";

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
  createdAt: string;
  updatedAt: string;
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");  
      
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

  const handleDeleteProduct = async (productId: number) => {
  console.log('Delete button clicked for product ID:', productId);
  
  if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
    console.log('Delete cancelled by user');
    return;
  }

  console.log('User confirmed deletion, proceeding...');

  try {
    setDeleteLoading(productId);
    
    const response = await api.delete(`/products/${productId}`, {
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

    
    console.log('Delete response:', response);
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    
    // Remove the product from the state
    setProducts(prevProducts => {
      const newProducts = prevProducts.filter(product => product.id !== productId);
      console.log('Updated products list:', newProducts);
      return newProducts;
    });
    
    console.log("Product deleted successfully");
    alert("Product deleted successfully!"); // Add success message
    
  } catch (err) {
    console.error("Full error object:", err);
    if (typeof err === "object" && err !== null && "response" in err) {
      console.error("Error response:", err.response);
      // @ts-expect-error: err is likely an AxiosError
      console.error("Error message:", err.message);
      // @ts-expect-error: err is likely an AxiosError
      console.error("Error status:", err.response?.status);
      // @ts-expect-error: err is likely an AxiosError
      console.error("Error data:", err.response?.data);
    }

    // More specific error handling
    if (typeof err === "object" && err !== null && "response" in err) {
      // Server responded with error status
      // @ts-expect-error: err is likely an AxiosError
      const errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
      alert(`Failed to delete product: ${errorMessage}`);
    } else if (typeof err === "object" && err !== null && "request" in err) {
      // Request was made but no response received
      alert("Failed to delete product: No response from server. Check if server is running.");
    } else {
      // Something else happened
      alert(`Failed to delete product: ${err instanceof Error ? err.message : String(err)}`);
    }
  } finally {
    setDeleteLoading(null);
    console.log('Delete operation completed, loading state cleared');
  }
};

  const handleEditProduct = (productId: number) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const handleViewProduct = (productId: number) => {
    navigate(`/admin/products/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-500 text-lg">Error: {error}</p>
          <Button onClick={fetchProducts} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div className="text-sm text-gray-600">
          {products.length} product{products.length !== 1 ? 's' : ''} found
        </div>
      </div>
      
      <div className="flex justify-end mb-6">
        <Button asChild className="flex items-center gap-2">
          <Link to="/admin/products/add">
            <span>+</span>
            Add Product
          </Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first product</p>
          <Button asChild>
            <Link to="/admin/products/add">Add Your First Product</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200"
            >
              {/* Product Image */}
              <div className="relative bg-gray-200 h-48">
                {product.images && product.images.length > 0 ? (
                  <>
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onLoad={() => console.log("Image loaded successfully:", product.images[0].url)}
                      onError={(e) => {
                        console.error("Image failed to load:", product.images[0].url);
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+';
                      }}
                    />
                    {/* Image count badge */}
                    {product.images.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        +{product.images.length - 1} more
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 truncate" title={product.name}>
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Product Info */}
                <div className="mb-4 space-y-1">
                  <p className="text-lg font-bold text-green-600">
                    {product.price.toFixed(2)} DZD
                  </p>
                  <p className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </p>
                  
                  {/* Sizes and Colors */}
                  {product.sizes && product.sizes.length > 0 && (
                    <p className="text-xs text-gray-500">
                      Sizes: {product.sizes.join(", ")}
                    </p>
                  )}
                  {product.colors && product.colors.length > 0 && (
                    <p className="text-xs text-gray-500">
                      Colors: {product.colors.join(", ")}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  {/* View Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewProduct(product.id)}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  
                  {/* Edit and Delete Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditProduct(product.id)}
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDeleteProduct(product.id)}
                      disabled={deleteLoading === product.id}
                      className="flex-1"
                    >
                      {deleteLoading === product.id ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                          <span>Deleting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;