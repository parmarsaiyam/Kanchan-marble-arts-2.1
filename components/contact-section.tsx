import { ContactInfo } from "@/components/contact-info"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Get In Touch</h2>
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
    </section>
  )
}
