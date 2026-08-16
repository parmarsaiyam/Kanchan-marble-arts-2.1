/**
 * Google Analytics 4. One place for every event the site sends.
 *
 * Why a module instead of calling gtag() inline everywhere:
 *  - event names stay consistent (GA4 treats "whatsapp_click" and
 *    "whatsappClick" as two different events, and you cannot merge them later)
 *  - nothing breaks when analytics is blocked or the ID is unset
 *  - you can see the whole tracking plan by reading one file
 *
 * GA4 vocabulary, in plain terms:
 *  - EVENT      something a visitor did ("clicked WhatsApp")
 *  - PARAMETER  detail about it ("from the product page")
 *  - KEY EVENT  an event you marked as important in the GA dashboard.
 *               This is GA4's word for a conversion. You tick a box in the
 *               GA interface. There is nothing to change in the code.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""

type Params = Record<string, string | number | boolean | undefined>

/** Where a click happened, so you can tell which page drives enquiries. */
export type Source =
  | "hero"
  | "header"
  | "mobile_fab"
  | "footer"
  | "contact_page"
  | "product_detail"
  | "product_quickview"
  | "gallery"
  | "cta_band"
  | "workshop"
  | "menu"

function send(event: string, params: Params = {}) {
  if (typeof window === "undefined" || !GA_ID) return
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof gtag !== "function") return // blocked by an ad blocker, or not loaded yet
  gtag("event", event, params)
}

/* ---------------------------------------------------------------------------
   Page views. Sent manually rather than automatically, because this is a
   single-page app: without this, GA would only ever record the first page a
   visitor landed on and never the ones they navigated to.
   --------------------------------------------------------------------------- */
export function trackPageView(path: string) {
  send("page_view", { page_path: path, page_location: window.location.href, page_title: document.title })
}

/* ---------------------------------------------------------------------------
   The ones that matter: someone trying to get in touch.
   Mark these as Key Events in GA to see them as conversions.
   --------------------------------------------------------------------------- */
export const trackWhatsApp = (source: Source) => send("contact_whatsapp", { source })
export const trackCall = (source: Source) => send("contact_call", { source })
export const trackEmail = (source: Source) => send("contact_email", { source })
export const trackDirections = (source: Source) => send("get_directions", { source })

/* ---------------------------------------------------------------------------
   Interest signals: what people look at before they enquire.
   --------------------------------------------------------------------------- */
export const trackProductView = (slug: string, category: string) =>
  send("view_product", { item_id: slug, item_category: category })

export const trackQuickView = (slug: string) => send("quick_view_product", { item_id: slug })

export const trackFilter = (list: "products" | "gallery", value: string) =>
  send("filter_list", { list_name: list, filter_value: value })

export const trackGalleryImage = (caption: string) => send("view_gallery_image", { image_caption: caption })

export const trackFaqOpen = (question: string) => send("faq_open", { question })

/* ---------------------------------------------------------------------------
   Audience insight: which language visitors actually want.
   --------------------------------------------------------------------------- */
export const trackLanguageChange = (locale: string) => send("language_change", { language: locale })

export const trackAnnouncementClick = () => send("announcement_click")
