export const phoneNumber = "+919819460441"
export const phoneDisplay = "+91 98194 60441"
export const whatsappNumber = "+919819460441"
export const whatsappMessage = encodeURIComponent(
  "Hello! I'm interested in your marble products and want to discuss my needs / नमस्ते! मुझे आपके मार्बल प्रोडक्ट्स में रुचि है और मैं अपनी ज़रूरतों पर बात करना चाहता हूँ।",
)
export const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
export const telHref = `tel:${phoneNumber}`
export const email = "kanchanmarblearts@gmail.com"
export const mapsUrl = "https://maps.app.goo.gl/jY8ge3FjHQsRXSDr7"
export const mapsEmbedSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.9669769932425!2d72.85760827466812!3d19.196644648175074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b718f4306427%3A0xddb9c4ca3b53e836!2sKanchan%20Marble%20Arts.!5e0!3m2!1sen!2sin!4v1756016808996!5m2!1sen!2sin"

/**
 * English source copy. The rendered address and hours come from the dictionary
 * (`d.ui.common.addressLines` / `businessHours`) so they translate with the site.
 */
export const addressLines = [
  "Kanchan Marble Arts, Ashok Nagar,",
  "Near Akurli Metro Station,",
  "Beside Mahanagar CNG Pump,",
  "Kandivali East, Mumbai 400101",
]
export const businessHours = "Mon – Sun: 9:00 AM – 9:00 PM"

/**
 * Navigation targets. Labels are not stored here — each entry carries the
 * dictionary key its label lives under (see `d.ui.nav` in lib/i18n), so the
 * menu translates with the rest of the site.
 */
export const navLinks = [
  { key: "home", href: "/" },
  { key: "products", href: "/products" },
  { key: "gallery", href: "/gallery" },
  { key: "process", href: "/process" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const

export type NavKey = (typeof navLinks)[number]["key"]
