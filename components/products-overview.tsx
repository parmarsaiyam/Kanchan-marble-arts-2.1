import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollObserver } from "@/components/scroll-observer"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ProductsOverview() {
  const products = [
    {
      title: "Mandirs",
      description: "Sacred temples crafted with devotion and precision",
      imageAlt: "Beautiful marble mandir with intricate carvings and traditional architecture",
      image: "/images/mmandir.webp",
    },
    {
      title: "Murtis",
      description: "Divine sculptures bringing spirituality to life",
      imageAlt: "Elegant marble murti sculpture with detailed craftsmanship and spiritual essence",
      image: "/images/murti.webp",
    },
    {
      title: "Articles",
      description: "Decorative pieces for homes and sacred spaces",
      imageAlt: "Decorative marble articles including vases, bowls, and ornamental pieces",
      image: "/images/articles.webp",
    },
    {
      title: "Jain Designs",
      description: "Specialized creations for Jain traditions",
      imageAlt: "Traditional Jain marble designs with symbolic patterns and religious motifs",
      image: "/images/jain.webp",
    },
  ]

  return (
    <section id="products" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/10 to-background"></div>
      <div className="absolute inset-0 marble-veins opacity-15"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollObserver animation="fade-in">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Our Masterpieces
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Each creation is a testament to our commitment to excellence and spiritual artistry, handcrafted with
              precision and devotion.
            </p>
          </div>
        </ScrollObserver>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {products.map((product, index) => (
            <ScrollObserver key={index} animation="slide-up" delay={index * 150}>
              <Card className="group hover:shadow-2xl hover:border-accent/30 transition-shadow duration-500 border-border/30 bg-card/80 backdrop-blur-sm hover:-translate-y-2 h-full flex flex-col shadow-lg shadow-foreground/10 hover:shadow-xl hover:shadow-foreground/10 transition-shadow duration-300">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="aspect-[3/4] relative overflow-hidden rounded-t-xl bg-muted/20">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      className="object-cover image-high-quality"
                      quality={95}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/25 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                        {product.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollObserver>
          ))}
        </div>

        {/* View More Products Button */}
          <div className="flex justify-center mt-12">
            <Button asChild size="lg" className="group">
            <Link href="/products">
              View More Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          </div>
      </div>
    </section>
  )
}
