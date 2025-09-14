import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Palette, Hammer, Home } from "lucide-react"

const processSteps = [
  {
    step: 1,
    title: "Consultation & Design",
    description:
      "We begin with understanding your vision, space requirements, and spiritual preferences. Our designers have in-depth discussions with you and create detailed sketches for your approval.",
    icon: MessageCircle,
    highlights: ["Free consultation", "3D visualization", "Custom sizing", "Material selection"],
  },
  {
    step: 2,
    title: "Artistic Planning",
    description:
      "Our master craftsmen plan every detail, from marble selection to carving techniques. We source premium materials and prepare detailed work schedules.",
    icon: Palette,
    highlights: ["Premium marble sourcing", "Detailed blueprints", "Quality assurance", "Timeline planning"],
  },
  {
    step: 3,
    title: "Precision Crafting",
    description:
      "Using traditional techniques passed down through generations, our artisans hand-carve each piece with meticulous attention to detail and spiritual significance.",
    icon: Hammer,
    highlights: ["Hand-carved details", "Traditional techniques", "Quality checkpoints", "Progress updates"],
  },
  {
    step: 4,
    title: "Expert Installation",
    description:
      "Our experienced team handles delivery and professional installation, ensuring your sacred space is perfectly positioned and ready for worship.",
    icon: Home,
    highlights: ["Safe delivery", "Professional installation", "Final inspection", "Care instructions"],
  },
]

export function ProcessSteps() {
  return (
    <div className="space-y-12">
      {/* Process Steps */}
      <div className="space-y-8">
        {processSteps.map((step) => (
          <Card key={step.step} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6 gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Large Step Number */}
                    <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center text-white font-bold text-2xl md:text-3xl shadow-lg flex-shrink-0">
                      {step.step}
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {step.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Highlights:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {step.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Icon in top right corner - hide on mobile */}
                <div className="ml-6 flex-shrink-0 hidden md:block">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quality Assurance */}
      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Quality Assurance</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Throughout every step, our quality control team ensures that each piece meets our exacting standards. We
          believe that sacred art deserves nothing less than perfection, and we stand behind every creation with our
          lifetime craftsmanship guarantee.
        </p>
      </div>
    </div>
  )
}