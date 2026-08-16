"use client"

import Image from "next/image"
import { Reveal } from "@/components/layout/reveal"
import { CtaBand } from "@/components/shared/cta-band"
import { Faq } from "@/components/shared/faq"
import { mapsUrl, telHref, phoneDisplay, email } from "@/lib/config/site"
import { useLanguage } from "@/lib/i18n/context"
import { aboutFactKeys } from "@/lib/content/faq"

const statValues = ["20+", "100,000+", "100%"] as const
const statKeys = ["years", "orders", "delivery"] as const
const stoneKeys = ["australian", "indian", "italian"] as const
const stoneImages: Record<(typeof stoneKeys)[number], string> = {
  australian: "/images/australian.webp",
  indian: "/images/indian.webp",
  italian: "/images/italian.webp",
}


export function AboutContent() {
  const { d, tc } = useLanguage()

  return (
    <div>
      {/* Story hero */}
      <Reveal className="mx-auto max-w-[1280px] px-5 pt-10 lg:px-14 lg:pt-[88px]">
        <div className="kicker mb-3.5 !text-[10px] lg:mb-5 lg:!text-[11px]">{d.ui.about.kicker}</div>
        <h1 className="m-0 max-w-[900px] font-serif text-4xl font-bold leading-[1.06] lg:text-[64px] lg:leading-[1.02]">
          {d.ui.about.title}
        </h1>
        <p className="m-0 mt-4 max-w-[640px] text-base leading-relaxed text-[var(--kma-body)] lg:mt-7 lg:text-[19px]">
          {d.ui.about.subhead}
        </p>
      </Reveal>

      {/* Full-bleed image */}
      <Reveal className="mt-9 h-[300px] overflow-hidden lg:mt-[72px] lg:h-[520px]">
        <Image
          src="/images/abouttop.webp"
          alt={tc("Master craftsman at work")}
          width={1600}
          height={800}
          priority
          className="wash h-full w-full object-cover object-[center_40%]"
        />
      </Reveal>

      {/* Legacy */}
      <Reveal className="mx-auto max-w-[1280px] px-5 pt-9 lg:px-14 lg:pt-[88px]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr] lg:gap-20">
          <div>
            <div className="kicker">{d.ui.about.legacy.kicker}</div>
            <div className="mt-3 font-serif text-[15px] text-[var(--kma-gold)]">{d.ui.about.legacy.period}</div>
          </div>
          <div className="max-w-[680px]">
            <p className="mb-5 text-[17px] leading-[1.8] text-[var(--kma-ink)] lg:mb-6 lg:text-[19px]">
              {d.ui.about.legacy.body1}
            </p>
            <p className="mb-5 text-base leading-[1.8] text-[var(--kma-body)] lg:mb-6 lg:text-[17px]">
              {d.ui.about.legacy.body2}
            </p>
            <p className="m-0 text-base leading-[1.8] text-[var(--kma-body)] lg:text-[17px]">
              {d.ui.about.legacy.body3}
            </p>
          </div>
        </div>
      </Reveal>

      {/* Stats */}
      <Reveal className="mx-auto max-w-[1280px] px-5 pt-10 lg:px-14 lg:pt-[88px]">
        <hr className="rule" />
        <div className="rv-stagger grid grid-cols-1 gap-8 pt-7 sm:grid-cols-3 lg:gap-[72px] lg:pt-11">
          {statKeys.map((key, i) => {
            const stat = d.ui.about.stats[key]
            return (
              <div key={key}>
                <div className="font-serif text-[34px] font-bold leading-none lg:text-[52px]">{statValues[i]}</div>
                <div className="kicker mt-2.5 lg:mt-3">{stat.label}</div>
                <p className="m-0 mt-2.5 hidden text-sm leading-relaxed text-[var(--kma-muted)] lg:block">
                  {stat.note}
                </p>
              </div>
            )
          })}
        </div>
      </Reveal>

      {/* At a glance: the questions customers and search engines both ask */}
      <Reveal className="kma-band mt-12 py-14 lg:mt-[88px] lg:py-20">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-14">
        <div className="kicker mb-3 lg:mb-[18px]">{d.ui.about.facts.kicker}</div>
        <h2 className="m-0 mb-7 max-w-[620px] font-serif text-[28px] font-bold leading-[1.1] lg:mb-12 lg:text-[42px] lg:leading-[1.06]">
          {d.ui.about.facts.title}
        </h2>
        <div className="rv-stagger grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-2 lg:gap-y-11">
          {aboutFactKeys.map((key) => {
            const fact = d.ui.about.facts.items[key]
            return (
              <div key={key}>
                <h3 className="m-0 mb-2.5 font-serif text-xl font-bold leading-snug lg:text-[23px]">{fact.q}</h3>
                <p className="m-0 text-[15px] leading-[1.75] text-[var(--kma-body)] lg:text-base lg:leading-[1.8]">
                  {fact.a}
                </p>
              </div>
            )
          })}
          <div>
            <h3 className="m-0 mb-2.5 font-serif text-xl font-bold leading-snug lg:text-[23px]">
              {d.ui.about.facts.items.contact.q}
            </h3>
            <p className="m-0 text-[15px] leading-[1.75] text-[var(--kma-body)] lg:text-base lg:leading-[1.8]">
              {d.ui.about.facts.items.contact.a(phoneDisplay, email)}
            </p>
          </div>
        </div>
        </div>
      </Reveal>

      {/* Three stones */}
      <Reveal className="pt-11 lg:pt-24">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-14">
          <div className="kicker mb-3 lg:mb-[18px]">{d.ui.about.materials.kicker}</div>
          <h2 className="m-0 mb-6 max-w-[560px] font-serif text-[28px] font-bold leading-[1.1] lg:mb-11 lg:text-[42px] lg:leading-[1.06]">
            {d.ui.about.materials.title}
          </h2>
        </div>
        <div className="rv-stagger mx-auto flex max-w-[1280px] gap-3.5 overflow-x-auto px-5 lg:grid lg:grid-cols-3 lg:gap-[26px] lg:overflow-visible lg:px-14">
          {stoneKeys.map((key) => {
            const stone = d.ui.about.materials[key]
            return (
              <div key={key} className="tile w-[230px] flex-none lg:w-auto">
                <div className="aspect-square overflow-hidden rounded-2xl bg-[var(--kma-surface)]">
                  <Image
                    src={stoneImages[key]}
                    alt={stone.title}
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="m-0 mb-1.5 mt-3.5 font-serif text-xl font-bold lg:mb-2 lg:mt-5 lg:text-2xl">
                  {stone.title}
                </h3>
                <p className="m-0 text-sm leading-[1.7] text-[var(--kma-muted)] lg:text-[15px]">{stone.body}</p>
              </div>
            )
          })}
        </div>
      </Reveal>

      {/* Jain heritage */}
      <Reveal className="kma-dk mt-12 bg-[var(--kma-ink)] text-[var(--kma-cream)] lg:mt-[104px]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-6 px-5 py-11 lg:grid-cols-2 lg:gap-20 lg:px-14 lg:py-24">
          <div className="aspect-[5/4] overflow-hidden rounded-[20px] lg:rounded-[28px]">
            <Image
              src="/images/aboutbottom.webp"
              alt={tc("Jain marble sculpture")}
              width={900}
              height={720}
              className="wash h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="kicker mb-3 !text-[var(--kma-gold-light)] lg:mb-[18px]">{d.ui.about.jain.kicker}</div>
            <h2 className="m-0 mb-4 font-serif text-[28px] font-bold leading-[1.1] text-[var(--kma-cream)] lg:mb-[26px] lg:text-[40px] lg:leading-[1.08]">
              {d.ui.about.jain.title}
            </h2>
            <p className="mb-4 text-base leading-[1.8] text-[rgba(247,244,239,0.85)] lg:mb-5 lg:text-[17px]">
              {d.ui.about.jain.body1}
            </p>
            <p className="mb-4 text-base leading-[1.8] text-[rgba(247,244,239,0.85)] lg:mb-5 lg:text-[17px]">
              {d.ui.about.jain.body2}
            </p>
            <p className="m-0 text-base leading-[1.8] text-[rgba(247,244,239,0.85)] lg:text-[17px]">
              {d.ui.about.jain.body3}
            </p>
          </div>
        </div>
      </Reveal>

      <Faq />

      {/* CtaBand supplies its own top margin. The old negative-margin wrapper
          existed only to butt it against the dark Jain band above. */}
      <CtaBand
        title={d.ui.about.cta.title}
        body={d.ui.about.cta.body}
        primary={{ label: d.ui.about.cta.primary, href: mapsUrl, external: true }}
        secondary={{ label: d.ui.common.call(phoneDisplay), href: telHref, external: true }}
      />
    </div>
  )
}
