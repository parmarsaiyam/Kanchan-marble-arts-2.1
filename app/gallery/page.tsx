import type { Metadata } from "next"
import { GalleryContent } from "./gallery-content"
import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld"

export const metadata: Metadata = {
  title: "Marble Mandir & Jain Temple Gallery | Completed Work in Mumbai Homes",
  description:
    "Photographs of finished marble mandirs, white marble Jain mandirs with Ashtamangala and 14 Swapna carving, and hand-carved murtis, shot in the Mumbai homes they were installed in, not in a studio.",
  alternates: { canonical: "/gallery" },
  keywords: [
    "marble mandir for home in Mumbai",
    "white marble Jain mandir",
    "marble mandir with ashtamangala",
    "Jain mandir with 14 swapna",
    "handmade marble mandir",
  ],
  openGraph: {
    title: "Marble Mandir & Jain Temple Gallery | Kanchan Marble Arts",
    description:
      "Completed marble mandirs, Jain temples and murtis photographed in the Mumbai homes they were made for.",
    url: "https://kanchanmarblearts.com/gallery",
  },
}

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Gallery" path="/gallery" />
      <GalleryContent />
    </>
  )
}
