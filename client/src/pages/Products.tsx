import { useEffect, useState, useMemo } from "react";
import api from "@/api/axios";
import { Filter, X, SlidersHorizontal } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

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
  sizes?: string[]; // Assuming products have size options
  colors?: string[]; // Assuming products have color options
};

type Filters = {
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  outOfStock: boolean;
};

const AVAILABLE_SIZES = ["36", "38", "40", "42", "44"];
const AVAILABLE_COLORS = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Pink",
  "Purple",
  "Gold",
  "Silver",
  "Beige",
  "Navy",
  "Brown",
];

const Products = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 50000],
    sizes: [],
    colors: [],
    inStock: false,
    outOfStock: false,
  });

  const [sortBy, setSortBy] = useState<string>("newest");

  useEffect(() => {
    api
      .get<Product[]>("products")
      .then((res) => {
        setProducts(res.data);
        // Set initial price range based on actual products
        if (res.data.length > 0) {
          const prices = res.data.map((p) => p.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setFilters((prev) => ({
            ...prev,
            priceRange: [minPrice, maxPrice],
          }));
        }
      })
      .catch((err) => console.error("❌ Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Price filter
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Stock filter
      if (filters.inStock && product.stock <= 0) return false;
      if (filters.outOfStock && product.stock > 0) return false;
      if (filters.inStock && filters.outOfStock) {
        // Both selected means show all
      } else if (!filters.inStock && !filters.outOfStock) {
        // Neither selected means show all
      }

      // Size filter (assuming product has size array)
      if (filters.sizes.length > 0) {
        const productSizes = product.sizes || [];
        if (!filters.sizes.some((size) => productSizes.includes(size))) {
          return false;
        }
      }

      // Color filter (assuming product has color array)
      if (filters.colors.length > 0) {
        const productColors = product.colors || [];
        if (!filters.colors.some((color) => productColors.includes(color))) {
          return false;
        }
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        // Keep original order (assuming it's newest first)
        break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  const handleSizeToggle = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleColorToggle = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [value[0], value[1]] as [number, number],
    }));
  };

  const clearAllFilters = () => {
    if (products.length === 0) return;

    const prices = products.map((p) => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    setFilters({
      priceRange: [minPrice, maxPrice],
      sizes: [],
      colors: [],
      inStock: false,
      outOfStock: false,
    });
  };

  const activeFiltersCount =
    filters.sizes.length +
    filters.colors.length +
    (filters.inStock ? 1 : 0) +
    (filters.outOfStock ? 1 : 0);

  const maxPrice =
    products.length > 0
      ? Math.max(...products.map((p) => p.price), 50000)
      : 50000;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#F0ECE6] via-[#F7F3ED] to-[#FAF7F0] relative overflow-hidden">
        <div className="relative flex flex-col items-center justify-center w-full px-6 py-24 md:py-24">
          <h1 className="font-aboreto font-bold text-5xl md:text-7xl text-gray-900 mb-6 text-center">
            {t("products.ourCollection")}
          </h1>
          <p className="text-center font-poppins text-gray-600 max-w-2xl text-lg leading-relaxed">
            {t("products.subTitle")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">
                {t("products.feat1")}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">
                {t("products.feat2")}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">
                {t("products.feat3")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <Button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t("products.filters")}
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`lg:col-span-1 ${
              showMobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-xl text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {t("products.filters")}
                </h2>
                {activeFiltersCount > 0 && (
                  <Button
                    onClick={clearAllFilters}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {t("products.clearFilters")}
                  </Button>
                )}
              </div>

              <Accordion
                type="multiple"
                defaultValue={["price", "size", "color", "availability"]}
              >
                {/* Price Range */}
                <AccordionItem value="price" className="border-gray-100">
                  <AccordionTrigger className="text-gray-900 font-medium">
                    {t("products.priceRange")}
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-4">
                      <Slider
                        value={filters.priceRange}
                        onValueChange={handlePriceChange}
                        max={maxPrice}
                        min={0}
                        step={1000}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>
                          DZD {filters.priceRange[0].toLocaleString()}
                        </span>
                        <span>
                          DZD {filters.priceRange[1].toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Size Filter */}
                <AccordionItem value="size" className="border-gray-100">
                  <AccordionTrigger className="text-gray-900 font-medium">
                    {t("products.size")}

                    {filters.sizes.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {filters.sizes.length}
                      </Badge>
                    )}
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="grid grid-cols-3 gap-2">
                      {AVAILABLE_SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeToggle(size)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                            filters.sizes.includes(size)
                              ? "border-black bg-black text-white"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Color Filter */}
                {/* Color Filter */}
                <AccordionItem value="color" className="border-gray-100">
                  <AccordionTrigger className="text-gray-900 font-medium">
                    {t("products.color")}
                    {filters.colors.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {filters.colors.length}
                      </Badge>
                    )}
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-3">
                      {AVAILABLE_COLORS.map((color) => {
                        const translatedColor = t(
                          `products.colors.${color}`,
                          color
                        ); // ✅ fallback to English if missing
                        return (
                          <div
                            key={color}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox
                              id={`color-${color}`}
                              checked={filters.colors.includes(color)}
                              onCheckedChange={() => handleColorToggle(color)}
                            />
                            <Label
                              htmlFor={`color-${color}`}
                              className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-2"
                            >
                              <div
                                className={`w-4 h-4 rounded-full border border-gray-300 ${
                                  color === "Black"
                                    ? "bg-black"
                                    : color === "White"
                                    ? "bg-white"
                                    : color === "Red"
                                    ? "bg-red-500"
                                    : color === "Blue"
                                    ? "bg-blue-500"
                                    : color === "Green"
                                    ? "bg-green-500"
                                    : color === "Pink"
                                    ? "bg-pink-500"
                                    : color === "Purple"
                                    ? "bg-purple-500"
                                    : color === "Gold"
                                    ? "bg-yellow-400"
                                    : color === "Silver"
                                    ? "bg-gray-400"
                                    : color === "Beige"
                                    ? "bg-orange-100"
                                    : color === "Navy"
                                    ? "bg-blue-900"
                                    : color === "Brown"
                                    ? "bg-amber-800"
                                    : "bg-gray-300"
                                }`}
                              ></div>
                              {translatedColor}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </aside>

          {/* Products Grid */}
          <section className="md:col-span-3 products-section">
            {/* Sort and Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-medium text-gray-900">
                  {filteredAndSortedProducts.length} {t("products.products")}
                </h2>

                {/* Active Filters */}
                {(filters.sizes.length > 0 || filters.colors.length > 0) && (
                  <div className="flex flex-wrap gap-2">
                    {filters.sizes.map((size) => (
                      <Badge
                        key={size}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        Size: {size}
                        <button
                          onClick={() => handleSizeToggle(size)}
                          className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    {filters.colors.map((color) => (
                      <Badge
                        key={color}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        Color: {color}
                        <button
                          onClick={() => handleColorToggle(color)}
                          className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t("products.newest")}</SelectItem>
                  <SelectItem value="price-low">
                    {t("products.lowTohigh")}
                  </SelectItem>
                  <SelectItem value="price-high">
                    {t("products.highToLow")}
                  </SelectItem>
                  <SelectItem value="name">
                    {" "}
                    {t("products.alphabet")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
                  >
                    <div className="h-64 bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {t("products.noProducts")}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t("products.tryAdjusting")}
                </p>
                <Button onClick={clearAllFilters} variant="outline">
                  {t("products.clearFilters")}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.images[0]?.url || "/placeholder.png"}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    inStock={product.stock > 0}
                    images={product.images}
                    sizes={product.sizes} // ✅ plural
                    colors={product.colors} // ✅ plural
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Products;
