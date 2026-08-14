import type { Metadata } from "next"
import { AboutContent } from "./about-content"

export const metadata: Metadata = {
  title: "About Us - Kanchan Marble Arts | 20+ Years of Marble Craftsmanship",
  description:
    "Learn about our 20+ year journey in marble craftsmanship. Family-run business specializing in premium marble mandirs, murtis, and custom artistic pieces.",
  openGraph: {
    title: "About Us - Kanchan Marble Arts",
    description: "Learn about our 20+ year journey in marble craftsmanship and family-run business values.",
  },
}

export default function AboutPage() {
  return <AboutContent />
}
