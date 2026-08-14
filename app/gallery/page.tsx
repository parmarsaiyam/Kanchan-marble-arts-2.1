import type { Metadata } from "next"
import { GalleryContent } from "./gallery-content"

export const metadata: Metadata = {
  title: "Gallery - Kanchan Marble Arts | Marble Mandirs & Murtis Showcase",
  description:
    "Explore our stunning collection of marble mandirs, murtis, and artistic pieces. View detailed craftsmanship and custom designs.",
  openGraph: {
    title: "Gallery - Kanchan Marble Arts",
    description: "Explore our stunning collection of marble mandirs, murtis, and artistic pieces.",
  },
}

export default function GalleryPage() {
  return <GalleryContent />
}
