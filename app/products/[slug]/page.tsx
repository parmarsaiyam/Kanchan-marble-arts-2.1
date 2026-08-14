import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { products, getProduct } from "@/lib/products"
import { ProductDetail } from "./product-detail"

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug)
  if (!product) return {}
  return {
    title: `${product.title} - Kanchan Marble Arts`,
    description: product.description,
    openGraph: {
      title: `${product.title} - Kanchan Marble Arts`,
      description: product.description,
      images: [{ url: product.image }],
    },
  }
}

export default function ProductDetailPage({ params }: Props) {
  if (!getProduct(params.slug)) notFound()
  return <ProductDetail slug={params.slug} />
}
