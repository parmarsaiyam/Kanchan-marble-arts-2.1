// components/Hero.tsx
"use client";
import { Button } from "@/components/ui/button";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { whatsappNumber, whatsappMessage } from "@/components/contact-info";
import HeroCarousel from "./HeroCarouselBackup";
import MobileCarousel from "./MobileCarousel";
import { useMediaQuery } from "./useMedia";


interface HeroProps { layout?: "centered" | "split"; }

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

function trackGA(action: string, label: string, extra: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  const g = (window as any).gtag;
  if (typeof g === "function") {
    g("event", action, {
      event_label: label,
      send_to: GA_ID,
      ...extra,
    });
  }
}

export function Hero({ layout = "centered" }: HeroProps) {
  // breakpoint: treat widths <= 1023.98px as "mobile/tablet stacked" (you can adjust)
  const isMobile = useMediaQuery("(max-width: 1023.98px)");
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() =>
        setSettings({ theme: { heroLayout: layout }, trustStats: { yearsExperience: "20+" } })
      );
  }, [layout]);

  if (!settings) return null;

  const heroLayout = settings.theme?.heroLayout || layout;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent( "Hello! I'm interested in your marble products and want to discuss my needs / नमस्ते! मुझे आपके मार्बल प्रोडक्ट्स में रुचि है और मैं अपनी ज़रूरतों पर बात करना चाहता हूँ।")}`;
  const quoteLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello! I’d like a quote for a marble mandir/murti. Please share price and timeline / नमस्ते! मैं एक मार्बल मंदिर/मूर्ति का कोटेशन लेना चाहता हूँ। कृपया कीमत और समय सीमा साझा करें।")}`;

  if (heroLayout !== "centered") return null;

  // ---------- MOBILE-FIRST VERSION ----------
  if (isMobile) {
    return (
      <section
        className="relative bg-[linear-gradient(180deg,#fbf8f6,rgba(246,243,239,1))] overflow-hidden py-8 sm:py-10"
        aria-label="Hero"
      >
        <div className="absolute inset-0 marble-veins opacity-30 pointer-events-none" />

        <div className="container mx-auto px-5">
          {/* Add some breathing room above H1 (mobile friendly) */}
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl sm:text-4xl md:text-4xl font-bold text-foreground leading-tight mb-3 pt-4">
              Carving Legacy in{" "}
              <span className="text-accent text-amber-700">Marble</span>
            </h1>
 
            <p className="text-base text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
              Custom mandirs and murtis crafted for your home, delivered and fitted with care.
              Each piece tells a story of devotion, artistry, and timeless beauty.
            </p>
          </div>

          {/* MOBILE carousel centered and full-width within container */}
          <div className="mb-6">
            <div className="mx-auto w-full max-w-[720px] px-4">
              <MobileCarousel />
            </div>
          </div>

          {/* Buttons: stacked, full-width on mobile with proper gaps */}
          <div className="flex flex-col gap-3 max-w-xs mx-auto mb-6">
            <Button asChild size="lg" className="w-full bg-accent text-white py-3">
              <a href={quoteLink} target="_blank" rel="noopener noreferrer"
                onClick={() => trackGA("cta_click", "hero_request_quote", { platform: "mobile" })}>Request a Quote</a>
            </Button>

            <Button asChild size="lg" variant="outline" className="w-full py-3 border-accent text-accent">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2"
                onClick={() => trackGA("cta_click", "hero_whatsapp", { platform: "mobile" })}>
                WhatsApp
              </a>
            </Button>

            <Button asChild size="lg" className="w-full bg-accent text-white py-3">
              <a href="https://maps.app.goo.gl/jY8ge3FjHQsRXSDr7" target="_blank" rel="noopener noreferrer"
                onClick={() => trackGA("cta_click", "hero_shop_location", { platform: "mobile" })}>Shop Location</a>
            </Button>
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-700" />
              <span>Mumbai, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-700" />
              <span>9137677723</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---------- DESKTOP / TABLET (>= breakpoint) — preserve existing layout ----------
  return (
    <section
      className="relative bg-[linear-gradient(180deg,#fbf8f6,rgba(246,243,239,1))] overflow-hidden "
      aria-label="Hero"
    >
      <div className="absolute inset-0 marble-veins opacity-30 pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8 lg:px-10">
        <div className="min-h-[70vh] md:min-h-[80vh] lg:min-h-[88vh] flex items-center">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left text area (desktop) */}
              <div className="lg:col-span-5 order-1 flex flex-col justify-center text-left">
                <h1 className="font-serif text-[1.9rem] md:text-[2.8rem] lg:text-[3.4rem] xl:text-[3.9rem] font-bold text-foreground leading-snug mb-3">
                  Carving Legacy in{" "}
                  <span className="text-accent text-amber-700">Marble</span>
                </h1>

                <p className="text-[0.95rem] md:text-base lg:text-[1.05rem] text-muted-foreground max-w-lg mb-6 leading-relaxed">
                  Custom mandirs and murtis crafted for your home, delivered and fitted with care.
                  Each piece tells a story of devotion, artistry, and timeless beauty.
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Button
                    asChild
                    size="lg"
                    className="px-5 py-3 bg-accent text-white shadow-md hover:shadow-lg text-[0.9rem]"
                  >
                    <a href={quoteLink} target="_blank" rel="noopener noreferrer"
                      onClick={() => trackGA("cta_click", "hero_request_quote", { platform: "desktop" })}>
                      Request a Quote
                    </a>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="px-5 py-3 border-accent text-accent hover:bg-accent/10 text-[0.9rem]"
                  >
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                      onClick={() => trackGA("cta_click", "hero_whatsapp", { platform: "desktop" })}
                    >
                      WhatsApp
                    </a>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    className="px-5 py-3 bg-accent text-white text-[0.9rem]"
                  >
                    <a
                      href="https://maps.app.goo.gl/jY8ge3FjHQsRXSDr7"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackGA("cta_click", "hero_shop_location", { platform: "desktop" })}
                    >
                      Shop Location
                    </a>
                  </Button>
                </div>

                <div className="flex items-center gap-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-amber-700"/>Mumbai, India</div>
                  <div className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-amber-700"/>9819460441</div>
                </div>
              </div>

              {/* Right: catalogue / carousel (desktop) */}
              <div className="lg:col-span-3 order-2 flex justify-start lg:pl-8 xl:pl-12 mt-8 lg:mt-0">
                <div className="relative w-full max-w-[680px] mx-0">
                  <div className="relative rounded-2xl overflow-visible">
                    <HeroCarousel />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </section>
  );
}
