import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload, Image as ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AVAILABLE_SIZES = ["36", "38", "40", "42", "44"];
const AVAILABLE_COLORS = [
  "Black", "White", "Red", "Blue", "Green", "Pink", 
  "Purple", "Gold", "Silver", "Beige", "Navy", "Brown"
];

const AddProductsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [customSize, setCustomSize] = useState("");
  const [customColor, setCustomColor] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const addCustomSize = () => {
    if (customSize.trim() && !selectedSizes.includes(customSize.trim())) {
      setSelectedSizes(prev => [...prev, customSize.trim()]);
      setCustomSize("");
    }
  };

  const addCustomColor = () => {
    if (customColor.trim() && !selectedColors.includes(customColor.trim())) {
      setSelectedColors(prev => [...prev, customColor.trim()]);
      setCustomColor("");
    }
  };

  const removeSize = (size: string) => {
    setSelectedSizes(prev => prev.filter(s => s !== size));
  };

  const removeColor = (color: string) => {
    setSelectedColors(prev => prev.filter(c => c !== color));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const submitFormData = new FormData();
    submitFormData.append("name", formData.name);
    submitFormData.append("description", formData.description);
    submitFormData.append("price", formData.price);
    submitFormData.append("stock", formData.stock);
    
    // Send sizes and colors as JSON strings
    submitFormData.append("sizes", JSON.stringify(selectedSizes));
    submitFormData.append("colors", JSON.stringify(selectedColors));

    images.forEach((file) => {
      submitFormData.append("images", file);
    });

    try {
      const res = await axios.post("http://localhost:5000/api/products", submitFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      console.log("✅ Product created:", res.data);
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
      });
      setSelectedSizes([]);
      setSelectedColors([]);
      setImages([]);
      
      alert("Product created successfully!");
      
    } catch (err: any) {
      console.error("❌ Error creating product:", err.response?.data || err.message);
      alert("Error creating product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.name && formData.description && formData.price && 
                     formData.stock && selectedSizes.length > 0 && 
                     selectedColors.length > 0 && images.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-aboreto text-gray-900">
              Add New Product
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Create a new dress with all the details
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Elegant Evening Gown"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (DZD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g., 25000"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="e.g., 10"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the dress, its features, material, style, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              {/* Sizes Section */}
              <div className="space-y-4">
                <Label className="text-lg font-medium">Available Sizes *</Label>
                
                {/* Predefined Sizes */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {AVAILABLE_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                        selectedSizes.includes(size)
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Custom Size Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom size"
                    value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSize())}
                  />
                  <Button type="button" onClick={addCustomSize} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Selected Sizes */}
                {selectedSizes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedSizes.map((size) => (
                      <Badge key={size} variant="secondary" className="flex items-center gap-1">
                        {size}
                        <button
                          type="button"
                          onClick={() => removeSize(size)}
                          className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Colors Section */}
              <div className="space-y-4">
                <Label className="text-lg font-medium">Available Colors *</Label>
                
                {/* Predefined Colors */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {AVAILABLE_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => toggleColor(color)}
                      className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                        selectedColors.includes(color)
                          ? "border-black bg-gray-50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full border border-gray-300 ${
                          color === 'Black' ? 'bg-black' :
                          color === 'White' ? 'bg-white' :
                          color === 'Red' ? 'bg-red-500' :
                          color === 'Blue' ? 'bg-blue-500' :
                          color === 'Green' ? 'bg-green-500' :
                          color === 'Pink' ? 'bg-pink-500' :
                          color === 'Purple' ? 'bg-purple-500' :
                          color === 'Gold' ? 'bg-yellow-400' :
                          color === 'Silver' ? 'bg-gray-400' :
                          color === 'Beige' ? 'bg-orange-100' :
                          color === 'Navy' ? 'bg-blue-900' :
                          color === 'Brown' ? 'bg-amber-800' : 'bg-gray-300'
                        }`}
                      ></div>
                      {color}
                    </button>
                  ))}
                </div>

                {/* Custom Color Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomColor())}
                  />
                  <Button type="button" onClick={addCustomColor} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Selected Colors */}
                {selectedColors.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedColors.map((color) => (
                      <Badge key={color} variant="secondary" className="flex items-center gap-1">
                        {color}
                        <button
                          type="button"
                          onClick={() => removeColor(color)}
                          className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <Label className="text-lg font-medium">Product Images *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="images"
                    name="images"
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        {images.length > 0 ? (
                          <ImageIcon className="w-8 h-8 text-green-600" />
                        ) : (
                          <Upload className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          {images.length > 0 ? `${images.length} images selected` : 'Upload product images'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Click to select multiple images (PNG, JPG, JPEG)
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
                
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from(images).map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <div className="absolute -top-2 -right-2">
                          <Badge variant="secondary" className="text-xs">
                            {index + 1}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="w-full py-4 text-lg font-semibold bg-black hover:bg-gray-800 text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Creating Product...
                    </div>
                  ) : (
                    "Create Product"
                  )}
                </Button>
              </div>

              {!isFormValid && (
                <p className="text-sm text-gray-500 text-center">
                  Please fill all required fields, select at least one size and color, and upload images
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProductsPage;