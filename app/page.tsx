import type { Metadata } from "next"
import { HomeContent } from "./home-content"
import { products } from "@/lib/content/products"
import { en } from "@/lib/i18n/dictionaries/en"

const SITE = "https://kanchanmarblearts.com"

/**
 * The home page used to be a client component with no metadata of its own, so
 * it silently inherited whatever was in the root layout. Splitting it (server
 * `page.tsx` + client `home-content.tsx`, the same pattern every other route
 * uses) lets it declare its own title, canonical and structured data.
 */
export const metadata: Metadata = {
  title: "Marble Mandir for Home in Mumbai | Kanchan Marble Arts",
  description:
    "Custom marble mandir for home in Mumbai, hand-carved since 2002. White marble Jain mandirs, premium marble pooja mandirs, small home temples and marble murtis, made to your size and fitted free across Mumbai. Workshop in Kandivali East.",
  alternates: { canonical: "/" },
  keywords: [
    "marble mandir for home in Mumbai",
    "custom marble mandir Mumbai",
    "premium marble pooja mandir",
    "white marble Jain mandir",
    "Jain marble temple for home",
    "handmade marble mandir",
    "marble temple manufacturers in Mumbai",
    "marble murti manufacturer Mumbai",
  ],
  openGraph: {
    title: "Marble Mandir for Home in Mumbai | Kanchan Marble Arts",
    description:
      "Hand-carved marble mandirs, Jain temples and murtis, made to your size in our own Kandivali East workshop and fitted free across Mumbai.",
    url: SITE,
  },
}

/**
 * An ItemList of everything the home page links through to.
 *
 * This is the page Google crawls first, so listing the catalogue here helps it
 * find all nine product pages in one pass instead of following links one level
 * at a time. Titles come from the English dictionary, which is the same copy
 * the pages render.
 */
function HomeJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE}/#webpage`,
        url: SITE,
        name: "Marble Mandir for Home in Mumbai | Kanchan Marble Arts",
        description:
          "Custom marble mandirs, white marble Jain mandirs and hand-carved murtis, made to order in Kandivali East, Mumbai.",
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#business` },
        primaryImageOfPage: `${SITE}/images/Home.webp`,
        inLanguage: "en-IN",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE}/#catalogue`,
        name: "Marble mandirs, Jain mandirs and murtis",
        numberOfItems: products.length,
        itemListElement: products.map((product, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: en.content.products[product.slug]?.title ?? product.title,
          url: `${SITE}/products/${product.slug}`,
        })),
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
}

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <HomeContent />
    </>
  )
}
