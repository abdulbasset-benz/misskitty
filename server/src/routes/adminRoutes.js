import express from "express";
import { loginAdmin, logoutAdmin } from "../controllers/adminController.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

// Public login route
router.post("/login", loginAdmin);
router.post("/logout",adminAuth, logoutAdmin);

export default router;
