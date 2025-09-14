import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

type Testimonial = {
  id: string
  name: string
  location: string
  rating: number
  text: string
  image: string
  product: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Patel",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "The marble mandir crafted by Kanchan Marble Arts has become the heart of our home. The intricate carvings and attention to detail are simply breathtaking. Our family feels blessed every day.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    product: "Custom Marble Mandir",
  },
  {
    id: "2",
    name: "Priya Sharma",
    location: "Delhi, NCR",
    rating: 5,
    text: "I ordered a Ganesha murti for our new home, and it exceeded all expectations. The craftsmanship is exceptional, and the team was professional throughout the process.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
    product: "Ganesha Marble Murti",
  },
  {
    id: "3",
    name: "Amit Jain",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    text: "As a member of the Jain community, I was looking for authentic Tirthankar sculptures. Kanchan Marble Arts delivered beyond my expectations with perfect proportions and spiritual authenticity.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    product: "Jain Tirthankar Sculpture",
  },
  {
    id: "4",
    name: "Sunita Agarwal",
    location: "Jaipur, Rajasthan",
    rating: 5,
    text: "The marble pillars for our home temple are absolutely stunning. The traditional motifs and quality of marble used are top-notch. Highly recommended for anyone seeking quality marble work.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    product: "Decorative Marble Pillars",
  },
  {
    id: "5",
    name: "Vikram Singh",
    location: "Pune, Maharashtra",
    rating: 5,
    text: "From consultation to installation, the entire experience was seamless. The team understood our requirements perfectly and delivered a beautiful Krishna murti that brings peace to our home.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    product: "Krishna Marble Murti",
  },
  {
    id: "6",
    name: "Meera Gupta",
    location: "Bangalore, Karnataka",
    rating: 5,
    text: "The tulsi stand we ordered is not just functional but a work of art. The marble quality and craftsmanship are excellent. Our plants have never looked better!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    product: "Marble Tulsi Stand",
  },
]

export function TestimonialsGrid() {
  return (
    <div className="space-y-12">
      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  <p className="text-xs text-accent font-medium">{testimonial.product}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="bg-muted/30 rounded-lg p-8">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-serif font-bold text-accent mb-2">4.9/5</div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-accent mb-2">50,000+</div>
            <p className="text-sm text-muted-foreground">Happy Customers</p>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-accent mb-2">98%</div>
            <p className="text-sm text-muted-foreground">Repeat Customers</p>
          </div>
        </div>
      </div>
    </div>
  )
}
