"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbox } from "@/components/lightbox"

type Product = {
  id: string
  title: string
  description: string
  category: "Mandirs" | "Murtis" | "Articles" | "Jain"
  image: string
  features: string[]
  price: string
}

const products: Product[] = [
  {
    id: "1",
    title: "Premium White Marble Mandir",
    description: "Elegant home temple with intricate carvings and traditional design elements.",
    category: "Mandirs",
    image: "/gallery/mandir/m-10.webp",
    features: ["Custom sizing", "Hand-carved details", "Premium white marble", "Expert installation"],
    price: "Starting from ₹25,000",
  },
  {
    id: "2",
    title: "Lord Ganesha Marble Murti",
    description: "Hand-carved Lord Ganesha sculpture in premium Italian marble.",
    category: "Murtis",
    image: "/gallery/murti/ganpati-3.webp",
    features: ["Italian marble", "Hand-carved", "Multiple sizes", "Custom poses available"],
    price: "Starting from ₹8,000",
  },
  {
    id: "3",
    title: "Jain Mandir",
    description: "Elegant home temple in Premium White Marble with intricate carvings and traditional design elements.",
    category: "Mandirs",
    image: "/gallery/jain/j-3.webp",
    features: ["Custom sizing", "Hand-carved details", "Premium white marble", "Expert installation"],
    price: "Starting from ₹25,000",
  },
  {
    id: "4",
    title: "Radha Krishna Marble Murti",
    description: "Beautiful sculpture in various poses and sizes.",
    category: "Murtis",
    image: "/gallery/murti/Rk.webp",
    features: ["Multiple poses", "Fine detailing", "Premium marble", "Custom expressions"],
    price: "Starting from ₹10,000",
  },
  {
    id: "5",
    title: "Corian Mandir",
    description: "Modern corian mandir design for contemporary homes.",
    category: "Mandirs",
    image: "/gallery/mandir/C-2.webp",
    features: ["Custom sizing", "In-depth details", "Premium material", "Expert installation"],
    price: "Starting from ₹12,000",
  },
  {
    id: "6",
    title: "Jain Tirthankar Sculpture",
    description: "Sacred Jain Tirthankar murti crafted with devotion and precision.",
    category: "Jain",
    image: "/gallery/murti/tirthanker-2.webp",
    features: ["Sacred proportions", "Hand-carved", "Premium marble", "Custom sizing"],
    price: "Starting from ₹5,000",
  },
  {
    id: "7",
    title: "Marble Tulsi Stand",
    description: "Traditional tulsi plant stand with intricate base design.",
    category: "Articles",
    image: "/gallery/TS-1.webp",
    features: ["Traditional design", "Drainage system", "Durable marble", "Easy maintenance"],
    price: "Starting from ₹1,500",
  },
  {
    id: "8",
    title: "Lord Hanuman Marble Murti",
    description: "Beautiful sculpture in various poses and sizes.",
    category: "Murtis",
    image: "/gallery/murti/Hanuman-1.webp",
    features: ["Multiple poses", "Fine detailing", "Premium marble", "Custom expressions"],
    price: "Starting from ₹6,000",
  },
  {
    id: "9",
    title: "Swastik marble jaali",
    description: "Ornate marble pillar with traditional motifs for architectural enhancement.",
    category: "Articles",
    image: "/gallery/A-2.webp",
    features: ["Traditional motifs", "Custom heights", "Premium marble", "Architectural grade"],
    price: "Starting from ₹2,000",
  },
]

const categories = ["All", "Mandirs", "Murtis", "Articles", "Jain"]

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)

  const lightboxImages = filteredProducts.map((product) => ({
    src: product.image,
    w: 300,
    h: 400,
    category: product.category,
    caption: `${product.title} - ${product.description}`,
  }))

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  return (
    <>
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="transition-all duration-200"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product, index) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => openLightbox(index)}
                  loading="lazy"
                />
                <Badge className="absolute top-3 left-3" variant="secondary">
                  {product.category}
                </Badge>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold text-foreground mb-2">{product.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{product.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Features:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1 h-1 bg-accent rounded-full mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-accent">{product.price}</span>
                  <Button size="sm" onClick={() => openLightbox(index)}>
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
