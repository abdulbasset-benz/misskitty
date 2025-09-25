import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

// Multer config: store in memory
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log(`Processing file: ${file.originalname}, field: ${file.fieldname}, mimetype: ${file.mimetype}`);
    
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      console.error(`❌ Invalid file type: ${file.mimetype}`);
      cb(new Error("Only image files are allowed"), false);
    }
  },
  limits: { 
    fileSize: 50 * 1024 * 1024, // Increased to 50MB per file
    files: 10, // Maximum 10 files
    fieldSize: 50 * 1024 * 1024, // 50MB for non-file fields
    fieldNameSize: 100, // Max field name size
    fields: 20 // Max number of non-file fields
  },
});

// Absolute uploads folder at project root
const uploadDir = path.join(process.cwd(), "uploads");

// Process a single Multer file
export const processImage = async (file) => {
  if (!file) throw new Error("No file provided");

  console.log(`Processing image: ${file.originalname}, size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);

  // Get extension from original name
  const originalExt = path.extname(file.originalname).toLowerCase();

  // Sanitize filename
  const safeBaseName = path
    .basename(file.originalname, originalExt)
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "");

  // Always save as JPG
  const filename = `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${safeBaseName}.jpg`;
  const outputPath = path.join(uploadDir, filename);

  // Ensure uploads folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  try {
    // More aggressive compression for large images
    const imageProcessor = sharp(file.buffer);
    const metadata = await imageProcessor.metadata();
    
    console.log(`Original image dimensions: ${metadata.width}x${metadata.height}`);
    
    // Determine target size based on original dimensions
    let targetWidth = 1200;
    let targetHeight = 1200;
    let quality = 85;
    
    // For very large images, use more compression
    if (file.size > 10 * 1024 * 1024) { // If larger than 10MB
      targetWidth = 800;
      targetHeight = 800;
      quality = 75;
    }

    await imageProcessor
      .resize(targetWidth, targetHeight, { 
        fit: "cover",
        withoutEnlargement: true // Don't upscale smaller images
      })
      .toFormat("jpeg")
      .jpeg({ 
        quality: quality,
        progressive: true,
        mozjpeg: true // Better compression if available
      })
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
  console.log(`Total upload size: ${(files.reduce((sum, file) => sum + file.size, 0) / 1024 / 1024).toFixed(2)}MB`);

  return Promise.all(
    files.map((file, index) => {
      console.log(`Processing image ${index + 1}/${files.length}: ${file.originalname} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      return processImage(file);
    })
  );
};