import type { Metadata } from "next"
import type React from "react"

/**
 * The CMS is a self-contained app: no site header, footer or language provider.
 * It must never be indexed, hence the explicit noindex on top of the
 * `Disallow: /admin` line in robots.txt.
 */
export const metadata: Metadata = {
  title: "Studio | Kanchan Marble Arts",
  robots: { index: false, follow: false, nocache: true },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
