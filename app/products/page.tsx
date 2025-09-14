import type { Metadata } from "next"
import { Products } from "@/components/products"

export const metadata: Metadata = {
  title: "Products - Kanchan Marble Arts | Mandirs, Murtis & Custom Marble Work",
  description:
    "Explore our premium marble products including custom mandirs, hand-carved murtis, decorative articles, and Jain religious sculptures. Expert craftsmanship since 2002.",
  openGraph: {
    title: "Products - Kanchan Marble Arts",
    description:
      "Explore our premium marble products including custom mandirs, hand-carved murtis, and decorative articles.",
  },
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Our Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our exquisite collection of marble creations, each piece crafted with precision and devotion to
            bring beauty and spirituality to your space.
          </p>
        </div>
        <Products />
      </div>
    </div>
  )
}
