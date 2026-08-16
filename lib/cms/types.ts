import type { Locale } from "@/lib/i18n/config"

/** A field the owner can write in each of the three site languages. */
export type Translated = Partial<Record<Locale, string>>

export type ItemStatus = "live" | "draft" | "hidden"

export interface GalleryItem {
  src: string
  w: number
  h: number
  category: string
  caption: string
  status?: ItemStatus
  /** Present when the asset is a video rather than a photo. */
  video?: { url: string; poster?: string }
}

export interface CatalogProduct {
  slug: string
  title: string
  description: string
  category: string
  image: string
  gallery: string[]
  features: string[]
  price: string
  stones: string[]
  status: ItemStatus
  featured: boolean
  showPrice: boolean
  /** Translations keyed by locale; English lives in the plain fields above. */
  i18n?: {
    title?: Translated
    description?: Translated
    features?: Partial<Record<Locale, string[]>>
    price?: Translated
  }
}

export type AnnouncementTone = "festival" | "offer" | "notice"

export interface Announcement {
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
  /** ISO datetimes. The bar hides itself once `endsAt` passes. */
  startsAt?: string
  endsAt?: string
  tone?: AnnouncementTone
  dismissible?: boolean
  dismissDays?: number
}

/** The three files the CMS owns, exactly as they sit in the repo. */
export interface CmsContent {
  catalog: { stones: string[]; products: CatalogProduct[] }
  gallery: { images: GalleryItem[] }
  settings: Record<string, unknown> & { announcement?: Announcement }
}

export type CmsFileKey = keyof CmsContent

/** Repo paths each slice publishes to. */
export const CMS_FILES: Record<CmsFileKey, string> = {
  catalog: "content/catalog.json",
  gallery: "content/gallery.json",
  settings: "content/settings.json",
}

export const ANNOUNCEMENT_TONES: { id: AnnouncementTone; label: string; hint: string }[] = [
  { id: "festival", label: "Festival · dark", hint: "Ink background, gold dot. The default." },
  { id: "offer", label: "Offer · gold", hint: "Gold background. Use sparingly, for real discounts." },
  { id: "notice", label: "Notice · quiet", hint: "Muted surface, for closures and timing changes." },
]
