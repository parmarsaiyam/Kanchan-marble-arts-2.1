/** Supported site languages. `en` is the source of truth for the dictionary shape. */
export const locales = ["en", "hi", "gu"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

/** Storage key for the visitor's chosen language. */
export const LOCALE_STORAGE_KEY = "kma-lang"

/**
 * Labels for the switcher. `short` is what fits in the header pill,
 * `label` is the full native name used for accessible names.
 */
export const localeMeta: Record<Locale, { short: string; label: string; htmlLang: string }> = {
  en: { short: "EN", label: "English", htmlLang: "en-IN" },
  hi: { short: "हिं", label: "हिन्दी", htmlLang: "hi-IN" },
  gu: { short: "ગુ", label: "ગુજરાતી", htmlLang: "gu-IN" },
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value)
}
