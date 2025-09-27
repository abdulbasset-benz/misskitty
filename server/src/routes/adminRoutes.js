import express from "express";
import { loginAdmin, logoutAdmin, validateToken } from "../controllers/adminController.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

// Public login route
router.post("/login", loginAdmin);
router.post("/logout",adminAuth, logoutAdmin);
router.get("/validate-token", adminAuth, validateToken);


export default router;
