import type { Metadata } from "next"
import { ContactContent } from "./contact-content"

export const metadata: Metadata = {
  title: "Contact Us - Kanchan Marble Arts | Get Your Custom Quote",
  description:
    "Contact Kanchan Marble Arts for custom marble mandirs, murtis, and artistic pieces. Get a free consultation and quote for your project.",
  openGraph: {
    title: "Contact Us - Kanchan Marble Arts",
    description: "Contact us for custom marble mandirs, murtis, and artistic pieces. Free consultation available.",
  },
}

export default function ContactPage() {
  return <ContactContent />
}
