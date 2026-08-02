require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Cloudinary config - reads from your .env file (safe, never hardcoded)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Path to your local images folder
const IMAGES_ROOT = path.join(__dirname, 'public', 'images');

// This will store old path -> new Cloudinary URL mapping
const urlMap = {};

async function uploadFolder(folderName) {
  const folderPath = path.join(IMAGES_ROOT, folderName);

  if (!fs.existsSync(folderPath)) {
    console.log(`⚠️  Skipping missing folder: ${folderName}`);
    return;
  }

  const files = fs.readdirSync(folderPath).filter((f) =>
    /\.(jpe?g|png|webp)$/i.test(f)
  );

  console.log(`\n📁 Uploading ${files.length} images from "${folderName}"...`);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const localRelativePath = `/images/${folderName}/${file}`;

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `promptverse/${folderName}`,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      urlMap[localRelativePath] = result.secure_url;
      console.log(`✅ ${file} -> ${result.secure_url}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${file}:`, err.message);
    }
  }
}

async function main() {
  // List every category folder inside public/images
  const folders = fs
    .readdirSync(IMAGES_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  console.log(`Found ${folders.length} folders:`, folders);

  for (const folder of folders) {
    await uploadFolder(folder);
  }

  // Save the mapping to a JSON file so we can use it to update galleryData.js
  // Save mapping
fs.writeFileSync(
  path.join(__dirname, "cloudinary-url-map.json"),
  JSON.stringify(urlMap, null, 2)
);

// 👇 INGA paste pannu (gallery replace code)

// Automatically replace local image paths in galleryData.js
const galleryPath = path.join(__dirname, "src", "data", "galleryData.js");

if (fs.existsSync(galleryPath)) {
  let galleryContent = fs.readFileSync(galleryPath, "utf8");

  for (const [localPath, cloudinaryUrl] of Object.entries(urlMap)) {
    const escapedPath = localPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    galleryContent = galleryContent.replace(
      new RegExp(escapedPath, "g"),
      cloudinaryUrl
    );
  }

  fs.writeFileSync(galleryPath, galleryContent, "utf8");

  console.log("✅ galleryData.js updated successfully!");
} else {
  console.log("❌ galleryData.js not found!");
}

console.log("\n🎉 All done! Mapping saved to cloudinary-url-map.json");
console.log(`Total images uploaded: ${Object.keys(urlMap).length}`);
}

main().catch((err) => console.error("Script failed:", err));

