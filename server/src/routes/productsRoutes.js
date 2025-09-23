import express from "express";
import { upload } from "../processImage.js";
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.post('/products', upload.array('images', 5), createProduct);

router.get("/products", getProducts);

export default router;
