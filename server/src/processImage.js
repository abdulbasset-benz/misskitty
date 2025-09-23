import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

// Multer config: store in memory
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Process a single Multer file
export const processImage = async (file, folder = "uploads") => {
  if (!file) {
    throw new Error("No file provided");
  }

  const filename = `product-${Date.now()}-${file.originalname}`;
  const outputPath = path.join(folder, filename);

  // Ensure uploads folder exists
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  await sharp(file.buffer)
    .resize(600, 600, { fit: "cover" })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  return filename;
};

// Process multiple Multer files
export const processMultipleImages = async (files, folder = "uploads") => {
  if (!Array.isArray(files) || files.length === 0) {
    return [];
  }

  const processedImages = await Promise.all(
    files.map(async (file) => {
      return await processImage(file, folder);
    })
  );

  return processedImages;
};
