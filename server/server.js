import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRoutes from './routes/productsRoutes.js';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
    credentials: true,
  })
);

app.use(express.json());

app.use("uploads", express.static("uploads"));

app.use('/api/products', productsRoutes);

app.get("/", (req, res) => {
  res.send( "Server is running 🚀" );
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
