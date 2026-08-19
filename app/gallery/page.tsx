import type { Metadata } from "next"
import { GalleryContent } from "./gallery-content"
import { getContent } from "@/lib/content/store"
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

/**
 * ImageGallery markup. Every entry is a real photo on the page with the caption
 * a visitor sees, which is Google's requirement for image results. Captions
 * double as alt text, so the two can never drift apart.
 */
function GalleryJsonLd({ images }: { images: { src: string; caption: string; w: number; h: number }[] }) {
  const graph = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": "https://kanchanmarblearts.com/gallery#gallery",
    name: "Completed marble mandirs, Jain mandirs and murtis",
    description:
      "Photographs of finished work in the Mumbai homes it was installed in, by Kanchan Marble Arts.",
    isPartOf: { "@id": "https://kanchanmarblearts.com/#website" },
    associatedMedia: images.slice(0, 30).map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.src,
      caption: img.caption,
      width: img.w,
      height: img.h,
      creditText: "Kanchan Marble Arts",
      creator: { "@id": "https://kanchanmarblearts.com/#business" },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
}

export const revalidate = 60

export default async function GalleryPage() {
  const { gallery } = await getContent()
  // Drafts and hidden items used to render on the live site, because nothing
  // filtered on status. Uploading a photo in the CMS published it instantly.
  const images = gallery.images.filter((img) => (img.status ?? "live") === "live")

  return (
    <>
      <BreadcrumbJsonLd name="Gallery" path="/gallery" />
      <GalleryJsonLd images={images} />
      <GalleryContent images={images} />
    </>
  )
}
