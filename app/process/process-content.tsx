"use client"

import { ProcessSteps } from "@/components/shared/process-steps"
import { CtaBand } from "@/components/shared/cta-band"
import { Reveal } from "@/components/layout/reveal"
import { useT } from "@/lib/i18n/context"

export function ProcessContent() {
  const d = useT()

  return (
    <div>
      <Reveal className="mx-auto max-w-[1280px] px-5 pt-10 lg:px-14 lg:pt-[88px]">
        <div className="kicker mb-3.5 !text-[10px] lg:mb-5 lg:!text-[11px]">{d.ui.process.kicker}</div>
        <h1 className="m-0 max-w-[880px] font-serif text-4xl font-bold leading-[1.06] lg:text-[64px] lg:leading-[1.02]">
          {d.ui.process.title}
        </h1>
        <p className="m-0 mt-4 max-w-[640px] text-base leading-relaxed text-[var(--kma-body)] lg:mt-7 lg:text-[19px]">
          {d.ui.process.subhead}
        </p>
      </Reveal>

      <div className="mx-auto max-w-[1280px] px-5 pt-11 lg:px-14 lg:pt-20">
        <ProcessSteps />
      </div>

      <CtaBand
        title={d.ui.process.cta.title}
        body={d.ui.process.cta.body}
        primary={{ label: d.ui.process.cta.primary, href: "/contact" }}
      />
    </div>
  )
}
