import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required" 
      });
    }

    const admin = await prisma.admin.findUnique({ 
      where: { email: email.toLowerCase() } // Case insensitive
    });

    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    const token = jwt.sign(
      { 
        id: admin.id, 
        email: admin.email,
        type: 'admin' // Add role for extra security
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } // More explicit than "1d"
    );

    // Don't send password back
    const { password: _, ...adminData } = admin;

    res.json({ 
      success: true,
      message: "Login successful",
      token,
      admin: adminData
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Login failed" 
    });
  }
};

export const logoutAdmin = (req, res) => {
  // Since we're using stateless JWT, logout is handled client-side
  // But we can still provide a logout endpoint for consistency
  res.json({ 
    success: true, 
    message: "Logout successful. Please remove token from client." 
  });
};

// Optional: Get current admin info
export const getCurrentAdmin = async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
      select: { id: true, email: true } // Don't include password
    });

    if (!admin) {
      return res.status(404).json({ 
        success: false, 
        message: "Admin not found" 
      });
    }

    res.json({ 
      success: true, 
      admin 
    });
  } catch (error) {
    console.error("Get current admin error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to get admin info" 
    });
  }
};

export const validateToken = async (req, res) => {
  // If we reach here, adminAuth middleware already validated the token
  res.json({ 
    success: true, 
    message: "Token is valid",
    admin: req.admin 
  });
};