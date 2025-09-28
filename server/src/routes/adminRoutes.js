import express from "express";
import { 
  loginAdmin, 
  logoutAdmin, 
  getCurrentAdmin,
  validateToken 
} from "../controllers/adminController.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

// 🔓 AUTH ROUTES - No authentication required for login
router.post("/login", loginAdmin);

// 🔒 PROTECTED ADMIN ROUTES - Authentication required
router.post("/logout", adminAuth, logoutAdmin);
router.get("/me", adminAuth, getCurrentAdmin);
router.get("/validate-token", adminAuth, validateToken);

export default router;
