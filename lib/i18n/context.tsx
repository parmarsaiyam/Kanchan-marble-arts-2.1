"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { defaultLocale, isLocale, localeMeta, LOCALE_STORAGE_KEY, type Locale } from "./config"
import { en } from "./dictionaries/en"
import { hi } from "./dictionaries/hi"
import { gu } from "./dictionaries/gu"
import type { Dictionary } from "./types"

const dictionaries: Record<Locale, Dictionary> = { en, hi, gu }

interface LanguageContextValue {
  locale: Locale
  setLocale: (next: Locale) => void
  /** The active dictionary. `d.ui.*` is type-checked; `d.content.*` are fallback maps. */
  d: Dictionary
  /** Translate a content string keyed by its English source (alt text, captions). */
  tc: (english: string) => string
  /** Translate a product feature bullet. */
  tf: (english: string) => string
  /** Translate a product category name. */
  tcat: (english: string) => string
  /** Translate a marble/stone name. */
  tstone: (english: string) => string
  /** Localise a "Starting from ₹25,000" style price string. */
  tprice: (price: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start on the default locale so the server-rendered HTML and the first
  // client render agree; the stored choice is applied in the effect below.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (isLocale(stored) && stored !== defaultLocale) setLocaleState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = localeMeta[locale].htmlLang
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      // Private-mode browsers can refuse storage; the choice still applies for this page view.
    }
  }, [])

  const value = useMemo<LanguageContextValue>(() => {
    const d = dictionaries[locale]
    return {
      locale,
      setLocale,
      d,
      tc: (english) => d.content.captions[english] ?? english,
      tf: (english) => d.content.features[english] ?? english,
      tcat: (english) => d.content.categories[english] ?? english,
      tstone: (english) => d.content.stones[english] ?? english,
      tprice: (price) =>
        price.startsWith("Starting from ")
          ? `${d.ui.common.startingFrom} ${price.slice("Starting from ".length)}`
          : price,
    }
  }, [locale, setLocale])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>")
  return ctx
}

/** Shorthand for components that only need the dictionary. */
export function useT() {
  return useLanguage().d
}

/**
 * Product copy for the active locale, falling back to the English fields in
 * lib/products.ts when a slug has no translation yet.
 */
export function useProductText(slug: string, fallback: { title: string; description: string }) {
  const { d } = useLanguage()
  return d.content.products[slug] ?? fallback
}

/** Testimonial copy for the active locale, keyed by the English reviewer name. */
export function useTestimonialText() {
  const { d } = useLanguage()
  return (t: { name: string; location: string; review: string }) => d.content.testimonials[t.name] ?? t
}
