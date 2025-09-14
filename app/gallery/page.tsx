import type { Metadata } from "next"
import { Gallery } from "@/components/gallery"

export const metadata: Metadata = {
  title: "Gallery - Kanchan Marble Arts | Marble Mandirs & Murtis Showcase",
  description:
    "Explore our stunning collection of marble mandirs, murtis, and artistic pieces. View detailed craftsmanship and custom designs.",
  openGraph: {
    title: "Gallery - Kanchan Marble Arts",
    description: "Explore our stunning collection of marble mandirs, murtis, and artistic pieces.",
  },
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Our Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the artistry and craftsmanship that defines our marble creations. Each piece tells a story of
            tradition, skill, and devotion.
          </p>
        </div>
        <Gallery />
      </div>
    </div>
  )
}
