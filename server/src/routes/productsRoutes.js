import express from "express";
import multer from "multer"; // Add this import for the error handler
import { upload } from "../processImage.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

// Middleware to handle multer errors
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    console.error("Multer Error:", error);

    switch (error.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({
          message: "File too large",
          error: `Maximum file size is 50MB per file`,
        });
      case "LIMIT_FILE_COUNT":
        return res.status(400).json({
          message: "Too many files",
          error: "Maximum 10 files allowed",
        });
      case "UNEXPECTED_FIELD":
        return res.status(400).json({
          message: "Unexpected field",
          error: `Field name should be 'images'. Received: ${error.field}`,
        });
      default:
        return res.status(400).json({
          message: "Upload error",
          error: error.message,
        });
    }
  }
  next(error);
};

// 🔓 PUBLIC ROUTES (No authentication required)
router.get("/products", getProducts);
router.get("/products/:id", getProductById);

// 🔒 ADMIN-ONLY ROUTES (Authentication required)
router.post(
  "/products",
  // Add admin authentication
  upload.array("images", 10),
  handleMulterError,
  createProduct
);

router.put(
  "/products/:id",
  // Add admin authentication
  upload.array("images", 10),
  handleMulterError,
  updateProduct
);

router.delete(
  "/products/:id",
  // Add admin authentication
  deleteProduct
);

export default router;
