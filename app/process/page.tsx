import type { Metadata } from "next"
import { ProcessSteps } from "@/components/process-steps"

export const metadata: Metadata = {
  title: "Our Process - Kanchan Marble Arts | From Design to Installation",
  description:
    "Discover our meticulous 4-step process for creating custom marble mandirs and murtis. From consultation to installation, we ensure perfection at every stage.",
  openGraph: {
    title: "Our Process - Kanchan Marble Arts",
    description: "Discover our meticulous process for creating custom marble mandirs and murtis.",
  },
}

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Our Crafting Process</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every masterpiece begins with a vision. Our time-tested process ensures that your sacred space is crafted
            with precision, care, and devotion.
          </p>
        </div>
        <ProcessSteps />
      </div>
    </div>
  )
}
