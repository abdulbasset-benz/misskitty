import prisma from "../db/prisma.js";
import { processMultipleImages } from "../processImage.js";

// create new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    let processedImages = [];

    // Handle uploaded files (via Multer)
    if (req.files && req.files.length > 0) {
      processedImages = await processMultipleImages(req.files);
      console.log('Processed images:', processedImages);
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
            filename: imageFilename // Use 'filename' field as per your schema
          })),
        },
      },
      include: { images: true },
    });

    // Transform response to include full URLs
    const productWithUrls = {
      ...product,
      images: product.images.map(image => ({
        id: image.id,
        filename: image.filename,
        url: `${req.protocol}://${req.get('host')}/uploads/${image.filename}`,
        productId: image.productId
      }))
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
    const products = await prisma.product.findMany({
      include: { images: true },
    });
    
    // Transform the data to include full URLs for images
    const productsWithUrls = products.map(product => ({
      ...product,
      images: product.images.map(image => ({
        id: image.id,
        filename: image.filename,
        url: `${req.protocol}://${req.get('host')}/uploads/${image.filename}`,
        productId: image.productId
      }))
    }));
    
    res.json(productsWithUrls);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      message: "Failed to retrieve products",
      error: error.message,
    });
  }
};

