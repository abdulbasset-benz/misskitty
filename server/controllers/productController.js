import prisma from "../prisma.js";
import processImage from "../processImage.js";

// create new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, stock } = req.body;

    // process image
    const imageUrl = await processImage(image);

    // create product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image: imageUrl,
        stock: parseInt(stock),
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "ser",
    });
  }
};
