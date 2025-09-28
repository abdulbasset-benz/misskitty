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
        type: 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Longer expiry since cookies are more secure
    );

    // Set HTTP-only cookie
    res.cookie('adminToken', token, {
      httpOnly: true,        // Prevents XSS attacks
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax',       // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      path: '/'              // Available for all routes
    });

    // Don't send password back
    const { password: _, ...adminData } = admin;

    res.json({ 
      success: true,
      message: "Login successful",
      admin: adminData
      // Note: No token in response - it's in the cookie now
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
  // Clear the cookie
  res.clearCookie('adminToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  res.json({ 
    success: true, 
    message: "Logout successful" 
  });
};

// Get current admin info
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