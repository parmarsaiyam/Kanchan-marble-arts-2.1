"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, MapPin } from "lucide-react"
import { navLinks, whatsappHref, telHref, phoneDisplay } from "@/lib/config/site"
import { media } from "@/lib/config/media"
import { useT } from "@/lib/i18n/context"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import type { Announcement } from "@/lib/cms/types"

export function Header({ announcement }: { announcement?: Announcement }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const stackRef = useRef<HTMLDivElement>(null)
  const d = useT()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

  // Close on route change, and lock body scroll while the drawer is open.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  /**
   * The announcement ribbon and the header scroll as one sticky block, so its
   * height varies (ribbon dismissed, mobile vs desktop). Publish it as
   * --kma-stack-h so sticky filter rails below can clear it exactly.
   */
  useEffect(() => {
    const node = stackRef.current
    if (!node) return
    const publish = () =>
      document.documentElement.style.setProperty("--kma-stack-h", `${node.offsetHeight}px`)
    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  return (
    <>
      {/* Announcement + header travel together and stay pinned while scrolling */}
      <div ref={stackRef} className="sticky top-0 z-50">
        <AnnouncementBar announcement={announcement} />
        {/* backdrop-blur-sm, not -xl. The background behind it is already 93%
            opaque, so a 24px blur contributed almost nothing visually while
            forcing the compositor to re-blur the strip under a sticky header on
            every scroll frame, which is a common cause of phone scroll jank. */}
        <header className="border-b border-[var(--kma-hairline)] bg-[rgba(247,244,239,0.93)] backdrop-blur-sm">
          <div className="mx-auto flex h-[66px] max-w-[1280px] items-center justify-between px-5 lg:h-[86px] lg:px-14">
            <Link href="/" aria-label={d.ui.nav.homeAria} className="min-w-0 shrink">
              <Image
                src={media.logo}
                alt={d.ui.nav.logoAlt}
                width={220}
                height={62}
                priority
                className="h-[40px] w-auto max-w-[34vw] object-contain object-left sm:h-[46px] sm:max-w-none lg:h-[62px]"
              />
            </Link>

            <nav className="hidden items-center gap-[34px] text-sm font-semibold lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`navlink ${
                    isActive(link.href)
                      ? "navon text-[var(--kma-ink)]"
                      : "text-[var(--kma-muted)] hover:text-[var(--kma-ink)]"
                  }`}
                >
                  {d.ui.nav[link.key]}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3.5 lg:flex">
              <LanguageSwitcher />
              <Link
                href="/contact"
                className="press rounded-full bg-[var(--kma-ink)] px-6 py-3 text-[13px] font-semibold text-[var(--kma-ivory)]"
              >
                {d.ui.nav.enquire}
              </Link>
            </div>

            {/* Mobile: language switcher sits right beside the hamburger */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
              <LanguageSwitcher />
              <button
                onClick={() => setMenuOpen(true)}
                aria-label={d.ui.nav.openMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="press flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-[rgba(36,31,26,0.14)] sm:h-[42px] sm:w-[42px]"
              >
                <Menu className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Scrim */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[70] bg-[rgba(28,24,21,0.5)] backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Slide-in sidebar */}
      <aside
        id="mobile-menu"
        aria-hidden={!menuOpen}
        aria-label={d.ui.nav.openMenu}
        className={`fixed inset-y-0 right-0 z-[80] flex w-[min(82vw,330px)] flex-col bg-[var(--kma-ivory)] shadow-[-18px_0_50px_rgba(36,31,26,0.22)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex h-[66px] flex-none items-center justify-between border-b border-[var(--kma-hairline)] pl-6 pr-4">
          <span className="kicker !text-[10px]">{d.ui.common.brandName}</span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label={d.ui.nav.closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            className="press flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[rgba(36,31,26,0.14)]"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-2">
          {navLinks.map((link, i) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                aria-current={active ? "page" : undefined}
                className={`group flex items-baseline gap-3 border-b border-[var(--kma-hairline)] py-[15px] transition-colors last:border-b-0 ${
                  active ? "text-[var(--kma-gold-deep)]" : "text-[var(--kma-ink)]"
                }`}
              >
                <span
                  className={`font-serif text-[11px] tabular-nums ${
                    active ? "text-[var(--kma-gold)]" : "text-[var(--kma-muted-2)]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-[21px] font-semibold leading-none tracking-[-0.01em]">
                  {d.ui.nav[link.key]}
                </span>
                {active && <span className="ml-auto h-1.5 w-1.5 self-center rounded-full bg-[var(--kma-gold)]" />}
              </Link>
            )
          })}
        </nav>

        <div className="flex-none border-t border-[var(--kma-hairline)] px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            className="cta press mb-2.5 block rounded-full bg-[var(--kma-gold)] py-3.5 text-center text-sm font-semibold text-[var(--kma-ivory)]"
          >
            {d.ui.common.whatsappUs}
          </a>
          <a
            href={telHref}
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            className="press flex items-center justify-center gap-2 rounded-full border border-[rgba(36,31,26,0.2)] py-3.5 text-sm font-semibold"
          >
            <Phone className="h-4 w-4 text-[var(--kma-gold-deep)]" strokeWidth={2} />
            {phoneDisplay}
          </a>
          <div className="mt-4 flex items-start gap-2 text-[12px] leading-snug text-[var(--kma-muted-2)]">
            <MapPin className="mt-px h-3.5 w-3.5 flex-none text-[var(--kma-gold)]" strokeWidth={2} />
            {d.ui.hero.location}
          </div>
        </div>
      </aside>
    </>
  )
}
