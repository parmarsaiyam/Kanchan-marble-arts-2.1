"use client"

import { Button } from "@/components/ui/button"
import { MapPin, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { whatsappNumber, whatsappMessage } from "@/components/contact-info"; 

interface HeroProps {
  layout?: "centered" | "split"
}

export function Hero({ layout = "centered" }: HeroProps) {
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => {
        // Fallback settings
        setSettings({
          theme: { heroLayout: layout },
          trustStats: { yearsExperience: "20+" },
        })
      })
  }, [layout])

  if (!settings) return null

  const heroLayout = settings.theme?.heroLayout || layout

  if (heroLayout === "centered") {
    return (
      <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5"></div>
        <div className="absolute inset-0 marble-veins opacity-30"></div>

        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/3 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight fade-in">
              Carving Legacy in <span className="text-accent">Marble</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto slide-up">
              Custom mandirs and murtis crafted for your home, delivered and fitted with care. Each piece tells a story of devotion, artistry, and timeless beauty.
            </p>
            <div className="relative max-w-7xl mb-15 mx-auto slide-up">
              <div className="aspect-[16/12] relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent z-10"></div>
                <Image
                  src="/images/Home.webp"
                  alt="Exquisite marble mandir showcasing intricate craftsmanship"
                  fill
                  className="object-cover image-high-quality"
                  priority
                  quality={95}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 90vw"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/10 via-transparent to-accent/10 rounded-3xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-2 -left-6 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center slide-up">
            <Button
              asChild
              size="lg"
              className="px-8 py-4 bg-accent text-accent-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:text-black"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  "Hello! I’d like a quote for a marble mandir/murti. Please share price and timeline / नमस्ते! मैं मार्बल मंदिर/मूर्ति का कोटेशन चाहता हूँ। कृपया कीमत और समय बताएं।"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.("event", "click", { event_category: "cta", event_label: "Request_a_Quote" })}
              >
                Request a Quote
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-8 py-4 border-accent text-accent hover:bg-accent hover:text-black bg-transparent shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
                onClick={() => window.gtag?.("event", "click", { event_category: "cta", event_label: "whatsapp_hero" })}
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>

            {/* Premium Map Button */}
            <Button
              asChild
              size="lg"
              className="px-8 py-4 bg-accent text-white font-medium shadow-lg hover:shadow-xl hover:bg-accent/90 transition-all duration-300"
            >
              <a href="https://maps.app.goo.gl/jY8ge3FjHQsRXSDr7" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
                onClick={() => window.gtag?.("event", "click", { event_category: "cta", event_label: "Map_hero" })}
              >
                <MapPin className=" h-5 w-5" />
                Shop Location
              </a>
            </Button>
          </div>
          </div>
          </div>
      </section>
    )
  }

  // Split layout with enhanced marble textures
  return (
    <section className="relative py-16 md:py-10 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5"></div>
      <div className="absolute inset-0 marble-veins opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left slide-in-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              Trust, Set in <span className="text-accent">Stone</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Custom mandirs & murtis, crafted with care for {settings.trustStats?.yearsExperience || "20+"} years. Each
              piece tells a story of devotion, artistry, and timeless beauty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Request a Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative slide-in-right">
            <div className="aspect-[5/4] relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent z-10"></div>
              <Image
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center"
                alt="Exquisite marble mandir showcasing intricate craftsmanship"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-accent/10 via-transparent to-accent/10 rounded-3xl -z-10"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
