const SITE = "https://kanchanmarblearts.com"

/**
 * BreadcrumbList markup for a one-level-deep page.
 *
 * Google renders these as the "kanchanmarblearts.com › Gallery" trail under a
 * search result instead of a raw URL. The nav label is used rather than the
 * page's <h1>, so the trail matches what a visitor clicked to get here.
 *
 * Product pages build their own three-level trail in app/products/[slug].
 */
export function BreadcrumbJsonLd({ name, path }: { name: string; path: string }) {
  const graph = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name, item: `${SITE}${path}` },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
}
