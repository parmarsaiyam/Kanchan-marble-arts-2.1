"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import settings from "@/content/settings.json"
import { useLanguage } from "@/lib/i18n/context"
import { defaultLocale, type Locale } from "@/lib/i18n/config"
import type { Announcement, AnnouncementTone } from "@/lib/cms/types"

/**
 * The announcement ribbon pinned above the header.
 *
 * Everything here is authored in the CMS (/admin → Announcements) and stored in
 * content/settings.json: the message in three languages, an optional link, a
 * start and end date, the colour tone, and how long a dismissal sticks.
 */

const STORAGE_KEY = "kma-announcement-dismissed"

const announcement = (settings as Record<string, any>).announcement as Announcement | undefined

/** Picks the translation for the active language, falling back to English. */
function localised(anno: Announcement, field: "text" | "mobileText" | "linkText", locale: Locale) {
  if (locale === defaultLocale) return anno[field]
  return (anno[`${field}_${locale}` as keyof Announcement] as string | undefined) || anno[field]
}

/**
 * Is the announcement inside its scheduled window right now?
 *
 * Evaluated in the browser, not at build time, because a statically generated page
 * could otherwise sit in Netlify's cache for days past the end date and keep
 * showing an expired festival offer.
 */
function withinSchedule(anno: Announcement, now: number) {
  if (anno.startsAt && now < new Date(anno.startsAt).getTime()) return false
  if (anno.endsAt && now > new Date(anno.endsAt).getTime()) return false
  return true
}

/** How long a dismissal lasts, in milliseconds. */
function dismissWindow(anno: Announcement) {
  const days = anno.dismissDays ?? 7
  return days * 24 * 60 * 60 * 1000
}

const toneStyles: Record<AnnouncementTone, { bar: string; dot: string; link: string }> = {
  festival: {
    bar: "bg-[var(--kma-ink)] text-[var(--kma-cream)]",
    dot: "bg-[var(--kma-gold-light)]",
    link: "text-[var(--kma-gold-light)]",
  },
  offer: {
    bar: "bg-[var(--kma-gold)] text-[var(--kma-ivory)]",
    dot: "bg-[var(--kma-ink)]",
    link: "text-[var(--kma-ivory)]",
  },
  notice: {
    bar: "bg-[var(--kma-surface)] text-[var(--kma-ink)]",
    dot: "bg-[var(--kma-gold)]",
    link: "text-[var(--kma-gold-deep)]",
  },
}

export function useAnnouncement() {
  const { locale } = useLanguage()

  // Rendered by default so the pinned ribbon is in the prerendered HTML.
  // starting hidden would shove the whole page down a row once JS loads.
  const [dismissed, setDismissed] = useState(false)
  const [scheduled, setScheduled] = useState(true)

  useEffect(() => {
    if (!announcement) return

    // Schedule is checked on the client so an expired bar disappears without a rebuild.
    setScheduled(withinSchedule(announcement, Date.now()))

    // A dismissal is stored with a timestamp so it can expire on its own.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const at = Number(raw)
        if (at && Date.now() - at < dismissWindow(announcement)) setDismissed(true)
      }
    } catch {
      // Storage unavailable (private mode), so the bar simply reappears next visit.
    }
  }, [])

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()))
    } catch {
      // Ignore. Dismissal just will not persist.
    }
    setDismissed(true)
  }

  const visible = Boolean(announcement?.enabled) && scheduled && !dismissed

  return {
    announcement,
    visible,
    dismiss,
    text: announcement ? localised(announcement, "text", locale) : undefined,
    mobileText: announcement ? localised(announcement, "mobileText", locale) : undefined,
    linkText: announcement ? localised(announcement, "linkText", locale) : undefined,
  }
}

export function AnnouncementBar() {
  const { announcement: anno, visible, dismiss, text, mobileText, linkText } = useAnnouncement()
  const { d } = useLanguage()
  if (!visible || !anno) return null

  const tone = toneStyles[anno.tone ?? "festival"]
  const canDismiss = anno.dismissible ?? true

  return (
    <div
      className={`relative flex items-center justify-center gap-2.5 py-2 pl-4 lg:h-[42px] lg:gap-3.5 lg:py-0 ${
        canDismiss ? "pr-10 lg:pr-14" : "pr-4"
      } ${tone.bar}`}
    >
      <span className={`anno-dot h-1.5 w-1.5 flex-none rounded-full ${tone.dot}`} />

      <span className="text-[12px] leading-snug lg:text-[13px]">
        {/* Phones get the short version when one was written. */}
        <span className="lg:hidden">{mobileText || text}</span>
        <span className="hidden lg:inline">{text}</span>
      </span>

      {linkText && anno.href && (
        <Link href={anno.href} className={`anno-link hidden flex-none font-semibold lg:inline ${tone.link}`}>
          {linkText}
        </Link>
      )}

      {canDismiss && (
        <button
          onClick={dismiss}
          aria-label={d.ui.common.dismissAnnouncement}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 leading-none opacity-55 hover:opacity-100 lg:right-6"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
