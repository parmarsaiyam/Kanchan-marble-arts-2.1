"use client"

import { MapPin, Phone } from "lucide-react"
import { Reveal } from "@/components/layout/reveal"
import { mapsUrl, mapsEmbedSrc, telHref, phoneDisplay } from "@/lib/config/site"
import { useT } from "@/lib/i18n/context"
import { trackCall, trackDirections } from "@/lib/analytics"

/**
 * Where to find the workshop: address, opening hours, nearest station and an
 * embedded map. Shared by the Visit page and the bottom of the homepage, so the
 * two can never drift apart.
 *
 * Deliberately on the light ivory ground rather than a dark band, because it sits just
 * above the near-black footer, and two dark blocks in a row read as one.
 */
export function WorkshopVisit({
  /** The homepage adds a heading; the Visit page already has one above it. */
  withHeading = false,
}: {
  withHeading?: boolean
}) {
  const d = useT()

  return (
    <Reveal className="mx-auto max-w-[1280px] px-5 pt-14 lg:px-14 lg:pt-[104px]">
      {withHeading && (
        <div className="mb-8 lg:mb-12">
          <div className="kicker mb-3 lg:mb-4">{d.ui.home.contact.visitStudio}</div>
          <h2 className="m-0 max-w-[620px] font-serif text-[30px] font-bold leading-[1.16] lg:text-[42px] lg:leading-[1.14]">
            {d.ui.contact.workshop.title}
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[400px_1fr] lg:gap-14">
        {/* Left rail: the practical details */}
        <div>
          {!withHeading && (
            <h2 className="m-0 mb-6 font-serif text-[26px] font-bold leading-[1.1] lg:mb-[30px] lg:text-[34px]">
              {d.ui.contact.workshop.title}
            </h2>
          )}

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

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row lg:mt-8">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDirections("workshop")}
              className="cta press inline-flex items-center justify-center gap-2 rounded-full bg-[var(--kma-gold)] px-7 py-[15px] text-sm font-semibold text-[var(--kma-ivory)]"
            >
              <MapPin className="h-4 w-4" strokeWidth={2} />
              {d.ui.contact.workshop.directions}
            </a>
            <a
              href={telHref}
              onClick={() => trackCall("workshop")}
              className="press inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(36,31,26,0.22)] px-7 py-[15px] text-sm font-semibold"
            >
              <Phone className="h-4 w-4 text-[var(--kma-gold-deep)]" strokeWidth={2} />
              {phoneDisplay}
            </a>
          </div>
        </div>

        {/* Right: the map */}
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
  )
}
