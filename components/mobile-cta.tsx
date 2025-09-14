"use client"

import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { whatsappNumber, whatsappMessage, phoneNumber } from "@/components/contact-info"
import { useEffect, useState } from "react";


export function MobileCTA() {
  const [showButtons, setShowButtons] = useState(false);
          useEffect(() => {
            const handleScroll = () => {
              if (window.scrollY > 50) {
                setShowButtons(true);
              } else {
                setShowButtons(false);
              }
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
          }, []);
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
          >
            <Phone className="h-7 w-7" />
          </a>
        </Button>
      </div>
      </div>

      {/* Mobile WhatsApp FAB: Right side, symmetrical with call button */}
      <div
        className={`fixed bottom-7 right-5 z-40 md:hidden transition-all duration-500 transform ${showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
        <Button
          asChild
          className="h-14 w-14 rounded-full p-0 bg-green-600 text-white shadow-lg hover:shadow-xl hover:bg-green-700 transition"
        >
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            {/* Updated WhatsApp logo SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-7 w-7 mx-auto fill-current"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.1-.472-.149-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.497.1-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.209-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.412-.074-.124-.272-.198-.57-.347z"/>
              <path d="M20.52 3.48C18.24 1.2 15.24 0 12 0 5.37 0 0 5.37 0 12c0 2.115.55 4.17 1.6 5.98L0 24l6.18-1.62C8.07 23.45 10.02 24 12 24c6.63 0 12-5.37 12-12 0-3.24-1.26-6.24-3.48-8.52zM12 21.82c-1.74 0-3.44-.46-4.94-1.33l-.35-.21-3.65.96.97-3.56-.23-.37c-.96-1.57-1.47-3.37-1.47-5.21 0-5.48 4.46-9.94 9.94-9.94 2.66 0 5.16 1.04 7.04 2.92 1.88 1.88 2.92 4.38 2.92 7.04 0 5.48-4.46 9.94-9.93 9.94z"/>
            </svg>
          </a>
        </Button>
      </div>

      {/* Desktop/Tablet WhatsApp FAB: Better positioned for attention */}
      <div
        className={`hidden md:block fixed bottom-6 right-6 z-40 transition-all duration-500 transform ${showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
        <Button
          asChild
          className="h-16 w-16 rounded-full p-0 bg-green-600 text-white shadow-xl hover:shadow-2xl hover:bg-green-700 transition-all duration-300 hover:scale-105"
        >
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            {/* Updated WhatsApp logo SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8 mx-auto fill-current"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.1-.472-.149-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.497.1-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.209-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.412-.074-.124-.272-.198-.57-.347z"/>
              <path d="M20.52 3.48C18.24 1.2 15.24 0 12 0 5.37 0 0 5.37 0 12c0 2.115.55 4.17 1.6 5.98L0 24l6.18-1.62C8.07 23.45 10.02 24 12 24c6.63 0 12-5.37 12-12 0-3.24-1.26-6.24-3.48-8.52zM12 21.82c-1.74 0-3.44-.46-4.94-1.33l-.35-.21-3.65.96.97-3.56-.23-.37c-.96-1.57-1.47-3.37-1.47-5.21 0-5.48 4.46-9.94 9.94-9.94 2.66 0 5.16 1.04 7.04 2.92 1.88 1.88 2.92 4.38 2.92 7.04 0 5.48-4.46 9.94-9.93 9.94z"/>
            </svg>
          </a>
        </Button>
      </div>
    </>
  )
}
