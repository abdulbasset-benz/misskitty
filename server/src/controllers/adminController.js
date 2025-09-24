import prisma from "../db/prisma.js";
import bcrypt from "bcrypt"; // or bcryptjs
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};
