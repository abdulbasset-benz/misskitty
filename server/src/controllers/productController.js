import prisma from "../db/prisma.js";
import { processMultipleImages } from "../processImage.js";

import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

// Helper function to parse array from string or return array as-is
const parseArrayField = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === "string") {
    try {
      // Try to parse as JSON first
      return JSON.parse(field);
    } catch {
      // If not JSON, split by comma and clean up
      return field
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    }
  }
  return [];
};

// 🟢 CREATE product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, sizes, colors } = req.body;

    let processedImages = [];

    if (req.files && req.files.length > 0) {
      processedImages = await processMultipleImages(req.files);
    }

    if (processedImages.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    // Parse sizes and colors arrays
    const sizesArray = parseArrayField(sizes);
    const colorsArray = parseArrayField(colors);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        sizes: sizesArray,
        colors: colorsArray,
        images: {
          create: processedImages.map((imageFilename) => ({
            filename: imageFilename,
          })),
        },
      },
      include: { images: true },
    });

    const productWithUrls = {
      ...product,
      images: product.images.map((image) => ({
        ...image,
        url: `${req.protocol}://${req.get("host")}/uploads/${image.filename}`,
      })),
    };

    res.status(201).json(productWithUrls);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

// 🟢 GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { images: true },
    });

    const productsWithUrls = products.map((product) => ({
      ...product,
      images: product.images.map((image) => ({
        ...image,
        url: `${req.protocol}://${req.get("host")}/uploads/${image.filename}`,
      })),
    }));

    res.json(productsWithUrls);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve products", error: error.message });
  }
};

// 🟢 GET single product
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { images: true },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    const productWithUrls = {
      ...product,
      images: product.images.map((image) => ({
        ...image,
        url: `${req.protocol}://${req.get("host")}/uploads/${image.filename}`,
      })),
    };

    res.json(productWithUrls);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve product", error: error.message });
  }
};

// 🟢 UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, sizes, colors, removedImages } =
      req.body;

    // Parse sizes and colors from JSON strings to arrays
    let parsedSizes = [];
    let parsedColors = [];

    try {
      parsedSizes = sizes ? JSON.parse(sizes) : [];
      parsedColors = colors ? JSON.parse(colors) : [];
    } catch (parseError) {
      console.error("Error parsing sizes/colors:", parseError);
      return res.status(400).json({ error: "Invalid sizes or colors format" });
    }

    // Ensure product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { images: true },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Handle image removal
    const removedImageIds = removedImages
      ? removedImages.map((id) => Number(id))
      : [];

    // Handle new image uploads
    const newImages = req.files || [];
    const newImageData = newImages.map((file) => ({
      filename: file.filename || file.originalname,
      url: `/uploads/${file.filename || file.originalname}`, // Adjust path as needed
    }));

    // Update product with transaction to handle image operations
    const updatedProduct = await prisma.$transaction(async (tx) => {
      // Remove specified images
      if (removedImageIds.length > 0) {
        await tx.productImage.deleteMany({
          where: {
            id: { in: removedImageIds },
            productId: Number(id),
          },
        });
      }

      // Add new images
      if (newImageData.length > 0) {
        await tx.productImage.createMany({
          data: newImageData.map((img) => ({
            filename: img.filename,
            productId: Number(id),
          })),
        });
      }

      // Update product main fields
      return await tx.product.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          price: parseFloat(price),
          stock: Number(stock),
          sizes: parsedSizes,
          colors: parsedColors,
        },
        include: { images: true },
      });
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// 🟢 DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Attempting to delete product with ID:", id);

    // Validate that the ID is a valid number
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const productId = parseInt(id);

    // Check if product exists first
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    console.log("Product found, proceeding with deletion...");

    // Delete images from disk first
    if (existingProduct.images && existingProduct.images.length > 0) {
      existingProduct.images.forEach((img) => {
        const filePath = path.join(uploadDir, img.filename);
        if (fs.existsSync(filePath)) {
          console.log("Deleting image file:", filePath);
          fs.unlinkSync(filePath);
        }
      });

      // Delete images from database
      await prisma.productImage.deleteMany({
        where: { productId: productId },
      });
      console.log("Images deleted from database");
    }

    // Delete the product
    await prisma.product.delete({
      where: { id: productId },
    });

    console.log("Product deleted successfully");
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting product:", error);

    // More specific error handling
    if (error.code === "P2025") {
      // Prisma error: Record not found
      return res.status(404).json({
        message: "Product not found",
        error: "The product you're trying to delete doesn't exist",
      });
    }

    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};
