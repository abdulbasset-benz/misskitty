import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

// Multer config: store in memory
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Absolute uploads folder at project root
const uploadDir = path.join(process.cwd(), "uploads");

// Process a single Multer file
export const processImage = async (file) => {
  if (!file) throw new Error("No file provided");

  // Get extension from original name
  const originalExt = path.extname(file.originalname).toLowerCase();

  // Sanitize filename
  const safeBaseName = path
    .basename(file.originalname, originalExt)
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "");

  // Always save as JPG
  const filename = `product-${Date.now()}-${safeBaseName}.jpg`;
  const outputPath = path.join(uploadDir, filename);

  // Ensure uploads folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  try {
    await sharp(file.buffer)
      .resize(800, 800, { fit: "cover" })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log(`✅ Image processed: ${filename}`);
    return filename;
  } catch (error) {
    console.error(`❌ Error processing image: ${error.message}`);
    throw new Error(`Failed to process image: ${error.message}`);
  }
};

// Process multiple files
export const processMultipleImages = async (files) => {
  if (!Array.isArray(files) || files.length === 0) return [];

  console.log(`Processing ${files.length} images...`);

  return Promise.all(
    files.map((file, index) => {
      console.log(`Processing image ${index + 1}/${files.length}: ${file.originalname}`);
      return processImage(file);
    })
  );
};
