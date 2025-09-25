import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { ShoppingBag, Truck, Shield, Heart } from "lucide-react";
import LightboxModal from "@/components/LightboxModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  sizes?: string[]; // ✅ dynamic
  colors?: string[]; // ✅ dynamic
};

type OrderForm = {
  dressName: string;
  userName: string;
  phoneNumber: string;
  wilaya: string;
  commune: string; // ✅ new field
  address: string;
  state: string;
  size: string;
  color: string;
};

const ALGERIAN_WILAYAS = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arréridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
];

// Default fallback values if product.sizes/colors are missing
const DEFAULT_SIZES = ["36", "38", "40", "42", "44"];
const DEFAULT_COLORS = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Pink",
  "Purple",
  "Gold",
  "Silver",
];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [orderForm, setOrderForm] = useState<OrderForm>({
    dressName: "",
    userName: "",
    phoneNumber: "",
    wilaya: "",
    commune: "", // ✅ added
    address: "",
    state: "",
    size: "",
    color: "",
  });

  // Determine available sizes/colors with fallback
  const availableSizes =
    product && product.sizes && product.sizes.length > 0
      ? product.sizes
      : DEFAULT_SIZES;
  const availableColors =
    product && product.colors && product.colors.length > 0
      ? product.colors
      : DEFAULT_COLORS;

  // Set dressName, size and color defaults when product loads
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get<Product>(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setOrderForm((prev) => ({
          ...prev,
          dressName: res.data.name,
          size:
            res.data.sizes && res.data.sizes.length > 0
              ? res.data.sizes[0]
              : DEFAULT_SIZES[0],
          color:
            res.data.colors && res.data.colors.length > 0
              ? res.data.colors[0]
              : DEFAULT_COLORS[0],
        }));
      })
      .catch((err) => console.error("❌ Error fetching product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // Debug logs for form state to check updates
  useEffect(() => {
    console.log("Order form state:", orderForm);
  }, [orderForm]);

  const handleInputChange = (field: keyof OrderForm, value: string) => {
    setOrderForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    const phone = "213771836015"; // Algeria number
    const message = `📦 New Order!
  
Dress: ${orderForm.dressName}
Name: ${orderForm.userName}
Phone: ${orderForm.phoneNumber}
Wilaya: ${orderForm.wilaya}
Commune: ${orderForm.commune}
Address: ${orderForm.address}
State: ${orderForm.state}
Size: ${orderForm.size}
Color: ${orderForm.color}
Price: ${product.price} DA
`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");

    // Reset form with defaults for size/color again
    setOrderForm({
      dressName: product.name,
      userName: "",
      phoneNumber: "",
      wilaya: "",
      commune: "",
      address: "",
      state: "",
      size: availableSizes[0] || "",
      color: availableColors[0] || "",
    });

    setIsOrderModalOpen(false);
  };

  // const isFormValid = Object.values(orderForm).every(
  //   (value) => value.trim() !== ""
  // );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product not found
          </h2>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
          </p>
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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500">
            Home / Products /{" "}
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border">
              {lightboxImages.length > 0 ? (
                <LightboxModal
                  images={lightboxImages}
                  initialIndex={selectedImageIndex}
                  trigger={
                    <button className="w-full h-full group">
                      <img
                        src={
                          product.images[selectedImageIndex]?.url ||
                          "/placeholder.png"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </button>
                  }
                />
              ) : (
                <img
                  src="/placeholder.png"
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
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
                        ? "border-black"
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
          </div>

          {/* Product Info Section */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h1 className="text-3xl lg:text-4xl font-light font-aboreto text-gray-900 leading-tight">
                  {product.name}
                </h1>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-500"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-3xl font-light text-gray-900">
                DZD {product.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Tax included. Shipping calculated at checkout.
              </p>
            </div>

            {/* Stock Status */}
            <div className="space-y-3">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="text-gray-600 leading-relaxed font-poppins">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Free Shipping
                  </p>
                  <p className="text-xs text-gray-500">Orders over DZD 5,000</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Pay On delivery
                  </p>
                  <p className="text-xs text-gray-500">100% secure checkout</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Premium Quality
                  </p>
                  <p className="text-xs text-gray-500">Handcrafted with care</p>
                </div>
              </div>
            </div>

            {/* Available Sizes */}
            {availableSizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Available Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <span
                      key={size}
                      className="px-3 py-1 text-sm border rounded-lg bg-gray-50 text-gray-700"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available Colors */}
            {availableColors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Available Colors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <span
                      key={color}
                      className="px-3 py-1 text-sm border rounded-lg bg-gray-50 text-gray-700"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Order Button + Modal */}
            <div className="space-y-4 pt-6">
              <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    disabled={product.stock <= 0}
                    className={`w-full py-4 text-lg font-medium transition-all duration-300 ${
                      product.stock > 0
                        ? "bg-black hover:bg-gray-800 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {product.stock > 0 ? "Order Now" : "Out of Stock"}
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-aboreto">
                      Complete Your Order
                    </DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleSubmitOrder} className="space-y-6 mt-6">
                    {/* Product Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.images[0]?.url || "/placeholder.png"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-gray-600">
                            DZD {product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="userName">Full Name *</Label>
                        <Input
                          id="userName"
                          value={orderForm.userName}
                          onChange={(e) =>
                            handleInputChange("userName", e.target.value)
                          }
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number *</Label>
                        <Input
                          id="phoneNumber"
                          value={orderForm.phoneNumber}
                          onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                          }
                          placeholder="0555 123 456"
                          required
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="wilaya">Wilaya *</Label>
                        <Select
                          value={orderForm.wilaya}
                          onValueChange={(value) =>
                            handleInputChange("wilaya", value)
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select wilaya" />
                          </SelectTrigger>
                          <SelectContent>
                            {ALGERIAN_WILAYAS.map((wilaya) => (
                              <SelectItem key={wilaya} value={wilaya}>
                                {wilaya}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="commune">Commune *</Label>
                        <Input
                          id="commune"
                          value={orderForm.commune}
                          onChange={(e) =>
                            handleInputChange("commune", e.target.value)
                          }
                          placeholder="Enter your commune"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Full Address *</Label>
                      <Textarea
                        id="address"
                        value={orderForm.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="Enter your complete address"
                        required
                        rows={3}
                      />
                    </div>

                    {/* Product Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="size">Size *</Label>
                        <Select
                          value={orderForm.size}
                          onValueChange={(value) =>
                            handleInputChange("size", value)
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="color">Color *</Label>
                        <Select
                          value={orderForm.color}
                          onValueChange={(value) =>
                            handleInputChange("color", value)
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableColors.map((color) => (
                              <SelectItem key={color} value={color}>
                                {color}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      // disabled={!isFormValid || isSubmitting}
                      className="w-full py-3 bg-black hover:bg-gray-800 text-white"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Sending Order...
                        </div>
                      ) : (
                        "Send Order via WhatsApp"
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By clicking "Send Order", your order details will be sent
                      to our WhatsApp for processing.
                    </p>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
