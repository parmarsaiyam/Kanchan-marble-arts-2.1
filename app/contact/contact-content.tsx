"use client"

import { Phone, Mail } from "lucide-react"
import { Reveal } from "@/components/layout/reveal"
import { TestimonialsRow } from "@/components/shared/testimonials-row"
import { WorkshopVisit } from "@/components/shared/workshop-visit"
import { whatsappHref, telHref, phoneDisplay, email } from "@/lib/config/site"
import { useT } from "@/lib/i18n/context"
import { trackCall, trackEmail, trackWhatsApp } from "@/lib/analytics"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.52 3.48C18.24 1.2 15.24 0 12 0 5.37 0 0 5.37 0 12c0 2.115.55 4.17 1.6 5.98L0 24l6.18-1.62C8.07 23.45 10.02 24 12 24c6.63 0 12-5.37 12-12 0-3.24-1.26-6.24-3.48-8.52zM12 21.82c-1.74 0-3.44-.46-4.94-1.33l-.35-.21-3.65.96.97-3.56-.23-.37c-.96-1.57-1.47-3.37-1.47-5.21 0-5.48 4.46-9.94 9.94-9.94 2.66 0 5.16 1.04 7.04 2.92 1.88 1.88 2.92 4.38 2.92 7.04 0 5.48-4.46 9.94-9.93 9.94z" />
    </svg>
  )
}

export function ContactContent() {
  const d = useT()

  return (
    <div>
      {/* Hero */}
      <Reveal className="mx-auto max-w-[1280px] px-5 pt-10 lg:px-14 lg:pt-[88px]">
        <div className="kicker mb-3.5 !text-[10px] lg:mb-5 lg:!text-[11px]">{d.ui.contact.kicker}</div>
        <h1 className="m-0 max-w-[840px] font-serif text-4xl font-bold leading-[1.06] lg:text-[64px] lg:leading-[1.02]">
          {d.ui.contact.title}
        </h1>
        <p className="m-0 mt-4 max-w-[600px] text-base leading-relaxed text-[var(--kma-body)] lg:mt-7 lg:text-[19px]">
          {d.ui.contact.subhead}
        </p>
      </Reveal>

      {/* Action cards */}
      <Reveal className="mx-auto max-w-[1280px] px-5 pt-7 lg:px-14 lg:pt-16">
        <div className="rv-stagger grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-5">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsApp("contact_page")}
            className="press flex items-center gap-4 rounded-[20px] bg-[var(--kma-whatsapp)] p-[22px] text-white lg:min-h-[200px] lg:flex-col lg:items-start lg:justify-between lg:rounded-3xl lg:p-8"
          >
            <WhatsAppIcon className="h-7 w-7 flex-none lg:h-8 lg:w-8" />
            <div>
              <div className="font-serif text-xl font-bold lg:mb-1.5 lg:text-[26px]">
                {d.ui.contact.whatsappCard.title}
              </div>
              <div className="text-[13px] opacity-90 lg:text-[15px]">
                {d.ui.contact.whatsappCard.note(phoneDisplay)}
              </div>
            </div>
          </a>
          <a
            href={telHref}
            onClick={() => trackCall("contact_page")}
            className="press flex items-center gap-4 rounded-[20px] bg-[var(--kma-surface)] p-[22px] lg:min-h-[200px] lg:flex-col lg:items-start lg:justify-between lg:rounded-3xl lg:p-8"
          >
            <Phone
              className="h-[26px] w-[26px] flex-none text-[var(--kma-gold-deep)] lg:h-[30px] lg:w-[30px]"
              strokeWidth={1.8}
            />
            <div>
              <div className="font-serif text-xl font-bold lg:mb-1.5 lg:text-[26px]">{d.ui.contact.callCard.title}</div>
              <div className="text-[13px] text-[var(--kma-muted)] lg:text-[15px]">{phoneDisplay}</div>
            </div>
          </a>
          <a
            href={`mailto:${email}`}
            onClick={() => trackEmail("contact_page")}
            className="press flex items-center gap-4 rounded-[20px] bg-[var(--kma-surface)] p-[22px] lg:min-h-[200px] lg:flex-col lg:items-start lg:justify-between lg:rounded-3xl lg:p-8"
          >
            <Mail
              className="h-[26px] w-[26px] flex-none text-[var(--kma-gold-deep)] lg:h-[30px] lg:w-[30px]"
              strokeWidth={1.8}
            />
            <div className="min-w-0">
              <div className="font-serif text-xl font-bold lg:mb-1.5 lg:text-[26px]">
                {d.ui.contact.emailCard.title}
              </div>
              <div className="break-all text-[13px] text-[var(--kma-muted)] lg:text-[15px]">{email}</div>
            </div>
          </a>
        </div>
      </Reveal>

      <WorkshopVisit />

      <TestimonialsRow />

      <div className="h-10 lg:h-24" />
    </div>
  )
}
