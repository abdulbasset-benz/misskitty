import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

// Multer config: store in memory
const storage = multer.memoryStorage();
export const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Process a single Multer file
export const processImage = async (file, folder = "uploads") => {
  if (!file) {
    throw new Error("No file provided");
  }

  // Get the file extension from original name, but default to jpg
  const originalExt = path.extname(file.originalname).toLowerCase();
  const baseName = path.basename(file.originalname, originalExt);
  
  // Always save as .jpg since we're converting to JPEG
  const filename = `product-${Date.now()}-${baseName}.jpg`;
  const outputPath = path.join(folder, filename);

  // Ensure uploads folder exists
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
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

// Process multiple Multer files
export const processMultipleImages = async (files, folder = "uploads") => {
  if (!Array.isArray(files) || files.length === 0) {
    console.log("No files to process");
    return [];
  }

  console.log(`Processing ${files.length} images...`);

  try {
    const processedImages = await Promise.all(
      files.map(async (file, index) => {
        console.log(`Processing image ${index + 1}/${files.length}: ${file.originalname}`);
        return await processImage(file, folder);
      })
    );

    console.log(`✅ Successfully processed ${processedImages.length} images`);
    return processedImages;
  } catch (error) {
    console.error(`❌ Error processing multiple images: ${error.message}`);
    throw error;
  }
};