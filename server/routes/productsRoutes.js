import express from 'express';
import { upload } from '../processImage';
import { createProduct } from '../controllers/productController.js';

const router = express.router();

router.post('/products', upload.array('images', 5), createProduct);

export default router;