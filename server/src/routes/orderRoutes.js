import express from 'express';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

// POST /api/orders
router.post('/orders', createOrder);

export default router;
