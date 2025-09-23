import prisma from "../db/prisma.js";
import { processMultipleImages } from "../processImage.js";

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

    // Create the product with images
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
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
        id: image.id,
        filename: image.filename,
        url: `${req.protocol}://${req.get("host")}/uploads/${image.filename}`,
        productId: image.productId,
      })),
    };

    res.status(201).json(productWithUrls);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    console.log("🔍 Fetching products...");

    const products = await prisma.product.findMany({
      include: { images: true },
    });

    console.log(`📦 Found ${products.length} products`);
    console.log("Raw products data:", JSON.stringify(products, null, 2));

    const productsWithUrls = products.map((product) => {
      const transformedProduct = {
        ...product,
        images: product.images.map((image) => {
          const fullUrl = `${req.protocol}://${req.get("host")}/uploads/${
            image.filename
          }`;
          console.log(`Image filename: ${image.filename} -> URL: ${fullUrl}`);

          return {
            id: image.id,
            filename: image.filename,
            url: fullUrl,
            productId: image.productId,
          };
        }),
      };

      return transformedProduct;
    });

    res.json(productsWithUrls);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({
      message: "Failed to retrieve products",
      error: error.message,
    });
  }
};
