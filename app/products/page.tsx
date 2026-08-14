import type { Metadata } from "next"
import { ProductsContent } from "./products-content"

export const metadata: Metadata = {
  title: "Collections - Kanchan Marble Arts | Mandirs, Murtis & Custom Marble Work",
  description:
    "Explore our premium marble products including custom mandirs, hand-carved murtis, decorative articles, and Jain religious sculptures. Expert craftsmanship since 2002.",
  openGraph: {
    title: "Collections - Kanchan Marble Arts",
    description:
      "Explore our premium marble products including custom mandirs, hand-carved murtis, and decorative articles.",
  },
}

export default function ProductsPage() {
  return <ProductsContent />
}
