import type { Metadata } from "next"
import { ProductsContent } from "./products-content"
import { getContent } from "@/lib/content/store"
import { liveProducts } from "@/lib/content/products"
import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld"

export const metadata: Metadata = {
  title: "Custom Marble Mandir for Home in Mumbai | Jain Mandir & Murti Collections",
  description:
    "Custom marble mandirs for homes in Mumbai: white marble Jain mandirs, premium marble pooja mandirs, small home temples and hand-carved murtis. Made to your size in Australian, Makrana or Italian marble, delivered and fitted free across Mumbai.",
  alternates: { canonical: "/products" },
  keywords: [
    "marble mandir for home in Mumbai",
    "custom marble mandir Mumbai",
    "premium marble pooja mandir",
    "small marble mandir for home",
    "white marble Jain mandir",
    "Jain marble temple for home",
    "handmade marble mandir",
    "marble murti manufacturer Mumbai",
  ],
  openGraph: {
    title: "Custom Marble Mandir for Home in Mumbai | Kanchan Marble Arts",
    description:
      "White marble Jain mandirs, premium pooja mandirs and hand-carved murtis, made to your size and fitted across Mumbai.",
    url: "https://kanchanmarblearts.com/products",
  },
}

/**
 * ItemList for the collection page. Tells Google the order the products appear
 * in and where each one lives, which is what earns the carousel treatment for
 * a category page.
 */
function ProductsJsonLd({ products }: { products: { slug: string; title: string; image: string }[] }) {
  const SITE = "https://kanchanmarblearts.com"
  const graph = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE}/products#list`,
    name: "Marble mandirs, Jain mandirs, murtis and marble articles",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      image: p.image,
      url: `${SITE}/products/${p.slug}`,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
}

export const revalidate = 60

export default async function ProductsPage() {
  const { catalog } = await getContent()
  return (
    <>
      <BreadcrumbJsonLd name="Collections" path="/products" />
      <ProductsJsonLd products={liveProducts(catalog)} />
      <ProductsContent products={liveProducts(catalog)} />
    </>
  )
}
