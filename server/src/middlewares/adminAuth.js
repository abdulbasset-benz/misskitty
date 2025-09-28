import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";

export const adminAuth = async (req, res, next) => {
  try {
    // Get token from cookie instead of Authorization header
    const token = req.cookies.adminToken;
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied. No token provided." 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Optional: Verify admin still exists in database
    const admin = await prisma.admin.findUnique({ 
      where: { id: decoded.id },
      select: { id: true, email: true } // Don't select password
    });

    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied. Admin not found." 
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied. Invalid token." 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied. Token expired." 
      });
    }

    console.error("Auth middleware error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error." 
    });
  }
};