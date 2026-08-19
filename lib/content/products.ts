import type { CatalogProduct, CmsContent } from "@/lib/cms/types"

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

export const productCategories: ProductCategory[] = ["Mandirs", "Murtis", "Articles", "Jain"]

/**
 * These used to be module constants read from content/catalog.json at build
 * time, which is exactly what tied every product edit to a rebuild. They are
 * plain functions now: a server component fetches the catalogue once with
 * getContent() and passes the result down, so the same code works whether the
 * catalogue came from the blob store or the seed file.
 */

type Catalog = CmsContent["catalog"]

/** Everything the public site should see. */
export function liveProducts(catalog: Catalog): Product[] {
  return (catalog.products as Product[]).filter((p) => p.status === "live")
}

/** Including drafts and hidden pieces. For the CMS only. */
export function allProducts(catalog: Catalog): Product[] {
  return catalog.products as Product[]
}

export function stonesOf(catalog: Catalog): string[] {
  return catalog.stones
}

export function findProduct(catalog: Catalog, slug: string) {
  return liveProducts(catalog).find((p) => p.slug === slug)
}

export function relatedProducts(catalog: Catalog, product: Product, count = 4) {
  const live = liveProducts(catalog)
  const sameCategory = live.filter((p) => p.slug !== product.slug && p.category === product.category)
  const others = live.filter((p) => p.slug !== product.slug && p.category !== product.category)
  return [...sameCategory, ...others].slice(0, count)
}

/** Featured row on the home page, capped at three. */
export function featuredProducts(catalog: Catalog, count = 3) {
  return liveProducts(catalog)
    .filter((p) => p.featured)
    .slice(0, count)
}

/** The product fields a client component needs. Keeps prop payloads small. */
export type ProductCard = Pick<
  CatalogProduct,
  "slug" | "title" | "description" | "category" | "image" | "price" | "featured" | "showPrice"
>
