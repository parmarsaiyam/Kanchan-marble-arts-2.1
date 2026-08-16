"use client"

import { Products } from "@/components/catalog/products-grid"
import { CtaBand } from "@/components/shared/cta-band"
import { Reveal } from "@/components/layout/reveal"
import { whatsappHref } from "@/lib/config/site"
import { useT } from "@/lib/i18n/context"

export function ProductsContent() {
  const d = useT()

  return (
    <div>
      <Reveal className="mx-auto max-w-[1280px] px-5 pt-9 lg:px-14 lg:pt-[72px]">
        <div className="kicker mb-3.5 !text-[10px] lg:mb-[18px] lg:!text-[11px]">{d.ui.products.kicker}</div>
        <h1 className="m-0 max-w-[820px] font-serif text-4xl font-bold leading-[1.06] lg:text-[64px] lg:leading-[1.02]">
          {d.ui.products.title}
        </h1>
        <p className="m-0 mt-5 max-w-[600px] text-base leading-relaxed text-[var(--kma-body)] lg:mt-[26px] lg:text-lg">
          {d.ui.products.subhead}
        </p>
      </Reveal>

      <div className="mx-auto max-w-[1280px] px-5 pt-7 lg:px-14 lg:pt-14">
        <Products />
      </div>

      <CtaBand
        title={d.ui.products.cta.title}
        body={d.ui.products.cta.body}
        primary={{ label: d.ui.products.cta.primary, href: whatsappHref, external: true }}
      />
    </div>
  )
}
