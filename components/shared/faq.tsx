"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { Reveal } from "@/components/layout/reveal"
import { useT } from "@/lib/i18n/context"
import { faqKeys } from "@/lib/content/faq"
import { trackFaqOpen } from "@/lib/analytics"

/**
 * Uses native <details> so every answer is in the HTML whether or not it is
 * open, because collapsed-but-present text is what search engines index, and it works
 * with JavaScript disabled.
 */
export function Faq() {
  const d = useT()

  return (
    <Reveal className="kma-band mt-14 py-14 lg:mt-[104px] lg:py-20" id="faq">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-5 lg:grid-cols-[360px_1fr] lg:gap-16 lg:px-14">
        <div>
          <div className="kicker mb-3 lg:mb-[18px]">{d.ui.faq.kicker}</div>
          <h2 className="m-0 mb-4 font-serif text-[28px] font-bold leading-[1.1] lg:text-[42px] lg:leading-[1.06]">
            {d.ui.faq.title}
          </h2>
          <p className="m-0 max-w-[420px] text-[15px] leading-relaxed text-[var(--kma-muted)] lg:text-base">
            {d.ui.faq.subhead}
          </p>

          {/* Someone reading the FAQ is mid-decision. These two links are the
              pages that answer "show me" rather than "tell me". */}
          <div className="mt-6 lg:mt-8">
            <div className="kicker mb-3">{d.ui.faq.stillDeciding}</div>
            <div className="flex flex-col items-start gap-2.5">
              <Link
                href="/process"
                className="press border-b border-[var(--kma-gold)] pb-0.5 text-sm font-semibold text-[var(--kma-gold-deep)]"
              >
                {d.ui.faq.seeProcess} →
              </Link>
              <Link
                href="/products"
                className="press border-b border-[var(--kma-gold)] pb-0.5 text-sm font-semibold text-[var(--kma-gold-deep)]"
              >
                {d.ui.faq.seeCollections} →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--kma-hairline)]">
          {faqKeys.map((key) => {
            const item = d.ui.faq.items[key]
            return (
              <details
                key={key}
                className="kma-faq group border-b border-[var(--kma-hairline)]"
                onToggle={(e) => e.currentTarget.open && trackFaqOpen(item.q)}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 lg:py-6">
                  <h3 className="m-0 font-serif text-[19px] font-semibold leading-snug lg:text-[22px]">{item.q}</h3>
                  <Plus
                    className="mt-0.5 h-5 w-5 flex-none text-[var(--kma-gold)] transition-transform duration-300 group-open:rotate-45"
                    strokeWidth={2}
                    aria-hidden
                  />
                </summary>
                <p className="m-0 max-w-[720px] pb-6 pr-8 text-[15px] leading-[1.75] text-[var(--kma-body)] lg:text-base lg:leading-[1.8]">
                  {item.a}
                </p>
              </details>
            )
          })}
        </div>
      </div>
    </Reveal>
  )
}
