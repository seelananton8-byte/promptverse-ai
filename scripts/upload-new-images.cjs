require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Project root
const ROOT = path.join(__dirname, "..");

// Images folder
const IMAGES_ROOT = path.join(ROOT, "public", "images");

// galleryData.js
const GALLERY_PATH = path.join(
  ROOT,
  "src",
  "data",
  "galleryData.js"
);

// url map
const URL_MAP_PATH = path.join(
  ROOT,
  "cloudinary-url-map.json"
);

let urlMap = {};

if (fs.existsSync(URL_MAP_PATH)) {
  urlMap = JSON.parse(
    fs.readFileSync(URL_MAP_PATH, "utf8")
  );
}

// Upload only if image is new
async function uploadFolder(folderName) {
  const folderPath = path.join(IMAGES_ROOT, folderName);

  if (!fs.existsSync(folderPath)) {
    console.log(`⚠️ Skipping missing folder: ${folderName}`);
    return;
  }

  const files = fs.readdirSync(folderPath).filter((file) =>
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );

  console.log(`\n📁 Checking "${folderName}"...`);

  for (const file of files) {
    const localPath = `/images/${folderName}/${file}`;

    // Already uploaded → Skip
    if (urlMap[localPath]) {
      console.log(`⏭️ Skipped: ${file}`);
      continue;
    }

    try {
      const result = await cloudinary.uploader.upload(
        path.join(folderPath, file),
        {
          folder: `promptverse/${folderName}`,
          use_filename: true,
          unique_filename: false,
          overwrite: false,
        }
      );

      urlMap[localPath] = result.secure_url;

      console.log(`✅ Uploaded: ${file}`);
    } catch (err) {
      console.log(`❌ Failed: ${file}`);
      console.log(err.message);
    }
  }
}
async function main() {
  const folders = fs
    .readdirSync(IMAGES_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  console.log("📂 Folders Found:", folders);

  for (const folder of folders) {
    await uploadFolder(folder);
  }

  // Save updated URL map
  fs.writeFileSync(
    URL_MAP_PATH,
    JSON.stringify(urlMap, null, 2)
  );

  console.log("✅ cloudinary-url-map.json updated");

  // Update galleryData.js
  if (fs.existsSync(GALLERY_PATH)) {
    let galleryContent = fs.readFileSync(GALLERY_PATH, "utf8");

    for (const [localPath, cloudUrl] of Object.entries(urlMap)) {
      const escaped = localPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      galleryContent = galleryContent.replace(
        new RegExp(escaped, "g"),
        cloudUrl
      );
    }

    fs.writeFileSync(GALLERY_PATH, galleryContent, "utf8");

    console.log("✅ galleryData.js updated");
  }

  console.log("\n🎉 Done!");
}

main().catch(console.error);