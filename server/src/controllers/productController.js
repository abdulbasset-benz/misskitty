import prisma from "../db/prisma.js";
import { processMultipleImages } from "../processImage.js";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

// Helper function to parse array from string or return array as-is
const parseArrayField = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === 'string') {
    try {
      // Try to parse as JSON first
      return JSON.parse(field);
    } catch {
      // If not JSON, split by comma and clean up
      return field.split(',').map(item => item.trim()).filter(item => item.length > 0);
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
      return res.status(400).json({ message: "At least one image is required" });
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
    res.status(500).json({ message: "Failed to create product", error: error.message });
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
    res.status(500).json({ message: "Failed to retrieve products", error: error.message });
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
    res.status(500).json({ message: "Failed to retrieve product", error: error.message });
  }
};

// 🟢 UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, sizes, colors } = req.body;

    let processedImages = [];

    if (req.files && req.files.length > 0) {
      processedImages = await processMultipleImages(req.files);

      // remove old images from disk + db
      const oldImages = await prisma.image.findMany({ where: { productId: parseInt(id) } });
      oldImages.forEach((img) => {
        const filePath = path.join(uploadDir, img.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });

      await prisma.image.deleteMany({ where: { productId: parseInt(id) } });
    }

    // Parse sizes and colors arrays
    const sizesArray = parseArrayField(sizes);
    const colorsArray = parseArrayField(colors);

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        sizes: sizesArray,
        colors: colorsArray,
        ...(processedImages.length > 0 && {
          images: {
            create: processedImages.map((filename) => ({ filename })),
          },
        }),
      },
      include: { images: true },
    });

    const productWithUrls = {
      ...updatedProduct,
      images: updatedProduct.images.map((image) => ({
        ...image,
        url: `${req.protocol}://${req.get("host")}/uploads/${image.filename}`,
      })),
    };

    res.json(productWithUrls);
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

// 🟢 DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // delete images from disk
    const images = await prisma.image.findMany({ where: { productId: parseInt(id) } });
    images.forEach((img) => {
      const filePath = path.join(uploadDir, img.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await prisma.image.deleteMany({ where: { productId: parseInt(id) } });
    await prisma.product.delete({ where: { id: parseInt(id) } });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};