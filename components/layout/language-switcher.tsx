"use client"

import { locales, localeMeta } from "@/lib/i18n/config"
import { useLanguage } from "@/lib/i18n/context"
import { trackLanguageChange } from "@/lib/analytics"

/**
 * Segmented EN / हिं / ગુ control. All three languages are visible at once, the
 * same control on every breakpoint. It steps down in size on narrow phones so
 * it sits beside the logo and hamburger without crowding them, while the tap
 * targets stay a full 34px tall at the smallest step.
 */
export function LanguageSwitcher() {
  const { locale, setLocale, d } = useLanguage()

  return (
    <div
      role="group"
      aria-label={d.ui.nav.chooseLanguage}
      className="flex shrink-0 items-center gap-0.5 rounded-full border border-[var(--kma-hairline)] bg-[rgba(36,31,26,0.04)] p-[3px] sm:gap-1 sm:p-1"
    >
      {locales.map((code) => {
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            onClick={() => {
              setLocale(code)
              trackLanguageChange(code)
            }}
            aria-pressed={active}
            lang={localeMeta[code].htmlLang}
            title={localeMeta[code].label}
            className={`press rounded-full px-2 py-1.5 text-[11px] font-semibold leading-none transition-colors sm:px-3 sm:py-2 sm:text-[13px] ${
              active
                ? "bg-[var(--kma-ink)] text-[var(--kma-ivory)] shadow-[0_2px_8px_rgba(36,31,26,0.18)]"
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
