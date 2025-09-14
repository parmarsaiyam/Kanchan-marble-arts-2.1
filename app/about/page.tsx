import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "About Us - Kanchan Marble Arts | 20+ Years of Marble Craftsmanship",
  description:
    "Learn about our 20+ year journey in marble craftsmanship. Family-run business specializing in premium marble mandirs, murtis, and custom artistic pieces.",
  openGraph: {
    title: "About Us - Kanchan Marble Arts",
    description: "Learn about our 20+ year journey in marble craftsmanship and family-run business values.",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Our Story</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For over two decades, Kanchan Marble Arts has been crafting sacred spaces and artistic masterpieces,
            blending traditional techniques with contemporary aesthetics.
          </p>
        </div>

        {/* Legacy Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-serif font-bold text-center text-foreground mb-6">Legacy of Excellence</h2>
            <div className="space-y-4 text-muted-foreground text-justify leading-relaxed">
              <p>
                Founded in 2002, Kanchan Marble Arts began as a family dream to preserve and celebrate the ancient art
                of marble craftsmanship. What started as a small workshop has grown into a trusted name in premium
                marble work across India.
              </p>
              <p>
                Our journey is built on three fundamental pillars: unwavering trust, uncompromising quality, and a
                legacy that spans generations. Every piece we create carries the weight of tradition and the promise of
                excellence.
              </p>
              <p>
                With over 50,000 satisfied customers and countless sacred spaces created, we continue to honor the
                divine through our craft, ensuring each creation becomes a cherished part of your spiritual journey.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/abouttop.webp"
              alt="Master craftsman at work"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Materials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-12">Premium Materials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/australian.webp"
                    alt="Australian Marble"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">Australian Marble</h3>
                <p className="text-muted-foreground text-sm">
                  Premium white marble known for its purity and durability, perfect for sacred sculptures and mandirs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/indian.webp"
                    alt="Indian Marble"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">Indian Marble</h3>
                <p className="text-muted-foreground text-sm">
                  Traditional Makrana and Rajasthani marble, the same stone used in the Taj Mahal, for authentic Indian
                  craftsmanship.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/italian.webp"
                    alt="Italian Marble"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">Italian Marble</h3>
                <p className="text-muted-foreground text-sm">
                  Luxurious Carrara marble for premium sculptures and artistic pieces requiring the finest quality.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Jain Motif Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/aboutbottom.webp"
              alt="Jain marble sculpture"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-serif font-bold text-center text-foreground mb-6">Jain Artistic Heritage</h2>
            <div className="space-y-4 text-muted-foreground text-justify leading-relaxed">
              <p>
              Our Jain-inspired creations reflect not just art, but devotion.
              Every design is shaped with deep respect for tradition, keeping 
              alive the timeless beauty of Jain architecture.  
              
              </p>
              <p>
              We know the spiritual value these works hold, which is why each piece is crafted with care,
              balance, and purity of detail. For us, it is not only about creating marble workit is about
              honoring faith and creating spaces of peace.
              </p>
              <p>
              From grand temple structures to serene corners for personal prayer, our Jain collection
              connects people to this sacred heritage, carrying forward a tradition that inspires hearts 
              across the world.
              </p>
            </div>
          </div>
        </div>

        {/* Clients & Mentions
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-12">Trusted by Communities Worldwide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/2] relative">
                <Image
                  src={`/placeholder.svg?height=80&width=120&query=client logo ${i}`}
                  alt={`Client ${i}`}
                  fill
                  className="object-contain filter grayscale"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="text-sm">
              Featured in Marble Today Magazine
            </Badge>
            <Badge variant="outline" className="text-sm">
              Jain Community Recognition 2023
            </Badge>
            <Badge variant="outline" className="text-sm">
              Craftsmanship Excellence Award
            </Badge>
          </div>
        </div> */}

        {/* Values
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-serif font-bold text-accent">20+</span>
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2">Years of Legacy</h3>
            <p className="text-muted-foreground text-sm">Two decades of consistent quality and customer satisfaction</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-serif font-bold text-accent">50K+</span>
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2">Happy Customers</h3>
            <p className="text-muted-foreground text-sm">
              Families and institutions who trust us with their sacred spaces
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-serif font-bold text-accent">100%</span>
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-muted-foreground text-sm">Every piece backed by our commitment to excellence</p>
          </div>
        </div> */}
      </div>
    </div>
  )
}
