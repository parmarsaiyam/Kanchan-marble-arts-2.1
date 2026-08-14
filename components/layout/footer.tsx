"use client"

import Link from "next/link"
import Image from "next/image"
import { navLinks, phoneDisplay, whatsappHref, telHref, email } from "@/lib/site"
import { useT } from "@/lib/i18n/context"

export function Footer() {
  const d = useT()

  return (
    <footer className="kma-dk bg-[var(--kma-ink-3)] text-[rgba(247,244,239,0.72)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 pt-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12 lg:px-14">
        <div>
          <Image
            src="/images/kma-logo.png"
            alt={d.ui.nav.logoAlt}
            width={210}
            height={58}
            className="mb-4 h-[58px] w-auto object-contain brightness-[20.0] saturate-[0.0]"
          />
          <p className="max-w-[280px] text-[13px] leading-relaxed">{d.ui.footer.blurb}</p>
        </div>
        <div>
          <div className="kicker mb-3.5 !text-[var(--kma-gold-light)]">{d.ui.footer.explore}</div>
          <div className="flex flex-col gap-2 text-[13px]">
            {navLinks
              .filter((link) => link.href !== "/")
              .map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-[var(--kma-ivory)]">
                  {d.ui.nav[link.key]}
                </Link>
              ))}
          </div>
        </div>
        <div>
          <div className="kicker mb-3.5 !text-[var(--kma-gold-light)]">{d.ui.footer.contact}</div>
          <div className="flex flex-col gap-2 text-[13px]">
            <a href={telHref} className="hover:text-[var(--kma-ivory)]">
              {phoneDisplay}
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--kma-ivory)]">
              {d.ui.footer.whatsapp}
            </a>
            <a href={`mailto:${email}`} className="break-all hover:text-[var(--kma-ivory)]">
              {email}
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1280px] px-6 pb-9 lg:px-14">
        <hr className="mb-5 mt-10 h-px border-0 bg-[rgba(247,244,239,0.14)]" />
        <div className="text-xs opacity-60">{d.ui.footer.rights(new Date().getFullYear())}</div>
      </div>
    </footer>
  )
}
