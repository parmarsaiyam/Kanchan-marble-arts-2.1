# Gallery Helper Script

This script automatically scans the `/public/images/gallery/` directory and updates `/content/gallery.json` with image metadata.

## Usage

\`\`\`bash
npm run gallery:update
\`\`\`

## Directory Structure

The script expects images to be organized in category folders:

\`\`\`
public/images/gallery/
├── mandirs/
│   ├── traditional-mandir.jpg
│   └── modern-mandir.png
├── murtis/
│   ├── ganesha-murti.jpg
│   └── krishna-murti.webp
├── articles/
│   ├── decorative-bowl.jpg
│   └── marble-table.png
└── jain/
    ├── jain-temple-design.jpg
    └── tirthankara-murti.jpg
\`\`\`

## Features

- **Automatic categorization**: Images are categorized based on their folder location
- **Dimension detection**: Provides default dimensions based on category (portrait for mandirs/murtis, landscape for articles)
- **Alt text generation**: Creates descriptive alt text from filenames
- **Merge existing data**: Preserves manual edits in gallery.json
- **Multiple formats**: Supports .jpg, .jpeg, .png, .webp, .avif

## Category Mapping

- `mandirs/` or `mandir/` → `mandirs`
- `murtis/` or `murti/` → `murtis`
- `articles/` or `article/` → `articles`
- `jain/`, `jain-designs/`, or `jain_designs/` → `jain`

## Output Format

The script generates/updates `content/gallery.json` with this structure:

\`\`\`json
{
  "images": [
    {
      "src": "/images/gallery/mandirs/traditional-mandir.jpg",
      "alt": "Traditional Mandir - marble mandir",
      "category": "mandirs",
      "width": 800,
      "height": 1000,
      "caption": "Traditional Mandir - marble mandir"
    }
  ],
  "lastUpdated": "2024-01-15T10:30:00.000Z",
  "categories": ["mandirs", "murtis", "articles", "jain"],
  "totalImages": 24
}
\`\`\`

## Tips

1. **Organize by category**: Place images in appropriate category folders for automatic categorization
2. **Use descriptive filenames**: The script generates alt text from filenames, so use clear, descriptive names
3. **Run after adding images**: Always run the script after adding new images to update the gallery
4. **Manual edits preserved**: You can manually edit gallery.json - the script will preserve your changes
5. **Avoid uploads folder**: The script skips the `uploads/` folder to avoid processing CMS uploads
