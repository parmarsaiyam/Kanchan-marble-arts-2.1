"use client"

import { useEffect } from "react"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { ProductsOverview } from "@/components/products-overview"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsPreview } from "@/components/testimonials-preview"
import { GalleryPreview } from "@/components/gallery-preview"
import { ContactSection } from "@/components/contact-section"
import { ScrollNavigation } from "@/components/scroll-navigation"
import { MobileCTA } from "@/components/mobile-cta"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function HomePage() {
  // Ensure page always starts at top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const scrollSections = [
    { id: "hero", label: "Home" },
    { id: "trust", label: "Trust" },
    { id: "products", label: "Products" },
    { id: "process", label: "Process" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen">
      <main className="relative">
        <div className="fixed inset-0 -z-10 bg-background">
          <div className="absolute top-1/4 left-0 w-96 h-96 opacity-3">
            <div className="w-full h-full bg-accent/10 rounded-full blur-3xl"></div>
          </div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 opacity-3">
            <div className="w-full h-full bg-accent/8 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div id="hero" className="animate-fade-in">
          <Hero />
        </div>
        <div id="trust" className="animate-fade-in stagger-1">
          <TrustBar />
        </div>
        <div id="products" className="animate-fade-in stagger-2">
          <ProductsOverview />
        </div>
        <div id="process" className="animate-fade-in stagger-3">
          <ProcessSection />
        </div>
        <div id="gallery" className="animate-fade-in stagger-4">
          <GalleryPreview />
        </div>
        <div id="testimonials" className="animate-fade-in stagger-5">
          <TestimonialsPreview />
        </div>
        <div id="contact" className="animate-fade-in stagger-5">
          <ContactSection />
        </div>
      </main>
      <MobileCTA />
      <ScrollNavigation sections={scrollSections} />
      <ScrollToTop />
    </div>
  )
}
