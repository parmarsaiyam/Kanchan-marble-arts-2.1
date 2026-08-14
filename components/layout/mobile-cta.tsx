"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Phone } from "lucide-react"
import { whatsappHref, telHref } from "@/lib/site"
import { useT } from "@/lib/i18n/context"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""

function trackGA(action: string, label: string, extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof g === "function") {
    g("event", action, { event_label: label, send_to: GA_ID, ...extra })
  }
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.1-.472-.149-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.497.1-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.209-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.412-.074-.124-.272-.198-.57-.347z" />
      <path d="M20.52 3.48C18.24 1.2 15.24 0 12 0 5.37 0 0 5.37 0 12c0 2.115.55 4.17 1.6 5.98L0 24l6.18-1.62C8.07 23.45 10.02 24 12 24c6.63 0 12-5.37 12-12 0-3.24-1.26-6.24-3.48-8.52zM12 21.82c-1.74 0-3.44-.46-4.94-1.33l-.35-.21-3.65.96.97-3.56-.23-.37c-.96-1.57-1.47-3.37-1.47-5.21 0-5.48 4.46-9.94 9.94-9.94 2.66 0 5.16 1.04 7.04 2.92 1.88 1.88 2.92 4.38 2.92 7.04 0 5.48-4.46 9.94-9.93 9.94z" />
    </svg>
  )
}

/** Floating action buttons: phone (mobile, left) and WhatsApp (right, all sizes). */
export function MobileCTA() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const d = useT()

  // Product detail pages carry their own sticky price/CTA bar on mobile.
  const hideOnMobile = /^\/products\/[^/]+/.test(pathname)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 50)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const reveal = visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-5"

  return (
    <>
      {/* Call — mobile only, bottom left */}
      {!hideOnMobile && (
        <a
          href={telHref}
          aria-label={d.ui.common.callAria}
          onClick={() => trackGA("cta_click", "call_phone", { platform: "mobile" })}
          className={`press fixed bottom-5 left-4 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--kma-gold)] text-[var(--kma-ivory)] shadow-[0_10px_26px_rgba(36,31,26,0.28)] transition-all duration-500 md:hidden ${reveal}`}
        >
          <Phone className="h-[22px] w-[22px]" />
        </a>
      )}

      {/* WhatsApp — bottom right on every screen */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={d.ui.common.whatsappAria}
        onClick={() => trackGA("cta_click", "whatsapp_chat")}
        className={`press fixed bottom-5 right-4 z-40 ${
          hideOnMobile ? "hidden md:flex" : "flex"
        } h-16 w-16 items-center justify-center rounded-full bg-[var(--kma-whatsapp)] text-white shadow-[0_10px_26px_rgba(36,31,26,0.28)] transition-all duration-500 md:bottom-6 md:right-6 md:h-16 md:w-16 ${reveal}`}
      >
        <WhatsAppIcon className="h-[26px] w-[26px] md:h-8 md:w-8" />
      </a>
    </>
  )
}
