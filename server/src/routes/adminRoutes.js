import express from "express";
import { loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

// Public login route
router.post("/login", loginAdmin);

export default router;
