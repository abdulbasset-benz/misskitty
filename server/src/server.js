import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import productsRoutes from "./routes/productsRoutes.js";

dotenv.config();

// __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Vite default
    credentials: true,
  })
);

app.use(express.json());

// Absolute uploads folder at project root
const uploadDir = path.join(process.cwd(), "uploads");

// Serve uploads statically
app.use("/uploads", express.static(uploadDir));

app.use("/api", productsRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Static files served from: ${uploadDir}`);
});
