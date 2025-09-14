import type { Metadata } from "next"
import { ContactInfo } from "@/components/contact-info"

export const metadata: Metadata = {
  title: "Contact Us - Kanchan Marble Arts | Get Your Custom Quote",
  description:
    "Contact Kanchan Marble Arts for custom marble mandirs, murtis, and artistic pieces. Get a free consultation and quote for your project.",
  openGraph: {
    title: "Contact Us - Kanchan Marble Arts",
    description: "Contact us for custom marble mandirs, murtis, and artistic pieces. Free consultation available.",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to create your sacred space? Contact us for a free consultation and let's bring your vision to life
            with our expert craftsmanship.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:col-span-1">
            <ContactInfo variant="infoOnly" />
          </div>
          <div className="lg:col-span-1">
            <ContactInfo variant="mapOnly" />
          </div>
        </div>
      </div>
    </div>
  )
}
