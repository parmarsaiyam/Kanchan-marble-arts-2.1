/**
 * Display order for the About page's answers and FAQ.
 *
 * Kept in a plain module rather than in the client components that render them,
 * because the server component that builds the FAQPage structured data imports
 * these too, and anything exported from a "use client" file arrives on the
 * server as a client reference rather than the real value.
 */
export const faqKeys = [
  "homeMandir",
  "price",
  "customJain",
  "bestMarble",
  "ashtamangala",
  "sizeDesign",
  "outsideMumbai",
  "howLong",
] as const

/** `contact` is rendered separately, because its answer interpolates phone and email. */
export const aboutFactKeys = ["who", "where", "since", "products", "marble", "custom", "areas"] as const
