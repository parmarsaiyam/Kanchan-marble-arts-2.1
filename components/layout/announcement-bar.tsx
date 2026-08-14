"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import settings from "@/content/settings.json"
import { useLanguage } from "@/lib/i18n/context"
import { defaultLocale, type Locale } from "@/lib/i18n/config"

const STORAGE_KEY = "kma-announcement-dismissed"

/**
 * The announcement is authored in /admin. Each field has optional `_hi` / `_gu`
 * siblings (e.g. `text_hi`); when the visitor's language has no translation the
 * English copy is shown rather than an empty banner.
 */
interface Announcement {
  enabled: boolean
  text: string
  mobileText?: string
  linkText?: string
  href?: string
  text_hi?: string
  text_gu?: string
  mobileText_hi?: string
  mobileText_gu?: string
  linkText_hi?: string
  linkText_gu?: string
}

const announcement = (settings as Record<string, any>).announcement as Announcement | undefined

function localised(anno: Announcement, field: "text" | "mobileText" | "linkText", locale: Locale) {
  if (locale === defaultLocale) return anno[field]
  return (anno[`${field}_${locale}` as keyof Announcement] as string | undefined) || anno[field]
}

export function useAnnouncement() {
  const { locale } = useLanguage()
  // Rendered by default so the pinned ribbon is present in the prerendered HTML —
  // starting hidden would shove the whole page down a row once JS loads. Visitors
  // who already dismissed it this session lose it again in the effect below.
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setDismissed(true)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1")
    setDismissed(true)
  }

  const visible = Boolean(announcement?.enabled) && !dismissed

  return {
    announcement,
    visible,
    dismiss,
    text: announcement ? localised(announcement, "text", locale) : undefined,
    mobileText: announcement ? localised(announcement, "mobileText", locale) : undefined,
    linkText: announcement ? localised(announcement, "linkText", locale) : undefined,
  }
}

/**
 * Dark ribbon pinned above the header on every screen size. It is rendered
 * inside the header's sticky stack, so it stays put while the page scrolls.
 */
export function AnnouncementBar() {
  const { announcement: anno, visible, dismiss, text, mobileText, linkText } = useAnnouncement()
  const { d } = useLanguage()
  if (!visible || !anno) return null

  return (
    <div className="relative flex items-center justify-center gap-2.5 bg-[var(--kma-ink)] py-2 pl-4 pr-10 text-[var(--kma-cream)] lg:h-[42px] lg:gap-3.5 lg:py-0 lg:pr-14">
      <span className="anno-dot h-1.5 w-1.5 flex-none rounded-full bg-[var(--kma-gold-light)]" />
      <span className="text-[12px] leading-snug lg:text-[13px]">
        <span className="lg:hidden">{mobileText ?? text}</span>
        <span className="hidden lg:inline">{text}</span>
      </span>
      {linkText && anno.href && (
        <Link
          href={anno.href}
          className="anno-link hidden flex-none font-semibold text-[var(--kma-gold-light)] lg:inline"
        >
          {linkText}
        </Link>
      )}
      <button
        onClick={dismiss}
        aria-label={d.ui.common.dismissAnnouncement}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 leading-none opacity-55 hover:opacity-100 lg:right-6"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
