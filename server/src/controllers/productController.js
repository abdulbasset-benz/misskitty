import prisma from "../db/prisma.js";
import { processImage, processMultipleImages } from "../processImage.js";

// create new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    let processedImages = [];

    // Handle uploaded files (via Multer)
    if (req.files && req.files.length > 0) {
      processedImages = await processMultipleImages(req.files);
    }

    if (processedImages.length === 0) {
      return res.status(400).json({
        message: "At least one image is required",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        images: {
          create: processedImages.map((url) => ({ url })),
        },
      },
      include: { images: true },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};
