import type { Metadata } from "next"
import { TestimonialsGrid } from "@/components/testimonials-grid"

export const metadata: Metadata = {
  title: "Testimonials - Kanchan Marble Arts | Customer Reviews & Stories",
  description:
    "Read what our customers say about their experience with Kanchan Marble Arts. Discover stories of satisfaction and spiritual fulfillment.",
  openGraph: {
    title: "Testimonials - Kanchan Marble Arts",
    description: "Read what our customers say about their experience with Kanchan Marble Arts.",
  },
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">What Our Customers Say</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Over 20 years of creating sacred spaces has brought us countless stories of joy, devotion, and satisfaction.
            Here are some voices from our extended family.
          </p>
        </div>
        <TestimonialsGrid />
      </div>
    </div>
  )
}
