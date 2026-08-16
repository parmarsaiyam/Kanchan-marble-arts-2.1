export type ProductCategory = "Mandirs" | "Murtis" | "Articles" | "Jain"

export interface Product {
  slug: string
  title: string
  description: string
  category: ProductCategory
  image: string
  gallery: string[]
  features: string[]
  price: string
  stones: string[]
}

const cdn = "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto"

export const stones = ["Australian", "Indian", "Italian"]

export const products: Product[] = [
  {
    slug: "premium-white-marble-mandir",
    title: "Premium White Marble Mandir",
    description: "Elegant home temple with intricate carvings and traditional design elements.",
    category: "Mandirs",
    image: `${cdn}/gallery/mandir/m-10.webp`,
    gallery: [
      `${cdn}/gallery/mandir/m-10.webp`,
      "https://res.cloudinary.com/duuqhl0w9/image/upload/v1758472180/gallery/mandir/M-1.webp",
      `${cdn}/gallery/mandir/M-5.webp`,
    ],
    features: ["Custom sizing", "Hand-carved details", "Premium white marble", "Expert installation"],
    price: "Starting from ₹25,000",
    stones,
  },
  {
    slug: "lord-ganesha-marble-murti",
    title: "Lord Ganesha Marble Murti",
    description: "Hand-carved Lord Ganesha sculpture in premium Italian marble.",
    category: "Murtis",
    image: `${cdn}/gallery/murti/ganpati-3.webp`,
    gallery: [`${cdn}/gallery/murti/ganpati-3.webp`, `${cdn}/gallery/murti/ganpati-2.webp`],
    features: ["Italian marble", "Hand-carved", "Multiple sizes", "Custom poses available"],
    price: "Starting from ₹8,000",
    stones,
  },
  {
    slug: "jain-mandir",
    title: "Jain Mandir",
    description:
      "Elegant home temple in Premium White Marble with intricate carvings and traditional design elements.",
    category: "Mandirs",
    image: `${cdn}/gallery/jain/j-3.webp`,
    gallery: [`${cdn}/gallery/jain/j-3.webp`, `${cdn}/gallery/jain/J-5.webp`],
    features: ["Custom sizing", "Hand-carved details", "Premium white marble", "Expert installation"],
    price: "Starting from ₹25,000",
    stones,
  },
  {
    slug: "radha-krishna-marble-murti",
    title: "Radha Krishna Marble Murti",
    description: "Beautiful sculpture in various poses and sizes.",
    category: "Murtis",
    image: `${cdn}/gallery/murti/Rk.webp`,
    gallery: [`${cdn}/gallery/murti/Rk.webp`],
    features: ["Multiple poses", "Fine detailing", "Premium marble", "Custom expressions"],
    price: "Starting from ₹10,000",
    stones,
  },
  {
    slug: "corian-mandir",
    title: "Corian Mandir",
    description: "Modern corian mandir design for contemporary homes.",
    category: "Mandirs",
    image: `${cdn}/gallery/mandir/C-2.webp`,
    gallery: [`${cdn}/gallery/mandir/C-2.webp`, `${cdn}/gallery/mandir/M-7.webp`],
    features: ["Custom sizing", "In-depth details", "Premium material", "Expert installation"],
    price: "Starting from ₹12,000",
    stones: [],
  },
  {
    slug: "jain-tirthankar-sculpture",
    title: "Jain Tirthankar Sculpture",
    description: "Sacred Jain Tirthankar murti crafted with devotion and precision.",
    category: "Jain",
    image: `${cdn}/gallery/murti/tirthanker-2.webp`,
    gallery: [`${cdn}/gallery/murti/tirthanker-2.webp`, `${cdn}/gallery/murti/tirthanker-1.webp`],
    features: ["Sacred proportions", "Hand-carved", "Premium marble", "Custom sizing"],
    price: "Starting from ₹5,000",
    stones,
  },
  {
    slug: "marble-tulsi-stand",
    title: "Marble Tulsi Stand",
    description: "Traditional tulsi plant stand with intricate base design.",
    category: "Articles",
    image: `${cdn}/gallery/TS-1.webp`,
    gallery: [`${cdn}/gallery/TS-1.webp`],
    features: ["Traditional design", "Drainage system", "Durable marble", "Easy maintenance"],
    price: "Starting from ₹1,500",
    stones,
  },
  {
    slug: "lord-hanuman-marble-murti",
    title: "Lord Hanuman Marble Murti",
    description: "Beautiful sculpture in various poses and sizes.",
    category: "Murtis",
    image: `${cdn}/gallery/murti/Hanuman-1.webp`,
    gallery: [`${cdn}/gallery/murti/Hanuman-1.webp`],
    features: ["Multiple poses", "Fine detailing", "Premium marble", "Custom expressions"],
    price: "Starting from ₹6,000",
    stones,
  },
  {
    slug: "swastik-marble-jaali",
    title: "Swastik marble jaali",
    description: "Ornate marble pillar with traditional motifs for architectural enhancement.",
    category: "Articles",
    image: `${cdn}/gallery/A-2.webp`,
    gallery: [`${cdn}/gallery/A-2.webp`],
    features: ["Traditional motifs", "Custom heights", "Premium marble", "Architectural grade"],
    price: "Starting from ₹2,000",
    stones,
  },
]

export const productCategories: ProductCategory[] = ["Mandirs", "Murtis", "Articles", "Jain"]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function relatedProducts(product: Product, count = 4) {
  const sameCategory = products.filter((p) => p.slug !== product.slug && p.category === product.category)
  const others = products.filter((p) => p.slug !== product.slug && p.category !== product.category)
  return [...sameCategory, ...others].slice(0, count)
}
