
"use client"

import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { whatsappNumber, whatsappMessage, phoneNumber } from "@/components/contact-info"
import { useEffect, useRef, useState } from "react";
// add after imports
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


export function MobileCTA() {
  const [showButtons, setShowButtons] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const mobileDropRef = useRef<HTMLDivElement | null>(null);
  const desktopDropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
        setDropOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const clickedInsideMobile = mobileDropRef.current?.contains(target);
      const clickedInsideDesktop = desktopDropRef.current?.contains(target);
      if (!clickedInsideMobile && !clickedInsideDesktop) {
        setDropOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Replace with your real profiles
  const instagramProfile = "https://www.instagram.com/kanchanmarblearts?utm_source=ig_web_button_share_sheet&igsh=ODdmZWVhMTFiMw==";
  const facebookProfile = "https://www.facebook.com/share/179wyMUF5W/";

  // UI sizing: keep exact sizes as original buttons
  const mobileBtnSize = 56; // h-14 => 14 * 4px = 56px
  const desktopBtnSize = 64; // h-16 => 16 * 4px = 64px
  const gap = 12; // px gap between buttons

  const mobileStep = mobileBtnSize + gap;   // distance between stacked centers on mobile
  const desktopStep = desktopBtnSize + gap; // distance for desktop

  // shared classes for floating icon visuals (ring + shadow + safe reduced-motion)
  const floatingVisuals = "shadow-xl ring-2 ring-white/10";
  const svgInner = "h-full w-full transform scale-90 transition-transform duration-200 hover:scale-95 motion-reduce:transition-none";

  return (
    <>
      {/* Left FAB: Call directly */}
      <div
        className={`fixed bottom-4 left-4 z-40 md:hidden transition-all duration-500 transform ${showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
        <div className="fixed bottom-4 left-4 z-40 md:hidden">
          <Button
            asChild
            className="h-14 w-14 rounded-full p-0 bg-accent text-accent-foreground shadow-lg hover:shadow-xl hover:bg-accent/90 transition"
          >
            <a
              href={`tel:${phoneNumber}`}
              aria-label="Call Kanchan Marble Arts"
              onClick={() => trackGA("cta_click", "call_phone")}
            >
              <Phone className="h-20 w-20 scale-110" />
            </a>

          </Button>
        </div>
      </div>

      {/* Dropup FAB (Mobile) */}
      <div
        ref={mobileDropRef}
        className={`fixed right-5 bottom-7 z-40 md:hidden transition-all duration-500 transform ${showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        <div className="relative w-14 h-auto flex items-end justify-center">
          {/* Stack 1 (closest to main) - WhatsApp quick chat */}
          <div
            className={`absolute left-0 w-14 h-14 rounded-full ${floatingVisuals} transform transition-all duration-300 ${dropOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            style={{
              bottom: `${mobileStep}px`,
              transitionDelay: dropOpen ? "70ms" : "0ms",
            }}
          >
            {/* Button wraps the anchor as the single child (correct asChild usage) */}
            <Button asChild className="h-14 w-14 rounded-full p-0 bg-green-600 text-white shadow-none overflow-hidden">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hello! I'm interested in your marble products and want to discuss my needs / नमस्ते! मुझे आपके मार्बल प्रोडक्ट्स में रुचि है और मैं अपनी ज़रूरतों पर बात करना चाहता हूँ।`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp quick chat"
                title="WhatsApp"
                onClick={() => setDropOpen(false)}
              >
                <span className="sr-only">WhatsApp</span>
                <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-full w-full scale-175 fill-current"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.1-.472-.149-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.497.1-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.209-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.412-.074-.124-.272-.198-.57-.347z"/>
              <path d="M20.52 3.48C18.24 1.2 15.24 0 12 0 5.37 0 0 5.37 0 12c0 2.115.55 4.17 1.6 5.98L0 24l6.18-1.62C8.07 23.45 10.02 24 12 24c6.63 0 12-5.37 12-12 0-3.24-1.26-6.24-3.48-8.52zM12 21.82c-1.74 0-3.44-.46-4.94-1.33l-.35-.21-3.65.96.97-3.56-.23-.37c-.96-1.57-1.47-3.37-1.47-5.21 0-5.48 4.46-9.94 9.94-9.94 2.66 0 5.16 1.04 7.04 2.92 1.88 1.88 2.92 4.38 2.92 7.04 0 5.48-4.46 9.94-9.93 9.94z"/>
            </svg>
              </a>
            </Button>
          </div>

          {/* Stack 2 - Instagram */}
          <div
            className={`absolute left-0 w-14 h-14 rounded-full ${floatingVisuals} transform transition-all duration-350 ${dropOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            style={{
              bottom: `${mobileStep * 2}px`,
              transitionDelay: dropOpen ? "40ms" : "0ms",
            }}
          >
            <Button asChild className="h-14 w-14 rounded-full">
              <a
                href={instagramProfile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                onClick={() => setDropOpen(false)}
              >
                <span className="sr-only">Instagram</span>
               <img
                src="/images/insta.png"
                alt="Instagram"
                className="h-14 w-14 object-contain scale-235"
              />
              </a>
            </Button>
          </div>

          {/* Stack 3 (farthest) - Facebook */}
          <div
            className={`absolute left-0 w-14 h-14 rounded-full ${floatingVisuals} transform transition-all duration-400 ${dropOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            style={{
              bottom: `${mobileStep * 3}px`,
              transitionDelay: dropOpen ? "10ms" : "0ms",
            }}
          >
            <Button asChild className="h-14 w-14 rounded-full p-0 bg-blue-600 text-white shadow-none overflow-hidden">
              <a
                href={facebookProfile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                onClick={() => setDropOpen(false)}
              >
                <span className="sr-only">Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-full w-full transform scale-220" role="img" aria-hidden="true">
                <path fill="white" d="M279.14 288l14.22-92.66h-88.91V127.28c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.5 0 225.36 0c-73.22 0-121.14 44.38-121.14 124.72V195.3H22.89V288h81.33v224h100.2V288z"/>
              </svg>

              </a>
            </Button>
          </div>

          {/* Main Toggle Button (Chat icon) */}
          <div className="relative">
            <button
              onClick={() => setDropOpen(prev => !prev)}
              aria-expanded={dropOpen}
              aria-label={dropOpen ? "Close chat options" : "Open chat options"}
              title={dropOpen ? "Close chat menu" : "Open chat menu"}
              className="h-14 w-14 rounded-full p-0 bg-green-600 hover:shadow-xl transition transform active:scale-75 flex items-center justify-center ring-2 ring-white/10"
            >
              <span className="sr-only">Chat</span>
              <img
                src="/images/chat.png"
                alt="Chat"
                className="h-14 w-14 object-contain scale-130"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Dropup FAB (Desktop/Tablet) */}
      <div
        ref={desktopDropRef}
        className={`hidden md:block fixed bottom-6 right-6 z-40 transition-all duration-500 transform ${showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        <div className="relative w-16 h-auto flex items-end justify-center">
          {/* Desktop stack 1 (WhatsApp quick chat) */}
          <div
            className={`absolute left-0 w-16 h-16 rounded-full ${floatingVisuals} transform transition-all duration-300 ${dropOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            style={{
              bottom: `${desktopStep}px`,
              transitionDelay: dropOpen ? "70ms" : "0ms",
            }}
          >
            <Button asChild className="h-16 w-16 rounded-full p-0 bg-green-600 text-white shadow-none overflow-hidden">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hello! I'm interested in your marble products and want to discuss my needs / नमस्ते! मुझे आपके मार्बल प्रोडक्ट्स में रुचि है और मैं अपनी ज़रूरतों पर बात करना चाहता हूँ।`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp quick chat"
                title="WhatsApp"
                onClick={() => setDropOpen(false)}
              >
                <span className="sr-only">WhatsApp</span>
                 <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-full w-full scale-200 fill-current"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.1-.472-.149-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.497.1-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.209-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.412-.074-.124-.272-.198-.57-.347z"/>
              <path d="M20.52 3.48C18.24 1.2 15.24 0 12 0 5.37 0 0 5.37 0 12c0 2.115.55 4.17 1.6 5.98L0 24l6.18-1.62C8.07 23.45 10.02 24 12 24c6.63 0 12-5.37 12-12 0-3.24-1.26-6.24-3.48-8.52zM12 21.82c-1.74 0-3.44-.46-4.94-1.33l-.35-.21-3.65.96.97-3.56-.23-.37c-.96-1.57-1.47-3.37-1.47-5.21 0-5.48 4.46-9.94 9.94-9.94 2.66 0 5.16 1.04 7.04 2.92 1.88 1.88 2.92 4.38 2.92 7.04 0 5.48-4.46 9.94-9.93 9.94z"/>
            </svg>
              </a>
            </Button>
          </div>

          {/* Desktop stack 2 - Instagram */}
          <div
            className={`absolute left-0 w-16 h-16 rounded-full ${floatingVisuals} transform transition-all duration-350 ${dropOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            style={{
              bottom: `${desktopStep * 2}px`,
              transitionDelay: dropOpen ? "40ms" : "0ms",
            }}
          >
            <Button asChild className="h-16 w-16 rounded-full">
              <a
                href={instagramProfile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                onClick={() => setDropOpen(false)}
              >
                <span className="sr-only">Instagram</span>
                <img
                src="/images/insta.png"
                alt="Instagram"
                className="h-14 w-14 object-contain scale-220"
              />
              </a>
            </Button>
          </div>

          {/* Desktop stack 3 - Facebook */}
          <div
            className={`absolute left-0 w-16 h-16 rounded-full ${floatingVisuals} transform transition-all duration-400 ${dropOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            style={{
              bottom: `${desktopStep * 3}px`,
              transitionDelay: dropOpen ? "10ms" : "0ms",
            }}
          >
            <Button asChild className="h-16 w-16 rounded-full p-0 bg-blue-600 text-white shadow-none overflow-hidden">
              <a
                href={facebookProfile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                onClick={() => setDropOpen(false)}
              >
                <span className="sr-only">Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-full w-full transform scale-230" role="img" aria-hidden="true">
                <path fill="white" d="M279.14 288l14.22-92.66h-88.91V127.28c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.5 0 225.36 0c-73.22 0-121.14 44.38-121.14 124.72V195.3H22.89V288h81.33v224h100.2V288z"/>
              </svg>
              </a>
            </Button>
          </div>

          {/* Main Toggle Button (Desktop) */}
          <div className="relative">
            <button
              onClick={() => setDropOpen(prev => !prev)}
              aria-expanded={dropOpen}
              aria-label={dropOpen ? "Close chat options" : "Open chat options"}
              title={dropOpen ? "Close chat menu" : "Open chat menu"}
              className="h-16 w-16 rounded-full p-0 bg-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center active:scale-95 ring-2 ring-white/10"
            >
              <span className="sr-only">Chat</span>
              <img
                src="/images/chat.png"
                alt="Chat"
                className="h-14 w-14 object-contain scale-130"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}