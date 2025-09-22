import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

// Temp storage in memory (before processing with Sharp)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Process image and save it
export const processImage = async (file, folder = "uploads") => {
  const filename = `product-${Date.now()}-${file.originalname}`;
  const outputPath = path.join(folder, filename);

  // Ensure uploads folder exists
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  // Resize & save
  await sharp(file.buffer)
    .resize(600, 600, { fit: "cover" })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  return filename;
};
