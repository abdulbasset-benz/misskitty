import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "@/api/axios";
import {
  ShoppingBag,
  Truck,
  Shield,
  Heart,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  sizes?: string[];
  colors?: string[];
};

type OrderForm = {
  dressName: string;
  userName: string;
  phoneNumber: string;
  wilaya: string;
  commune: string;
  address: string;
  state: string;
  size: string;
  color: string;
  livraison: string;
};

const DELIVERY_FEE = 500;

const ALGERIAN_WILAYAS = [
  "01 - Adrar",
  "02 - Chlef",
  "03 - Laghouat",
  "04 - Oum El Bouaghi",
  "05 - Batna",
  "06 - Béjaïa",
  "07 - Biskra",
  "08 - Béchar",
  "09 - Blida",
  "10 - Bouira",
  "11 - Tamanrasset",
  "12 - Tébessa",
  "13 - Tlemcen",
  "14 - Tiaret",
  "15 - Tizi Ouzou",
  "16 - Alger",
  "17 - Djelfa",
  "18 - Jijel",
  "19 - Sétif",
  "20 - Saïda",
  "21 - Skikda",
  "22 - Sidi Bel Abbès",
  "23 - Annaba",
  "24 - Guelma",
  "25 - Constantine",
  "26 - Médéa",
  "27 - Mostaganem",
  "28 - M'Sila",
  "29 - Mascara",
  "30 - Ouargla",
  "31 - Oran",
  "32 - El Bayadh",
  "33 - Illizi",
  "34 - Bordj Bou Arréridj",
  "35 - Boumerdès",
  "36 - El Tarf",
  "37 - Tindouf",
  "38 - Tissemsilt",
  "39 - El Oued",
  "40 - Khenchela",
  "41 - Souk Ahras",
  "42 - Tipaza",
  "43 - Mila",
  "44 - Aïn Defla",
  "45 - Naâma",
  "46 - Aïn Témouchent",
  "47 - Ghardaïa",
  "48 - Relizane",
  "49 - Timimoun",
  "50 - Bordj Badji Mokhtar",
  "51 - Ouled Djellal",
  "52 - Béni Abbès",
  "53 - In Salah",
  "54 - In Guezzam",
  "55 - Touggourt",
  "56 - Djanet",
  "57 - El M'Ghair",
  "58 - El Meniaa",
];

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [orderForm, setOrderForm] = useState<OrderForm>({
    dressName: "",
    userName: "",
    phoneNumber: "",
    wilaya: "",
    commune: "",
    address: "",
    state: "",
    size: "",
    color: "",
    livraison: DELIVERY_FEE.toString(),
  });

  const availableSizes = product?.sizes?.length ? product.sizes : DEFAULT_SIZES;
  const availableColors = product?.colors?.length
    ? product.colors
    : DEFAULT_COLORS;

  const totalPrice = product ? product.price + DELIVERY_FEE : 0;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get<Product>(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setOrderForm((prev) => ({
          ...prev,
          dressName: res.data.name,
          size: res.data.sizes?.[0] || DEFAULT_SIZES[0],
          color: res.data.colors?.[0] || DEFAULT_COLORS[0],
        }));
      })
      .catch((err) => console.error("❌ Error fetching product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleInputChange = (field: keyof OrderForm, value: string) => {
    setOrderForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await api.post("/orders", {
        productId: product.id,
        color: orderForm.color,
        size: orderForm.size,
        userName: orderForm.userName,
        phoneNumber: orderForm.phoneNumber,
        wilaya: orderForm.wilaya,
        commune: orderForm.commune || "",
        address: orderForm.address || "",
        livraison: DELIVERY_FEE,
      });

      if (response.data.success) {
        setSubmitStatus({
          type: "success",
          message: `✅ ${response.data.message} - Order Number: ${response.data.data.orderId}`,
        });

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
          livraison: DELIVERY_FEE.toString(),
        });
      }
    } catch (error: any) {
      console.error("❌ Order submission error:", error);

      if (error.response) {
        const errorData = error.response.data;

        if (error.response.status === 400) {
          setSubmitStatus({
            type: "error",
            message: errorData.message || "Invalid input data",
          });
        } else {
          setSubmitStatus({
            type: "error",
            message:
              errorData.message ||
              "An error occurred while processing your order",
          });
        }
      } else if (error.request) {
        setSubmitStatus({
          type: "error",
          message: "Connection error. Please check your internet connection.",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#fefaf2]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#d4b985] mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">
            Loading exquisite details...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#fefaf2]">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-gray-900 mb-2">
            Product not found
          </h2>
          <p className="text-gray-600 font-light">
            The dress you're looking for doesn't exist in our collection.
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

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#fefaf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left - Images */}
          <div className="space-y-4 lg:sticky lg:top-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
              {lightboxImages.length > 0 ? (
                <LightboxModal
                  images={lightboxImages}
                  initialIndex={selectedImageIndex}
                  trigger={
                    <button className="w-full h-full">
                      <img
                        src={
                          product.images[selectedImageIndex]?.url ||
                          "/placeholder.png"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-white"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-white"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === selectedImageIndex
                        ? "border-[#d4b985] shadow-md"
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

          {/* Right - Order Form */}
          <div>
            <h1 className="text-3xl font-serif font-light text-gray-900 mb-6">
              {product.name}
            </h1>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#d4b985] to-[#f7ce83] p-5">
                <h2 className="text-lg font-serif text-gray-900 text-center">
                  Order This Dress
                </h2>
                <p className="text-gray-700 text-sm text-center mt-1">
                  Fill in your details to complete your order
                </p>
              </div>

              <div className="p-5">
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  {/* Alert */}
                  {submitStatus.type && (
                    <Alert
                      className={
                        submitStatus.type === "success"
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                      }
                    >
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <AlertDescription
                        className={
                          submitStatus.type === "success"
                            ? "text-green-800 text-sm"
                            : "text-red-800 text-sm"
                        }
                      >
                        {submitStatus.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={product.images[0]?.url || "/placeholder.png"}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-medium text-sm text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-lg font-light text-gray-900">
                          DZD {product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-2 space-y-1.5 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Product Price</span>
                        <span>DZD {product.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span>DZD {DELIVERY_FEE.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-medium text-gray-900 pt-1.5 border-t border-gray-200">
                        <span>Total</span>
                        <span className="text-[#d4b985]">
                          DZD {totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="userName" className="text-sm mb-1.5 block">
                        Full Name *
                      </Label>
                      <Input
                        id="userName"
                        value={orderForm.userName}
                        onChange={(e) =>
                          handleInputChange("userName", e.target.value)
                        }
                        placeholder="Your name"
                        className="h-10 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phoneNumber" className="text-sm mb-1.5 block">
                        Phone *
                      </Label>
                      <Input
                        id="phoneNumber"
                        value={orderForm.phoneNumber}
                        onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                        }
                        placeholder="0555 123 456"
                        className="h-10 text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Delivery */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="wilaya" className="text-sm mb-1.5 block">
                        Wilaya *
                      </Label>
                      <Select
                        value={orderForm.wilaya}
                        onValueChange={(value) =>
                          handleInputChange("wilaya", value)
                        }
                        required
                      >
                        <SelectTrigger className="h-10 text-sm">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {ALGERIAN_WILAYAS.map((wilaya) => (
                            <SelectItem key={wilaya} value={wilaya} className="text-sm">
                              {wilaya}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="commune" className="text-sm mb-1.5 block">
                        Commune
                      </Label>
                      <Input
                        id="commune"
                        value={orderForm.commune}
                        onChange={(e) =>
                          handleInputChange("commune", e.target.value)
                        }
                        placeholder="Optional"
                        className="h-10 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-sm mb-1.5 block">
                      Address *
                    </Label>
                    <Textarea
                      id="address"
                      value={orderForm.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Your delivery address"
                      className="min-h-[70px] text-sm resize-none"
                      required
                    />
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="size" className="text-sm mb-1.5 block">
                        Size *
                      </Label>
                      <Select
                        value={orderForm.size}
                        onValueChange={(value) =>
                          handleInputChange("size", value)
                        }
                        required
                      >
                        <SelectTrigger className="h-10 text-sm">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSizes.map((size) => (
                            <SelectItem key={size} value={size} className="text-sm">
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="color" className="text-sm mb-1.5 block">
                        Color *
                      </Label>
                      <Select
                        value={orderForm.color}
                        onValueChange={(value) =>
                          handleInputChange("color", value)
                        }
                        required
                      >
                        <SelectTrigger className="h-10 text-sm">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableColors.map((color) => (
                            <SelectItem key={color} value={color} className="text-sm">
                              {color}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || product.stock <= 0}
                    className="w-full h-12 bg-gradient-to-r from-[#d4b985] to-[#f7ce83] text-black font-medium hover:from-[#c0a46c] hover:to-[#e0b972] transition-all shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                        Processing...
                      </div>
                    ) : product.stock <= 0 ? (
                      "Out of Stock"
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Order Now - DZD {totalPrice.toLocaleString()}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Pay DZD {totalPrice.toLocaleString()} upon delivery
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;