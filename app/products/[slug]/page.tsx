import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getContent } from "@/lib/content/store"
import { liveProducts, findProduct, relatedProducts } from "@/lib/content/products"
import { ProductDetail } from "./product-detail"
import type { Product } from "@/lib/content/products"

const SITE = "https://kanchanmarblearts.com"

interface Props {
  params: { slug: string }
}

/**
 * Prebuilds the pages that exist at deploy time. `dynamicParams` lets a product
 * added later through the CMS render on its first request instead of 404ing,
 * which is what keeps new products from needing a redeploy.
 */
export const dynamicParams = true
export const revalidate = 60

export async function generateStaticParams() {
  const { catalog } = await getContent()
  return liveProducts(catalog).map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { catalog } = await getContent()
  const product = findProduct(catalog, params.slug)
  if (!product) return {}

  const title = `${product.title} in Mumbai | Custom Made | Kanchan Marble Arts`
  const description = `${product.description} Hand-carved to your size in Australian, Makrana or Italian marble by Kanchan Marble Arts, Kandivali East, Mumbai. ${product.price}, delivery and fitting included within Mumbai.`

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    keywords: [
      product.title.toLowerCase(),
      "custom marble mandir Mumbai",
      "marble mandir for home in Mumbai",
      "marble murti manufacturer Mumbai",
      "handmade marble mandir",
      ...(product.category === "Jain" ? ["white marble Jain mandir", "customized Jain mandir"] : []),
    ],
    openGraph: {
      title,
      description,
      url: `${SITE}/products/${product.slug}`,
      images: [{ url: product.image }],
    },
  }
}

/**
 * Product + breadcrumb markup. `price` is an opening figure, so it is published
 * as a PriceSpecification with `minPrice` rather than a fixed `price`. Quoting
 * an exact amount we do not honour is what triggers Merchant policy problems.
 */
function ProductJsonLd({ product }: { product: Product }) {
  const minPrice = Number(product.price.replace(/[^\d]/g, "")) || undefined

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${SITE}/products/${product.slug}#product`,
        name: product.title,
        description: product.description,
        image: product.gallery.length ? product.gallery : [product.image],
        category: product.category,
        material: product.stones.length ? product.stones.map((s) => `${s} marble`) : ["Corian"],
        brand: { "@type": "Brand", name: "Kanchan Marble Arts" },
        manufacturer: { "@id": `${SITE}/#business` },
        additionalProperty: product.features.map((feature) => ({
          "@type": "PropertyValue",
          name: feature,
        })),
        offers: {
          "@type": "Offer",
          url: `${SITE}/products/${product.slug}`,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          priceCurrency: "INR",
          ...(minPrice
            ? {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "INR",
                  minPrice,
                  valueAddedTaxIncluded: false,
                },
              }
            : {}),
          seller: { "@id": `${SITE}/#business` },
          areaServed: { "@type": "City", name: "Mumbai" },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Collections", item: `${SITE}/products` },
          { "@type": "ListItem", position: 3, name: product.title, item: `${SITE}/products/${product.slug}` },
        ],
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
}

export default async function ProductDetailPage({ params }: Props) {
  const { catalog } = await getContent()
  const product = findProduct(catalog, params.slug)
  if (!product) notFound()

  return (
    <>
      <ProductJsonLd product={product} />
      <ProductDetail product={product} related={relatedProducts(catalog, product)} />
    </>
  )
}
