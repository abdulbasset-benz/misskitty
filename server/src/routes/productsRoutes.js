// routes/productsRoutes.js - Updated for cookie authentication
import express from "express";
import multer from "multer";
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
          success: false,
          message: "File too large",
          error: "Maximum file size is 50MB per file",
        });
      case "LIMIT_FILE_COUNT":
        return res.status(400).json({
          success: false,
          message: "Too many files",
          error: "Maximum 10 files allowed",
        });
      case "UNEXPECTED_FIELD":
        return res.status(400).json({
          success: false,
          message: "Unexpected field",
          error: `Field name should be 'images'. Received: ${error.field}`,
        });
      default:
        return res.status(400).json({
          success: false,
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
// ✅ CORRECT ORDER: Auth FIRST, then file processing
router.post(
  "/products",
  adminAuth,                    // Check authentication FIRST
  upload.array("images", 10),   // Then handle file upload
  handleMulterError,            // Handle upload errors
  createProduct                 // Finally create the product
);

router.put(
  "/products/:id",
  adminAuth,                    // Check authentication FIRST
  upload.array("images", 10),   // Then handle file upload
  handleMulterError,            // Handle upload errors
  updateProduct                 // Finally update the product
);

router.delete(
  "/products/:id",
  adminAuth,                    // Auth only (no file upload needed)
  deleteProduct
);

export default router;