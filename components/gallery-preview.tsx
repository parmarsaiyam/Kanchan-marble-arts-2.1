"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Lightbox } from "@/components/lightbox"
import galleryData from "@/content/gallery.json"

export function GalleryPreview() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Show first 6 images for preview
  const previewImages = galleryData.images.slice(0, 6)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  return (
    <section id="gallery" className="py-16 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Our Craftsmanship</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Witness the beauty and precision of our marble artistry through our gallery of completed works.
          </p>
        </div>

        {/* Preview Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {previewImages.map((image, index) => (
            <div
              key={`preview-${index}`}
              className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg bg-muted"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" /> */}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild size="lg" className="group">
            <Link href="/gallery">
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <Lightbox
            images={previewImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNavigate={setLightboxIndex}
          />
        )}
      </div>
    </section>
  )
}
