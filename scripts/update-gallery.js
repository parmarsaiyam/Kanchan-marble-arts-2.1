#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { promisify } = require("util")

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

// Image extensions to process
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"]

// Category mapping based on folder names
const CATEGORY_MAPPING = {
  mandirs: "mandirs",
  mandir: "mandirs",
  murtis: "murtis",
  murti: "murtis",
  articles: "articles",
  article: "articles",
  jain: "jain",
  "jain-designs": "jain",
  jain_designs: "jain",
}

/**
 * Get image dimensions using a simple approach
 * Note: This is a basic implementation. For production, consider using a library like 'image-size'
 */
function getImageDimensions(imagePath) {
  // Default dimensions - in production, you'd want to read actual image dimensions
  // For now, we'll use common aspect ratios based on category
  const category = getCategoryFromPath(imagePath)

  switch (category) {
    case "mandirs":
      return { width: 800, height: 1000 } // Portrait for mandirs
    case "murtis":
      return { width: 600, height: 800 } // Portrait for murtis
    case "articles":
      return { width: 800, height: 600 } // Landscape for articles
    case "jain":
      return { width: 800, height: 1000 } // Portrait for Jain designs
    default:
      return { width: 800, height: 600 } // Default landscape
  }
}

/**
 * Determine category from file path
 */
function getCategoryFromPath(imagePath) {
  const pathParts = imagePath.split(path.sep)

  // Look for category in path segments
  for (const part of pathParts) {
    const lowerPart = part.toLowerCase()
    if (CATEGORY_MAPPING[lowerPart]) {
      return CATEGORY_MAPPING[lowerPart]
    }
  }

  // Default category
  return "articles"
}

/**
 * Generate alt text from filename
 */
function generateAltText(filename, category) {
  const nameWithoutExt = path.parse(filename).name
  const cleanName = nameWithoutExt.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  const categoryText = {
    mandirs: "marble mandir",
    murtis: "marble murti",
    articles: "marble article",
    jain: "Jain marble design",
  }

  return `${cleanName} - ${categoryText[category] || "marble artwork"}`
}

/**
 * Scan directory recursively for images
 */
async function scanDirectory(dirPath, baseDir = "") {
  const images = []

  try {
    const entries = await readdir(dirPath)

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry)
      const stats = await stat(fullPath)

      if (stats.isDirectory()) {
        // Skip uploads directory to avoid processing CMS uploads
        if (entry === "uploads") continue

        // Recursively scan subdirectories
        const subImages = await scanDirectory(fullPath, path.join(baseDir, entry))
        images.push(...subImages)
      } else if (stats.isFile()) {
        const ext = path.extname(entry).toLowerCase()

        if (IMAGE_EXTENSIONS.includes(ext)) {
          const relativePath = path.join(baseDir, entry).replace(/\\/g, "/")
          const webPath = `/images/gallery/${relativePath}`
          const category = getCategoryFromPath(relativePath)
          const dimensions = getImageDimensions(relativePath)

          images.push({
            src: webPath,
            alt: generateAltText(entry, category),
            category: category,
            width: dimensions.width,
            height: dimensions.height,
            caption: generateAltText(entry, category),
          })
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not scan directory ${dirPath}:`, error.message)
  }

  return images
}

/**
 * Main function to update gallery.json
 */
async function updateGallery() {
  console.log("🖼️  Updating gallery.json...")

  const galleryDir = path.join(process.cwd(), "public", "images", "gallery")
  const galleryJsonPath = path.join(process.cwd(), "content", "gallery.json")

  // Check if gallery directory exists
  if (!fs.existsSync(galleryDir)) {
    console.log("📁 Creating gallery directory structure...")
    fs.mkdirSync(galleryDir, { recursive: true })

    // Create category subdirectories
    const categories = ["mandirs", "murtis", "articles", "jain"]
    categories.forEach((category) => {
      const categoryDir = path.join(galleryDir, category)
      fs.mkdirSync(categoryDir, { recursive: true })

      // Create .gitkeep file
      fs.writeFileSync(path.join(categoryDir, ".gitkeep"), "# Add your images here\n")
    })

    console.log("📁 Created gallery directory structure with category folders")
  }

  // Scan for images
  console.log("🔍 Scanning for images...")
  const images = await scanDirectory(galleryDir)

  // Load existing gallery.json if it exists
  let existingGallery = { images: [] }
  if (fs.existsSync(galleryJsonPath)) {
    try {
      const existingContent = await readFile(galleryJsonPath, "utf8")
      existingGallery = JSON.parse(existingContent)
    } catch (error) {
      console.warn("Warning: Could not parse existing gallery.json, creating new one")
    }
  }

  // Merge with existing data, preserving manual edits
  const existingImages = existingGallery.images || []
  const mergedImages = []

  // Add scanned images
  for (const scannedImage of images) {
    const existing = existingImages.find((img) => img.src === scannedImage.src)
    if (existing) {
      // Preserve existing data but update dimensions if they were default
      mergedImages.push({
        ...scannedImage,
        ...existing, // Existing data takes precedence
        width: existing.width || scannedImage.width,
        height: existing.height || scannedImage.height,
      })
    } else {
      mergedImages.push(scannedImage)
    }
  }

  // Add any existing images that weren't found in scan (manual entries)
  for (const existingImage of existingImages) {
    if (!images.find((img) => img.src === existingImage.src)) {
      mergedImages.push(existingImage)
    }
  }

  // Sort by category and filename
  mergedImages.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category)
    }
    return a.src.localeCompare(b.src)
  })

  // Create updated gallery object
  const updatedGallery = {
    images: mergedImages,
    lastUpdated: new Date().toISOString(),
    categories: ["mandirs", "murtis", "articles", "jain"],
    totalImages: mergedImages.length,
  }

  // Write updated gallery.json
  await writeFile(galleryJsonPath, JSON.stringify(updatedGallery, null, 2))

  console.log(`✅ Gallery updated successfully!`)
  console.log(`📊 Found ${images.length} images`)
  console.log(`📊 Total images in gallery: ${mergedImages.length}`)

  // Show category breakdown
  const categoryCount = {}
  mergedImages.forEach((img) => {
    categoryCount[img.category] = (categoryCount[img.category] || 0) + 1
  })

  console.log("📊 Images by category:")
  Object.entries(categoryCount).forEach(([category, count]) => {
    console.log(`   ${category}: ${count} images`)
  })

  console.log("\n💡 Tips:")
  console.log("   • Add images to /public/images/gallery/[category]/ folders")
  console.log("   • Supported categories: mandirs, murtis, articles, jain")
  console.log("   • Supported formats: .jpg, .jpeg, .png, .webp, .avif")
  console.log('   • Run "npm run gallery:update" after adding new images')
}

// Run the script
if (require.main === module) {
  updateGallery().catch((error) => {
    console.error("❌ Error updating gallery:", error)
    process.exit(1)
  })
}

module.exports = { updateGallery }
