import catalog from "@/content/catalog.json"

export type ProductCategory = "Mandirs" | "Murtis" | "Articles" | "Jain"

export type ProductStatus = "live" | "draft" | "hidden"

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
  /** Only `live` products are rendered on the site. */
  status: ProductStatus
  /** Surfaced in the "Featured pieces" row on the homepage. */
  featured: boolean
  /** Whether the price shows on catalogue cards. */
  showPrice: boolean
}

/**
 * The catalogue lives in content/catalog.json so the CMS can edit it. This
 * module stays the single typed entry point everything else imports from.
 */
const all = catalog.products as Product[]

export const stones: string[] = catalog.stones

/** Everything the public site should see. */
export const products: Product[] = all.filter((p) => p.status === "live")

/** Including drafts and hidden pieces. For the CMS only. */
export const allProducts: Product[] = all

export const productCategories: ProductCategory[] = ["Mandirs", "Murtis", "Articles", "Jain"]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function relatedProducts(product: Product, count = 4) {
  const sameCategory = products.filter((p) => p.slug !== product.slug && p.category === product.category)
  const others = products.filter((p) => p.slug !== product.slug && p.category !== product.category)
  return [...sameCategory, ...others].slice(0, count)
}
