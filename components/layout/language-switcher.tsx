"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import { locales, localeMeta } from "@/lib/i18n/config"
import { useLanguage } from "@/lib/i18n/context"

/**
 * `variant="segmented"` — the EN / हिं / ગુ pill in the desktop header.
 * `variant="menu"`      — a round button that opens a small popover, used on
 *                         mobile where a three-up segmented control would push
 *                         the logo and hamburger off a narrow header.
 */
export function LanguageSwitcher({ variant = "segmented" }: { variant?: "segmented" | "menu" }) {
  const { locale, setLocale, d } = useLanguage()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("mousedown", onPointer)
    document.addEventListener("touchstart", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onPointer)
      document.removeEventListener("touchstart", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  if (variant === "menu") {
    return (
      <div ref={wrapRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={d.ui.nav.chooseLanguage}
          aria-haspopup="menu"
          aria-expanded={open}
          className="press flex h-[42px] min-w-[42px] items-center justify-center rounded-full border border-[rgba(36,31,26,0.14)] px-2 text-[13px] font-semibold text-[var(--kma-ink)]"
        >
          <span lang={localeMeta[locale].htmlLang}>{localeMeta[locale].short}</span>
        </button>

        {open && (
          <div
            role="menu"
            aria-label={d.ui.nav.chooseLanguage}
            className="absolute right-0 top-[calc(100%+8px)] z-[90] min-w-[160px] overflow-hidden rounded-2xl border border-[var(--kma-hairline)] bg-[var(--kma-ivory)] py-1 shadow-[0_16px_40px_rgba(36,31,26,0.18)]"
          >
            {locales.map((code) => {
              const active = code === locale
              return (
                <button
                  key={code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  lang={localeMeta[code].htmlLang}
                  onClick={() => {
                    setLocale(code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[15px] ${
                    active ? "font-semibold text-[var(--kma-gold-deep)]" : "text-[var(--kma-ink)]"
                  }`}
                >
                  {localeMeta[code].label}
                  {active && <Check className="h-4 w-4 flex-none" strokeWidth={2.4} />}
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      role="group"
      aria-label={d.ui.nav.chooseLanguage}
      className="flex items-center gap-1 rounded-full border border-[var(--kma-hairline)] bg-[rgba(36,31,26,0.03)] p-1"
    >
      {locales.map((code) => {
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            lang={localeMeta[code].htmlLang}
            title={localeMeta[code].label}
            className={`press rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors ${
              active
                ? "bg-[var(--kma-ink)] text-[var(--kma-ivory)]"
                : "text-[var(--kma-muted)] hover:text-[var(--kma-ink)]"
            }`}
          >
            <span className="sr-only">{localeMeta[code].label}</span>
            <span aria-hidden>{localeMeta[code].short}</span>
          </button>
        )
      })}
    </div>
  )
}
