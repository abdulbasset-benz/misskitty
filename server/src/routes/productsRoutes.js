import express from "express";
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

// Public routes
router.get("/products", getProducts);
router.get("/products/:id", getProductById);

// Admin-only routes
router.post("/products", upload.array("images", 5), createProduct);
router.put("/products/:id", upload.array("images", 5), updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
