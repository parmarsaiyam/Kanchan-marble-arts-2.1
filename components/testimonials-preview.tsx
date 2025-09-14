import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export function TestimonialsPreview() {
  const testimonials = [
    {
      name: "Rajesh Sharma",
      location: "Mumbai",
      text: "The marble mandir they created for our home is absolutely divine. The craftsmanship is exceptional and the installation was seamless.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      location: "Ahmedabad",
      text: "Twenty years of trust well placed. The murti they crafted captures every detail with such precision and devotion.",
      rating: 5,
    },
    {
      name: "Amit Jain",
      location: "Delhi",
      text: "Professional service from start to finish. The Jain temple design exceeded our expectations in every way.",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Voices of Trust</h2>
          <div className="gold-divider w-24 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories from families who have welcomed our craftsmanship into their sacred spaces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="border-t border-border pt-4">
                  <div className="font-medium text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Reviews Button */}
        {/* <div className="flex justify-center mt-10">
          <Link href="/testimonials">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              
              
            </Button>
          </Link>
        </div> */}
        <div className="flex justify-center mt-12">
            <Button asChild size="lg" className="group">
            <a href="https://maps.app.goo.gl/jY8ge3FjHQsRXSDr7" target="_blank" rel="noopener noreferrer">
              View More Reviews                
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
          </Button>
          </div>
      </div>
    </section>
  )
}
