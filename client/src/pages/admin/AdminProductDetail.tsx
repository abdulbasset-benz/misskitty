import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import api from "@/api/axios";
import { ArrowLeft, Edit, Trash2, Package, Calendar, DollarSign } from "lucide-react";
import LightboxModal from "@/components/LightboxModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  sizes: string[];
  colors: string[];
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
};

const AdminProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    
    const fetchProduct = async () => {
      try {
        const response = await api.get<Product>(`/products/${id}`); // ✅ changed
        setProduct(response.data);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDeleteProduct = async () => {
    if (!product || !window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleteLoading(true);
      await api.delete(`/products/${product.id}`); // ✅ changed
      navigate('/admin/products');
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/admin/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const lightboxImages = product.images.map((img) => ({
    id: img.id,
    url: img.url,
    alt: product.name,
  }));

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500">Product ID: {product.id}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button asChild>
            <Link to={`/admin/products/edit/${product.id}`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Product
            </Link>
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDeleteProduct}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Deleting...
              </div>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Product
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Product Images ({product.images.length})
            </h2>
            
            {product.images.length > 0 ? (
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                  <LightboxModal
                    images={lightboxImages}
                    initialIndex={selectedImageIndex}
                    trigger={
                      <button className="w-full h-full group">
                        <img
                          src={product.images[selectedImageIndex]?.url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </button>
                    }
                  />
                </div>

                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((img, index) => (
                      <button
                        key={img.id}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          index === selectedImageIndex
                            ? "border-blue-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  Click on the main image to open in lightbox mode
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No images available for this product
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Product Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Product Name</label>
                <p className="text-lg font-medium text-gray-900">{product.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Description</label>
                <p className="text-gray-900 leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Price</label>
                  <p className="text-2xl font-bold text-green-600">
                    DZD {product.price.toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Stock</label>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-semibold text-gray-900">{product.stock}</p>
                    <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Product Variants</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Available Sizes</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((size, index) => (
                      <Badge key={index} variant="outline">{size}</Badge>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No sizes specified</span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Available Colors</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.colors && product.colors.length > 0 ? (
                    product.colors.map((color, index) => (
                      <Badge key={index} variant="outline">{color}</Badge>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No colors specified</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Timestamps
            </h2>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Created</label>
                <p className="text-gray-900">
                  {new Date(product.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Last Updated</label>
                <p className="text-gray-900">
                  {new Date(product.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetail;