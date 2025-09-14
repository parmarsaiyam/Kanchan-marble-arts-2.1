import { MessageSquare, Palette, Hammer, Truck } from "lucide-react"
import { ScrollObserver } from "@/components/scroll-observer"

export function ProcessSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Consult",
      description: "We understand your vision and spiritual needs through detailed consultation",
    },
    {
      icon: Palette,
      title: "Design",
      description: "Custom designs tailored to your space, preferences, and spiritual requirements",
    },
    {
      icon: Hammer,
      title: "Craft",
      description: "Master artisans bring your vision to life with traditional techniques",
    },
    {
      icon: Truck,
      title: "Deliver",
      description: "Professional installation and fitting service with complete care",
    },
  ]

  return (
    <section id="process" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-card"></div>
      <div className="absolute inset-0 marble-veins opacity-15"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollObserver animation="fade-in">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Our Sacred Process
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From initial consultation to final installation, we ensure every step reflects our commitment to
              excellence and spiritual craftsmanship.
            </p>
          </div>
        </ScrollObserver>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {steps.map((step, index) => (
            <ScrollObserver key={index} animation="slide-up" delay={index * 200}>
              <div className="text-center relative group h-full">
                <div className="relative p-8 h-full h-flex flex-col  rounded-2xl bg-card/80 backdrop-blur-sm border border-accent/10 shadow-lg hover:shadow-2xl hover:border-accent/30 transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-accent/10 rounded-full mb-6 relative group-hover:bg-accent/20 transition-colors duration-300">
                      <step.icon className="h-12 w-12 text-accent" />
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            </ScrollObserver>
          ))}
        </div>
      </div>
    </section>
  )
}