"use client"

import { Phone, Mail, MapPin } from "lucide-react"
import { Reveal } from "@/components/layout/reveal"
import { TestimonialsRow } from "@/components/sections/testimonials-row"
import { whatsappHref, telHref, phoneDisplay, email, mapsUrl, mapsEmbedSrc } from "@/lib/site"
import { useT } from "@/lib/i18n/context"

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

      {/* Workshop + map */}
      <Reveal className="mx-auto max-w-[1280px] px-5 pt-12 lg:px-14 lg:pt-[72px]">
        <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[400px_1fr] lg:gap-14">
          <div>
            <h2 className="m-0 mb-6 font-serif text-[26px] font-bold leading-[1.1] lg:mb-[30px] lg:text-[34px]">
              {d.ui.contact.workshop.title}
            </h2>
            <div className="flex flex-col gap-[22px] lg:gap-[26px]">
              <div>
                <div className="kicker mb-2">{d.ui.contact.workshop.addressLabel}</div>
                <div className="text-[15px] leading-[1.7] lg:text-base">
                  {d.ui.common.addressLines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
              <hr className="rule m-0" />
              <div>
                <div className="kicker mb-2">{d.ui.contact.workshop.hoursLabel}</div>
                <div className="text-[15px] leading-[1.7] lg:text-base">{d.ui.contact.workshop.hoursValue}</div>
                <p className="m-0 mt-2 text-[13px] leading-relaxed text-[var(--kma-muted-2)]">
                  {d.ui.contact.workshop.hoursNote}
                </p>
              </div>
              <hr className="rule m-0" />
              <div>
                <div className="kicker mb-2">{d.ui.contact.workshop.stationLabel}</div>
                <div className="text-[15px] leading-[1.7] lg:text-base">{d.ui.contact.workshop.stationValue}</div>
              </div>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta press mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--kma-gold)] px-7 py-[15px] text-sm font-semibold text-[var(--kma-ivory)] max-lg:w-full lg:mt-8"
            >
              <MapPin className="h-4 w-4" strokeWidth={2} />
              {d.ui.contact.workshop.directions}
            </a>
          </div>
          <div className="h-[300px] overflow-hidden rounded-[20px] bg-[#e6dfd3] lg:h-[560px] lg:rounded-[28px]">
            <iframe
              src={mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={d.ui.contact.workshop.mapTitle}
            />
          </div>
        </div>
      </Reveal>

      <TestimonialsRow />

      <div className="h-10 lg:h-24" />
    </div>
  )
}
