"use client"

import { Gallery } from "@/components/sections/gallery"
import { CtaBand } from "@/components/sections/cta-band"
import { Reveal } from "@/components/layout/reveal"
import { whatsappHref } from "@/lib/site"
import { useT } from "@/lib/i18n/context"

export function GalleryContent() {
  const d = useT()

  return (
    <div>
      <Reveal className="mx-auto max-w-[1280px] px-5 pt-9 lg:px-14 lg:pt-[72px]">
        <div className="flex items-end justify-between gap-16">
          <div>
            <div className="kicker mb-3.5 !text-[10px] lg:mb-[18px] lg:!text-[11px]">{d.ui.gallery.kicker}</div>
            <h1 className="m-0 max-w-[760px] font-serif text-4xl font-bold leading-[1.06] lg:text-[64px] lg:leading-[1.02]">
              {d.ui.gallery.title}
            </h1>
          </div>
          <p className="m-0 mb-1.5 hidden max-w-[280px] text-[15px] leading-relaxed text-[var(--kma-muted)] xl:block">
            {d.ui.gallery.aside}
          </p>
        </div>
      </Reveal>

      <div className="mx-auto max-w-[1280px] px-5 pt-7 lg:px-14 lg:pt-12">
        <Gallery />
      </div>

      <CtaBand
        title={d.ui.gallery.cta.title}
        body={d.ui.gallery.cta.body}
        primary={{ label: d.ui.gallery.cta.primary, href: whatsappHref, external: true }}
      />
    </div>
  )
}
