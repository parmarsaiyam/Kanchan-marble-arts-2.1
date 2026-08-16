import type { MetadataRoute } from "next"

const SITE = "https://kanchanmarblearts.com"

/**
 * robots.txt, generated at build time.
 *
 * This replaced the hand-written public/robots.txt so the sitemap URL below can
 * never drift from app/sitemap.ts. Only two kinds of path are blocked: the CMS
 * (nothing there is public) and the offline fallback page (real content, but it
 * would look like a thin duplicate to a crawler).
 *
 * Crawl-delay is deliberately absent. Google ignores it, and on a site this
 * small it only ever slowed down the crawlers that do respect it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", "/offline"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
