import type { MetadataRoute } from "next"
import { getContent } from "@/lib/content/store"
import { liveProducts } from "@/lib/content/products"

const SITE = "https://kanchanmarblearts.com"

/**
 * Generated at build time so product routes can never drift from the real site
 * the way the hand-maintained public/sitemap.xml did.
 *
 * Product URLs come from the live catalogue rather than the build-time one,
 * so a product added through the CMS appears here without a redeploy.
 *
 * There is deliberately no `lastModified`. It used to be `new Date()`, which
 * stamped every URL with the build time and told Google the whole site had
 * changed each time anything was deployed. A lastmod that is always wrong is
 * worse than none, and Google falls back to its own crawl signals without it.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { catalog } = await getContent()

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/gallery`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/process`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ]

  return [
    ...pages,
    ...liveProducts(catalog).map((product) => ({
      url: `${SITE}/products/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
