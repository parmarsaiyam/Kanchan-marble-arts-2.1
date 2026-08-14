"use client"

import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import { whatsappHref, phoneDisplay, telHref } from "@/lib/site"
import { HeroCoverflow, HeroMobileCarousel } from "@/components/sections/hero-carousel"
import { useT } from "@/lib/i18n/context"

function Kicker() {
  const d = useT()
  return <div className="kicker mb-[18px] !text-[10px] lg:mb-[26px] lg:!text-[11px]">{d.ui.hero.kicker}</div>
}

function Heading() {
  const d = useT()
  return (
    <h1 className="m-0 font-serif text-[42px] font-bold leading-[1.1] tracking-[-0.01em] lg:text-[74px] lg:leading-[1.08]">
      {d.ui.hero.headingBefore}
      <span className="hl text-[var(--kma-gold-deep)]">{d.ui.hero.headingHighlight}</span>
      {d.ui.hero.headingAfter}
    </h1>
  )
}

function Subhead() {
  const d = useT()
  return (
    <p className="mb-6 mt-[22px] max-w-[470px] text-base leading-relaxed text-[var(--kma-body)] lg:mb-8 lg:mt-[26px] lg:text-lg">
      {d.ui.hero.subhead}
    </p>
  )
}

function Ctas() {
  const d = useT()
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <Link
        href="/contact"
        className="cta press shrink-0 whitespace-nowrap rounded-full bg-[var(--kma-gold)] px-[30px] py-[15px] text-center text-sm font-semibold text-[var(--kma-ivory)] max-lg:w-full max-lg:px-4 max-lg:py-4 max-lg:text-[15px]"
      >
        {d.ui.common.requestQuote}
      </Link>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="press shrink-0 whitespace-nowrap rounded-full border border-[rgba(36,31,26,0.22)] px-[30px] py-[15px] text-center text-sm font-semibold max-lg:w-full max-lg:px-4 max-lg:py-4 max-lg:text-[15px]"
      >
        {d.ui.common.whatsappUs}
      </a>
    </div>
  )
}

function Stats() {
  const d = useT()
  const stats: [string, string][] = [
    ["20+", d.ui.hero.statYears],
    ["100,000+", d.ui.hero.statOrders],
    ["100%", d.ui.hero.statDelivery],
  ]
  return (
    <div className="flex gap-8 lg:gap-[52px]">
      {stats.map(([value, label]) => (
        <div key={label}>
          <div className="font-serif text-[26px] font-bold leading-none lg:text-[34px]">{value}</div>
          <div className="kicker mt-2 !text-[10px]">{label}</div>
        </div>
      ))}
    </div>
  )
}

function LocationRow() {
  const d = useT()
  return (
    <div className="flex items-center gap-5 text-[13px] text-[var(--kma-muted)] lg:gap-[22px]">
      <span className="flex items-center gap-2">
        <MapPin className="h-[15px] w-[15px] text-[var(--kma-gold)]" strokeWidth={2} />
        {d.ui.hero.location}
      </span>
      <a href={telHref} className="flex items-center gap-2">
        <Phone className="h-[15px] w-[15px] text-[var(--kma-gold)]" strokeWidth={2} />
        {phoneDisplay}
      </a>
    </div>
  )
}

export function Hero() {
  return (
    <section className="pt-9 lg:pt-[74px]">
      {/* Mobile: heading → subheading → carousel → CTAs → stats */}
      <div className="mx-auto max-w-[1280px] px-5 lg:hidden">
        <Kicker />
        <Heading />
        <Subhead />
        <div className="mb-6">
          <HeroMobileCarousel />
        </div>
        <Ctas />
        <div className="pt-6">
          <LocationRow />
        </div>
        <hr className="rule my-5" />
        <Stats />
      </div>

      {/* Desktop: copy left, coverflow right */}
      <div className="mx-auto hidden max-w-[1280px] grid-cols-[1fr_620px] items-center gap-16 px-14 lg:grid">
        <div>
          <Kicker />
          <Heading />
          <Subhead />
          <div className="mb-9">
            <Ctas />
          </div>
          <hr className="rule" />
          <div className="pt-6">
            <Stats />
          </div>
        </div>
        <div>
          <HeroCoverflow />
          <div className="pt-[18px]">
            <LocationRow />
          </div>
        </div>
      </div>
    </section>
  )
}
